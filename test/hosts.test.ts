import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveAlternateHosts } from "../src/probe/surface.ts";

test("alternate hosts: apex and www entries widen the net", () => {
  assert.deepEqual(deriveAlternateHosts("lexware.de"), [
    "docs.lexware.de",
    "api.lexware.de",
    "developers.lexware.de",
    "developer.lexware.de",
  ]);
  assert.deepEqual(deriveAlternateHosts("www.lexware.de"), [
    "docs.lexware.de",
    "api.lexware.de",
    "developers.lexware.de",
    "developer.lexware.de",
  ]);
});

test("alternate hosts: specific subdomains are taken at their word", () => {
  assert.deepEqual(deriveAlternateHosts("docs.zammad.com"), []);
  assert.deepEqual(deriveAlternateHosts("app.stripe.com"), []);
  assert.deepEqual(deriveAlternateHosts("api.awork.com"), []);
});

test("alternate hosts: never on IPs or garbage", () => {
  assert.deepEqual(deriveAlternateHosts("192.168.1.10"), []);
  assert.deepEqual(deriveAlternateHosts("example.invalid"), [
    "docs.example.invalid",
    "api.example.invalid",
    "developers.example.invalid",
    "developer.example.invalid",
  ]);
});
