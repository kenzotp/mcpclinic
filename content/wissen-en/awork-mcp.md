# awork MCP: What the best German agent access looks like, and what others can learn from it

*Target keywords: awork MCP, connect awork to Claude, awork AI agents, MCP server example*

**Meta-Description:** awork runs the currently best German MCP endpoint (53/100 in our report): OAuth 2.1 with PKCE, an open OpenAPI spec, a real server card. An analysis of why it works.

:::stat 53/100 | top score of the German MCP Report 2026: including a real server card under /.well-known/mcp.json

:::takeaway
- awork's endpoint passes the live test completely: clean 401 behavior, RFC 9728 OAuth discovery, server card.
- OAuth 2.1 with PKCE means: the agent acts on behalf of the logged-in user, with that user's permissions.
- 19 of the 21 vendors examined have nothing comparable; the window for latecomers is still open.
:::

---

In our [German MCP Report 2026](/report), we examined 21 German B2B SaaS APIs for agent readiness. awork leads the field by a clear margin: not because the product carries "AI" in its name, but because access is technically well built. A plain list would be boring, so let's look closely: what does awork do differently, and what does that mean for the rest of the market?

## What our live test found at awork

**1. An official MCP endpoint with a real standards-based login.** A hosted endpoint runs at `api.awork.com/api/v1/mcp`. Unauthenticated requests are cleanly rejected with 401, and the server reveals in a standards-compliant way how to sign in: `WWW-Authenticate` with resource metadata per RFC 9728. That sounds like a detail. It is the decisive detail. Exactly this mechanism is what lets clients like Claude or Copilot get through the login **without a manual**.

**2. OAuth 2.1 with PKCE and Dynamic Client Registration.** The login runs over awork's own OAuth infrastructure: an agent acts on behalf of the logged-in user, with that user's permissions. That is the prerequisite for the question every privacy department will ask: "Who just read what there?" Answer: the user, on whose behalf, with whose authorization.

**3. A maintained server card.** At `/.well-known/mcp.json` there is a machine-readable ID card for the endpoint: here awork implements a draft that has not even been finalized yet. Betting early on a standard that finds adoption is a classic advantage.

**4. The documentation does the rest.** A public OpenAPI description with 566 paths, a `developers.awork.com` section on the MCP server with guides for Claude Code, VS Code, and ChatGPT, plus llms.txt and a robots.txt that is explicitly agent-friendly. Anyone who wants to connect an agent finds everything without a support request.

## Why this is economically smart

awork sells to agencies and creative teams: a customer base that already uses AI assistants in its daily work. An official, restricted endpoint means for these customers: no DIY repos from GitHub, no third-party gateways passing their project data through, but the one path the vendor itself maintains. That turns a support topic ("how do I connect Claude to awork?") into a sales argument.

The report shows the vacancy: **19 of the 21 vendors examined have nothing comparable.** The distance between awork and the field is at the same time a window of opportunity: for latecomers it is cheaper to follow now than to build later against established expectations.

## The lesson for German SaaS vendors

The building blocks are known, and in our [MCP-Endpoint-Build](/mcp-server-entwickeln) they are standard: an endpoint in front of the existing API, OAuth on behalf of the user, scopes per tool, confirmation requirements for write actions, audit logging, descriptions a language model understands correctly. None of this is research. It is clean engineering work over 2–4 weeks.

**→ Want to know where your API stands compared to awork? [Free MCP live test](/test), or the [Agent-Readiness-Audit](/mcp-audit) with live agent tests and a fix plan.**
