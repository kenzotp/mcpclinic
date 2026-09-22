# Who is building the MCP servers for the German Mittelstand? An ecosystem report

*Target keywords: MCP server Germany, MCP server list, German MCP server, MCP server providers*

**Meta-Description:** For most German B2B SaaS products there is no official MCP server, but instead a growing community wave: over 25 unofficial projects for the tested products alone. A data report on the gap nobody fills.

:::stat 26 | community MCP servers we count for the 21 tested German B2B SaaS products alone; 4 of 21 have an official one

:::takeaway
- Where no official MCP endpoint exists, the community builds one: 6 projects for Zammad, 7 for Lexware Office, 5 for Propstack, 4 for Personio, 3 for Xentral.
- Where an official endpoint exists (awork, seven.io), nobody builds alongside: the community fills only gaps.
- The community projects are impressive, but none of them solves the layer that counts in daily operations: tenant model, idempotency, audit log, real delegation.
- For mid-sized companies, running a third-party community server with the production key is a risk without anyone accountable. For vendors, it is the clearest demand signal there is.
:::

---

Our [German MCP Report 2026](/report) tested 21 German B2B SaaS APIs for agent capability. Looking beyond our own field, a second picture emerged that is worth telling in its own right: who is actually building the MCP servers for German software right now? The answer, according to a count on GitHub (as of September 22, 2026): mostly individuals, in their free time, with no ties to the vendor.

## The map of the field

| Vendor | Official MCP server | Community projects | Largest community project |
|---|---|---|---|
| awork | yes | 0 | — |
| seven.io | yes | 0 | — |
| Clockodo | yes, recently | 0 | [mcp.clockodo.com](https://mcp.clockodo.com/mcp) |
| Lexware Office | no | 7 | [Lexware-MCP-Server](https://github.com/marselsel/Lexware-MCP-Server) (32★) |
| Zammad | no | 6 | [Zammad-MCP](https://github.com/basher83/Zammad-MCP) (41★) |
| Propstack | no | 5 | [propstack-mcp](https://github.com/ashev87/propstack-mcp) (8★) |
| Personio | no | 4 | 1★ |
| Xentral ERP | no | 3 | 1★ |
| easybill | no | 1 | 0★ |
| JTL-Software, Collmex | no | 0 | — |

Three patterns stand out. **First: where no official MCP endpoint exists, the community builds one:** 6 projects for Zammad, 7 for Lexware Office, 5 for Propstack, 4 for Personio, 3 for Xentral. **Second: where an official endpoint exists, nobody builds alongside:** awork and seven.io, as established official providers, have no community copies. **Third: the newest addition only came to light through systematic rescanning:** our live test found a previously unannounced endpoint at clockodo under mcp.clockodo.com (OAuth-protected, reachable), and the same scan exposed a protected endpoint at personio under mcp.personio.de (undocumented), and directories like [Glama](https://glama.ai/mcp/servers) make even the community projects discoverable for end customers.

## How good is the community wave?

We looked into the largest projects ([Lexware](/wissen/lexware-mcp), [Zammad](/wissen/zammad-mcp)): active maintenance, tests, partly Docker, in the best case an OAuth wrapper of its own. That is far more than one expects from weekend projects. What is missing throughout, however, is the same layer: no tenant and permission model beyond the API key, no idempotency for write actions, no audit log, no delegation OAuth to the product itself. Seven Lexware projects are seven times the same answer to the same gap, without any one of them closing the gap.

Also revealing is a detail from the Zammad field: one project exists primarily as a fork in order to **retrofit OAuth**. The community itself is signaling which layer is missing and who demands it.

## What this means for your operations

If you use a German B2B product and an employee connects a community MCP server, third-party code runs your production API key: without auditing, without liability, without a security process, dependent on one person's willingness to maintain it. The convenient alternative, a hosted gateway, only relocates the risk: there, the key sits with the third-party provider ([comparison](/wissen/self-host-oder-gateway)).

If you are a vendor, the count above is your product roadmap in its purest form: your customers want agent access so badly that they build it without you. The official endpoint is the difference between a feature and a liability risk, and it is smaller than it looks from the outside ([how we build it](/mcp-server-entwickeln)).

**→ How agent-ready your API stands today in detail is shown by the [German MCP Report 2026](/report): 21 providers, tested and named.**

---

*Independence note: We are not affiliated with any of the projects or vendors named. The count is a snapshot (September 22, 2026) and makes no claim to completeness; GitHub search only finds what is publicly listed.*
