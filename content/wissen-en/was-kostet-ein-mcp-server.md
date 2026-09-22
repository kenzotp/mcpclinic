# What does an MCP server cost? The honest calculation

*Target keywords: MCP server costs, what does an MCP server cost, have an MCP server developed*

**Meta-Description:** What does a production-ready MCP server cost? A transparent breakdown by cost item: authentication, write safety, testing, operation, and why the cheap variant ends up expensive.

:::stat 2–4 weeks | is what a production-ready MCP server for a manageable API needs in the fixed-price build, from audit to acceptance

:::takeaway
- The pure technology is the small item: the MCP protocol is open, libraries are free. Costs arise in security, testing, and operation.
- Four items determine the price: authentication (OAuth instead of API key), write safety (idempotency, confirmations), regression tests with real model clients, and ongoing adjustment when the specification changes.
- A realistic order of magnitude for 2026: audit at a fixed price (€2,400 net with us), build from €8,000 net depending on scope, operation as a monthly retainer.
:::

---

Anyone who googles "have an MCP server developed" finds two extreme offers: free open-source starters for self-hosting and agency projects with six-figure budgets. Both numbers are honest, each for a different product. What a **production-ready** server costs is decided by four cost items that no price comparison shows.

## Item 1: Authentication, the biggest single lever

An MCP server acts **on behalf of a user**. That is exactly what OAuth 2.0 exists for: the agent gets restricted, revocable access in the name of the concrete user. A static API key, by contrast, is a master key: all or nothing, no user attribution, no scopes.

In our [Report](/report), 9 of 21 audited German APIs use static keys exclusively. For these, an MCP server is either insecure (key stored in the server, full rights) or it additionally needs its own permission layer. **The less OAuth your API brings with it, the more expensive the same server becomes.**

## Item 2: Write safety

Reading is easy. Writing through an agent means: a language model decides on the basis of text whether something gets booked, deleted, or shipped. Production-ready then means:

- **Idempotency**: the same command executed twice does not produce two invoices.
- **Confirmation requirement** for destructive actions: the agent must obtain an explicit go-ahead before it executes irreversible steps.
- **Audit logging**: every action traceable: who, when, with which tool (not: with which content).

These three points are usually not included in the open-source starter. But they are exactly what a legal department will ask about in the audit.

## Item 3: Tests that nobody notices at first

An MCP server talks to language models. And language models read. The server's most important interface is not its endpoints but the **tool descriptions** from which the model derives when to use which tool and how. A promising description that a model misreads in practice produces wrong bookings, not error messages.

That is why a regression test with **multiple model clients and real tasks** belongs in every project. Not because the technology is complicated, but because model behavior can shift with every release.

## Item 4: Operation

The MCP specification has already seen two revised versions in 2026 (current: [July 2026](/wissen/mcp-spezifikation-juli-2026)). Transport and session models change, model providers ship new versions. A server that was correct in March may need adjustments in October (we have [explained the July 2026 changes one by one](/wissen/mcp-spezifikation-juli-2026)), or you cover them as ongoing maintenance.

## What it actually costs

Our pricing is open: the [Audit](/mcp-audit) (fixed price €2,400 net) delivers the findings plan, the **build from €8,000 net** (one API, up to 20 tools, 2–4 weeks) implements it, and the operations retainer accompanies specification changes. Anyone tendering the same requirements internally should expect the same order of magnitude: the price is not in writing the server, but in the four items above.

If you want to check it out without obligation first: the [live test](/test) shows in minutes where your API stands today.
