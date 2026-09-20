// Thin HTTP client for the client's upstream REST API.
// Per-client work = replacing baseUrl, auth header, and error mapping.

export class Upstream {
  constructor(
    private baseUrl: string,
    private token: string,
    private timeoutMs = 10_000,
  ) {}

  async request(method: string, path: string, body?: unknown): Promise<unknown> {
    const res = await fetch(this.baseUrl + path, {
      method,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.token}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // Map upstream errors to agent-readable messages — the LLM can only recover
      // from errors it understands. Never leak stack traces or internals.
      throw new Error(`upstream ${res.status} on ${method} ${path}: ${text.slice(0, 200)}`);
    }
    if (res.status === 204) return null;
    return res.json().catch(() => null);
  }
}
