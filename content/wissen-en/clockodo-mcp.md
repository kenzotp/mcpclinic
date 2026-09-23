# Clockodo MCP Server: How we found the third official endpoint

*Target keywords: Clockodo MCP, Clockodo MCP server, Clockodo time tracking AI, Clockodo API Claude*

**Meta-Description:** Clockodo runs its own MCP endpoint at mcp.clockodo.com: reachable, OAuth-protected, tools behind auth. Documented nowhere. How we found it and what it shows.

:::stat 37/100 | clockodo in the corrected report: an official MCP endpoint found, documented nowhere

:::takeaway
- Clockodo operates its own MCP endpoint at mcp.clockodo.com/mcp: reachable, with OAuth discovery per RFC 9728, tools cleanly behind auth.
- The endpoint is documented nowhere: no announcement, no setup guide, no entry in the docs (as of September 22, 2026).
- That makes a third of 21 audited providers offering MCP officially; in the ranking clockodo jumps to 37/100 and place 2. (The same scan found a fourth a day later: personio, mcp.personio.de, undocumented.)
- Still missing: a server card, current server/discover, and a public setup path. Exactly the building blocks that turn an endpoint into an offering.
:::

---

During a test run of our free live test, we noticed something that appears in no document: **Clockodo operates its own MCP endpoint at mcp.clockodo.com/mcp.** We did not find it through research but by scanning derived hosts: anyone searching a vendor's domain for mcp., api., docs., and developer. addresses finds things the documentation keeps quiet about.

We verified the find, included it in our [German MCP Report 2026](/report), and re-rated clockodo.

## What the endpoint shows

The endpoint behaves exemplarily under unauthenticated testing:

- **Reachable** at mcp.clockodo.com/mcp, with an HTTP response to requests.
- **Login via OAuth discovery:** The server publishes its Protected Resource Metadata at /.well-known/oauth-protected-resource (RFC 9728). A client learns from it which authorization server is responsible before any token flows.
- **Tools are cleanly protected:** tools/list only answers after authentication. From an agent's perspective that is the correct posture: nothing open, nothing hidden.

This chain (401 with a signpost, metadata per RFC 9728, the login behind it) is exactly the flow the [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28) prescribes. Clockodo built it without making a fuss about it.

## What is still missing

Three building blocks separate the endpoint from a full offering:

1. **No server/discover:** The endpoint does not (yet) answer the mandatory method of the current specification; its specification level is therefore not machine-detectable.
2. **No server card:** At /.well-known/mcp.json and the usual candidate addresses there is no card candidate. The server card is the business-card standard that gives endpoints visibility in directories.
3. **No public setup path:** Neither the docs nor a blog mentions the endpoint (as of September 22, 2026). A customer who wants to connect Clockodo to Claude or ChatGPT will not find the path unless they happen onto the same scan we ran.

Added to that: without test access, the tools themselves remain unassessed. How many there are, how well they are described, whether idempotency and confirmation requirements exist: only an [audit](/mcp-audit) with real credentials sees that.

## Context: the field now has three (and counting)

With clockodo, three of 21 audited providers offer MCP officially: [awork](/wissen/awork-mcp) (53/100), [clockodo](/report) (37/100), and [seven.io](/wissen/seven-io-mcp) (30/100). The same scan exposed a fourth: personio runs mcp.personio.de (OAuth-protected, undocumented). What makes clockodo interesting is the combination: on the REST side there is a verified OpenAPI 3.1 spec with 80 paths, on the MCP side an OAuth-protected endpoint without documentation. All the building blocks for agent readiness are present; they just have not been assembled and communicated yet.

For the industry the message is the same as with [awork](/wissen/awork-mcp): it takes no conglomerate to prove agent readiness is feasible. It was proven by a time-tracking tool from the German mid-market.

**→ Whether your endpoint passes the first links of this chain is shown by the [free live test](/test): it checks reachability, server/discover, and whether your OAuth metadata per RFC 9728 is discoverable.**

---

*Independence note: We have no business or personal ties to clockodo. The finding is a snapshot from September 22, 2026; we would expressly welcome a later commit of the endpoint into the documentation.*
