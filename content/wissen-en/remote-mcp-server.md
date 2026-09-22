# Remote MCP Server: What Your Endpoint Needs So That Claude and ChatGPT Can Connect to It via URL

*Target keywords: Remote MCP Server, Remote MCP Server Claude, Claude MCP Server URL, Remote MCP Server OAuth, MCP Server ChatGPT*

**Meta-Description:** What a hosted MCP server must support per specification 2026-07-28 so that Claude and ChatGPT can connect via URL: transport, OAuth 2.1, metadata.

:::stat 4/21 | audited German B2B SaaS APIs run a remote MCP endpoint with OAuth metadata per RFC 9728 (awork, seven.io, clockodo, and personio)

:::takeaway
- A remote MCP server is an HTTPS endpoint like `https://api.example.com/mcp` that speaks Streamable HTTP. The older HTTP+SSE method has been deprecated.
- Since specification 2026-07-28, MCP is stateless: no more session IDs, but a version header on every request and the mandatory `server/discover` method.
- Sign-in is a chain: a 401 pointing to your metadata, finding the authorization server, registering the client, login with PKCE, a token valid only for your server. If one link breaks, no connection is established.
- For client registration, Client ID Metadata Documents replace Dynamic Client Registration. Claude and ChatGPT support both.
:::

---

In Claude and ChatGPT, a user adds a connection by entering a URL. The rest runs automatically: the client calls the endpoint, receives a sign-in prompt, finds the responsible authorization server, registers itself there, sends the user to the login, and then works with a token. Each of these steps is defined in the [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28), and each one can fail over a small detail.

