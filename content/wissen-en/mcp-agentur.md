# The MCP Agency: What to Look for When Choosing One

*Target keywords: MCP agency, MCP agency Germany, MCP consulting, MCP consultancy, MCP development agency*

**Meta-Description:** Finding an MCP agency is easy; finding a good one is rare. Eight criteria that let you recognize a partner for your MCP endpoint within 30 minutes, plus the red flags.

:::stat 8 criteria | by which you can recognize an MCP agency in the first conversation, before a euro has been spent

:::takeaway
- The market is growing fast: agencies offer MCP development and MCP consulting, international and German. Quality is currently the bottleneck, not availability.
- Eight criteria decide: specification fidelity, OAuth with real delegation, scopes per tool, idempotency, audit log, regression tests with model clients, the GDPR chain, handover without lock-in.
- Red flags: offers without test access, proxy-only solutions as the final deliverable, no answer to the question about destructive actions.
- Demand a fixed plan for a fixed scope. Whoever defines scope only after the signature will never define it.
:::

---

Demand for MCP endpoints is growing faster than the supply of people who build them cleanly. Offers are appearing just as fast: international [specialized agencies](https://www.mcp-agency.com), German firms with a [GDPR focus](https://www.workflow-agentur.com), platform providers, and individual freelancers. For a SaaS vendor that wants to [become MCP-ready](/wissen/mcp-faehig-machen), the market has become hard to see through: Who can actually do it?

This selection guide is written from our own practice: We build [MCP endpoints](/mcp-server-entwickeln) and, in the [Deutscher MCP-Report 2026](/report), measured 21 German B2B SaaS APIs with the same audit grid we use below as a criteria list. Take the list to every first meeting, including with us.

## The eight criteria

1. **Specification fidelity:** Does the agency ask about the current [specification version](https://modelcontextprotocol.io/specification/2026-07-28), about Streamable HTTP, about server/discover? Whoever says "SSE is good enough" without mentioning its replacement is building on the deprecation list.
2. **OAuth with real delegation:** Tools must not hang off a global API key. What is required is per-user OAuth with scopes: "this agent may only read invoices" must be technically enforceable, not promised.
3. **Scopes per tool:** Reading and writing separable, tenant separation at the tool level. Follow-up question: "How do you prevent an agent for tenant B from reading tenant A's data?"
4. **Idempotency:** Agents repeat calls. If the answer to "what happens on a duplicate call?" does not include "idempotency keys," your customers will find duplicate invoices.
5. **Mandatory confirmation and audit log:** Destructive actions with confirmation, every action logged without sensitive values. [Why this is the access half](/wissen/mcp-api-key-oauth).
6. **Regression tests with model clients:** Tool descriptions are code. Follow-up question: "With how many model clients do you test whether the language model selects the tools correctly?" Three is the [state of practice](/wissen/mcp-tool-beschreibungen).
7. **GDPR chain:** Where do model calls run, who is the recipient, are there DPAs? An MCP agency that cannot answer this question in a structured way has not thought it through.
8. **Handover without lock-in:** Tests, an operations manual, Docker, usage rights to the complete system. Whoever offers only "operations handled by us" is selling dependency instead of capability.

## The red flags

- **No test access to their own result:** An agency that builds MCP endpoints shows its work live. If nothing can be shown, nothing has been built.
- **Proxy or gateway as the final deliverable:** Both have their place [as a way to test](/wissen/self-host-oder-gateway). As the end result for a product with customer data, neither is fit for purpose.
- **"MCP we can do on the side":** The specification moves (as of 2026-07-28 it abolished sessions and [replaced DCR with CIMD](/wissen/remote-mcp-server)). Whoever does not mention this pace of change in the first conversation is not following it.
- **No questions for you:** A good agency asks about the API host, test access, staging, and limitations before naming a price.

## What a proposal must contain

A fixed-price proposal names: scope (one API, up to N tools), the eight criteria as commitments, a schedule with a test instance from week 1, acceptance criteria (regression test with model clients), and the handover. [Our reference proposal](/mcp-server-entwickeln) is open as a benchmark; put it next to every other one.

**→ The [free live test](/test) shows the state of your API before every conversation: the factual basis for your agency inquiry.**

---

*Independence note: The third-party providers named are neither recommended nor disparaged; the criteria list is derived from our own build and audit practice.*
