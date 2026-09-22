import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveSiblingHosts } from "../src/probe/discovery.ts";

test("sibling hosts: apex and www entries widen to all four dev hosts", () => {
  assert.deepEqual(deriveSiblingHosts("lexware.de"), [
    "docs.lexware.de",
    "api.lexware.de",
    "developers.lexware.de",
    "developer.lexware.de",
  ]);
  assert.deepEqual(deriveSiblingHosts("www.lexware.de"), [
    "docs.lexware.de",
    "api.lexware.de",
    "developers.lexware.de",
    "developer.lexware.de",
  ]);
});

test("sibling hosts: known dev prefixes are replaced, not stacked", () => {
  assert.deepEqual(deriveSiblingHosts("docs.zammad.org"), [
    "api.zammad.org",
    "developers.zammad.org",
    "developer.zammad.org",
  ]);
  assert.deepEqual(deriveSiblingHosts("api.sevdesk.de"), [
    "docs.sevdesk.de",
    "developers.sevdesk.de",
    "developer.sevdesk.de",
  ]);
  assert.deepEqual(deriveSiblingHosts("developers.awork.com"), [
    "docs.awork.com",
    "api.awork.com",
    "developer.awork.com",
  ]);
});

test("sibling hosts: deep unknown subdomains and IPs are left alone", () => {
  assert.deepEqual(deriveSiblingHosts("app.stripe.com"), []);
  assert.deepEqual(deriveSiblingHosts("192.168.1.10"), []);
});
