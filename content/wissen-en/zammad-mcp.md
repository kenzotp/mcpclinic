# Zammad-MCP: Customers want it, the community builds it, officially it is "not really planned"

*Target keywords: Zammad MCP, Zammad AI agents, connect Zammad API to Claude*

**Meta-Description:** Zammad has no official MCP integration, but it has an active community, a 41-star community server, and a role for agents in ticket support. What works today and what is missing.

:::stat 41★ | the community server, while official MCP is "not really planned"

:::takeaway
- Zammad 7 is going "all AI", but third-party agents have no official access to the product.
- The 41-star community server runs locally (stdio) with token auth: legitimate for individual use, not an offering for business customers.
- Write actions there come without idempotency, confirmation requirements, or audit logging: exactly the gap a vendor-built endpoint would close.
:::

---

The Zammad case shows in its purest form what is happening right now across the German B2B SaaS landscape: demand has long existed, the community is acting, and the official offering is lagging behind.

## What the vendor says

In the official community forum, users asked in February 2026 for an MCP and agent integration ([thread "MCP and AI agentic integration"](https://community.zammad.org/t/mcp-and-ai-agentic-integration/19660), 561 views). The vendor's answer, in essence: not really planned. Community solutions are being watched, and the upcoming version 7 is focusing on its own AI features. A GitHub epic for a "Chat assistant for agents" was still being actively worked on as recently as September 2026 and mentions in-process MCP tools: the direction exists, a shipped official MCP server does not.

Zammad 7 is going consistently "AI": ticket summaries, reply suggestions, its own agent features *inside the product*. What is missing is the reverse: letting *third-party* agents (Claude, ChatGPT, Copilot) officially operate Zammad, via the standard that is currently rebuilding the way users work with software.

## What the community has built

The de facto standard is **[Zammad-MCP by basher83](https://github.com/basher83/Zammad-MCP)** (around 41 stars, actively maintained): a Python MCP server that exposes the Zammad REST API as tools, including write actions such as creating and updating tickets. Smaller projects also exist (among others, a Go implementation).

Our short look at the code shows the pattern we regularly see in community servers:

- **Transport: stdio**. The server runs locally on the user's machine. That is perfectly legitimate for individuals, but not an offering a *vendor* could use to support its business customers.
- **Authentication** uses Zammad tokens (HTTP token or OAuth2 token) via environment variable or file: clean enough toward Zammad, but with no tenant or scope concept *at the MCP level*.
- **Write actions** are built without the safeguards a production operation would need: idempotency keys, confirmation requirements for destructive actions, an audit log. An agent can create tickets and delete attachments: whether a human controls that depends entirely on the client.

This is not a criticism of the project: it is exactly what community servers can and should deliver. It only shows the gap: **the vendor space between an "unofficial hobby solution" and a "production-ready, restricted, logged endpoint" is empty.**

## What remains realistic for Zammad users today

1. **Now:** use the community server locally, start read-only, never run it with a full admin token. Write actions only with a client that displays every call.
2. **For teams:** treat access as a deliberate exception: a dedicated Zammad user account for the agent, minimal permissions, activity monitoring.
3. **For Zammad itself**, the path would be clear: a hosted, OAuth-secured MCP endpoint (`/api/v1/mcp`) that operates on behalf of the logged-in user with scopes. That is how awork built it, achieving the top score in our [German MCP Report](/report).

## Our offer in this context

We build exactly this class of endpoint, among other things as an official, restricted variant for software vendors. If you run Zammad and want agent access done **right** (authentication, scopes, audit logging), let's talk: the [Agent-Readiness-Audit](/mcp-audit) as a starting point, the [MCP-Endpoint-Build](/mcp-server-entwickeln) as the implementation.
