// Scoring: 0..100 across four buckets.
// 40 pts are reserved for an MCP offer — which (as of Sept 2026) no German B2B SaaS
// in our prospect list achieves. The gap IS the story; be honest about it in reports.

import type { CompanyReport, ScoreBreakdown } from "./types.ts";

export function scoreCompany(r: CompanyReport): ScoreBreakdown {
  // --- MCP offer: 40 ---
  let mcp = 0;
  const m = r.mcp;
  if (m?.reachable && m.transport) mcp += 15;           // handshake works over a real transport
  if (m && m.toolCount > 0) mcp += 10;                   // tools actually listable
  if (m?.supportedVersions?.includes("2026-07-28")) mcp += 5; // current spec
  if (m?.card.present) mcp += 10;                        // server card

  // --- auth & safety signals: 25 ---
  let auth = 0;
  if (m) {
    if (m.auth.authRequired) auth += 10;                 // endpoint protected
    else if (m.toolCount > 0) auth += 0;                 // open server: no points
    if (m.auth.resourceMetadataUrl) auth += 10;          // RFC 9728 discovery
    if (m.auth.authorizationServers?.length && m.auth.asMetadataFound) auth += 0; // (already covered)
    if (m.auth.authRequired || m.toolCount === 0) auth += 5; // no unauthenticated write surface
    else if (m.writeToolCount === 0) auth += 5;          // open but read-only
  } else if (r.surface) {
    // no MCP at all: docs-layer security signals only
    if (r.surface.securityTxt.found) auth += 5;
  }

  // --- docs machine-readability: 20 ---
  let docs = 0;
  if (r.surface) {
    if (r.surface.openapi.url) docs += 10;
    const anyAiRules = r.surface.robots.agents.some((a) => a.policy !== "none");
    if (anyAiRules) docs += 5; else docs += 2;           // defined policy beats silence, silence beats blocking
    if (r.surface.robots.agents.some((a) => a.policy === "blocked")) docs -= 5;
    if (r.surface.securityTxt.found) docs += 2;
    if (r.surface.llmsTxt.found) docs += 3;              // cosmetic, as agreed
  }
  docs = Math.max(0, docs);

  // --- tool description quality: 15 ---
  const descriptions = m && m.toolCount > 0
    ? Math.round((m.tools.reduce((s, t) => s + t.quality, 0) / m.toolCount) * 15)
    : 0;

  const total = Math.max(0, Math.min(100, mcp + auth + docs + descriptions));
  return { mcp, auth, docs, descriptions, total };
}

export function gradeOf(total: number): string {
  if (total >= 80) return "A";
  if (total >= 65) return "B";
  if (total >= 45) return "C";
  if (total >= 25) return "D";
  return "F";
}
