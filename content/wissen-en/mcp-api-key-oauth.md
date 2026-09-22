# API key or OAuth? Why agents should not run on the master key

*Target keywords: API key vs OAuth, MCP OAuth 2.0, agent API access, delegated authorization for AI agents*

**Meta-Description:** AI agents act on behalf of your users, and static API keys are the wrong key for that. What OAuth 2.1, scopes, and automatic client registration concretely achieve, and why 9 of 21 German APIs need rework here.

:::stat 9/21 | tested German B2B SaaS APIs are usable only with static keys; delegated agent access cannot be mapped securely this way

:::takeaway
- An API key identifies an application. OAuth identifies a **user** with limited permissions; that is exactly what an agent acting on behalf of a human needs.
- With static keys there are only two states: allow everything or forbid everything. No scopes, no user attribution, no targeted revocation.
- OAuth 2.1 with PKCE and automatic client registration is the state of the art; awork shows it already works in German APIs. Since the MCP specification 2026-07-28, Client ID Metadata Documents are the intended mechanism, with Dynamic Client Registration kept only for compatibility.
- Without OAuth in your own API, only the more expensive option remains: a separate permission layer between agent and API.
:::

---

The most common architecture question when building MCP is not "which framework" but: **How does the agent actually sign in?** The answer decides security, data protection, and in the end the price as well.

## What the agent does differently from your integration system

A classic integration (for example an ERP talking to your API) works as an **actor of its own** with its own permissions: the integration user, their role, done.

An AI agent, by contrast, acts **on behalf of a human**. It should book the invoices the sales team itself is allowed to book, and nothing more. This delegation is the core of OAuth: the user authorizes a limited access in their name once, with specific permissions (scopes), revocable at any time, without the agent ever seeing their password.

## What static keys mean instead

A static API key belongs to an application, not to a user. Concretely, for every agent deployment that means:

1. **Permissions cannot be restricted per user.** Either the key may do everything (and so may the agent), or the use case does not work.
2. **No attribution in the log.** Who triggered the transaction? The key does not say. For auditing and [GDPR documentation](/wissen/mcp-server-dsgvo), the chain is missing.
3. **Revocation is an amputation.** If a key is suspected, you have to rotate it completely and take every integration using it offline.

Our [report](/report) finds exactly this constellation at 9 of 21 tested APIs, often additionally combined with missing machine-readable documentation.

## What the state of the art looks like

The reference case from our report is awork (53/100, best score): an MCP server with **OAuth 2.1 plus PKCE** and **Dynamic Client Registration**, meaning an agent client can have itself properly registered on its own, without a human having to manually create a client ID on a developer page. Plus setup guides for Claude Code, VS Code, and ChatGPT. That is not rocket science. It is the consistent application of what the OAuth world has known for years.

A note on the current state: the [MCP specification 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration) declares Dynamic Client Registration deprecated. Client ID Metadata Documents are now the intended mechanism: the client publishes its details under a URL, and that URL is its client ID. DCR remains allowed for compatibility reasons; Claude and ChatGPT support both mechanisms. Anyone building today should plan for Client ID Metadata Documents. The whole sign-in chain step by step: [Remote MCP server: what your endpoint needs](/wissen/remote-mcp-server).

For the server build, OAuth also means less DIY: scopes land directly in the tool logic ([how we separate tenants and permissions per tool](/mcp-server-entwickeln)) instead of the server having to simulate a second permission layer.

## What to do, depending on your starting point

- **API with OAuth already in place:** The MCP server is connected to the existing authorization. The manageable case.
- **API with static keys only:** Before the MCP build, it is worth asking the API team: is there an OAuth roadmap? If not, the MCP server carries its own permission layer, feasible, but the number one cost item.
- **Unclear where you stand:** An [audit](/mcp-audit) checks exactly this point together with all other agent requirements and delivers the fix plan for it, or the [live test](/test) gives an initial direction in minutes.

The API key was a good tool for classic integration. For agents it is the key that opens far too much.
