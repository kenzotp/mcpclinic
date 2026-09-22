// Docs-surface probe: OpenAPI presence, agent crawler policies, llms.txt, security.txt.

import { httpGet, sleep, REQUEST_GAP_MS } from "./http.ts";
import { parseAgentPolicies } from "./heuristics.ts";
import { assertPublicHost } from "./ssrf.ts";
import type { SurfaceProbeResult, Check } from "./types.ts";

const OPENAPI_CANDIDATES = [
  "/openapi.json",
  "/swagger.json",
  "/v3/api-docs",
  "/api-docs/openapi.json",
  "/openapi.yaml",
];

/** Known agent crawlers we report on (robots.txt policies). */
export const REPORTED_AGENTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web",
  "anthropic-ai", "PerplexityBot", "Google-Extended", "CCBot",
];

/**
 * Visitors type the marketing homepage, but specs and API surfaces usually live
 * under docs./api./developer(s). — awork uses developers., JTL developer.,
 * Clockodo docs. Only widen the net for apex/www entries — a specific
 * subdomain means the user already knows where to look.
 */
export function deriveAlternateHosts(hostname: string): string[] {
  const bare = hostname.replace(/^www\./i, "");
  const labels = bare.split(".");
  if (labels.length !== 2) return [];
  if (labels.some((l) => /^\d+$/.test(l))) return []; // IP literal
  return [`docs.${bare}`, `api.${bare}`, `developers.${bare}`, `developer.${bare}`];
}

export async function probeSurface(
  origin: string,
  extraPaths: string[] = [],
): Promise<SurfaceProbeResult> {
  const base = await assertPublicHost(origin);
  const root = base.origin;
  const checks: Check[] = [];

  // --- OpenAPI discovery on the given origin (+ common doc hosts are handled by caller via extraPaths) ---
  let openapi: SurfaceProbeResult["openapi"] = {};
  const specCandidates = [
    ...OPENAPI_CANDIDATES.map((p) => root + p),
    ...extraPaths.map((p) => (p.startsWith("http") ? p : root + p)),
  ];
  for (const candidate of specCandidates) {
    const res = await httpGet(candidate).catch(() => null);
    await sleep(REQUEST_GAP_MS);
    if (res?.ok && res.body) {
      const isYaml = candidate.endsWith(".yaml") || candidate.endsWith(".yml");
      let parsed: any = null;
      try {
        parsed = JSON.parse(res.body);
      } catch {
        if (isYaml) {
          // crude YAML detection: openapi/swagger key at top
          if (/^\s*(openapi|swagger):/m.test(res.body)) parsed = { openapi: "yaml", info: { title: "(YAML spec)" } };
        }
      }
      if (parsed && (parsed.openapi || parsed.swagger || parsed.paths)) {
        openapi = {
          url: candidate,
          title: parsed?.info?.title,
          version: parsed?.openapi ?? parsed?.swagger,
          paths: typeof parsed?.paths === "object" ? Object.keys(parsed.paths).length : undefined,
        };
        break;
      }
    }
  }

  // --- robots.txt: agent policies ---
  const robotsUrl = `${root}/robots.txt`;
  const robotsRes = await httpGet(robotsUrl).catch(() => null);
  await sleep(REQUEST_GAP_MS);
  const robotsTxt = robotsRes?.ok ? robotsRes.body : null;
  const robots = { url: robotsUrl, found: !!robotsTxt, agents: parseAgentPolicies(robotsTxt).agents };

  // --- llms.txt (cosmetic — we report but never sell it) ---
  const llmsUrl = `${root}/llms.txt`;
  const llmsRes = await httpGet(llmsUrl).catch(() => null);
  await sleep(REQUEST_GAP_MS);
  const llmsTxt = { url: llmsUrl, found: !!(llmsRes?.ok && llmsRes.body && llmsRes.body.trim().length > 0) };

  // --- security.txt ---
  const secUrl = `${root}/.well-known/security.txt`;
  const secRes = await httpGet(secUrl).catch(() => null);
  await sleep(REQUEST_GAP_MS);
  const securityTxt = { url: secUrl, found: !!(secRes?.ok && secRes.body?.includes("Contact:")) };

  buildChecks({ checks, openapi, robots, llmsTxt, securityTxt });

  return { url: origin, openapi, robots, llmsTxt, securityTxt, checks };
}

function buildChecks(ctx: {
  checks: Check[];
  openapi: SurfaceProbeResult["openapi"];
  robots: SurfaceProbeResult["robots"];
  llmsTxt: SurfaceProbeResult["llmsTxt"];
  securityTxt: SurfaceProbeResult["securityTxt"];
}): void {
  const { checks, openapi, robots, llmsTxt, securityTxt } = ctx;

  checks.push({
    id: "openapi",
    label: "Maschinenlesbare API-Beschreibung (OpenAPI/Swagger)",
    status: openapi.url ? "pass" : "fail",
    detail: openapi.url
      ? `${openapi.url}${openapi.paths ? ` · ${openapi.paths} Pfade` : ""}${openapi.title ? ` · ${openapi.title}` : ""}`
      : "keine öffentliche Spec unter Standardpfaden gefunden",
  });

  const relevant = robots.agents.filter((a) => REPORTED_AGENTS.includes(a.agent));
  const blocked = relevant.filter((a) => a.policy === "blocked");
  const mentioned = relevant.filter((a) => a.policy !== "none");
  const agentFriendly = robots.found && blocked.length === 0;
  checks.push({
    id: "agent-crawlers",
    label: "Agent-Crawler-Politik (robots.txt)",
    status: !robots.found ? "warn" : blocked.length > 0 ? "fail" : "pass",
    detail: !robots.found
      ? "keine robots.txt: Anwortverhalten für Agenten undefiniert"
      : blocked.length > 0
        ? `blockiert: ${blocked.map((b) => b.agent).join(", ")}`
        : mentioned.length > 0
          ? `ausdrücklich erlaubt: ${mentioned.map((b) => b.agent).join(", ")}`
          : "robots.txt vorhanden, keine AI-Agent-Regeln (Default: erlaubt)",
  });

  checks.push({
    id: "llms-txt",
    label: "llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt)",
    status: llmsTxt.found ? "pass" : "info",
    detail: llmsTxt.found ? `${llmsTxt.url} vorhanden` : "nicht vorhanden (unkritisch)",
  });

  checks.push({
    id: "security-txt",
    label: "security.txt (Sicherheitskontakt)",
    status: securityTxt.found ? "pass" : "warn",
    detail: securityTxt.found ? securityTxt.url : "nicht vorhanden",
  });
}
