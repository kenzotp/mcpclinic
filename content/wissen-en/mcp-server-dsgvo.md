# MCP servers and GDPR: what you need to set up before your customers let AI agents onto your API

*Target keywords: MCP server GDPR, AI agents GDPR, data processing agreement AI provider*

**Meta-Description:** Data flows, data processing, deletion periods, EU hosting: the GDPR obligations around MCP servers, sorted out technically, without legal advice.

:::takeaway
- Every agent call sends customer data to a model provider: which data, to whom, with which DPA, must be documented.
- The strongest lever is data minimization in tool design: limit fields, cap page sizes.
- Static API keys make delegated, restricted agent access impossible; OAuth scopes are the prerequisite.
:::

---

As soon as an AI agent works with your SaaS, customer data leaves your system. That was no different with classic integrations; it just happened there on documented paths with settled contracts. Agent traffic needs the same diligence, only faster. Here are the five questions you should be able to answer before the first customer asks.

*(We are engineers, not lawyers; this is technical classification, not legal advice.)*

## 1. Which data flows where?

An agent call consists of two data streams: the user's task ("summarize Meier's open invoices": contains names!) goes to the model provider; the tool response (contact data, invoice line items) comes back and also flows through the model. Concretely, what to document:

- Which model providers are used (including via intermediary services)?
- Do they process data inside the EU or outside?
- Is there a data processing agreement (DPA) with every provider?

In practice, it has proven worthwhile to communicate this openly in the API docs; the question comes up anyway.

## 2. Data minimization in tool design

The underestimated lever: tool returns as small as necessary. A `contacts_search` tool that returns the complete contact with all fields on every request sends more personal data through the model than necessary. Better: limit fields per tool purpose, cap page sizes, use internal IDs instead of plaintext in descriptions. This is GDPR work you do while building, not afterwards.

## 3. Logging with retention

For incident investigation you need an audit log of every agent action. The log itself is again a personal data record: define deletion periods (e.g., 30–90 days), store **field names instead of field values** wherever possible, and separate operational logs from content data.

## 4. Who may connect an agent?

The customer grants an agent access to their account, but should it be a *session* access that expires after closing time? Recommendation: model agent access as its own permission level per user (OAuth scopes: `agent.read` vs. `agent.write`), read-only by default, activatable by the user. Anyone issuing static API keys today (in our report: 9 of 21 APIs) simply cannot answer this question: that is the real GDPR bottleneck.

## 5. EU hosting as an option

Not always necessary, often a selling point: your own MCP server (not the model!) runs in the EU, ideally in your own infrastructure. Our standard build runs as a Docker container, with you or with us, in the EU if you want that.

## The practical advice

GDPR for agents is not an add-on package you bolt on afterwards. It is design decisions at the tool interface: return minimally, scope, log, deletion periods. Retrofitting them costs a multiple.

**→ We check this in the [Agent-Readiness-Audit](/mcp-audit) as its own review area (data flows, DPA needs, audit log concept) and deliver the fix plan at a fixed price. Before that: the [free MCP live test](/test).**
