import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "MCP-Server entwickeln lassen: ab 8.000 € Festpreis | MCP Clinic",
  description:
    "Produktionsreifer MCP-Endpunkt vor Ihrer API: OAuth, Scopes pro Werkzeug, Idempotenz, Bestätigungspflicht, Audit-Protokoll. 2–4 Wochen, Festpreis nach Audit.",
};

const LEISTUNGEN = [
  { t: "Standardarchitektur", d: "TypeScript, Streamable HTTP, aktueller Spezifikationsstand (2026-07-28). Bewährtes Template statt Einzelbau." },
  { t: "OAuth im Nutzernamen", d: "Pro-Nutzer-Anmeldung, wo Ihre API sie hergibt; sonst eingeschränkte Service-Keys. Der Agent handelt im Namen des angemeldeten Nutzers." },
  { t: "Berechtigungen pro Werkzeug", d: "Lesen und Schreiben trennbar, Mandantentrennung auf Werkzeug-Ebene. „Dieser Agent darf nur Rechnungen lesen“ wird technisch erzwungen." },
  { t: "Sichere Schreibaktionen", d: "Idempotenz-Keys, Bestätigungspflicht für destruktive Operationen, vollständiges Audit-Protokoll ohne sensible Werte." },
  { t: "Beschreibungen, die funktionieren", d: "Jedes Werkzeug so formuliert, dass Sprachmodelle es korrekt wählen: regressionstestet mit 3 Modell-Clients." },
  { t: "Übergabe, nicht Abhängigkeit", d: "Tests, Betriebshandbuch, Docker. Läuft in Ihrer Infrastruktur oder in unserer EU-Umgebung (+49 €/Monat)." },
];

const ABLAUF = [
  { k: "1", t: "Audit", d: "Der Fixplan aus dem Audit definiert Werkzeuge, Scopes und Sicherheitsanforderungen." },
  { k: "2", t: "Bau", d: "2–4 Wochen. Wöchentlicher Stand, Testinstanz ab Woche 1." },
  { k: "3", t: "Abnahme", d: "Regressionstest mit 3 Modell-Clients, Abnahmetests, Übergabe mit Handbuch." },
];

export default function BuildPage() {
  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">MCP-Endpoint-Build</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-extralight leading-tight tracking-tight md:text-5xl">
            Der offizielle Weg für Agenten: gebaut, protokolliert, übergeben.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">
            Ein produktionsreifer MCP-Server vor Ihrer bestehenden API: eine API, bis zu 20 Werkzeuge,
            Festpreis nach Audit-Scope. Ihre Kunden hören auf, sich Wrapper von GitHub zusammenzusuchen.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass mt-10 flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between" data-field-cta>
            <div>
              <div className="font-display text-2xl font-extralight">ab 8.000 €</div>
              <div className="text-sm text-[var(--ink-2)]">Festpreis nach Audit · 2–4 Wochen · eine API, bis zu 20 Werkzeuge</div>
            </div>
            <Link
              href="/mcp-audit"
              className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Start über das Audit <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>

        <section className="mt-20">
          <Reveal><h2 className="font-display text-2xl font-light">Enthalten</h2></Reveal>
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
          <Reveal><h2 className="font-display text-2xl font-light">Ablauf</h2></Reveal>
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
              <h2 className="font-display text-lg font-medium">Häufige Fragen</h2>
              <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-[var(--ink-2)]">
                <p><strong className="text-[var(--ink)]">Wartung danach?</strong> Optional der Betriebs-Retainer (400–800 €/Monat): Spezifikationsänderungen, monatlicher Regressionstest, Prioritäts-Fixes.</p>
                <p><strong className="text-[var(--ink)]">Förderung?</strong> Als registrierte Beratungsstelle bereiten wir den BAFA-Antrag vor; für KMU ist die Audit-Beratung regelmäßig bezuschusst.</p>
                <p><strong className="text-[var(--ink)]">Eigentum?</strong> Sie erhalten Nutzungsrechte am kompletten System; unsere Standardbausteine bleiben weiterhin für andere Kunden einsetzbar.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mt-16 text-center">
          <Reveal>
            <p className="text-sm text-[var(--ink-2)]">Grundlage für jeden Festpreis ist das Audit.</p>
            <Link
              href="/mcp-audit"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Agent-Readiness-Audit ansehen <ArrowRight size={14} weight="bold" />
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer lang="de" />
    </>
  );
}
