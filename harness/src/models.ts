// Model clients for the audit harness. Two wire formats cover every provider we
// are allowed to use (Mika ruling 2026-09-20: OpenAI, Claude, GLM, OpenRouter —
// Groq OFF LIMITS): OpenAI-compatible chat/completions and the Anthropic
// messages API. Keys come from env only — never files.

export interface ToolSpec {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface ModelToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
  rawArgs: string;
}

/** Conversation pieces, provider-neutral. */
export type Wire =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string | null; toolCalls?: ModelToolCall[] }
  | { role: "tool"; toolCallId: string; content: string };

export interface ModelResult {
  text: string | null;
  toolCalls: ModelToolCall[];
}

export interface ModelClient {
  id: string;
  chat(system: string, wire: Wire[], tools: ToolSpec[]): Promise<ModelResult>;
}

async function postJson(url: string, apiKey: string, body: unknown, extraHeaders: Record<string, string> = {}): Promise<any> {
  const attempt = () =>
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}`, ...extraHeaders },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(90_000),
    });
  let res = await attempt();
  // Shared keys hit tokens-per-minute limits; a 429 is worth one patient retry.
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 20_000));
    res = await attempt();
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`model api ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

/** OpenAI-compatible /chat/completions with function tools (OpenAI, OpenRouter, vLLM, …). */
export function openAiCompatible(opts: {
  id: string;
  baseUrl: string; // e.g. https://api.openai.com/v1 (no trailing slash)
  apiKeyEnv: string;
  model: string;
}): ModelClient {
  return {
    id: opts.id,
    async chat(system, wire, tools) {
      const apiKey = process.env[opts.apiKeyEnv];
      if (!apiKey) throw new Error(`missing env ${opts.apiKeyEnv}`);
      const messages: any[] = [{ role: "system", content: system }];
      for (const m of wire) {
        if (m.role === "user") messages.push({ role: "user", content: m.content });
        else if (m.role === "tool") messages.push({ role: "tool", tool_call_id: m.toolCallId, content: m.content });
        else
          messages.push({
            role: "assistant",
            content: m.content,
            ...(m.toolCalls?.length
              ? {
                  tool_calls: m.toolCalls.map((c) => ({
                    id: c.id,
                    type: "function",
                    function: { name: c.name, arguments: c.rawArgs },
                  })),
                }
              : {}),
          });
      }
      const data = await postJson(`${opts.baseUrl}/chat/completions`, apiKey, {
        model: opts.model,
        messages,
        tools: tools.map((t) => ({
          type: "function",
          function: { name: t.name, description: t.description, parameters: t.inputSchema },
        })),
        temperature: 0,
      });
      const msg = data.choices?.[0]?.message ?? {};
      const calls = (msg.tool_calls ?? []).map((c: any, i: number) => ({
        id: c.id ?? `call_${i}`,
        name: c.function?.name ?? "?",
        args: safeJson(c.function?.arguments ?? "{}"),
        rawArgs: String(c.function?.arguments ?? "{}"),
      }));
      return { text: msg.content ?? null, toolCalls: calls };
    },
  };
}

function safeJson(s: string): Record<string, unknown> {
  try {
    const v = JSON.parse(s);
    return typeof v === "object" && v !== null ? v : {};
  } catch {
    return {};
  }
}

/** Anthropic messages API (Claude — and GLM via Z.ai's Anthropic-compatible endpoint). */
export function anthropic(opts: {
  id: string;
  apiKeyEnv: string;
  model: string;
  version?: string;
  baseUrl?: string;
}): ModelClient {
  const base = opts.baseUrl ?? "https://api.anthropic.com";
  return {
    id: opts.id,
    async chat(system, wire, tools) {
      const apiKey = process.env[opts.apiKeyEnv];
      if (!apiKey) throw new Error(`missing env ${opts.apiKeyEnv}`);
      const messages: any[] = [];
      for (const m of wire) {
        if (m.role === "user") messages.push({ role: "user", content: m.content });
        else if (m.role === "tool")
          messages.push({ role: "user", content: [{ type: "tool_result", tool_use_id: m.toolCallId, content: m.content }] });
        else {
          const blocks: any[] = [];
          if (m.content) blocks.push({ type: "text", text: m.content });
          for (const c of m.toolCalls ?? [])
            blocks.push({ type: "tool_use", id: c.id, name: c.name, input: c.args });
          if (blocks.length) messages.push({ role: "assistant", content: blocks });
        }
      }
      const data = await postJson(
        `${base}/v1/messages`,
        apiKey,
        {
          model: opts.model,
          max_tokens: 1024,
          system,
          messages,
          tools: tools.map((t) => ({ name: t.name, description: t.description, input_schema: t.inputSchema })),
          temperature: 0,
        },
        { "anthropic-version": opts.version ?? "2023-06-01" },
      );
      const calls: ModelToolCall[] = [];
      let text: string | null = null;
      for (const block of data.content ?? []) {
        if (block.type === "text") text = (text ? text + "\n" : "") + block.text;
        if (block.type === "tool_use")
          calls.push({ id: block.id, name: block.name, args: block.input ?? {}, rawArgs: JSON.stringify(block.input ?? {}) });
      }
      return { text, toolCalls: calls };
    },
  };
}

/** Registry from a --models string like "claude:claude-sonnet-4-5,openai:gpt-5,glm:glm-5.3,openrouter:vendor/model".
 *  Allowed providers (Mika ruling 2026-09-20): OpenAI, Claude, GLM, OpenRouter. Groq is OFF LIMITS. */
export function buildClients(spec: string): ModelClient[] {
  const clients: ModelClient[] = [];
  for (const part of spec.split(",").map((s) => s.trim()).filter(Boolean)) {
    const [kind, model] = part.split(":");
    if (kind === "openai")
      clients.push(openAiCompatible({ id: `openai/${model}`, baseUrl: "https://api.openai.com/v1", apiKeyEnv: "OPENAI_API_KEY", model }));
    else if (kind === "openrouter")
      clients.push(openAiCompatible({ id: `openrouter/${model}`, baseUrl: "https://openrouter.ai/api/v1", apiKeyEnv: "OPENROUTER_API_KEY", model }));
    else if (kind === "claude")
      clients.push(anthropic({ id: `claude/${model}`, apiKeyEnv: "ANTHROPIC_API_KEY", model }));
    else if (kind === "glm")
      // Z.ai's Anthropic-compatible endpoint; thinking defaults ON server-side.
      clients.push(anthropic({ id: `glm/${model}`, apiKeyEnv: "GLM_API_KEY", model, baseUrl: "https://api.z.ai/api/anthropic" }));
    else throw new Error(`unknown model kind '${kind}' (allowed: openai:MODEL, claude:MODEL, glm:MODEL, openrouter:MODEL)`);
  }
  return clients;
}
