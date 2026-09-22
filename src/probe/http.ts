// Low-level HTTP helpers: polite, bounded, no dependencies.

export const USER_AGENT =
  "mcpclinic-live-test/0.1 (+https://mcpclinic.dev; agent-readiness probe)";

export interface HttpResult {
  status: number;
  headers: Headers;
  body: string | null; // text body (may be SSE stream content)
  contentType: string;
  ok: boolean;
}

export async function httpGet(
  url: string,
  opts: { headers?: Record<string, string>; timeoutMs?: number } = {},
): Promise<HttpResult> {
  const attempt = () =>
    fetch(url, {
      method: "GET",
      headers: { "user-agent": USER_AGENT, ...(opts.headers ?? {}) },
      redirect: "follow",
      signal: AbortSignal.timeout(opts.timeoutMs ?? 10_000),
    });
  // Single retry: spec hosts (raw.githubusercontent etc.) drop occasional requests.
  let res: Response;
  try {
    res = await attempt();
  } catch {
    await sleep(1_000);
    res = await attempt();
  }
  // Docs hosts (Readme.io etc.) answer request bursts with 429/503; one
  // backoff retry turns those from "check failed" into a real measurement.
  if ([429, 502, 503, 504].includes(res.status)) {
    const retryAfter = Number(res.headers.get("retry-after")) * 1000;
    await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter, 10_000) : 2_500);
    try {
      res = await attempt();
    } catch {
      // keep the original 429/50x response
    }
  }
  const contentType = res.headers.get("content-type") ?? "";
  const body = await res.text().catch(() => null);
  return { status: res.status, headers: res.headers, body, contentType, ok: res.ok };
}

export async function httpPost(
  url: string,
  body: unknown,
  opts: { headers?: Record<string, string>; timeoutMs?: number } = {},
): Promise<HttpResult> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "user-agent": USER_AGENT,
      "content-type": "application/json",
      ...(opts.headers ?? {}),
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
    redirect: "follow",
    signal: AbortSignal.timeout(opts.timeoutMs ?? 15_000),
  });
  const contentType = res.headers.get("content-type") ?? "";
  const bodyText = await res.text().catch(() => null);
  return { status: res.status, headers: res.headers, body: bodyText, contentType, ok: res.ok };
}

/** Extract JSON-RPC responses from a body that is either plain JSON or an SSE stream. */
export function extractJsonRpcMessages(res: HttpResult): any[] {
  if (!res.body) return [];
  const trimmed = res.body.trim();
  if (res.contentType.includes("text/event-stream") || trimmed.startsWith("event:") || trimmed.startsWith("data:")) {
    return parseSseData(trimmed);
  }
  try {
    const json = JSON.parse(trimmed);
    return Array.isArray(json) ? json : [json];
  } catch {
    return [];
  }
}

/** Minimal SSE parsing: returns the payload of every `data:` line/block. */
export function parseSseData(text: string): any[] {
  const messages: any[] = [];
  for (const block of text.split(/\r?\n\r?\n/)) {
    const dataLines = block
      .split(/\r?\n/)
      .filter((l) => l.startsWith("data:"))
      .map((l) => l.slice(5).trimStart());
    if (dataLines.length === 0) continue;
    const payload = dataLines.join("\n");
    try {
      messages.push(JSON.parse(payload));
    } catch {
      // non-JSON data line (comments etc.) — ignore
    }
  }
  return messages;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Politeness gap between requests to the same host. */
export const REQUEST_GAP_MS = 400;
