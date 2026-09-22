import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TestInput from "@/components/TestInput";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const STATS = [
  { n: "4/21", t: "German B2B SaaS APIs ship their own MCP endpoint" },
  { n: "14/21", t: "provide no machine-readable API description at all" },
  { n: "9/21", t: "run static keys: delegated agent access is impossible" },
];

const WEG = [
  { k: "01", t: "Test", d: "Free, automated, under a minute. Score 0–100 with a findings list." },
  { k: "02", t: "Audit", d: "Real agents, live against your API. Security and GDPR review. €2,400 fixed." },
  { k: "03", t: "Build", d: "A production-grade MCP endpoint in front of your API. From €8,000, 2–4 weeks." },
];

const SERVICES = [
  { t: "MCP Live-Test", p: "free", d: "Your public surface checked: handshake, OAuth discovery, docs, crawler policy. Instantly." },
  { t: "Agent-Readiness Audit", p: "€2,400", d: "Live agent-flow tests with 3 models, auth and write-safety review, GDPR layer, fix plan. 2–3 days." },
  { t: "MCP Endpoint Build", p: "from €8,000", d: "Production MCP server: OAuth, scopes, idempotency, confirmation gates, audit log. 2–4 weeks." },
  { t: "Operations Retainer", p: "€400–800/mo", d: "Spec-change watch, monthly agent regression test, priority fixes." },
];

export default function EnHome() {
  return (
    <>
      <Nav lang="en" />
      <section data-field-hero className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display max-w-4xl text-4xl font-extralight leading-[1.15] tracking-tight md:text-6xl md:leading-[1.12]">
          Your customers already use AI agents.
          <span className="text-[var(--ink-3)]"> Your software doesn&apos;t know it yet.</span>
        </h1>
        <TestInput lang="en" />
        <p className="mt-6 text-xs text-[var(--ink-3)]">Free · under a minute · no credentials</p>
        <div className="absolute bottom-8 text-[var(--ink-3)]">
          <div className="h-8 w-px animate-pulse bg-[var(--hairline)]" />
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <Reveal><p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">German MCP Report 2026</p></Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="font-display text-5xl font-extralight tracking-tighter">{s.n}</div>
              <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-[var(--ink-2)]">{s.t}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <Link href="/report" className="mt-10 inline-flex items-center gap-2 text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
            Read the report: 21 APIs, tested and named <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>

      <section id="weg" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <Reveal><p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">The process</p></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {WEG.map((w, i) => (
            <Reveal key={w.k} delay={i * 100}>
              <div className="glass h-full rounded-2xl p-7">
                <div className="font-display text-xs tracking-[0.25em] text-[var(--ink-3)]">{w.k}</div>
                <div className="font-display mt-4 text-xl font-medium">{w.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="angebote" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <Reveal><p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Services — fixed prices, published</p></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SERVICES.map((a, i) => (
            <Reveal key={a.t} delay={i * 90}>
              <div className="glass flex h-full flex-col rounded-2xl p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-display text-lg font-medium">{a.t}</div>
                  <div className="font-display shrink-0 text-sm text-[var(--ink-2)]">{a.p}</div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={160}>
          <div className="mt-12 flex justify-center" data-field-cta>
            <Link href="/en/test" className="glass-strong flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03]">
              Run your free test <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer lang="en" />
    </>
  );
}
