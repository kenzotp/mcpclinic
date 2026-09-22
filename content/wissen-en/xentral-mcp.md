# Xentral MCP: Public API specs, but agent delegation is missing

*Target keywords: Xentral MCP, Xentral API AI agent, connect XERP API to Claude*

**Meta-Description:** Xentral maintains its API specs publicly on GitHub and delivers LLM-friendly docs. An official MCP endpoint and an OAuth delegation model are still missing. An analysis.

:::takeaway
- Public OpenAPI specs on GitHub (actively maintained) plus llms.txt: the documentation layer is better than at most competitors.
- Personal access tokens without scopes or expiry are the weakest foundation for agents: a leaked PAT is a full account takeover.
- Until there is an official endpoint: reading yes, writing only behind a control layer of your own.
:::

---

Xentral is one of the most interesting examples in the [German MCP Report 2026](/report), because the vendor gets a lot right on the documentation side and the assessment still ends with a sobering overall score. The pattern behind that is instructive for the whole industry.

## What is good

- **Public API descriptions on GitHub** (repo `xentral/api-spec-public`, actively maintained, last updated in September 2026): OpenAPI 3.0, machine-readable, retrievable without registration. Not every one of the 21 examined APIs can claim that.
- **LLM-friendly documentation:** llms.txt and Markdown versions of the documentation pages: Xentral thinks about machine readers.
- **REST conventions** that are integration-friendly: no CSV record protocols, no per-call HMAC signature orgies.

For developers who want to build an integration today, that is a real plus: an agent framework can generate tools cleanly from the spec, and several community projects have already done so (among them a server with read tools and controlled write actions).

## What is missing

1. **No official MCP endpoint.** Xentral customers who want to give their assistant access to orders, stock or invoices are left with community builds or their own construction.
2. **No user-level delegation model.** The documented authentication runs over personal access tokens (PATs): unlimited, all-encompassing keys created by an admin. For agents that is the weakest foundation imaginable: no scopes ("read only"), no expiry, no user attribution. A leaked PAT is a full account takeover.
3. **No permission concept for tools.** What an agent may do after login is decided by the token's reach, not by a product-side scope model.

An interesting side note from our research: there is a token exchange endpoint in the platform architecture. The direction is right, but the agent-appropriate documentation of a real user-context flow is still missing.

## What Xentral users should practically do today

- **Work only with minimum-necessary tokens:** your own service account, the PAT as narrow as at all possible, read-only preferred, plan for rotation. A PAT inside an agent is as confidential as a password.
- **Avoid write actions or encapsulate them**: value changes in the ERP driven by language model decisions are indefensible without an idempotency and confirmation layer.
- **For agency customers:** an intermediate layer of your own (a controlled MCP server) instead of passing PATs directly to client tools, exactly the build form of our [MCP-Endpoint-Build](/mcp-server-entwickeln).

## The general lesson

Xentral shows: public specs and llms.txt are necessary but not sufficient. The scoring of our probe recognizes the difference (thanks to the spec, Xentral lands in the better subsection of the report table), but the real added value, controlled agent access in the user's name, only emerges with an endpoint and a delegation model. Until then, for customers: **reading yes, writing only with a protective layer of your own.** And for vendors: the path from "docs for AI" to "access for AI" is shorter than it looks from the outside.

**→ Find out where your API stands: [MCP live test](/test), in under a minute.**
