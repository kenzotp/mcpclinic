import { test } from "node:test";
import assert from "node:assert/strict";
import { Upstream } from "../src/upstream.ts";

test("upstream URL construction: segments encoded, hostile input stays on our origin", async () => {
  const up = new Upstream("http://127.0.0.1:8091", "tok", 1000);

  await assert.rejects(async () => up.buildUrl(["tenants", "acme", "..", "admin"]), /invalid path segment/);
  await assert.rejects(async () => up.buildUrl(["tenants", "", "contacts"]), /invalid path segment/);
  await assert.rejects(async () => up.buildUrl(["tenants", "."]), /invalid path segment/);

  // hostile segment content is percent-encoded, never interpreted:
  const hostile = up.buildUrl(["tenants", "acme", "contacts", "c_../x?y#z"]);
  assert.equal(hostile.origin, "http://127.0.0.1:8091");
  assert.ok(hostile.pathname.includes("%23"), "fragment must be encoded into the path");

  // query values ride along encoded, not as URL control characters
  const filtered = up.buildUrl(["tenants", "acme", "contacts"], { query: "a&b=c" });
  assert.equal(filtered.searchParams.get("query"), "a&b=c");
  assert.ok(!filtered.search.includes("b=c&"), "value must not inject extra params");
});
