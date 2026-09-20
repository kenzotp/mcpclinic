# MCP Clinic — Offers (EN, for /en/ pages)

*MCP Clinic makes German and European B2B SaaS products work with AI agents. All prices net of VAT.*

---

## 1. MCP Live-Test — free, automated, instant

An instant check of your public API surface: MCP handshake, OAuth discovery
(RFC 9728/8414), visible tools, OpenAPI availability, agent-crawler policy,
MCP Server Card. Score 0–100 with a concrete findings list in under a minute.

- No credentials, no write access, no sign-up
- 3 tests per day and IP
- **[Run your test](https://mcpclinic.dev/en/test)**

---

## 2. Agent-Readiness Audit — $2,900 fixed (2–3 working days)

What the free scanner can't see, we test live:

- **Live agent-flow tests:** 10 standard tasks run by Claude, GPT and an open
  model — logged: which tool was picked, where it failed, how the agent recovered
- **Auth & permissions:** per-tool scopes, delegated agent access ("this agent
  may only read"), tenant isolation
- **Write safety:** idempotency, confirmation flow for destructive actions,
  audit log, rate limits
- **GDPR:** data flows into model providers, processor agreements, EU-hosting
  options, log retention
- **Deliverable:** a 15–25 page report — findings by severity, prioritized fix
  plan with effort estimates, fixed-price quote for the fix build

**Re-audit within 60 days: $750 fixed.**

---

## 3. MCP Endpoint Build — from $9,500 fixed (2–4 weeks)

A production-grade MCP server in front of your existing API — our standard,
reusable architecture:

- TypeScript, Streamable HTTP, current spec revision
- Per-user OAuth where your API supports it, scoped service keys otherwise
- Per-tool permissions, tenant isolation enforced at the tool layer
- Write actions: idempotency keys, confirmation flow for destructive operations,
  full audit log
- Tool descriptions verified with 3 model clients (regression-tested)
- Agent-readable docs with examples per standard task
- Deployment: your infra (Hetzner/Docker) or our EU hosting (+€49/mo)
- Handover with tests and runbook

**Scope:** one API, up to ~20 tools. More is quoted on top, fixed after the audit.

---

## 4. Operations Retainer — €400–800/mo

- MCP spec watch (the protocol made a breaking change as recently as July 2026)
- Monthly agent-flow regression test against your endpoint
- Tool updates when your API changes, priority fixes
- Optional: monitoring dashboard white-labeled for your brand

---

## Why MCP Clinic

- **We test live, not box-tick.** Free scanners check whether a file exists.
  We send real agents against your product and log what breaks.
- **Fixed prices, published.** No "contact us" pricing.
- **European engineering, mid-market rates.** GDPR-native advice, optional EU
  hosting, German-speaking delivery on request.
- **Benchmark authors.** We publish the Deutscher MCP-Report — the only public
  agent-readiness benchmark of German B2B SaaS APIs.
