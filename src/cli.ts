// CLI: probe-mcp <url> | probe-surface <url> | rank <targets.json> <outDir>

import { probeMcpEndpoint } from "./probe/mcp.ts";
import { probeSurface } from "./probe/surface.ts";
import { probeWithDiscovery, deriveSiblingHosts } from "./probe/discovery.ts";
import { scoreCompany, gradeOf } from "./probe/score.ts";
import { renderReport } from "./probe/report.ts";
import type { CompanyReport } from "./probe/types.ts";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const [, , cmd, ...args] = process.argv;

async function main() {
  if (cmd === "probe-mcp") {
    const r = await probeMcpEndpoint(args[0]);
    console.log(JSON.stringify(r, null, 2));
    return;
  }
  if (cmd === "probe-surface") {
    const extra = args[1] ? JSON.parse(await readFile(args[1], "utf8")) : [];
    const r = await probeSurface(args[0], extra);
    console.log(JSON.stringify(r, null, 2));
    return;
  }
  if (cmd === "rank") {
    const targetsPath = args[0] ?? "report/targets.json";
    const outDir = args[1] ?? "report/out";
    const targets: {
      name: string;
      docsUrl: string;      // docs/marketing origin for surface probe
      openapiHints?: string[]; // extra spec paths to try
      mcpUrl?: string;      // known MCP endpoint, if any
      officialMcp?: string;
      researchNote?: string;
      apiHost?: string;
    }[] = JSON.parse(await readFile(targetsPath, "utf8"));

    const companies: CompanyReport[] = [];
    for (const t of targets) {
      process.stderr.write(`probing ${t.name} …\n`);
      // methodology: docs surface + spec-first widening over sibling dev hosts
      const surface = await probeWithDiscovery(t.docsUrl, t.openapiHints ?? []);
      let mcp;
      if (t.mcpUrl) {
        mcp = await probeMcpEndpoint(t.mcpUrl).catch(() => undefined);
      } else {
        // Methodology: no documented endpoint -> sniff sibling hosts
        // (mcp./api./docs./developers./developer. of the vendor domain).
        const hostname = new URL(t.docsUrl).hostname;
        const bare = hostname.replace(/^(www|docs|api|developers|developer|mcp)\./i, "");
        const tried = new Set([`${hostname}/mcp`]);
        for (const host of [`mcp.${bare}`, ...deriveSiblingHosts(hostname)]) {
          if (tried.size >= 5) break;
          const candidateUrl = `https://${host}/mcp`;
          const key = candidateUrl.replace(/^https:\/\//, "");
          if (tried.has(key)) continue;
          tried.add(key);
          try {
            mcp = await probeMcpEndpoint(candidateUrl);
          } catch {
            mcp = undefined;
          }
          if (mcp?.reachable) break;
          mcp = undefined;
        }
        if (!mcp?.reachable) mcp = undefined;
      }
      const company: CompanyReport = {
        name: t.name,
        surface,
        mcp,
        officialMcp: t.officialMcp,
        researchNote: t.researchNote,
        apiHost: t.apiHost,
        score: 0,
        grade: "F",
      };
      const s = scoreCompany(company);
      company.score = s.total;
      company.grade = gradeOf(s.total);
      companies.push(company);
    }

    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "results.json"), JSON.stringify(companies, null, 2));

    const md = renderReport({
      title: "Deutscher MCP-Report 2026",
      intro: "", // filled in the report template (report/REPORT-2026.de.md wrapper)
      companies,
      methodology: "",
      cta: "",
      generatedAt: new Date().toISOString().slice(0, 10),
    });
    await writeFile(join(outDir, "ranking.generated.md"), md);
    for (const c of companies) {
      process.stderr.write(`${c.name}: ${c.score}/100 (${c.grade})\n`);
    }
    return;
  }
  if (cmd === "render") {
    const resultsPath = args[0] ?? "report/out/results.json";
    const metaPath = args[1] ?? "report/meta.de.json";
    const outPath = args[2] ?? "report/REPORT-2026.de.md";
    const companies: CompanyReport[] = JSON.parse(await readFile(resultsPath, "utf8"));
    const meta = JSON.parse(await readFile(metaPath, "utf8"));
    const md = renderReport({
      title: meta.title,
      intro: meta.intro,
      keyFindings: meta.keyFindings,
      companies,
      methodology: meta.methodology,
      cta: meta.cta,
      generatedAt: meta.generatedAt ?? new Date().toISOString().slice(0, 10),
    });
    await writeFile(outPath, md, "utf8");
    process.stderr.write(`wrote ${outPath}\n`);
    return;
  }
  console.error(`usage:
  npm run probe-mcp -- <mcp-endpoint-url>
  npm run probe-surface -- <origin> [hints.json]
  npm run rank -- [targets.json] [outDir]
  npx tsx src/cli.ts render [results.json] [meta.json] [out.md]`);
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
