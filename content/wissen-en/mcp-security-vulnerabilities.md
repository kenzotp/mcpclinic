# MCP security vulnerabilities: how AI agents become an attack vector (and what your API must do about it)

*Target keywords: MCP security vulnerabilities, MCP server security, AI agent API security*

**Meta-Description:** The 6 most common security vulnerabilities in MCP integrations: from open servers without login to deleting agents without confirmation. With examples from our report on 21 German SaaS APIs.

:::takeaway
- The typical gaps repeat themselves: open endpoints, one key for everything, write actions without brakes.
- Tenant separation must be enforced on the server side, never through tool arguments.
- Free scanners see none of these gaps; they only disappear behind the login that scanners never get through.
:::

---

When people read about MCP servers, they think of convenience first. Security people read them differently, and they would be right: an MCP server gives a language model **executing hands** on your software. What is a click for a careless user is an API call in milliseconds for an agent: repeatable, scriptable, and without a human watching.

The good news: the typical gaps repeat themselves. Here are the six we see most often, in community servers just as in quickly built in-house solutions.

## 1. Servers without their own authentication

The biggest mistake: the MCP endpoint stands open, and the tools themselves execute the operator's API key. Whoever finds the endpoint can join the conversation. And take part.

**What right looks like:** the endpoint answers every unauthenticated call with 401 and shows via the OAuth standard (RFC 9728) how to sign in. This is exactly what our live test checks automatically.

## 2. One key for everything

Many APIs work with a static API key without restrictions. For agents, that is fatal: "this assistant may *read* invoices" is technically inexpressible without OAuth scopes. In our report, **9 of 21 audited APIs** work with static keys without OAuth: delegated, restricted agent access simply cannot be mapped there.

## 3. Write actions without brakes

A tool named `delete_contact` or `send_invoice` without safeguards is an accident waiting to happen: one misunderstanding by the language model is enough. Minimum standard for every write tool:

- **Idempotency keys**: the same order does not lead to objects created twice
- **Confirmation requirement** for destructive actions (an explicit `confirm: true` that the user consciously signs off in the client)
- **Audit log** for every action: who, what, when, without sensitive values

## 4. Tenant separation only in the docs

The classic from multi-tenant systems: the tool accepts a `tenant_id` as a parameter. An agent can feed it someone else's ID just as well. Correct is the separation **on the server side**: the tenant ID comes from the signed-in token, never from the tool arguments. If your answer to "show me tenant B's contacts" depends on the argument structure, you have a gap.

## 5. Tool descriptions that mislead

Sounds unspectacular, but it is a security question: if the model picks the wrong tool because of vague descriptions (say, `delete_ticket` instead of `close_ticket`), a misunderstanding becomes an incident. Good descriptions state the task, parameters with format, return values, and error behavior. That is why we regression-test them with three different model clients.

## 6. Data flows nobody has approved

Every agent call sends your customer data to a model provider. Which data, to which provider, with which data processing agreement, with which deletion period: the SaaS operator must be able to answer this before the first customer asks. (Own article: [MCP and GDPR](/wissen/mcp-server-dsgvo).)

## What scanners cannot find and agents most certainly can

Free scanners check whether a file exists. They do not report whether `delete_user` requires confirmation, whether tenant A can read tenant B, or whether the agent keeps guessing blindly after an error. Exactly that happens in the **[Agent-Readiness-Audit](/mcp-audit)**: 10 standard tasks, live with real models against your API, fully logged, plus fixes at a fixed price.

**→ Want a rough sorting first? [Free MCP live test](/test) in under a minute.**
