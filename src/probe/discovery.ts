// Host discovery: visitors and target lists point at one docs host, but specs
// and API signals live on whatever dev-facing host the vendor happens to run
// (docs./api./developers./developer.). Spec-first widening: scan the
// candidates cheaply, fully probe only the first spec-bearing one.

import { probeOpenapi, probeSurface } from "./surface.ts";
import { assertPublicHost } from "./ssrf.ts";
import type { Check, SurfaceProbeResult } from "./types.ts";

const DEV_PREFIXES = ["docs", "api", "developers", "developer"];

/** Sibling dev-facing hosts of a vendor domain; empty for specific deep hosts and IPs. */
export function deriveSiblingHosts(hostname: string): string[] {
  const base = hostname.replace(/^(www|docs|api|developers|developer)\./i, "");
  const labels = base.split(".");
  if (labels.length !== 2) return [];
  if (labels.some((l) => /^\d+$/.test(l))) return []; // IP literal
  const host = (p: string) => `${p}.${base}`;
  if (hostname.toLowerCase() === base) return DEV_PREFIXES.map(host); // apex entered
  return DEV_PREFIXES.map(host).filter((h) => h !== hostname.toLowerCase());
}

export interface DiscoveryResult {
  /** Primary surface, merged with found-over-missing signals from siblings. */
  surface: SurfaceProbeResult;
}

/**
 * Primary docs surface; when it has no machine-readable spec, scan sibling
 * dev hosts for one and fully probe the first spec-bearing host. Merged
 * findings appear as labeled checks naming their host.
 */
export async function probeWithDiscovery(
  origin: string,
  extraPaths: string[] = [],
): Promise<SurfaceProbeResult> {
  const surface = await probeSurface(origin, extraPaths);
  if (surface.openapi.url) return surface;

  const merged: SurfaceProbeResult = { ...surface };
  const altChecks: Check[] = [];
  const hostname = new URL(origin).hostname;
  for (const alt of deriveSiblingHosts(hostname)) {
    const altOrigin = `https://${alt}`;
    try {
      await assertPublicHost(altOrigin);
    } catch {
      continue;
    }
    const altSpec = await probeOpenapi(altOrigin);
    if (!altSpec.url) continue;
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
    break;
  }
  merged.checks = [...surface.checks, ...altChecks];
  return merged;
}
