import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TestInput from "@/components/TestInput";
import { wissenAll } from "@/lib/wissen";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

// Deutsche Landing — sechs Beats über einem fortlaufenden Feld.
// 1 Hero (Stimmung + Test-Eingabe) · 2 Zahlen · 3 Weg · 4 Report · 5 Angebote · 6 Footer

const STATS = [
  { n: "2/21", t: "deutsche B2B-SaaS-APIs haben einen eigenen MCP-Endpunkt" },
  { n: "15/21", t: "stellen keine maschinenlesbare API-Beschreibung bereit" },
  { n: "9/21", t: "arbeiten mit statischen Keys — Agenten-Delegation unmöglich" },
];

const WEG = [
  { k: "01", t: "Test", d: "Kostenlos, automatisch, unter einer Minute. Score 0–100 mit Mängelliste." },
  { k: "02", t: "Audit", d: "Echte Agenten, live gegen Ihre API. Sicherheits- und DSGVO-Review. 2.400 € fest." },
  { k: "03", t: "Build", d: "Produktionsreifer MCP-Endpunkt vor Ihrer API. Ab 8.000 €, 2–4 Wochen." },
];

const ANGEBOTE = [
  { t: "MCP-Live-Test", p: "kostenlos", d: "Öffentliche Oberfläche geprüft: Handshake, OAuth-Discovery, Doku, Crawler-Politik. Sofort." },
  { t: "Agent-Readiness-Audit", p: "2.400 €", d: "Live-Agententests mit 3 Modellen, Auth- und Schreib-Sicherheitsreview, DSGVO-Layer, Fixplan. 2–3 Tage." },
  { t: "MCP-Endpoint-Build", p: "ab 8.000 €", d: "Produktionsreifer MCP-Server: OAuth, Scopes, Idempotenz, Bestätigungspflicht, Protokoll. 2–4 Wochen." },
  { t: "Betriebs-Retainer", p: "400–800 €/Monat", d: "Spezifikationsänderungen beobachten, monatlicher Regressionstest, Prioritäts-Fixes." },
];

export default async function Home() {
  const posts = (await wissenAll()).slice(0, 5);
  return (
    <>
      <Nav lang="de" />

      {/* 1 · HERO — mood before product */}
      <section data-field-hero className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display max-w-4xl text-4xl font-extralight leading-[1.15] tracking-tight md:text-6xl md:leading-[1.12]">
          Deine Kunden nutzen schon KI-Agenten.
          <span className="text-[var(--ink-3)]"> Deine Software weiß es nicht.</span>
        </h1>
        <TestInput lang="de" />
        <p className="mt-6 text-xs text-[var(--ink-3)]">
          Kostenlos · unter einer Minute · keine Zugangsdaten
        </p>
        <div className="absolute bottom-8 text-[var(--ink-3)]">
          <div className="h-8 w-px animate-pulse bg-[var(--hairline)]" />
        </div>
      </section>

      {/* 2 · ZAHLEN — der Report als Stand der Nation */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Deutscher MCP-Report 2026</p>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="font-display text-5xl font-extralight tracking-tighter">{s.n}</div>
              <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-[var(--ink-2)]">{s.t}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <Link href="/report" className="mt-10 inline-flex items-center gap-2 text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
            Zum Report — 21 APIs, geprüft und benannt <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>

      {/* 3 · WEG — die Klinik: Diagnose, Befund, Heilung */}
      <section id="weg" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Der Weg</p>
        </Reveal>
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

      {/* 4 · REPORT — die Tabelle als Artefakt */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Aus dem Report</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="glass mt-10 overflow-hidden rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-[var(--ink-3)]">
                  <th className="px-6 py-4 font-medium">Unternehmen</th>
                  <th className="px-6 py-4 font-medium">Score</th>
                  <th className="hidden px-6 py-4 font-medium md:table-cell">MCP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["awork", "53/100", "offiziell"],
                  ["seven.io", "30/100", "offiziell"],
                  ["JTL-Software", "18/100", "—"],
                  ["Xentral ERP", "18/100", "—"],
                  ["easybill", "15/100", "—"],
                ].map(([n, s, m]) => (
                  <tr key={n} className="hairline-t transition-colors hover:bg-white/[0.03]">
                    <td className="px-6 py-3.5">{n}</td>
                    <td className="px-6 py-3.5 text-[var(--ink-2)]">{s}</td>
                    <td className="hidden px-6 py-3.5 text-[var(--ink-2)] md:table-cell">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <Link href="/report" className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
            Vollständiges Ranking — 21 Unternehmen <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>

      {/* 5 · WISSEN — Teaser der Analysen */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Wissen</p>
        </Reveal>
        <div className="mt-6 flex flex-col">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 4) * 60}>
              <Link href={`/wissen/${p.slug}`} className="hairline-t group flex items-center justify-between gap-6 py-5">
                <span className="font-display text-base font-medium transition-colors group-hover:text-[var(--ink-2)]">
                  {p.title}
                </span>
                <ArrowRight size={15} className="shrink-0 text-[var(--ink-3)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--ink)]" />
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={140}>
          <Link href="/wissen" className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
            Alle Analysen <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>

      {/* 6 · ANGEBOTE — Festpreise öffentlich */}
      <section id="angebote" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Angebote — Festpreise, öffentlich</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {ANGEBOTE.map((a, i) => (
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
            <Link
              href="/test"
              className="glass-strong flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03]"
            >
              Jetzt testen — kostenlos <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer lang="de" />
    </>
  );
}
