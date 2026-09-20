import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Platzhalter — finale Datenschutzerklärung vor Launch (Entität + eingesetzte
// Provider für den Live-Test: die Probe sendet KEINE Nutzerdaten an Modellprovider,
// es werden nur öffentliche URLs der Ziel-Systems abgerufen; Speicherung anonymisiert).
export const metadata = { title: "Datenschutz — MCP Clinic" };

export default function Datenschutz() {
  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-2xl px-6 pb-10 pt-40 text-sm leading-relaxed">
        <h1 className="font-display text-3xl font-extralight">Datenschutz</h1>
        <div className="mt-8 flex flex-col gap-4 text-[var(--ink-2)]">
          <p>
            Der MCP-Live-Test überträgt ausschließlich die von Ihnen eingegebene öffentliche
            URL. Es erfolgt keine Weitergabe von Daten an KI-Modellprovider. Ergebnisse werden
            anonymisiert (ohne Personenbezug) gespeichert, um aggregierte Statistiken im
            Deutscher MCP-Report zu pflegen.
          </p>
          <p>
            Hosting erfolgt auf Servern in Deutschland. Server-Logfiles werden gemäß den
            üblichen Löschfristen des Betreibers verarbeitet.
          </p>
          <p className="text-[var(--ink-3)]">
            Hinweis intern: Platzhalter. Vor Launch vollständige Erklärung (Verantwortlicher,
            Rechtsgrundlagen, Kontakt) — hängt an der Entitäts-Entscheidung.
          </p>
        </div>
      </main>
      <Footer lang="de" />
    </>
  );
}
