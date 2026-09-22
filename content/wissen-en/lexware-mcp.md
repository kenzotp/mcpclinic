# Lexware MCP server: What the largest of seven community servers reveals that the vendor is missing

*Target keywords: Lexware MCP, Lexoffice MCP, Lexware Office AI agent, Lexware API Claude*

**Meta-Description:** Lexware Office has no official MCP server, but it has seven community projects, the largest with its own OAuth wrapper. A code-level view of what customers are already building themselves.

:::stat 7 | community MCP servers for Lexware Office, zero of them official

:::takeaway
- The marselsel/Lexware-MCP-Server is worth taking seriously: active maintenance, Docker, tests, and, uniquely in this field, an OAuth wrapper of its own.
- It remains a DIY build nonetheless: installation, operation, and the permission concept all rest on the user.
- By now, seven community projects compete for the same gap, all without a tenant model, idempotency, or audit logging.
- The vendor offers an API key but no agent-ready endpoint (the gap the community is filling seven times over).
:::

---

Of all the community projects in our [German MCP Report 2026](/report), the **[Lexware-MCP-Server](https://github.com/marselsel/Lexware-MCP-Server)** (32 stars, as of September 22, 2026) is the most mature example of what committed users expect and what the vendor still owes them. We looked into the code.

## What's inside

The project is a TypeScript MCP server with a surprisingly complete tool coverage for everyday use: contacts (list/detail/create/update), articles, documents/vouchers, file uploads including URL upload, event subscriptions, profile and reference data: around 25 tools. On top of that:

- **Its own OAuth slice:** the server can act as an OAuth resource itself (authorization server metadata, token validation), nearly unique in the community field, where static keys in environment variables are otherwise the norm.
- **Signals of operational maturity:** Dockerfile, tests, security policy, changelog: the hygiene is right.
- **Skybridge framework:** the project pulls in its own infrastructure building blocks instead of improvising everything from scratch.

## What this server is also missing

Exactly the layer that makes the difference between "works on my machine" and "allowed anywhere near production accounting":

1. **No tenant/permission model beyond the key**: the Lexware API key remains an all-or-nothing token; the server cannot restrict it, only pass it through.
2. **No idempotency layer** for write actions: an agent loop that fires twice creates two vouchers.
3. **No audit log** at the MCP level: what the agent did, when, and with which arguments ends up in no log.
4. **No OAuth to the Lexware product itself**: the OAuth wrapper protects access to the server, not delegation on behalf of a Lexware user (the Lexware API simply offers no flow for that).

This is not a criticism of the project: points 1–3 are exactly the building blocks that work requires and that a vendor would need to invest in its product. Until then, this server is the best available option for people who know what they are doing.

## By now, a small ecosystem

The marselsel server is no longer alone. Our own count on GitHub (as of September 22, 2026) finds seven community MCP servers for Lexware Office: the DIY build with OAuth ideas examined here (32★), a second self-hosted approach (6★), hosted variants, local single-tenant builds, and experiments. Directories such as [Glama](https://glama.ai/mcp/servers) list the projects, so end customers are already finding and installing them.

Seven projects mean seven times the same answer to the same gap, and seven times without the layer that matters in accounting: no tenant/permission model beyond the key, no idempotency, no audit log, no real delegation OAuth to the product. Nobody in this field solves the problem; everyone duplicates it.

## The real message to Lexware

The picture is clear: there is an active community that wants to connect your API to agents, seven finished projects with a front-runner above 30 stars, and a market in which [awork and seven.io](/report) show what the official path looks like. Your customers are already filling the gap themselves: by now for the seventh time, just without a permission concept, without audit logging, and without your accountability.

The step from API key to agent-ready endpoint is smaller than it looks from the outside. We build exactly these endpoints for a fixed price and advise beforehand on whether the step is worth it for your product: [Agent-Readiness-Audit](/mcp-audit).

---

*Independence note: We are affiliated neither with the Lexware-MCP-Server project nor with Lexware. The code review was a snapshot at the time of research (September 2026).*
