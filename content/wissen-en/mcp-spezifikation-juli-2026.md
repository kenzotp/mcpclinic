# MCP Specification July 2026: What has changed and why your integration needs maintenance

*Target keywords: MCP specification 2026, MCP July 2026 changes, Model Context Protocol 2026-07-28, MCP maintenance*

**Meta-Description:** The MCP specification 2026-07-28 has fundamentally rebuilt the protocol: stateless, new discovery, new auth details. What that means for existing integrations.

:::takeaway
- MCP is not "done": the 2026-07-28 specification has rebuilt the protocol core to stateless and redefined discovery.
- Old integrations keep working, until clients and platforms start expecting the new ways.
- Without maintenance, every MCP integration ages for the same reason apps need maintenance: the standard moves.
:::

---

Anyone who built an MCP server in 2025 held a blueprint that changed under their feet in 2026. The **2026-07-28** specification is no minor release: it has restructured the architecture of the protocol itself. Here are the changes that matter for operations, without spec jargon.

## 1. Stateless instead of session-based

Until now, an MCP server held a **session** with each client: connect, negotiate, remember the session ID. The new specification makes requests **stateless**: each request carries all the information with it (version, client info, capabilities) instead of presupposing a session.

What that means in practice: servers scale like ordinary web services (no session stickiness, no expired session IDs as a source of errors), and load balancing becomes trivial. Existing servers with a session model keep working, but they carry technical risk that new builds simply do not have.

## 2. server/discover: the calling card via protocol

New is a dedicated discovery mechanism: clients can get the supported versions, capabilities and the identity of the server with **a single request**. Added to that is a caching concept for these responses.

For operations this means: whoever runs an old server increasingly shows up as "unknown" in client listings. Whoever speaks the current standard is described correctly. Everywhere.

## 3. Authentication details sharpened

The OAuth rules (resource metadata per RFC 9728, discovery order) have been made more precise. Servers that only return a 401 without metadata increasingly fail to get through the automated login chains of modern clients. Our [live test](/test) checks exactly this chain.

## 4. What this means for existing integrations

- **Servers built before 7/2026:** they mostly keep running (backward compatibility is provided for in the standard). But: every new client increasingly expects the new patterns; the time for an update is now, not when it breaks.
- **Community servers:** often on old versions. If you run one, you should check the version and spec level, or switch to a maintained build.
- **If you are building right now:** build to the current specification, not to blog posts from 2025. A foundation like [mcp-basis](/mcp-server-entwickeln) abstracts away exactly this movement.

## 5. The point for decision-makers: the protocol keeps moving, permanently

This is not a one-time migration. MCP is actively evolving: server cards as a discovery standard are on the way, extensions (tasks, apps) are being added, authentication details are being sharpened. Each of the next rounds can affect integrations that run today.

From that follows a plain operational assessment: **an MCP integration without maintenance is a time bomb in slow motion.** Not because MCP is broken, but because it is alive, like TLS, like APIs, like any living standard. The difference: here the maintenance effort is small (monthly cadence, regression tests, adjustments) if you approach it in a structured way, for example with an [operations retainer](/mcp-server-entwickeln).

**→ Unclear what level your integration is at? [Free live test](/test). It also shows you whether your architecture speaks the current standard.**
