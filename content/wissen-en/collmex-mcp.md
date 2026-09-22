# Collmex MCP: When the API itself is the anti-pattern

*Target keywords: Collmex MCP, Collmex API AI agent, Collmex interface*

**Meta-Description:** Collmex speaks neither REST nor JSON, but a CSV record protocol behind a CGI URL: with a LOGIN record instead of an authentication standard. Why this is the hardest result in our report for AI agents.

:::takeaway
- Collmex has no REST API but a CSV record protocol over HTTP POST: no authentication standard, no machine-readable docs.
- For AI agents this is the hardest class in the report: no shell to connect to.
- Here too the same applies: a translation server (MCP in front of the protocol) solves the problem for your customers, without waiting for the vendor.
:::

---

In our [German MCP Report 2026](/report), Collmex lands at the bottom with 2/100. The score sounds harsh, and it is. But the interesting part is not the number, it is *why* it comes out that way. Collmex illustrates a category that is mostly overlooked in the discussion about AI agents: **products whose API itself is the anti-pattern.**

## What Collmex calls an API instead

Collmex speaks neither REST nor JSON. The interface is a **CSV record protocol over HTTP POST** to a CGI URL: you send records in the format `VECTOR;...`, starting with a LOGIN record containing customer number, username and password, followed by business records ("RECHNUNG;...", "KONTAKT;..."). The response is again CSV with status records.

For the years in which it was built, that was a legitimate and robust decision: CSV records are deterministic, diffable, batch-friendly. For an AI agent it is a foreign language without a dictionary: no schema a model could read and derive tools from, no described fields, no error codes with meaning.

Then there is the authentication: no OAuth, no bearer token, but the LOGIN record **in the payload**. So there is no standardized way to give an agent restricted rights: all or nothing with the full login.

## Why we do not read this as an accusation against the vendor

Collmex is not a failure of recent years: the architecture is older than the agent hype and has served its customers for decades. The honest reading: **the product comes from an era when API consumers were integrators with a manual.** The new kind of consumer (language models that derive tools from descriptions) has different requirements, and those cannot be configured into a CSV protocol with a feature update.

The report scores it anyway, because for the purchasing decision the current state is what counts: anyone running Collmex today who wants agent access needs a **translation layer**, a service that speaks the CSV protocol and offers the agent clean, documented tools, with a real login concept, field validation, idempotency and an audit log. That is exactly our [build approach](/mcp-server-entwickeln); for legacy protocols the build effort is larger, but entirely feasible.

## The general lesson for the report

The report measures three levels, and Collmex shows that they really exist:

1. **Access** (MCP endpoint present? OAuth? scopes?): only 3 of 21 manage that.
2. **Readability** (OpenAPI? llms.txt? described fields?): 6 of 21.
3. **Protocol era** (REST/JSON vs. CSV records, CGI, HMAC signatures): this is where the Collmex-like cases sit.

Whoever stands at level 3 has the longest road, but also the biggest head start over the competition in their own segment if they take it. Level by level, the path is documented: [live test](/test) for the current state, [audit](/mcp-audit) for the plan, [build](/mcp-server-entwickeln) for the implementation.
