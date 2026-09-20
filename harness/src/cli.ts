// CLI: npm run harness -- --endpoint URL --token TOK --models groq:model[,claude:model] [--tasks T01,T04] [--out findings/]

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { buildClients, type ToolSpec } from "./models.ts";
import { runTask, type McpLike, type TaskTrace } from "./runner.ts";
import { standardTasks, DEFAULT_SYSTEM } from "./tasks.ts";
import { readFile, writeFile, mkdir } from "node:fs/promises";

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : fallback;
}

async function main() {
  const endpoint = arg("endpoint");
  const token = arg("token") ?? process.env.HARNESS_TOKEN;
  const modelsSpec = arg("models") ?? "groq:qwen/qwen3-32b";
  const outDir = arg("out") ?? "findings";
  const only = arg("tasks")?.split(",").map((s) => s.trim());
  const fixturePath = arg("fixtures");
  const system = arg("system") ?? DEFAULT_SYSTEM;

  if (!endpoint || !token) {
    console.error(`usage: npm run harness -- --endpoint <url> --token <bearer> \\
  [--models groq:MODEL,claude:MODEL,openai:MODEL] [--tasks T01,...] [--fixtures fixtures.json] [--out dir] [--system "..."]`);
    process.exit(1);
  }

  const fixture: Record<string, string> = fixturePath
    ? JSON.parse(await readFile(fixturePath, "utf8"))
    : {};
  const tasks = standardTasks(fixture).filter((t) => !only || only.includes(t.id));

  // one shared MCP connection, authenticated as the audit's test user
  const client = new Client({ name: "mcpclinic-harness", version: "0.1.0" });
  await client.connect(
    new StreamableHTTPClientTransport(new URL(endpoint), {
      requestInit: { headers: { authorization: `Bearer ${token}` } },
    }),
  );
  const mcp: McpLike = {
    listTools: async () => {
      const { tools } = await client.listTools();
      return tools.map((t) => ({
        name: t.name,
        description: t.description ?? "",
        inputSchema: (t.inputSchema ?? {}) as ToolSpec["inputSchema"],
      }));
    },
    callTool: async (name, args) => {
      const res: any = await client.callTool({ name, arguments: args });
      const text = (res.content ?? []).map((c: any) => c.text ?? "").join("\n");
      return { text: String(text), isError: !!res.isError };
    },
  };

  const clients = buildClients(modelsSpec);
  const traces: TaskTrace[] = [];
  for (const model of clients) {
    for (const task of tasks.filter((t) => t.writes === false || arg("allow-writes") === "1")) {
      process.stderr.write(`▶ ${model.id} · ${task.id}\n`);
      traces.push(await runTask(mcp, model, task.id, task.prompt, system));
    }
  }
  await client.close();

  await mkdir(outDir, { recursive: true });
  await writeFile(`${outDir}/traces.json`, JSON.stringify(traces, null, 2));
  await writeFile(`${outDir}/summary.csv`, toCsv(traces));
  const md = toMarkdown(traces);
  await writeFile(`${outDir}/summary.md`, md);
  process.stdout.write(md);
}

function toCsv(traces: TaskTrace[]): string {
  const rows = ["model,taskId,rounds,steps,toolsUsed,errors,outcome,wallMs"];
  for (const t of traces) {
    const tools = t.steps.map((s) => s.tool).join("|");
    const errs = t.steps.filter((s) => !s.ok).length;
    rows.push(
      [t.model, t.taskId, t.rounds, t.steps.length, tools, errs, t.outcome, t.wallMs]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
  }
  return rows.join("\n");
}

function toMarkdown(traces: TaskTrace[]): string {
  const lines = ["# Agent-Flow-Test — Zusammenfassung", ""];
  for (const t of traces) {
    lines.push(`## ${t.taskId} — ${t.model}`);
    lines.push(`- Runden: ${t.rounds} · Schritte: ${t.steps.length} · Ergebnis: ${t.outcome} · ${t.wallMs} ms`);
    for (const s of t.steps) {
      lines.push(`  - R${s.round} \`${s.tool}\` ${s.ok ? "✅" : "❌"} ${s.error ? `→ ${s.error}` : ""}`);
      lines.push(`    - args: \`${JSON.stringify(s.args).slice(0, 200)}\``);
    }
    lines.push(`- Antwort: ${t.finalText.slice(0, 300) || "—"}`);
    lines.push("");
  }
  return lines.join("\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
