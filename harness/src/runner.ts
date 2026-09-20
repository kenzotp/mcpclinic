// Task runner: model loop against a live MCP client. Every round is logged —
// the trace IS the audit evidence (Runbook Tag 1 protocol format).

import type { ModelClient, ToolSpec, Wire } from "./models.ts";

export interface McpLike {
  listTools(): Promise<ToolSpec[]>;
  callTool(name: string, args: Record<string, unknown>): Promise<{ text: string; isError: boolean }>;
}

export interface StepLog {
  round: number;
  tool: string;
  args: Record<string, unknown>;
  ok: boolean;
  error?: string;
  responsePreview: string;
  durationMs: number;
}

export interface TaskTrace {
  model: string;
  taskId: string;
  prompt: string;
  rounds: number;
  steps: StepLog[];
  finalText: string;
  outcome: "completed" | "max_rounds" | "error";
  error?: string;
  wallMs: number;
}

export async function runTask(
  mcp: McpLike,
  model: ModelClient,
  taskId: string,
  prompt: string,
  system: string,
  opts: { maxRounds?: number } = {},
): Promise<TaskTrace> {
  const maxRounds = opts.maxRounds ?? 8;
  const tools = await mcp.listTools();
  const wire: Wire[] = [{ role: "user", content: prompt }];
  const trace: TaskTrace = {
    model: model.id,
    taskId,
    prompt,
    rounds: 0,
    steps: [],
    finalText: "",
    outcome: "max_rounds",
    wallMs: 0,
  };
  const t0 = Date.now();

  try {
    for (let round = 1; round <= maxRounds; round++) {
      trace.rounds = round;
      const result = await model.chat(system, wire, tools);

      if (result.toolCalls.length > 0) {
        wire.push({ role: "assistant", content: result.text, toolCalls: result.toolCalls });
        for (const call of result.toolCalls) {
          const s0 = Date.now();
          let ok = false;
          let responsePreview = "";
          let error: string | undefined;
          try {
            const res = await mcp.callTool(call.name, call.args);
            ok = !res.isError;
            responsePreview = res.text.slice(0, 400);
            if (res.isError) error = res.text.slice(0, 300);
          } catch (err: any) {
            error = String(err?.message ?? err).slice(0, 300);
            responsePreview = error ?? "";
          }
          trace.steps.push({
            round,
            tool: call.name,
            args: call.args,
            ok,
            error,
            responsePreview,
            durationMs: Date.now() - s0,
          });
          wire.push({ role: "tool", toolCallId: call.id, content: responsePreview });
        }
        continue;
      }

      // no tool calls: final answer
      trace.finalText = result.text ?? "";
      trace.outcome = "completed";
      break;
    }
  } catch (err: any) {
    trace.outcome = "error";
    trace.error = String(err?.message ?? err).slice(0, 500);
  }
  trace.wallMs = Date.now() - t0;
  return trace;
}
