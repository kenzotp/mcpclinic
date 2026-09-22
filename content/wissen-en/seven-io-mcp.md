# seven.io MCP: The SMS provider that takes agent access more seriously than some CRM heavyweights

*Target keywords: seven.io MCP, connect seven.io to Claude, SMS API AI agent, seven-mcp*

**Meta-Description:** With "Seven MCP", seven.io delivers a hosted, OAuth-secured MCP endpoint plus an npm package. What the second official vendor in the German MCP Report gets right.

:::stat 30/100 | place 2 in the report, hosted endpoint with OAuth 2.0 PKCE and over 40 tools

:::takeaway
- Seven MCP runs hosted (mcp.seven.io/mcp, OAuth 2.0 PKCE) and additionally locally via npm: both usage modes are officially covered.
- Our live test confirms the clean OAuth discovery; the score only loses points on the machine-readable API documentation.
- API providers with developer customers have the clearest business case for an endpoint of their own; seven.io is using it.
:::

---

Of all the companies in our [German MCP Report 2026](/report), seven.io is perhaps the most underrated story: an SMS/communications API provider that, with **"Seven MCP"**, operates an official, hosted MCP endpoint as one of only two German vendors, and on the side demonstrates how to design an API for agents rather than only for humans.

## What is on offer

- **Hosted endpoint:** `mcp.seven.io/mcp`, Streamable HTTP, sign-in via OAuth 2.0 with PKCE. No local setup needed; the endpoint operates on behalf of the logged-in seven.io account.
- **Local alternative:** anyone running the agent on their own machine installs the official package (`@seven.io/mcp`, npm) and uses stdio.
- **Tool coverage:** over 40 tools: SMS, voice, HLR/CNAM lookups, balance, contacts, number management, webhooks. That makes the endpoint no marketing sample but a real working surface.
- **Documentation:** a dedicated MCP section in the official docs: setup, tools, examples.

Our live test confirms the clean implementation: unauthenticated requests are correctly answered with 401, and OAuth discovery (RFC 9728) is fully present. An agent finds the login path without third-party instructions. Score in the report: 30/100, place 2. The gap to awork arises mainly on the machine-readable API documentation (no public OpenAPI spec) and details of spec conformance, not on the endpoint itself.

## Why an SMS provider, of all companies, is ahead here

The answer lies in the product logic: seven.io sells communication as an API; its customers are developers. Exactly this customer base has started steering their tools through agents ("text all participants an SMS with the new date"). A developer infrastructure provider that is not officially present there gets overtaken by its own customers; seven.io simply made the obvious move early and properly.

The contrasting finding of our report: the large German business software vendors (ERP, accounting, HR) are all still absent, even though their users ask the same question: "Can't my assistant just do that?"

## What users can do with it today

- **Connect directly:** add seven.io to an MCP-capable client (OAuth login), done. Reading balance and contacts, sending messages, all through the official tools.
- **Think in terms of safety:** the agent sends real SMS (it costs money, it reaches real people). For production use the rule is: your own sender policies, recipient checks built into the process, and for teams a dedicated account with limits instead of a shared pool account.
- **For software vendors:** the two-minute comparison with your own status is worth it: our [MCP live test](/test) shows within a minute whether your API is as far along as seven.io's.

## Putting it in context

Two of 21, awork and seven.io, officially have MCP. Both are smaller and more API-centric than the heavyweights of the German B2B market. The bottom line: agent readiness is currently a question of priority, not of size. Anyone thinking about an [MCP-Endpoint-Build](/mcp-server-entwickeln) will find a good blueprint in both, and in us a partner that delivers exactly this class of endpoint in a standardized form.
