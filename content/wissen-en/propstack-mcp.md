# propstack MCP: Five community projects, zero official answer, one proof of demand

*Target keywords: propstack MCP, propstack API AI agent, propstack Claude*

**Meta-Description:** At propstack there are at least five private MCP projects, but no official endpoint. Why such a pattern is the best demand signal there is.

:::stat 5 | independent community MCP projects for an API that has no official endpoint

:::takeaway
- Five personal GitHub repos mean: demand exists. It is just bypassing the product strategy.
- Community users work with static X-API-KEYs, with no scopes and no audit log.
- An official endpoint does not need to replace the projects, only make them redundant.
:::

---

Sometimes the loudest signal is a vendor's silence. The propstack case, the real estate CRM platform with the AI assistant "Proppi", shows it particularly clearly.

## The finding

Our [German MCP Report 2026](/report) lists propstack with 8/100. What the number does not show: in our research into community projects we found **at least five independent MCP server projects** for propstack on GitHub: individual developers who built agent capability for the API themselves (API key via `X-API-KEY`, JSON/REST, docs with llms.txt). None of them comes from the vendor. None is official. Together they still send a message:

**If users build their own integrations in this number, demand exists. It is just bypassing the product strategy.**

## We already know this pattern

propstack is not an isolated case but the standard condition of the German B2B market in the report: the community builds, the vendor watches. The range runs from the Zammad forum thread with 561 views ("not really planned") to sevdesk and Lexware wrappers with 30+ stars to the five individual propstack projects. The striking part is always the same:

- **Authentication:** the user puts their API key into a stranger's tool or into a script of their own that no one has audited.
- **No scopes:** the key may do everything; the agent inherits everything.
- **No audit log:** what the agent read or changed, and when, lands in no log.

And afterwards the vendor reads about a data incident in a support ticket, one it neither caused nor can inspect.

## What the five repos mean for propstack

1. **Product decision prepared:** the demand is documented. Customers want propstack data in Claude, ChatGPT and Copilot. An official endpoint does not need to replace these projects, only make them redundant.
2. **The fear-of-losing window:** as long as no official solution exists, third-party gateways take over the role: with the data flows carried on someone else's back and without the vendor's GDPR order.
3. **The blueprint exists:** awork and seven.io show in the same report what an official endpoint looks like. The specification effort for an API like propstack's (clean REST, one auth mechanism, a manageable object model) is manageable.

## For propstack users

If you use one of the community servers: treat your API key like a password, consider creating your own service account with minimal permissions, and log what the agent does. For serious use (team, sensitive property data), a self-operated, controlled intermediate layer is the better path: for an API of this size, a clearly scoped project (fixed price, 2–4 weeks, [MCP-Endpoint-Build](/mcp-server-entwickeln)).

**→ And if you are the vendor counting five foreign repos built on your API: the [MCP live test](/test) shows you in one minute what your API offers an agent today.**
