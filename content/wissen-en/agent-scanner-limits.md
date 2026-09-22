# What free agent scanners do not check, and why a 40/100 from one is not a passing grade

*Target keywords: agent readiness scanner, isitagentready, MCP audit, check API agent readiness*

**Meta-Description:** Free scanners check whether files exist. We send real agents against your API. The difference between a surface score and operational readiness: in detail.

:::takeaway
- Scanners check the facade: files, headers, endpoint behavior without login.
- Whether an agent picks the right tool, writes safely, and separates tenants is visible only to a live test.
- Sensible order: the free scan first. If it comes out well, the audit decides operational readiness.
:::

---

There are now several free "agent readiness" checks: Cloudflare's [isitagentready.com](https://isitagentready.com), various SEO providers, individual blog tools. They are useful. We run one ourselves ([MCP live test](/test)). But it is important to understand where their range of measurement ends. Because between "a scanner says 40/100" and "an agent can work with your API" lies an entire engineering discipline.

## What scanners see: the facade

Free scanners check public files and headers. Typical checks:

- Is there a `llms.txt`?
- Does the `robots.txt` state how AI crawlers are treated?
- Is an OpenAPI description available at a standard path?
- Is there an MCP server card document?
- Does an endpoint under `/mcp` respond with anything?

That is the **facade**, and it is not worthless: anyone without a single one of these files is not agent-ready, period. Our own live test operates in the same class and additionally checks the MCP handshake, OAuth discovery per RFC 9728/8414, and the quality of tool descriptions.

## What scanners cannot see: operations

Everything that matters after an agent has signed in happens behind authentication, and that is exactly where scanners stop. What remains open are the questions software decision-makers actually want to judge:

| Question | Scanner | Our audit |
|---|---|---|
| Does the agent find the right tool? | ✗ | 10 standard tasks with 3 models, logged |
| Does it formulate correct arguments or hallucinate IDs? | ✗ | Step-by-step trace per task |
| Can it keep working after an error? | ✗ | Error and recovery behavior in the log |
| Is "read-only" technically enforced or only promised? | ✗ | Scope and permission review |
| What happens on "delete the test contact"? | ✗ | Destructive actions only in staging, with a log |
| Can tenant A see tenant B? | ✗ | Isolation test at the separation boundary |
| Which customer data flows into which model? | ✗ | GDPR layer: data flows, DPA requirement, log retention |
| Is access performed on behalf of the signed-in user? | ✓/✗ (headers only) | Full login chain including token exchange |

## Why "scanner vs. audit" is not a competition but a logical order

We are not selling scanner rejection; we run one ourselves. The sensible reading is a triage:

1. **Scanner bad** → there is foundational work to do (no docs, no MCP, no login pattern). The good part: that is cheap to measure and often quick to fix.
2. **Scanner good** → now it gets interesting: exactly then, in live operation, it is decided whether the score holds up. A scanner score of 40/100 with a clean OAuth setup can be more production-ready than a score of 70/100 without any testing of write actions.

Our recommendation in customer conversations is therefore banal and honest: **start with the free test. If it goes well, only then is it worth asking whether you need the [audit](/mcp-audit).** And if the test goes badly, you still come away with something concrete: a list of deficiencies ordered by priority.

## The point

A scanner tells you whether the door exists. An audit tells you whether someone walking through that door will not break their foot down there, and what it would cost to fix. For a decision about selling agent access to your product, only the second is a sound basis.

**→ [Start the MCP live test](/test) (free) · [View the Agent Readiness Audit](/mcp-audit) (€2,400 flat fee)**
