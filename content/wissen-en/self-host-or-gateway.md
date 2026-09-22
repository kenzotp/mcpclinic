# Self-hosting or third-party gateway? The difference your customers feel

*Target keywords: MCP server self-hosting, MCP gateway vs own server, GDPR MCP server*

**Meta-Description:** Third-party gateways turn MCP integration into a one-click experience and shift data, rights, and responsibility to third parties. An honest comparison of both routes.

:::stat 1 key | is enough for a third-party gateway to read your entire customer database

:::takeaway
- Gateways are convenient, but your API key moves into foreign infrastructure: without scopes, without your audit log, without your limitation of liability.
- A self-operated MCP server stays under your control: your infrastructure, your log, your permission boundaries, your GDPR documentation.
- Ready-made community servers from the web are the third option: the key stays with you, but foreign code executes it, without auditing and without a maintenance commitment.
- Rule of thumb: experiment in the gateway, run production on your own server.
:::

---

The fastest way to make an existing API "AI-agent-ready" today goes through a **gateway**: sign up, paste your API key, done. The gateway speaks the API and offers the agent ready-made tools. Providers like viaSocket and dozens of similar platforms sell exactly that, and for a first experiment that is legitimate.

The second look belongs on the differences, because they are more substantial than the comfort difference.

## Where your key sits, your problem sits

A gateway works with **your API key**. Concretely, that means:

- The service can do **everything** with your key that the key can do: with static keys without scopes (the normal case in our [Report](/report): 9 of 21 APIs), that means everything.
- Your customer and business data flows through a third party's infrastructure: with its retention periods, outages, and price changes.
- In the GDPR chain, the gateway is another recipient that you must name and cover contractually. Many businesses forget exactly this point.

## What a self-operated MCP server does differently

A self-operated MCP server (in your infrastructure or in your rented EU environment) changes the fundamentals:

1. **Your data leaves your system only in one direction, the one you defined**: to the model provider with whom you have the DPA. No intermediate layer.
2. **Permission boundaries are enforced technically**: tools only with the required scope, destructive actions only with confirmation, tenant separation on the server.
3. **You own the audit log**: every agent action traceable, for you, for your customers, for every incident.

The price: effort. A clean server for a manageable API is not a weekend project if it is to be genuinely secure: idempotency, confirmation requirements, the audit log, and regression tests are the baseline, not the bonus. With a standard architecture ([this is how we build it](/mcp-server-entwickeln)), it comes in at 2–4 weeks fixed price.

## The third option: community servers from the web

Alongside the gateways, a second kind of ready-made integration is growing: open community projects that map a vendor's API as an MCP server. They are not hosted but downloaded and started yourself, usually via npm or Docker. Formally, the key stays with you, but you run foreign code with full key access: without auditing, without liability, without the author's security process. And you depend on one person's willingness to maintain it. If the project is discontinued, your integration dies with the next major update of your API.

How widespread this has become is shown by our own count on GitHub (as of September 22, 2026):

| Vendor | Community MCP servers | Largest project |
|---|---|---|
| Lexware Office | 7 | [Lexware-MCP-Server](https://github.com/marselsel/Lexware-MCP-Server) (32★) |
| Zammad | 6 | [Zammad-MCP](https://github.com/basher83/Zammad-MCP) (41★) |
| Propstack | 5 | [propstack-mcp](https://github.com/ashev87/propstack-mcp) (8★) |
| Personio | 4 | 1★ |
| Xentral | 3 | 1★ |
| awork, seven.io | 0 | official endpoints available |

The pattern is clear: wherever the vendor offers no official agent integration, the community builds one, unannounced. The projects have long been discoverable by end users through directories like [Glama](https://glama.ai/mcp/servers), and even the missing authentication layer is being retrofitted: a separate fork of the Zammad server exists for the sole purpose of enabling OAuth. For you as a user, the assessment stays the same as with the gateway, just without its business operation: foreign code gets your production key, and nobody takes responsibility for it. For you as a vendor, it is the clearest demand signal there is: your customers are already improvising the integration, currently for the seventh time, because the official path is missing.

## The honest decision table

| | Gateway | Your own server |
|---|---|---|
| Setup | Minutes | Days to weeks |
| Monthly costs | Subscription + sometimes data volumes | Hosting (small) |
| Where is your key? | With the third party | With you |
| Permissions per tool | No (key scope) | Yes (scopes) |
| Audit logging | With the provider | With you, complete |
| GDPR chain | Third-party recipient | Only you + model provider (with DPA) |
| Maintenance | The provider, and its price changes | You (or a [retainer](/mcp-server-entwickeln)) |

## Our recommendation by size

- **Single user, experiment:** a gateway is fine: with a disposable key and no sensitive data.
- **Team, real customer data:** your own server. The effort pays for itself with the first incident it prevents.
- **Software vendors with their own customers:** never send your customers into a gateway. Build (or have built) the official endpoint: that is the difference between a feature and a liability risk.

**→ Where your API stands today, the [free live test](/test) shows in under a minute.**
