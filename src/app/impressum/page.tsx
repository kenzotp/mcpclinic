import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = { title: "Impressum — MCP Clinic" };

export default function Impressum() {
  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-2xl px-6 pb-10 pt-40 text-sm leading-relaxed">
        <h1 className="font-display text-3xl font-extralight">Impressum</h1>
        <div className="mt-8 flex flex-col gap-5 text-[var(--ink-2)]">
          <p>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz). Diensteanbieter:</p>
          <p className="text-[var(--ink)]">
            Einzelunternehmen, geführt unter der Geschäftsbezeichnung „MCP Clinic“
            <br />
            Inhaber: Mika Niedbala
            <br />
            c/o Online-Impressum
            <br />
            Europaring 90
            <br />
            53757 Sankt Augustin
            <br />
            Deutschland
          </p>
          <p>
            Kontakt: <a className="underline decoration-[var(--hairline)] underline-offset-4 transition-colors hover:text-[var(--ink)]" href="mailto:info@zuuna.de">info@zuuna.de</a>
          </p>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE464571290
          </p>
          <p>
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Mika Niedbala, Anschrift wie oben.
          </p>
          <p className="text-[var(--ink-3)]">
            Hinweis: Bei einem Einzelunternehmen ist der bürgerliche Name des Inhabers anzugeben;
            „MCP Clinic“ ist die Geschäftsbezeichnung und ersetzt den Namen nicht.
          </p>
        </div>
      </main>
      <Footer lang="de" />
    </>
  );
}
