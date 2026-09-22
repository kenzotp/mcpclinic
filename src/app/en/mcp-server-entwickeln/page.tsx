import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "MCP Server Development: from €8,000 fixed price | MCP Clinic",
  description:
    "A production-ready MCP endpoint in front of your API: OAuth, scopes per tool, idempotency, confirmation requirements, audit log. 2–4 weeks, fixed price after the audit.",
  alternates: {
    canonical: "https://mcpclinic.dev/en/mcp-server-entwickeln",
    languages: {
      en: "https://mcpclinic.dev/en/mcp-server-entwickeln",
      "de-DE": "https://mcpclinic.dev/mcp-server-entwickeln",
    },
  },
};

const LEISTUNGEN = [
  { t: "Standard architecture", d: "TypeScript, Streamable HTTP, current specification level (2026-07-28). A proven template instead of a one-off build." },
  { t: "OAuth in the user's name", d: "Per-user login wherever your API provides it; restricted service keys otherwise. The agent acts on behalf of the logged-in user." },
  { t: "Permissions per tool", d: "Read and write kept separately separable, tenant separation at the tool level. \u201cThis agent may only read invoices\u201d is enforced technically." },
  { t: "Safe write operations", d: "Idempotency keys, confirmation requirements for destructive operations, a complete audit log without sensitive values." },
  { t: "Descriptions that work", d: "Every tool worded so that language models pick it correctly: regression-tested with 3 model clients." },
  { t: "Handover, not lock-in", d: "Tests, operations manual, Docker. Runs in your infrastructure or in our EU environment (+€49/month)." },
];

const ABLAUF = [
  { k: "1", t: "Audit", d: "The fix plan from the audit defines tools, scopes, and security requirements." },
  { k: "2", t: "Build", d: "2–4 weeks. Weekly status, test instance from week 1." },
  { k: "3", t: "Acceptance", d: "Regression test with 3 model clients, acceptance tests, handover with manual." },
];

export default function EnBuildPage() {
  return (
    <>
      <Nav lang="en" />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">MCP Endpoint Build</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-extralight leading-tight tracking-tight md:text-5xl">
            The official path for agents: built, logged, handed over.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">
            A production-ready MCP server in front of your existing API: one API, up to 20 tools,
            fixed price based on audit scope. Your customers stop assembling wrappers from GitHub.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass mt-10 flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between" data-field-cta>
            <div>
              <div className="font-display text-2xl font-extralight">from €8,000</div>
              <div className="text-sm text-[var(--ink-2)]">Fixed price after audit · 2–4 weeks · one API, up to 20 tools</div>
            </div>
            <Link
              href="/en/mcp-audit"
              className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Start with the audit <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>

        <section className="mt-20">
          <Reveal><h2 className="font-display text-2xl font-light">Included</h2></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {LEISTUNGEN.map((x, i) => (
              <Reveal key={x.t} delay={i * 70}>
                <div className="glass h-full rounded-2xl p-6">
                  <div className="font-display text-base font-medium">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <Reveal><h2 className="font-display text-2xl font-light">Process</h2></Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {ABLAUF.map((a) => (
              <Reveal key={a.k}>
                <div className="glass flex items-start gap-6 rounded-2xl p-6">
                  <div className="font-display shrink-0 text-xs tracking-[0.25em] text-[var(--ink-3)]">{a.k}</div>
                  <div>
                    <div className="font-display text-base font-medium">{a.t}</div>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--ink-2)]">{a.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <Reveal>
            <div className="glass rounded-2xl p-7">
              <h2 className="font-display text-lg font-medium">Common questions</h2>
              <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-[var(--ink-2)]">
                <p><strong className="text-[var(--ink)]">Maintenance afterwards?</strong> Optionally an operations retainer (€400–800/month): specification changes, monthly regression test, priority fixes.</p>
                <p><strong className="text-[var(--ink)]">Ownership?</strong> You receive usage rights to the complete system; our standard components remain available for other customers.</p>
                <p><strong className="text-[var(--ink)]">Hosting?</strong> Runs in your infrastructure or in our EU environment. German SMEs can additionally apply for BAFA funding for the audit consulting; we prepare the application.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mt-16 text-center">
          <Reveal>
            <p className="text-sm text-[var(--ink-2)]">Every fixed price is based on the audit.</p>
            <Link
              href="/en/mcp-audit"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              See the Agent-Readiness Audit <ArrowRight size={14} weight="bold" />
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}
