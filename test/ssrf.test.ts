import { test } from "node:test";
import assert from "node:assert/strict";
import { assertPublicHost } from "../src/probe/ssrf.ts";

test("ssrf guard blocks private targets, allows public", async () => {
  await assert.rejects(() => assertPublicHost("http://localhost:8091/mcp"), /privat/);
  await assert.rejects(() => assertPublicHost("http://127.0.0.1:3000"), /privat/);
  await assert.rejects(() => assertPublicHost("http://192.168.0.72:3000"), /privat/);
  await assert.rejects(() => assertPublicHost("http://10.0.0.1/"), /privat/);
  await assert.rejects(() => assertPublicHost("http://169.254.169.254/latest/meta-data"), /privat/);
  await assert.rejects(() => assertPublicHost("file:///etc/passwd"), /Protokoll/);
  const ok = await assertPublicHost("https://mcp.deepwiki.com/mcp");
  assert.equal(ok.hostname, "mcp.deepwiki.com");
});
