import { NextRequest, NextResponse } from "next/server";
import { probeSurface, deriveAlternateHosts } from "@/probe/surface";
import { probeMcpEndpoint } from "@/probe/mcp";
import { assertPublicHost } from "@/probe/ssrf";
import { httpGet } from "@/probe/http";
import { scoreCompany, gradeOf } from "@/probe/score";
import type { CompanyReport, Check } from "@/probe/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// v1 rate limit: 3 tests per IP per day, in-memory (single hub instance).
const hits = new Map<string, { day: string; n: number }>();
const LIMIT = 3;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function err(status: number, code: string, message: string) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

export async function POST(req: NextRequest) {
  let url: string;
  try {
    const body = await req.json();
    url = String(body.url ?? "").trim();
  } catch {
    return err(400, "bad_request", "Ungültige Anfrage.");
  }
  if (!url) return err(400, "missing_url", "Keine URL angegeben.");
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

  // SSRF guard: refuse private/reserved hosts before any fetch leaves the box.
  try {
    await assertPublicHost(url);
  } catch (e) {
    return err(400, "invalid_target", e instanceof Error ? e.message : "Ungültige URL.");
  }

  const ip = clientIp(req);
  const day = today();
  const rec = hits.get(ip);
  if (!rec || rec.day !== day) hits.set(ip, { day, n: 1 });
  else if (rec.n >= LIMIT) {
    return err(429, "rate_limited", "Limit erreicht: 3 Tests pro Tag und IP-Adresse.");
  } else rec.n += 1;

  try {
    const isMcp = /\/mcp(\/|$)/i.test(new URL(url).pathname);
    if (isMcp) {
      const mcp = await probeMcpEndpoint(url);
      const origin = new URL(url).origin;
      const surface = await probeSurface(origin);
      const report: CompanyReport = { name: url, surface, mcp, score: 0, grade: "F" };
      const s = scoreCompany(report);
      return NextResponse.json({
        ok: true,
        kind: "mcp",
        target: url,
        score: s.total,
        grade: gradeOf(s.total),
        checks: mcp.checks,
        surfaceChecks: surface.checks,
      });
    }
    const surface = await probeSurface(url);
    // Homepage entries miss docs./api. hosts where specs and API signals live:
    // widen the net, merge best-signal into the scored surface, show the source.
    const merged: typeof surface = { ...surface };
    const altChecks: Check[] = [];
    for (const alt of deriveAlternateHosts(new URL(url).hostname)) {
      const altOrigin = `https://${alt}`;
      try {
        await assertPublicHost(altOrigin);
      } catch {
        continue;
      }
      const alive = await httpGet(`${altOrigin}/robots.txt`, { timeoutMs: 4000 }).catch(() => null);
      if (!alive) continue;
      const altSurface = await probeSurface(altOrigin);
      if (!merged.openapi.url && altSurface.openapi.url) {
        merged.openapi = altSurface.openapi;
        altChecks.push({
          id: `alt-openapi-${alt}`,
          label: `API-Spec gefunden (${alt})`,
          status: "pass",
          detail: `${altSurface.openapi.url}${altSurface.openapi.paths ? ` · ${altSurface.openapi.paths} Pfade` : ""}`,
        });
      }
      if (!merged.securityTxt.found && altSurface.securityTxt.found) {
        merged.securityTxt = altSurface.securityTxt;
        altChecks.push({ id: `alt-security-${alt}`, label: `security.txt gefunden (${alt})`, status: "pass", detail: altSurface.securityTxt.url ?? "" });
      }
      if (!merged.llmsTxt.found && altSurface.llmsTxt.found) {
        merged.llmsTxt = altSurface.llmsTxt;
        altChecks.push({ id: `alt-llms-${alt}`, label: `llms.txt gefunden (${alt})`, status: "pass", detail: altSurface.llmsTxt.url ?? "" });
      }
    }
    const report: CompanyReport = { name: url, surface: merged, score: 0, grade: "F" };
    const s = scoreCompany(report);
    return NextResponse.json({
      ok: true,
      kind: "surface",
      target: url,
      score: s.total,
      grade: gradeOf(s.total),
      checks: [...surface.checks, ...altChecks],
    });
  } catch (e) {
    return err(502, "probe_failed", e instanceof Error ? e.message : "Prüfung fehlgeschlagen.");
  }
}
