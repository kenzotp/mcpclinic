import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// noindex wie Impressum — keine Indizierung der rechtlichen Seiten.
export const metadata = {
  title: "Datenschutz — MCP Clinic",
  robots: { index: false, follow: false },
};

// Kompakte Datenschutzerklärung für den Live-Test (v1). Keine Cookies, keine
// Tracker, keine Kontoanmeldung, keine Weitergabe an Modellprovider.
export default function Datenschutz() {
  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-2xl px-6 pb-10 pt-40 text-sm leading-relaxed">
        <h1 className="font-display text-3xl font-extralight">Datenschutz</h1>
        <div className="mt-8 flex flex-col gap-5 text-[var(--ink-2)]">
          <p>
            <strong className="text-[var(--ink)]">Verantwortlicher:</strong> Mika Niedbala
            (Einzelunternehmen, Geschäftsbezeichnung „Zuuna“), c/o Online-Impressum,
            Europaring 90, 53757 Sankt Augustin, E-Mail: info@zuuna.de. „MCP Clinic“ ist ein
            Produktangebot dieses Unternehmens.
          </p>
          <p>
            <strong className="text-[var(--ink)]">MCP-Live-Test:</strong> Wenn Sie den
            Live-Test nutzen, verarbeiten wir die von Ihnen eingegebene URL sowie technische
            Verbindungsdaten (IP-Adresse zur Durchsetzung des Nutzungslimits von 3 Tests pro
            Tag). Die Prüfung ruft ausschließlich öffentlich zugängliche Seiten des von Ihnen
            angegebenen Zielsystems ab. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. f DSGVO
            (Vertragsanbahnung bzw. berechtigtes Interesse am Betrieb des Angebots).
          </p>
          <p>
            <strong className="text-[var(--ink)]">Keine Weitergabe an KI-Provider:</strong> Der
            Live-Test nutzt keine Sprachmodelle. Ihre Eingaben werden nicht an Modellprovider
            übertragen.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Speicherung:</strong> Prüfergebnisse werden
            anonymisiert (ohne Personenbezug und ohne Verbindung zu Ihrer IP-Adresse) gespeichert,
            um aggregierte Auswertungen im Deutscher MCP-Report zu pflegen. IP-Adressen zur
            Limit-Kontrolle werden spätestens täglich gelöscht.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Server-Logfiles:</strong> Beim Aufruf der Seite
            werden technisch notwendige Logdaten (u. a. IP-Adresse, Zeitpunkt, abgerufene Seite)
            verarbeitet; Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO. Hosting erfolgt auf Servern
            in Deutschland.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Keine Cookies, keine Tracker:</strong> Diese
            Seite setzt keine Marketing- oder Analyse-Cookies und bindet keine externen
            Tracking-Dienste ein.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Ihre Rechte:</strong> Sie haben Rechte auf
            Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
            und Widerspruch (Art. 15–21 DSGVO) sowie ein Beschwerderecht bei einer
            Aufsichtsbehörde. Für Anfragen: info@zuuna.de
          </p>
        </div>
      </main>
      <Footer lang="de" />
    </>
  );
}
