# JTL MCP: Why JTL's "Build with AI" is the right direction and still not agent access

*Target keywords: JTL MCP, JTL API AI agent, connect JTL Wawi to Claude, JTL Build with AI*

**Meta-Description:** JTL explicitly opens its developer documentation to AI tools: specs indexed for MCP, llms.txt, a Build-with-AI page. An official MCP endpoint is still missing. An assessment.

:::takeaway
- JTL is the only vendor in the report that explicitly invites AI systems to read its specs ("Build with AI", llms.txt, open OpenAPI files).
- OAuth 2.0 for cloud apps exists; an agent-appropriate endpoint acting in the user's name is still missing.
- For merchants, until then: reading yes, write actions only behind a control layer of your own.
:::

---

Among German e-commerce and ERP vendors, JTL occupies a special position: it is the only vendor in our report's scope that **explicitly invites** AI systems to read its documentation. And at the same time it is an example of how an invitation to read is still not agent access.

## What JTL offers today

The [developer portal](https://developer.jtl-software.com/) has its own "Build with AI" page and serves an llms.txt; the OpenAPI descriptions of the JTL cloud APIs (among them the ERP API in several versions, plus Marketplace Channels and Vouchers) are directly available as JSON files and are explicitly "indexed for AI tools (MCP, llms.txt)". Authentication for the cloud APIs runs over OAuth 2.0 (client credentials for apps), the on-premise Wawi over API keys.

Compared with the competition, this is the cleanest starting position in the field: in our [report](/report), 14 of 21 vendors lack even the machine-readable description. JTL delivers it, complete with the loading sign for AI.

## What is still missing

A developer who wants to work with JTL data can build the following today: their own scripts against the API, their own MCP servers, Copilot extensions. The docs help with that. What they do **not** get:

1. **An official MCP endpoint** that a merchant can enable in their JTL account: access in the user's name, with the user's permissions.
2. **A scope model for agents** on the product side ("this agent may read orders, but not cancel them").
3. **A hosted, logged tool offering** with the vendor's security and support promise.

The result is the familiar pattern: perhaps the ten-thousandth JTL merchant service provider will build exactly these tools one by one and unofficially, with varying quality, without a common permission concept, each one its own maintenance risk.

## Why JTL still shows the right direction

The comparison with the competitors in the report makes it clear: Xentral and Personio deliver llms.txt for reading, PlentyONE has specs on GitHub, but most stand at zero. JTL goes one step further and says: "We *want* AI systems to understand our interface." That is the correct reading of the times. The marketable step after that is small and obvious: **an MCP endpoint in front of its own cloud API**, built the way awork has demonstrated it (OAuth 2.1, scopes, Dynamic Client Registration, top score in our report with 53/100).

## What merchants and service providers can do now

- **Read-only today:** with the open API docs, read queries (order status, stock levels, customer search) can be cleanly connected to AI clients, ideally via a self-operated, logged MCP server instead of remote gateways.
- **Hold back write actions** until a permission concept exists: cancellations and price changes by a language model agent are a no-go without idempotency and confirmation requirements.
- **Direct route to the vendor:** if you serve many JTL customers, you have an argument the JTL product management will hear: demand for agent-capable access bundles better in one official endpoint than in a hundred wrappers. We support exactly this discussion with the [Agent-Readiness-Audit](/mcp-audit) and deliver the endpoint with the [MCP-Endpoint-Build](/mcp-server-entwickeln).

**→ An assessment for your setup: [free MCP live test](/test) or [talk to us](/mcp-audit) directly.**
