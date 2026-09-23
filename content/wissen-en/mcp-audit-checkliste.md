# What an MCP Audit Must Check: The Checklist

*Target keywords: MCP audit, MCP audit checklist, agent readiness audit, MCP security audit*

**Meta-Description:** What an MCP audit must check: endpoint and spec version, OAuth delegation, write safety, tool descriptions, the GDPR chain, and live agent tests. The complete checklist.

:::stat 40/100 | of the agent readiness points come from having a real MCP offering alone. The part an audit checks first

:::takeaway
- An MCP audit checks six blocks: endpoint and spec version, authentication and delegation, write safety, tool descriptions, the documentation surface, and the behavior of real agents.
- Automated scanners only see the surface of all this. What they cannot see: live runs, tenant separation, behavior on retries, and description quality from the model's perspective.
- The result is not a score to collect but a fix plan: findings by severity, measures with effort estimates.
- If an audit provider does not disclose its own checklist: be careful. This one is complete.
:::

---

Now that four of the 21 German providers surveyed have their own MCP endpoints and the rest are [catching up](/wissen/mcp-faehig-machen), the next question is: how do you tell whether an endpoint not only exists but is production-ready? That is exactly what the audit is for. This checklist is the same one our [Agent Readiness Audit](/mcp-audit) works through in 2–3 days, derived from what we measured across 21 APIs in the [German MCP Report 2026](/report).

## Block 1: Endpoint and Spec Version

- Reachable over Streamable HTTP, one endpoint, correct POST behavior
- Protocol version via header, [server/discover](/wissen/remote-mcp-server) answered
- Origin check active (protection against DNS rebinding)
- Legacy SSE transports shut down or cleanly maintained

## Block 2: Authentication and Delegation

- 401 with a correct WWW-Authenticate pointer (RFC 9728)
- Protected resource metadata and authorization server metadata discoverable ([RFC 9728/8414](/wissen/mcp-api-key-oauth))
- PKCE enforced, tokens scoped to your endpoint (RFC 8707)
- Scopes per tool, tenant separation server-side, token lifetime defined

## Block 3: Write Safety

- Idempotency on retries: the same agent call does not create two invoices
- Confirmation required for destructive operations
- Complete audit log without sensitive values
- Rate limits per agent, not only per IP

## Block 4: Tool Descriptions

- Per tool: current state, problem, redesign
- Verified with 3 model clients: does the model pick the right tool and pass it correct arguments? ([Details](/wissen/mcp-tool-beschreibungen))

## Block 5: Documentation Surface

- Machine-readable API description (OpenAPI) present and current
- robots.txt policy defined for the 13 relevant AI crawlers
- security.txt maintained; llms.txt as a cosmetic extra

## Block 6: What Scanners Cannot See

Automated scanners check Block 1 and parts of Block 5, and that is exactly where their [limit](/wissen/agent-scanner-limits) lies. What is missing: live runs of real agents with real tasks (finding invoices, creating drafts, changing addresses), behavior on retries and collisions, tenant separation under load, and the GDPR data flows into model providers. This block is exactly what separates a score from a diagnosis.

## The Result

A clean audit does not end with a number but with a prioritized fix plan: findings by severity (high/medium/low), measures with effort estimates, and an offer for the [build](/mcp-server-entwickeln) in case the endpoint still has to be built first.

**→ Measure first, then audit: the [free live test](/test) shows the surface of your API in under a minute.**
