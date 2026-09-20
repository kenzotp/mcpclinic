import { test } from "node:test";
import assert from "node:assert/strict";
import { isWriteAction, descriptionQuality, parseAgentPolicies } from "../src/probe/heuristics.ts";

test("write-action detection", () => {
  assert.equal(isWriteAction("create_invoice", ""), true);
  assert.equal(isWriteAction("get_user", "Returns the user"), false);
  assert.equal(isWriteAction("list", "Updates the address book"), true); // verb in description counts
  assert.equal(isWriteAction("search", "Search finds entries"), false);
});

test("description quality", () => {
  const empty = descriptionQuality("x", "");
  assert.equal(empty.score, 0);
  const good = descriptionQuality(
    "list_invoices",
    "Lists invoices for a customer. Pass customer_id and date_from (ISO). Returns a list of invoice objects with id, total, status. Example: {\"customer_id\": \"123\"}",
  );
  assert.ok(good.score >= 0.8, `expected >=0.8, got ${good.score}`);
  const bad = descriptionQuality("run", "todo");
  assert.ok(bad.score < 0.5);
});

test("robots parsing: specific block beats wildcard default", () => {
  const robots = `
User-agent: GPTBot
Disallow: /

User-agent: *
Disallow:
`;
  const parsed = parseAgentPolicies(robots);
  const gpt = parsed.agents.find((a) => a.agent === "GPTBot");
  assert.equal(gpt?.policy, "blocked");
  const claude = parsed.agents.find((a) => a.agent === "ClaudeBot");
  assert.equal(claude?.policy, "allowed"); // falls to wildcard, empty disallow = allowed
});

test("robots parsing: no file", () => {
  const parsed = parseAgentPolicies(null);
  assert.equal(parsed.found, false);
  assert.equal(parsed.agents.every((a) => a.policy === "none"), true);
});

test("robots parsing: absent bot falls back to wildcard group", () => {
  const robots = `
User-agent: *
Disallow: /private
`;
  const parsed = parseAgentPolicies(robots);
  const gpt = parsed.agents.find((a) => a.agent === "GPTBot");
  assert.equal(gpt?.policy, "allowed"); // no root block => allowed
});