This article walks through the chain in the order a client processes it. It is based on the current specification 2026-07-28 ([version overview](https://modelcontextprotocol.io/specification/versioning)) and the developer documentation from Anthropic and OpenAI, as of September 22, 2026.

## What "connect via URL" means in Claude and ChatGPT

**Claude:** Under *Customize → Connectors → "Add custom connector"*, you enter the server's URL. According to Anthropic, this works on the Free, Pro, Max, Team, and Enterprise plans ([Claude docs: Custom connectors](https://claude.com/docs/connectors/custom/remote-mcp)). When creating the connection, you choose between "No sign-in" and OAuth; for OAuth, Claude offers three paths, which we cover below.

**ChatGPT:** You connect your own MCP servers through developer mode. OpenAI lists Pro, Plus, Business, Enterprise, and Education on the web for it, SSE and Streamable HTTP as transports, and OAuth, no sign-in, or a hybrid as sign-in ([OpenAI: Developer mode](https://developers.openai.com/api/docs/guides/developer-mode)).

Do not confuse this with the following: both providers also offer an MCP connection in their programming API ([Anthropic](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector), [OpenAI](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)). There, the developer passes the token themselves, and the OAuth chain below does not apply. This article is about the path your customers take in the chat interface.

## 1. Transport: Streamable HTTP on exactly one endpoint

The specification requires a single HTTP path, the *MCP endpoint*, which accepts POST, for example `https://example.com/mcp`. Every client message is its own POST; the server responds either with a JSON object or with an event stream (Server-Sent Events, SSE), and the client must understand both ([Specification: Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)).

Since 2026-07-28, the following also applies:

- **No GET stream and no sessions.** On GET or DELETE, the server should respond with `405 Method Not Allowed`, and it ignores an `Mcp-Session-Id` header.
- **Every POST carries the `MCP-Protocol-Version` header**, and the value must match the version in the message body. If the two diverge, the server rejects with `400`.
- **The `Origin` header is checked.** If it is present and invalid, the server responds with `403`. This protects against DNS rebinding, where a foreign website misuses a user's browser as a bridge to your server.

The old HTTP+SSE method from version 2024-11-05 has been deprecated since 2025-03-26; new servers should no longer use it ([ibid.](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)). Claude selects it automatically when the URL ends in `/sse` ([Claude docs](https://claude.com/docs/connectors/custom/remote-mcp)). A server that speaks only SSE is still reachable today, but it is on the chopping block.

## 2. Stateless: what 2026-07-28 changes on the server

The current specification calls MCP a stateless protocol: every request contains everything the server needs to process it ([Specification: Basic](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#statelessness)). The former `initialize` handshake is gone; protocol version and client capabilities travel with every request ([Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)).

Two consequences for your server:

- **`server/discover` is mandatory.** A client uses it to ask in advance which protocol versions and capabilities your server has and what it is called ([Specification: server/discover](https://modelcontextprotocol.io/specification/2026-07-28/server/discover)).
- **State across multiple calls becomes explicit.** If a tool needs context from an earlier call, the server issues its own identifier that the client passes back as a normal tool argument ([Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)).

The benefit for operations: requests can be distributed across any instances without a session being tied to one machine. What else changed in this version is covered in our article on the [MCP specification of July 2026](/wissen/mcp-spezifikation-juli-2026).

## 3. Sign-in: the OAuth chain, link by link

Authorization is optional in the specification. But anyone offering it over HTTP should follow the defined flow based on OAuth 2.1 ([Specification: Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)). For a B2B service with customer data, that is the normal case. Why a static API key is not enough for this is explained in our article [API key or OAuth?](/wissen/mcp-api-key-oauth)

1. **A 401 with a signpost.** When a client calls without a token, the server responds with `401 Unauthorized` and states the address of its metadata in the `WWW-Authenticate` header under `resource_metadata`. Alternatively, the metadata sits at a fixed address (`/.well-known/oauth-protected-resource`, with or without the endpoint path); clients must master both routes ([Specification: Discovery](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/authorization-server-discovery)). Claude explicitly requires the status code 401: a `WWW-Authenticate` header on a 200 response is ignored ([Claude docs: Authentication](https://claude.com/docs/connectors/building/authentication)).

2. **Resource metadata per RFC 9728.** This is a small JSON document that says which authorization server is responsible for your MCP server. The server must serve it, and it must contain the `authorization_servers` field with at least one entry ([ibid.](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/authorization-server-discovery)).

3. **Authorization server metadata.** The authorization server describes itself per RFC 8414 (`/.well-known/oauth-authorization-server`) or per OpenID Connect Discovery (`/.well-known/openid-configuration`). One of the two routes must exist; clients try both ([Specification: Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)).

4. **PKCE with S256.** PKCE secures every login with a one-time secret that makes an intercepted authorization code worthless. Clients must use it and abort if the authorization server does not state the `code_challenge_methods_supported` field ([Specification: Security](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations)). Claude sends S256 with every sign-in, and OpenAI requires that your authorization server advertises S256 ([Claude docs](https://claude.com/docs/connectors/building/authentication), [OpenAI: Auth](https://developers.openai.com/apps-sdk/build/auth)).

5. **Client registration.** Your authorization server must know who wants to sign in. The specification names an order: credentials registered in advance, then *Client ID Metadata Documents* (CIMD: the client publishes its details under a URL, and that URL is its client ID), then *Dynamic Client Registration* (DCR, RFC 7591: the client registers itself on first contact). DCR has been deprecated since 2026-07-28 and remains allowed only for compatibility reasons ([Specification: Client Registration](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration)). In practice, Claude and ChatGPT support both methods today; Claude recommends CIMD and additionally allows a manually entered client ID ([Claude docs](https://claude.com/docs/connectors/custom/remote-mcp), [OpenAI: Auth](https://developers.openai.com/apps-sdk/build/auth)).

6. **The token belongs to your server.** Clients include the `resource` parameter (RFC 8707) at login and token retrieval, that is, the address of your MCP server; ChatGPT appends it to both requests ([OpenAI: Auth](https://developers.openai.com/apps-sdk/build/auth)). Your server must verify that a token was issued exactly for it, and it must neither accept foreign tokens nor pass them through to your actual API ([Specification: Access Token Usage](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#access-token-usage)). If the MCP server needs access to your API, it signs in there with its own credentials, for example as its own OAuth client.

7. **The redirect URI.** After the login, your authorization server sends the user back to the client. For Claude on the web, on desktop, and on mobile, that is `https://claude.ai/api/mcp/auth_callback` ([Claude docs](https://claude.com/docs/connectors/building/authentication)). Redirect URIs must use HTTPS or point to `localhost` ([Specification: Security](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations)).

8. **Report missing permissions cleanly.** If a token's scope is not sufficient for a tool, the server should respond with `403` and `error="insufficient_scope"` along with the required scope. The client can then request more permissions in a targeted way instead of making the user sign in again ([Specification: Scope Challenge](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#scope-challenge-handling)).

In our [report](/report), [awork](/wissen/awork-mcp) is the example where the chain can be traced from the outside: a sign-in prompt with `resource_metadata`, resource metadata, authorization server metadata with S256, and a registration endpoint for DCR.

:::box Three breakpoints that are easy to miss
- **200 instead of 401:** The server responds with 200 when no token is presented and puts the signpost only in the header. Claude then does not evaluate it.
- **No `code_challenge_methods_supported`:** The authorization server may support PKCE but does not say so. Specification-faithful clients abort.
- **Token passed through:** The MCP server forwards the user token unchanged to the backend API. The specification explicitly forbids this.
:::

## Without sign-in: when that is enough

Claude offers "No sign-in": anyone who knows the URL can use the connection. If the server requires an API key, you enter it as a request header, and Claude stores it as the connection's credentials ([Claude docs](https://claude.com/docs/connectors/custom/remote-mcp)). ChatGPT also knows a connection without sign-in ([OpenAI: Developer mode](https://developers.openai.com/api/docs/guides/developer-mode)).

For public data such as documentation or timetables, that is appropriate. For customer data, it lacks what OAuth provides: permissions per person and a revocation that affects only one user.

## Network: where Claude connects from

If you run your server behind a firewall or with conditional access, you need the source addresses. Anthropic gives `160.79.104.0/21` as the range for outbound traffic to your server ([Claude docs: Network reference](https://claude.com/docs/connectors/building/authentication)).

## The checklist

| Check | Requirement | Source |
|---|---|---|
| Endpoint | HTTPS, one path, POST; response as JSON or SSE | Specification, Transports |
| Version | `MCP-Protocol-Version` header on every POST; answer `server/discover` | Specification |
| Origin | check, `403` on an invalid value | Specification, Transports |
| No token | `401` with `WWW-Authenticate: … resource_metadata="…"` | Specification, Claude docs |
| Resource metadata | RFC 9728, `authorization_servers` field | Specification |
| Authorization server | RFC 8414 or OpenID Connect Discovery | Specification |
| PKCE | `S256` in `code_challenge_methods_supported` | Specification, Claude, OpenAI |
| Registration | CIMD; DCR as a stopgap | Specification |
| Token | check audience, pass nothing through | Specification |
| Redirect | allow `https://claude.ai/api/mcp/auth_callback` | Claude docs |

## Sources (as of September 22, 2026)

- MCP specification 2026-07-28: [Overview](https://modelcontextprotocol.io/specification/2026-07-28), [Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http), [Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization), [Client Registration](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration), [Security Considerations](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations), [server/discover](https://modelcontextprotocol.io/specification/2026-07-28/server/discover), [Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- Anthropic: [Custom connectors via remote MCP](https://claude.com/docs/connectors/custom/remote-mcp), [Authentication](https://claude.com/docs/connectors/building/authentication)
- OpenAI: [Developer mode](https://developers.openai.com/api/docs/guides/developer-mode), [Apps SDK: Authentication](https://developers.openai.com/apps-sdk/build/auth)

This list applies to specification 2026-07-28. The next version may change individual points again, just as 2026-07-28 abolished sessions and declared DCR deprecated.

**→ Whether your endpoint passes the first links of this chain is shown by the [free live test](/test): it checks reachability, `server/discover`, and whether your OAuth metadata is findable per RFC 9728.**
