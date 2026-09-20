// Thin HTTP client for the client's upstream REST API.
// Per-client work = replacing baseUrl, auth header, and error mapping.
//
// Path safety: callUpstream() takes path SEGMENTS, not strings. Every segment is
// encodeURIComponent-ed here — tool arguments can never change the host,
// escape the path, or add query strings. There is no string-concatenation
// path into the URL anywhere. On top of that, an explicit origin allowlist
// (UPSTREAM_ALLOWED_ORIGINS, default: the configured base origin) is enforced
// on every call — defense in depth against SSRF.

export class Upstream {
  private allowedOrigins: Set<string>;

  constructor(
    private baseUrl: string,
    private token: string,
    private timeoutMs = 10_000,
    allowedOrigins?: string[],
  ) {
    this.allowedOrigins = new Set(allowedOrigins ?? [new URL(baseUrl).origin]);
  }

  /** Visible for tests: the exact URL a request would hit. */
  buildUrl(segments: string[], query: Record<string, string> = {}): URL {
    if (segments.some((s) => s === "" || s === "." || s === "..")) {
      throw new Error("invalid path segment");
    }
    const base = new URL(this.baseUrl);
    // "/" must become "" — a leading double slash would make the URL protocol-relative
    // and silently change the origin (off-origin request).
    const path = base.pathname;
    const root = path === "/" ? "" : path.endsWith("/") ? path.slice(0, -1) : path;
    const url = new URL(root + "/" + segments.map(encodeURIComponent).join("/"), base);
    for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
    return url;
  }

  async callUpstream(method: string, segments: string[], body?: unknown, query: Record<string, string> = {}): Promise<unknown> {
    const url = this.buildUrl(segments, query);
    if (!this.allowedOrigins.has(url.origin)) {
      throw new Error(`upstream origin not allowed: ${url.origin}`);
    }

    const res = await fetch(url, {
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
      throw new Error(`upstream ${res.status} on ${method} /${segments.join("/")}: ${text.slice(0, 200)}`);
    }
    if (res.status === 204) return null;
    return res.json().catch(() => null);
  }
}
