# Personio and llms.txt: Why "AI-friendly documentation" is still far from agent access

*Target keywords: Personio MCP, Personio API AI agent, llms.txt benefits, agent-ready API*

**Meta-Description:** Personio ships llms.txt and OAuth2, and as of 2026-09-22 it also runs its own MCP endpoint (mcp.personio.de, undocumented). An assessment of what documentation signals say about an API's real agent capability. An assessment of what documentation signals say about an API's real agent capability (and what they do not).

:::takeaway
- Update September 22, 2026: Personio operates its own MCP endpoint (mcp.personio.de, OAuth per RFC 9728, undocumented). The access half now exists technically, but it is neither documented nor announced.
- OAuth2 client credentials is a machine login, not a login on behalf of a user: the wrong style for agents.
- Buyer questions instead of marketing slogans: Is there an official endpoint? Does the agent act in the user's name? Are there scopes per tool?
:::

---

In our [German MCP Report 2026](/report) there is a group of vendors that looks AI-ready at first glance: llms.txt is served, the documentation is modern, perhaps even prepared explicitly for machine reading. Personio belongs to that group and is at the same time the best example of why these signals are half the truth.

## What Personio offers today

- **Developer hub with llms.txt**: the file meant to make it easier for AI systems to enter the docs (personio.de developer hub).
- **OAuth2 client credentials** for the API (v2): a solid authentication foundation.
- **An official Swagger description**, maintained on GitHub according to the docs.

That is more than the majority of the field shows: 14 of 21 examined vendors do not provide any machine-readable description at all. Personio has done its **readability** homework.

## What is missing and why it is the more important part

An AI agent meant to operate Personio needs three things that no llms.txt in the world replaces:

1. **An endpoint** where agent tools are officially offered: Personio has no MCP server.
2. **A delegation concept**: "This assistant may *read* vacation requests, but not approve them." OAuth2 client credentials is a machine login, not a login on behalf of a user: the wrong authentication style for agents, because everything runs under one service account and attribution to individual users is missing.
3. **Tool accountability**: descriptions, scopes, confirmation requirements, audit log: the layer that turns "the API works" into "agent use is controllable".

## The general lesson: readable ≠ enterable

We see this pattern at several vendors in the report (Personio, Xentral, propstack, each with llms.txt or public specs): the documentation layer is attractive, the access layer stands still. Understandable, because documentation measures are cheap and risk-free. But value for customers only emerges at the access layer, and that is exactly why the differences in the report are so large: **4 of 21 vendors deliver access, a dozen deliver literature.**

A practical note for buyers who hear "AI-capable" as a selection criterion: do not ask about llms.txt. Ask about three things: Is there an official agent endpoint? Does the agent act in the name of the logged-in user (OAuth in the user context)? And: can permissions be restricted per tool? Three "no"s mean: AI capability in this product is currently a brochure.

## For Personio customers

Internal assistant integrations with the Personio API are possible today: with your own, controlled MCP servers built on the official API (authentication via client credentials, ideally via a service account with minimal permissions). What should be considered from the start: logging of every action and the decision about which personal data may pass through a language model at all. The [Agent-Readiness-Audit](/mcp-audit) sorts exactly these questions; the path to a production endpoint is laid out in the [MCP-Endpoint-Build](/mcp-server-entwickeln).
