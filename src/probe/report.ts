// German markdown report generation: ranking + per-company details + methodology.

import type { CompanyReport } from "./types.ts";
import { scoreCompany, gradeOf } from "./score.ts";

export function renderRankingTable(companies: CompanyReport[]): string {
  const rows = companies
    .map((c) => {
      const s = scoreCompany(c);
      const mcpFlag = c.mcp?.reachable && c.mcp.toolCount > 0
        ? "✅ offen"
        : c.mcp?.reachable && c.mcp.auth.authRequired
          ? "🔒 OAuth"
          : "—";
      const openapi = c.surface.openapi.url ? "✅" : "—";
      const blocked = c.surface.robots.agents.some((a) => a.policy === "blocked") ? "🚫" : "";
      return `| ${c.name} | ${s.total}/100 (${gradeOf(s.total)}) | ${mcpFlag} | ${openapi} | ${blocked} |`;
    })
    .join("\n");
  return [
    "| Unternehmen | Score | MCP | OpenAPI | blockiert Agenten |",
    "|---|---|---|---|---|",
    rows,
  ].join("\n");
}

export function renderCompanySection(c: CompanyReport): string {
  const s = scoreCompany(c);
  const lines: string[] = [];
  lines.push(`### ${c.name} — ${s.total}/100 (Note ${gradeOf(s.total)})`);
  if (c.researchNote) lines.push(`\n**Recherche:** ${c.researchNote}`);
  if (c.officialMcp !== undefined) lines.push(`\n**Eigenes MCP-Angebot:** ${c.officialMcp}`);

  lines.push("\n**Dokumentations-Oberfläche:**\n");
  for (const check of c.surface.checks) {
    const icon = check.status === "pass" ? "✅" : check.status === "warn" ? "⚠️" : check.status === "fail" ? "❌" : "ℹ️";
    lines.push(`- ${icon} **${check.label}:** ${check.detail}`);
  }

  if (c.mcp) {
    lines.push("\n**MCP-Endpunkt** (" + c.mcp.url + "):\n");
    for (const check of c.mcp.checks) {
      const icon = check.status === "pass" ? "✅" : check.status === "warn" ? "⚠️" : check.status === "fail" ? "❌" : "ℹ️";
      lines.push(`- ${icon} **${check.label}:** ${check.detail}`);
    }
  }
  return lines.join("\n");
}

export function renderReport(opts: {
  title: string;
  intro: string;
  keyFindings?: string[];
  companies: CompanyReport[];
  methodology: string;
  cta: string;
  generatedAt: string;
}): string {
  const ranked = [...opts.companies].sort(
    (a, b) => scoreCompany(b).total - scoreCompany(a).total,
  );
  const best = scoreCompany(ranked[0]).total;
  const hasMcp = (c: CompanyReport) => !!c.mcp?.reachable && (c.mcp.toolCount > 0 || c.mcp.auth.authRequired);
  const withMcp = opts.companies.filter(hasMcp).length;
  const withOpenApi = opts.companies.filter((c) => c.surface.openapi.url).length;

  const findings = (opts.keyFindings?.length
    ? opts.keyFindings.map((f) => `- ${f}`).join("\n")
    : [
      `- **${withMcp} von ${opts.companies.length}** geprüften Unternehmen bieten einen MCP-Endpunkt an.`,
      `- **${withOpenApi} von ${opts.companies.length}** stellen eine maschinenlesbare OpenAPI-Beschreibung bereit.`,
      `- Der beste Score liegt bei **${best}/100**.`,
    ].join("\n"));

  return `# ${opts.title}

*Stand: ${opts.generatedAt} · Automatisiert getestet mit dem MCP-Live-Test von [mcpclinic.dev](https://mcpclinic.dev)*

${opts.intro}

## Kernbefunde

${findings}

## Ranking

${renderRankingTable(ranked)}

## Einzelergebnisse

${ranked.map(renderCompanySection).join("\n\n")}

## Methodik

${opts.methodology}

---

${opts.cta}
`;
}
