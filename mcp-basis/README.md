# mcp-basis — production base for MCP servers

MCP Clinic's template for an MCP server in front of a client's REST API.
Scope: **one API, up to ~20 tools.** Per-client work is configuration; the
safety skeleton below ships in every build.

## What's in the box

| Concern | Implementation |
|---|---|
| Auth | Bearer tokens → `{tenant, scopes}`; swap `src/auth.ts` for the client's IdP (OAuth 2.1 resource server) without touching tools |
| Tenant isolation | Upstream paths are prefixed `/tenants/{principal.tenant}` — cross-tenant access is impossible by construction |
| Scope-filtered tools | Tools only exist for principals holding the required scope (`listTools` never shows what a token can't use) |
| Idempotent writes | `idempotencyKey` on create: same key+payload replays the stored result, same key+different payload is rejected |
| Destructive actions | `confirm: true` required in addition to the write scope; annotations mark the tool `destructiveHint` |
| Audit log | JSONL line per call (tenant, tool, field names only — never raw arg values) |
| RFC 9728 | Serves `/.well-known/oauth-protected-resource/mcp` and a `WWW-Authenticate` with `resource_metadata` on 401 — passes our own live-test probe |
| Tool descriptions | Written for LLM tool-selection: task phrased, parameters with formats, return shape, error behavior |

## Run the demo

```bash
npm install
npm run upstream &        # fake CRM REST API with per-tenant data, :8091
npm start                 # mcp-basis on :8090/mcp
```

Demo tokens (override with `MCP_BASIS_TOKENS` as JSON):

- `demo_read` — tenant `acme`, `contacts.read`
- `demo_write` — tenant `acme`, `contacts.read contacts.write`
- `demo_other` — tenant `globex`, both scopes

Try it:

```bash
curl -s http://127.0.0.1:8090/mcp -X POST \
  -H "authorization: Bearer demo_read" -H "content-type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"curl","version":"0"}}}'
```

## Tests

```bash
npm test
```

Five end-to-end tests (real SDK client against the real HTTP server):
401 + `WWW-Authenticate` shape, protected-resource metadata, scope-filtered
tool visibility, idempotency replay/conflict, tenant isolation, destructive
confirm gate.

## Configure for a client

1. `src/upstream.ts` — set base URL, auth header, error mapping.
2. `src/index.ts` — replace the demo tools with the client's ~20 tools; keep the `track()` audit wrapper.
3. Replace `MCP_BASIS_TOKENS` env source with the client's IdP (client-credentials or code flow); update `PROTECTED_RESOURCE`.
4. Set `AUDIT_LOG` to a persistent path / SIEM sink.

## Docker

```bash
docker build -t mcp-basis .
docker run -p 8090:8090 \
  -e MCP_BASIS_TOKENS='{"tok":{"tenant":"acme","scopes":["contacts.read"]}}' \
  -e UPSTREAM_BASE_URL=https://client-api.example \
  -e UPSTREAM_TOKEN=... \
  mcp-basis
```

Unofficial template by [MCP Clinic](https://mcpclinic.dev) — scoped, audited
MCP endpoints for German B2B SaaS.
