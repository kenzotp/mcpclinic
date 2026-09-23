# Running an MCP Server: Hosting, Maintenance, and What Operations Really Cost

*Target keywords: MCP server hosting, running an MCP server, MCP server maintenance, MCP server operations*

**Meta-Description:** An MCP endpoint is not a project with an end date but an operation: hosting options, what changes constantly (spec, models, auth), and what maintenance costs per month.

:::stat 2026-07-28 | The latest MCP specification removed sessions and replaced Dynamic Client Registration. Operations means: keeping up with every version

:::takeaway
- An MCP server is a permanently exposed service: authentication, rate limits, monitoring, and protocol versions all need looking after.
- Two hosting paths: your own infrastructure (Docker, you own everything) or a provider's EU environment.
- What changes constantly: the spec, the model clients (Claude, ChatGPT, and Copilot behave differently with every release), and your own API.
- Real-world figures: EU hosting from +€49/month, maintenance as a retainer at €400–800/month with a monthly regression test and priority fixes.
:::

---

Building an MCP endpoint is the smaller part. The larger one is operations: an MCP server is a service permanently exposed to the internet, worked by the most impatient users there have ever been, language models, against your production API. What operations means in concrete terms and what it costs:

## Hosting: Two Paths

**In your infrastructure.** The server runs as a Docker service on your side or at your hosting partner. You own the complete stack, the GDPR chain is short (model provider plus you), and your compliance department can inspect everything itself. Requirement: someone operates the service.

**In a provider's EU environment.** Same picture, but operations and availability sit with the partner. For teams without their own operations capacity, this is the faster path; from **+€49/month** with our [standard build](/mcp-server-entwickeln).

Both paths share the same hard requirement: the endpoint is built with [OAuth, scopes, and protocol](/wissen/mcp-faehig-machen) done right. Hosting does not replace security.

## What Changes Constantly

1. **The spec.** Version 2026-07-28 removed sessions, declared Dynamic Client Registration deprecated, and introduced [server/discover](/wissen/remote-mcp-server) as a mandatory method. The previous version had both of these differently. A server from late 2025 would today be non-compliant in parts.
2. **The model clients.** Claude, ChatGPT, and Copilot pick tools on their own, and every model release changes the selection behavior. That is why a [regression test with 3 model clients](/wissen/mcp-tool-beschreibungen) belongs in the maintenance rhythm, not in the project acceptance.
3. **Your own API.** Every change to your backend changes the tools. The MCP server has to be tested along with every API release.

## What Maintenance on a Schedule Means

- **Monthly:** regression test of the tools with model clients, protocol version checked against the current spec, audit log reviewed, rate limit and token configuration checked.
- **On spec and client changes:** priority fixes before your customers notice them.
- **Permanently:** monitoring of availability and latency, authentication error rates, and a log that answers the critical question: "What did the agent do, and when?"

## What It Costs

The real-world figures from our [standard build](/mcp-server-entwickeln): EU hosting from **+€49/month**, maintenance as an operations retainer at **€400–800/month** depending on scope (spec changes, monthly regression test, priority fixes). For comparison: an endpoint left untended after the build becomes, within a few model releases, what it was before: not agent-ready.

**→ The foundation for any operation is a cleanly built endpoint: [this is how we build it](/mcp-server-entwickeln), and the [free live test](/test) shows what your API has today.**
