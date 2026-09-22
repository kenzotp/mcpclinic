import { readFile, writeFile } from "node:fs/promises";
import { probeWithDiscovery } from "./src/probe/discovery.ts";
import { probeMcpEndpoint } from "./src/probe/mcp.ts";
import { scoreCompany, gradeOf } from "./src/probe/score.ts";
import type { CompanyReport } from "./src/probe/types.ts";

const targetsPath = "report/targets.json";
const targets = JSON.parse(await readFile(targetsPath, "utf8")) as {
  name: string;
  docsUrl: string;
  openapiHints?: string[];
  mcpUrl?: string;
  officialMcp?: string;
  researchNote?: string;
}[];

// research + targets update: mcp.clockodo.com/mcp discovered via /test sibling
// sniffing on 2026-09-22 (own subdomain, OAuth-protected, reachable)
const t = targets.find((x) => x.name === "Clockodo");
if (!t) throw new Error("Clockodo target missing");
t.mcpUrl = "https://mcp.clockodo.com/mcp";
t.officialMcp = "ja (mcp.clockodo.com, discovered 2026-09-22)";
await writeFile(targetsPath, JSON.stringify(targets, null, 2) + "\n");

const resultsPath = "report/out/results.json";
const companies: CompanyReport[] = JSON.parse(await readFile(resultsPath, "utf8"));
const entry = companies.find((c) => c.name === "Clockodo");
if (!entry) throw new Error("Clockodo result missing");

const surface = await probeWithDiscovery(t.docsUrl, t.openapiHints ?? []);
const mcp = await probeMcpEndpoint(t.mcpUrl).catch(() => undefined);
entry.surface = surface;
entry.mcp = mcp;
const s = scoreCompany(entry);
entry.score = s.total;
entry.grade = gradeOf(s.total);
console.log(
  "Clockodo ->",
  entry.score,
  entry.grade,
  "| mcp reachable:", mcp?.reachable,
  "| transport:", mcp?.transport ?? "(unclear)",
  "| tools:", mcp?.toolCount,
  "| card:", mcp?.card?.present,
  "| authRequired:", mcp?.auth?.authRequired,
  "| resourceMetadata:", mcp?.auth?.resourceMetadataUrl ?? "(none)",
);
await writeFile(resultsPath, JSON.stringify(companies, null, 2));
console.log("results.json updated");
