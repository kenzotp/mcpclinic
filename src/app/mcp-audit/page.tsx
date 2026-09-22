import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TrackedLink from "@/components/TrackedLink";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Agent-Readiness-Audit: 2.400 € Festpreis | MCP Clinic",
  alternates: {
    canonical: "https://mcpclinic.dev/mcp-audit",
    languages: {
      "de-DE": "https://mcpclinic.dev/mcp-audit",
      en: "https://mcpclinic.dev/en/mcp-audit",
    },
  },
  description:
    "Live-Agententests mit 3 Modellen, Auth- und Schreib-Sicherheitsreview, DSGVO-Layer, priorisierter Fixplan. Was kostenlose Scanner nicht sehen können, in 2–3 Tagen.",
};

const TAG1 = [
  { t: "Live-Agententests", d: "10 Standardaufgaben (Rechnungen finden, Entwürfe anlegen, Adressen ändern), ausgeführt von Claude, GPT und einem dritten Modell. Protokolliert: welches Werkzeug gewählt, wo es scheitert, wie sich der Agent erholt." },
  { t: "Auth & Berechtigungen", d: "Scopes pro Werkzeug, delegierte Agentenzugriffe („dieser Agent darf nur lesen“), Mandantentrennung, Token-Lebensdauer." },
  { t: "Schreib-Sicherheit", d: "Idempotenz bei Wiederholung, Bestätigungspflicht bei destruktiven Aktionen, Audit-Protokoll, Rate-Limits." },
  { t: "DSGVO-Layer", d: "Datenflüsse in Modellprovider, AVV-Bedarf, EU-Hosting-Optionen, Protokoll-Aufbewahrung. Technische Einordnung, keine Rechtsberatung." },
  { t: "Werkzeug-Beschreibungen", d: "Für jedes Tool: Ist-Zustand, Problem, Neuentwurf. Verifiziert mit 3 Modell-Clients." },
  { t: "Fixplan", d: "15–25 Seiten Bericht: Befunde nach Schweregrad, priorisierte Maßnahmen mit Aufwandsschätzung, Angebot für den Bau." },
];

const ABLAUF = [
  { k: "Tag 0", d: "Kickoff-Formular: API-Host, Test-Zugang (read-only), Staging-URL, Einschränkungen." },
  { k: "Tag 1–2", d: "Prüfung: automatisierte Oberflächenprüfung + Live-Agententests + Reviews." },
  { k: "Tag 3", d: "Bericht + 45-Minuten-Übergabegespräch mit den drei wichtigsten Befunden, live demonstriert." },
];

export default function AuditPage() {
  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Agent-Readiness-Audit</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-extralight leading-tight tracking-tight md:text-5xl">
            Was ein echter Agent aus Ihrer API macht, bevor Ihre Kunden es tun.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">
            Der kostenlose Live-Test zeigt die Oberfläche. Das Audit zeigt den Betrieb: Wir schicken
            echte Agenten gegen Ihre API, prüfen Authentifizierung, Schreibaktionen und DSGVO-Datenflüsse,
            und liefern den Fixplan zum Festpreis.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass mt-10 flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between" data-field-cta>
            <div>
              <div className="font-display text-2xl font-extralight">2.400 €</div>
              <div className="text-sm text-[var(--ink-2)]">Festpreis · 2–3 Arbeitstage · Re-Audit in 60 Tagen: 600 €</div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <TrackedLink
                href="https://buy.stripe.com/14AfZa4T4goL5MJ2VTc3m00"
                event="audit-cta-click"
                source="mcp-audit"
                className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Audit direkt buchen: 2.400 € <ArrowRight size={14} weight="bold" />
              </TrackedLink>
              <a
                href="mailto:info@zuuna.de?subject=Agent-Readiness-Audit"
                className="px-2 text-xs text-[var(--ink-3)] underline decoration-[var(--hairline)] underline-offset-4 transition-colors hover:text-[var(--ink-2)]"
              >
                oder zuerst Fragen stellen: info@zuuna.de
              </a>
            </div>
          </div>
        </Reveal>

        <section className="mt-20">
          <Reveal><h2 className="font-display text-2xl font-light">Geprüft wird</h2></Reveal>
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
          <Reveal><h2 className="font-display text-2xl font-light">Ablauf</h2></Reveal>
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
              <h2 className="font-display text-lg font-medium">Enthaltene Zusagen</h2>
              <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-[var(--ink-2)]">
                <li>· Prüfprotokolle aller Agententests als Anhang: Ihre Evidenz, nicht unsere Behauptung</li>
                <li>· Priorisierter Fixplan mit Aufwandsschätzung (S/M/L) je Maßnahme</li>
                <li>· Angebot für den MCP-Endpoint-Build (ab 8.000 €, Festpreis nach Audit-Scope)</li>
                <li>· Re-Audit innerhalb von 60 Tagen zum Festpreis von 600 €</li>
                <li>· Technische Momentaufnahme: keine Rechtsberatung, klar im Vertrag verankert</li>
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="mt-16 text-center" data-field-cta>
          <Reveal>
            <p className="text-sm text-[var(--ink-2)]">Noch nicht überzeugt? Der erste Schritt kostet nichts.</p>
            <Link
              href="/test"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              MCP-Live-Test kostenlos starten <ArrowRight size={14} weight="bold" />
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer lang="de" />
    </>
  );
}
