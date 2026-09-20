// Bearer-token auth with per-token tenant + scopes.
// Tokens come from env MCP_BASIS_TOKENS (JSON) — swap for the client's real
// identity provider (OAuth resource server) without touching tool code.

export interface Principal {
  token: string;
  tenant: string;
  scopes: string[];
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function parseTokens(json: string): Map<string, Principal> {
  const map = new Map<string, Principal>();
  const raw = JSON.parse(json) as Record<string, { tenant: string; scopes: string[] }>;
  for (const [token, spec] of Object.entries(raw)) {
    map.set(token, { token, tenant: spec.tenant, scopes: spec.scopes });
  }
  return map;
}

export function authenticate(tokens: Map<string, Principal>, header: string | undefined): Principal {
  if (!header) throw new AuthError("missing Authorization header");
  const m = header.match(/^Bearer\s+(.+)$/i);
  const token = m?.[1];
  if (!token) throw new AuthError("expected Bearer token");
  const principal = tokens.get(token);
  if (!principal) throw new AuthError("unknown token");
  return principal;
}

export function requireScope(principal: Principal, scope: string): void {
  if (!principal.scopes.includes(scope)) {
    throw new Error(`token lacks required scope '${scope}'`);
  }
}
