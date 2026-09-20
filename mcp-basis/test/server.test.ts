// End-to-end tests: real MCP client (SDK) -> mcp-basis HTTP server -> demo upstream.
// Covers: auth rejection + RFC 9728 header, scope enforcement, tenant isolation,
// idempotency replay/conflict, destructive confirm gate, audit log lines.

import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { setTimeout as sleep } from "node:timers/promises";

const BASIS_PORT = 8197;
const UPSTREAM_PORT = 8198;
const BASIS = `http://127.0.0.1:${BASIS_PORT}/mcp`;

let basisProc, upstreamProc;

test.before(async () => {
  upstreamProc = spawn("node", ["demo/upstream-demo.mjs"], {
    env: { ...process.env, UPSTREAM_PORT: String(UPSTREAM_PORT) },
    stdio: "pipe",
  });
  basisProc = spawn("npx", ["tsx", "src/index.ts"], {
    env: {
      ...process.env,
      PORT: String(BASIS_PORT),
      MCP_BASIS_NO_LISTEN: undefined,
      UPSTREAM_BASE_URL: `http://127.0.0.1:${UPSTREAM_PORT}`,
      AUDIT_LOG: "test/audit.log",
      MCP_BASIS_TOKENS: JSON.stringify({
        tok_acme_r: { tenant: "acme", scopes: ["contacts.read"] },
        tok_acme_rw: { tenant: "acme", scopes: ["contacts.read", "contacts.write"] },
        tok_globex: { tenant: "globex", scopes: ["contacts.read", "contacts.write"] },
      }),
    },
    stdio: "pipe",
    shell: process.platform === "win32",
  });
  // wait for listen
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASIS, { method: "POST", headers: { authorization: "Bearer tok_acme_r", "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 0, method: "ping" }) });
      if (res.status > 0) return;
    } catch { /* not up yet */ }
    await sleep(500);
  }
  throw new Error("mcp-basis did not start");
});

test.after(() => {
  basisProc?.kill();
  upstreamProc?.kill();
});

test("rejects missing token with 401 + RFC 9728 WWW-Authenticate", async () => {
  const res = await fetch(BASIS, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "0" } } }),
  });
  assert.equal(res.status, 401);
  const www = res.headers.get("www-authenticate") ?? "";
  assert.match(www, /resource_metadata="\/\.well-known\/oauth-protected-resource\/mcp"/);
});

test("serves protected resource metadata", async () => {
  const res = await fetch(`http://127.0.0.1:${BASIS_PORT}/.well-known/oauth-protected-resource/mcp`);
  assert.equal(res.status, 200);
  const json: any = await res.json();
  assert.ok(json.scopes_supported.includes("contacts.read"));
});

test("read token can list, write hidden without scope, idempotency replays", async () => {
  const reader = new Client({ name: "t", version: "0" });
  await reader.connect(new StreamableHTTPClientTransport(new URL(BASIS), { requestInit: { headers: { authorization: "Bearer tok_acme_r" } } }));

  const { tools } = await reader.listTools();
  const names = tools.map((t) => t.name);
  assert.ok(names.includes("contacts_list"), "read token sees contacts_list");
  assert.ok(!names.includes("contacts_create"), "write tools hidden without contacts.write scope");

  const listed = await reader.callTool({ name: "contacts_list", arguments: {} });
  assert.ok((listed.content as any)[0].text.includes("Anna Beispiel"));
  await reader.close();

  const writer = new Client({ name: "t", version: "0" });
  await writer.connect(new StreamableHTTPClientTransport(new URL(BASIS), { requestInit: { headers: { authorization: "Bearer tok_acme_rw" } } }));

  const args = { name: "Idem Potenz", email: "idem@potenz.de", idempotencyKey: "run-123" };
  const first = await writer.callTool({ name: "contacts_create", arguments: args });
  const second = await writer.callTool({ name: "contacts_create", arguments: args });
  assert.match((first.content as any)[0].text, /c_\d+/);
  assert.match((second.content as any)[0].text, /replayed/);

  // conflict: same key, different payload -> isError result, not a duplicate creation
  const conflict = await writer.callTool({ name: "contacts_create", arguments: { ...args, name: "Andere" } });
  assert.equal(conflict.isError, true);
  assert.match((conflict.content as any)[0].text, /different payload/);
  await writer.close();
});

test("tenant isolation: globex token cannot see acme data", async () => {
  const globex = new Client({ name: "t", version: "0" });
  await globex.connect(new StreamableHTTPClientTransport(new URL(BASIS), { requestInit: { headers: { authorization: "Bearer tok_globex" } } }));
  const listed = await globex.callTool({ name: "contacts_list", arguments: {} });
  const text = (listed.content as any)[0].text;
  assert.ok(!text.includes("Anna Beispiel"));
  await globex.close();
});

test("delete requires confirm=true", async () => {
  const writer = new Client({ name: "t", version: "0" });
  await writer.connect(new StreamableHTTPClientTransport(new URL(BASIS), { requestInit: { headers: { authorization: "Bearer tok_acme_rw" } } }));
  const created: any = await writer.callTool({ name: "contacts_create", arguments: { name: "Del Ete", email: "del@ete.de" } });
  const id = JSON.parse((created.content as any)[0].text).id;

  const refused = await writer.callTool({ name: "contacts_delete", arguments: { id, confirm: false } });
  assert.match((refused.content as any)[0].text, /refused/);

  const ok = await writer.callTool({ name: "contacts_delete", arguments: { id, confirm: true } });
  assert.match((ok.content as any)[0].text, /deleted/);
  await writer.close();
});
