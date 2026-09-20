import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Platzhalter — rechtliche Angaben hängen von Mikas Entitäts-Entscheidung ab.
// VOR dem öffentlichen Launch auf mcpclinic.dev zwingend ausfüllen.
export const metadata = { title: "Impressum — MCP Clinic" };

export default function Impressum() {
  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-2xl px-6 pb-10 pt-40 text-sm leading-relaxed">
        <h1 className="font-display text-3xl font-extralight">Impressum</h1>
        <div className="mt-8 flex flex-col gap-4 text-[var(--ink-2)]">
          <p>Angaben gemäß § 5 TMG / § 5 DDG:</p>
          <p className="text-[var(--ink)]">
            MCP Clinic
            <br />
            [OFFEN: Rechtsträger / Name]
            <br />
            [OFFEN: Anschrift]
            <br />
            [OFFEN: Kontakt-E-Mail]
          </p>
          <p>Umsatzsteuer-ID: [OFFEN]</p>
          <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: [OFFEN]</p>
          <p className="text-[var(--ink-3)]">
            Hinweis intern: Diese Seite ist Platzhalter. Vor Launch auf mcpclinic.dev
            ausfüllen (hängt an der Entitäts-Entscheidung).
          </p>
        </div>
      </main>
      <Footer lang="de" />
    </>
  );
}
