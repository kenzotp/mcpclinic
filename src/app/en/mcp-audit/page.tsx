import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TrackedLink from "@/components/TrackedLink";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Agent-Readiness Audit: €2,400 fixed price | MCP Clinic",
  description:
    "Live agent tests with 3 models, an auth and write-safety review, a GDPR layer, and a prioritized fix plan. What free scanners cannot see, in 2–3 days.",
  alternates: {
    canonical: "https://mcpclinic.dev/en/mcp-audit",
    languages: {
      en: "https://mcpclinic.dev/en/mcp-audit",
      "de-DE": "https://mcpclinic.dev/mcp-audit",
    },
  },
};

const TAG1 = [
  { t: "Live agent tests", d: "10 standard tasks (find invoices, create drafts, change addresses), executed by Claude, GPT, and a third model. Logged: which tool was chosen, where it failed, how the agent recovered." },
  { t: "Auth & permissions", d: "Scopes per tool, delegated agent access (\u201cthis agent may only read\u201d), tenant separation, token lifetime." },
  { t: "Write safety", d: "Idempotency on retries, confirmation requirements for destructive operations, audit log, rate limits." },
  { t: "GDPR layer", d: "Data flows into model providers, DPA requirements, EU hosting options, log retention. Technical assessment, not legal advice." },
  { t: "Tool descriptions", d: "For every tool: current state, problem, rewritten draft. Verified with 3 model clients." },
  { t: "Fix plan", d: "15–25 page report: findings by severity, prioritized measures with effort estimates, an offer for the build." },
];

const ABLAUF = [
  { k: "Day 0", d: "Kickoff form: API host, test access (read-only), staging URL, constraints." },
  { k: "Day 1–2", d: "Assessment: automated surface check + live agent tests + reviews." },
  { k: "Day 3", d: "Report + 45-minute handover call with the three most important findings, demonstrated live." },
];

export default function EnAuditPage() {
  return (
    <>
      <Nav lang="en" />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Agent-Readiness Audit</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-extralight leading-tight tracking-tight md:text-5xl">
            What a real agent does with your API, before your customers do.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">
            The free live test shows the surface. The audit shows operations: we send real
            agents against your API, examine authentication, write operations, and GDPR data flows,
            and deliver the fix plan at a fixed price.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass mt-10 flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between" data-field-cta>
            <div>
              <div className="font-display text-2xl font-extralight">€2,400</div>
              <div className="text-sm text-[var(--ink-2)]">Fixed price · 2–3 business days · re-audit within 60 days: €600</div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <TrackedLink
                href="https://buy.stripe.com/14AfZa4T4goL5MJ2VTc3m00"
                event="audit-cta-click"
                source="mcp-audit-en"
                className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Book the audit directly: €2,400 <ArrowRight size={14} weight="bold" />
              </TrackedLink>
              <a
                href="mailto:info@zuuna.de?subject=Agent-Readiness-Audit"
                className="px-2 text-xs text-[var(--ink-3)] underline decoration-[var(--hairline)] underline-offset-4 transition-colors hover:text-[var(--ink-2)]"
              >
                or ask questions first: info@zuuna.de
              </a>
            </div>
          </div>
        </Reveal>

        <section className="mt-20">
          <Reveal><h2 className="font-display text-2xl font-light">What gets tested</h2></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {TAG1.map((x, i) => (
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
          <Reveal><h2 className="font-display text-2xl font-light">How it runs</h2></Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {ABLAUF.map((a) => (
              <Reveal key={a.k}>
                <div className="glass flex items-start gap-6 rounded-2xl p-6">
                  <div className="font-display shrink-0 text-xs tracking-[0.25em] text-[var(--ink-3)]">{a.k}</div>
                  <p className="text-sm leading-relaxed text-[var(--ink-2)]">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <Reveal>
            <div className="glass rounded-2xl p-7">
              <h2 className="font-display text-lg font-medium">Included commitments</h2>
              <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-[var(--ink-2)]">
                <li>· Full logs of every agent test as an attachment: your evidence, not our claims</li>
                <li>· Prioritized fix plan with effort estimates (S/M/L) per measure</li>
                <li>· An offer for the MCP endpoint build (from €8,000, fixed price based on audit scope)</li>
                <li>· Re-audit within 60 days at a fixed price of €600</li>
                <li>· A technical snapshot: not legal advice, clearly anchored in the contract</li>
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="mt-16 text-center" data-field-cta>
          <Reveal>
            <p className="text-sm text-[var(--ink-2)]">Not convinced yet? The first step costs nothing.</p>
            <Link
              href="/en/test"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Start the free MCP live test <ArrowRight size={14} weight="bold" />
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}
