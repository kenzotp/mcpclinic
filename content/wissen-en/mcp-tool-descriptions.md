# Tool descriptions are code: the underrated interface of your MCP server

*Target keywords: MCP tool description, writing tool descriptions, MCP server testing, prompt tool description*

**Meta-Description:** An AI agent decides what it does based on your tool descriptions. And an unclear description produces no error message, but wrong bookings. Why descriptions are code and how to regression-test them.

:::stat 3 models × 10 tasks | are our minimum for making tool descriptions regression-safe against model updates

:::takeaway
- The most important interface of an MCP server is not the endpoint, but the description text of every tool. That is where the language model decides what it does.
- Descriptions age like code: a new model release can shift behavior without a single line on the server having changed.
- That is why descriptions belong in regression tests: fixed task catalogs, multiple model clients, clear success criteria.
- In the [report](/report), agents fail with German APIs more often because of describability than because of technology: 14/21 have no machine-readable documentation to build on.
:::

---

When an MCP server starts doing strange things (expenses booked twice, entities deleted that nobody ordered), most teams look for the bug in the code. Often it lies in a text: the **tool description** the language model read before it acted.

## Why a sentence sometimes moves more than a function

An agent does not see your API. It sees a list of tools, and for each tool: name, description, parameter schema. From these texts the language model builds its idea of *when it uses which tool and how it fills the arguments*. An example, in the form it takes in practice:

- "Creates an invoice." Sounds harmless. The model will use it as soon as the user says "make an invoice for Müller", even when customer number, line items, and payment terms are missing.
- "Creates an invoice for an existing customer. Requires a customer number and at least one line item with quantity and unit price. If information is missing: ask first, do not create with placeholders. Invoices are financial documents; if in doubt about the content: refrain."

Same endpoint. The difference lies not in the technology, but in how the instructions are laid out. And it decides whether your server is defensible in a customer system.

## Descriptions behave like code

Three properties make them a maintenance burden nobody has on their radar:

1. **They are behavior.** A text changes how the agent acts: functionally equivalent to a code change, just without a code review.
2. **They can regress.** A new model release (at your own provider or at your customers' client) can shift interpretations. The server is unchanged; the behavior no longer is.
3. **They are unsupervised when nobody tests them.** Unit tests check the function, not the interaction between text and model.

## Regression testing in practice

The effort is smaller than the problem if you approach it systematically. This is what our standard looks like ([part of every build](/mcp-server-entwickeln)):

1. **Task catalog**: 10–20 real user phrasings per tool ("book that for me", "what was it again with Müller in September", incomplete information, attack variants).
2. **Multiple model clients**: at least three models from at least two providers. Models react differently to the same description, and your customers' clients will encounter all of it.
3. **Success criteria per task**: correct tool, correctly filled arguments, correct follow-up questions when information is missing, correct request for confirmation on destructive actions.
4. **Execution against staging or throwaway objects**: never against production. The kick-off form before the audit governs the approvals for this.
5. **Repetition at every model release** that is relevant: the test is cheap, the incident is not.

## The price of leaving it out

Anyone who plans to think the descriptions through "later some time" builds in the accountability gap: the server works in the demo, and the first real user with a vague phrasing becomes the load test. In the [audit](/mcp-audit), the description check is therefore a fixed checkpoint: with the task catalog from the harness, that is, exactly the kind of usage your customers will later display.
