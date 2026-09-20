// Rule-based heuristics: write-action detection, tool-description quality, robots parsing.

// Word-start anchored with common inflections; lookarounds instead of \b because
// "_" is a word char in regex and snake_case tool names (create_invoice) must match.
// (?![a-z0-9]) still rejects "password" (pass…) and "additional" (add…).
const WRITE_VERBS =
  /(?<![a-z])(create|update|delete|remove|destroy|send|sent|cancel|cancelled|canceled|write|set|modify|post|put|patch|add|insert|move|assign|close|resolve|archive|restore|publish|invite|revoke|approve|pay|refund|charge|submit|upload|import|merge|link|unlink|activate|deactivate|toggle|mark|complete|book|transfer)(s|es|ed|d|ing)?(?![a-z0-9])/i;

export function isWriteAction(toolName: string, description: string): boolean {
  return WRITE_VERBS.test(toolName) || WRITE_VERBS.test(description);
}

/** 0..1 heuristic score predicting whether an LLM will pick and use this tool correctly. */
export function descriptionQuality(name: string, description: string): { score: number; notes: string[] } {
  const notes: string[] = [];
  let score = 0;
  const desc = (description ?? "").trim();

  if (!desc) {
    return { score: 0, notes: ["keine Beschreibung"] };
  }
  const words = desc.split(/\s+/).length;

  if (words >= 8) score += 0.3;
  else notes.push("sehr kurz (<8 Wörter)");
  if (words >= 25) score += 0.2;

  if (/\b(returns?|gibt zurück|antworte?t|response|list of|id)\b/i.test(desc)) score += 0.15;
  else notes.push("nennt kein Rückgabeformat");

  if (/(example|e\.g\.|beispiel|z\. B\.|"|\[\{)/i.test(desc)) score += 0.15;
  else notes.push("kein Beispiel/Format-Hinweis");

  if (/\{\{|\$\{|\bdate from\b|\biso\b|\bYYYY\b|\bfilter\b|\bquery\b|\bformat\b/i.test(desc)) score += 0.1;
  if (name.length >= 4 && /_/i.test(name)) score += 0.1; // structured naming helps tool selection

  if (/\b(todo|TODO|wip|deprecated|coming soon)\b/i.test(desc)) {
    score -= 0.2;
    notes.push("unfertig/deprecated markiert");
  }
  return { score: Math.round(Math.max(0, Math.min(1, score)) * 100) / 100, notes };
}

const AGENT_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-Web", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "CCBot", "Bytespider", "Amazonbot", "meta-externalagent",
];

export interface ParsedRobots {
  found: boolean;
  agents: { agent: string; policy: "allowed" | "blocked" | "none" }[];
}

/** Parse robots.txt and classify each known AI agent as allowed/blocked/not mentioned. */
export function parseAgentPolicies(robotsTxt: string | null): ParsedRobots {
  if (!robotsTxt) return { found: false, agents: AGENT_BOTS.map((a) => ({ agent: a, policy: "none" as const })) };
  const groups: { ua: string | "*"; disallow: string[]; allow: string[] }[] = [];
  let current: { ua: string | "*"; disallow: string[]; allow: string[] } | null = null;
  for (const rawLine of robotsTxt.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const m = line.match(/^([a-z-]+):\s*(.*)$/i);
    if (!m) continue;
    const field = m[1].toLowerCase();
    const value = m[2].trim();
    if (field === "user-agent") {
      if (!current || current.ua !== value.toLowerCase()) {
        current = { ua: value.toLowerCase(), disallow: [], allow: [] };
        groups.push(current);
      }
    } else if (current) {
      if (field === "disallow") current.disallow.push(value);
      else if (field === "allow") current.allow.push(value);
    }
  }

  const agents = AGENT_BOTS.map((bot) => {
    const botLower = bot.toLowerCase();
    const specific = groups.filter((g) => g.ua === botLower);
    const wildcard = groups.filter((g) => g.ua === "*");
    const relevant = specific.length > 0 ? specific : wildcard;
    if (specific.length === 0 && wildcard.length === 0) return { agent: bot, policy: "none" as const };
    if (relevant.some((g) => g.disallow.includes("/"))) return { agent: bot, policy: "blocked" as const };
    if (relevant.some((g) => g.allow.includes("/"))) return { agent: bot, policy: "allowed" as const };
    // Groups exist but no root rule: robots.txt default semantics = allowed.
    return { agent: bot, policy: "allowed" as const };
  });
  return { found: true, agents };
}
