# heise developer Pitch: „Was beim MCP-Bau wirklich schiefgeht"

**An:** heise developer (Redaktion)
**Von:** Mika Niedbala (MCP Clinic)
**Format:** Fachartikel-Vorschlag, 1.500–2.500 Wörter + Code-Beispiele
**Timing:** Versand ~Woche 6 (wenn 1–2 Audits geliefert wurden → echte
Beispiele statt nur Demo). Entwurf fertig, Freigabe Mika.

---

Betreff: Artikelvorschlag „MCP-Server produktiv betreiben": die Fehler, die
uns bei 21 deutschen SaaS-APIs begegnet sind

Hallo heise-developer-Team,

ich baue MCP-Server für den Produktivbetrieb und habe zuletzt 21 deutsche
B2B-SaaS-APIs automatisiert auf Agenten-Fähigkeit geprüft (Ergebnisse
öffentlich: mcpclinic.dev/report). Ergebnis: 3 von 21 bieten MCP an, 15
haben keine maschinenlesbare API-Doku, und bei den Community-Anbindungen,
die es gibt, wiederholen sich dieselben Fehler.

Aus der Praxis vorgeschlagene Artikelthemen (wählbar, kombinierbar):

1. **Stateless umstellen:** Was die Spezifikation 2026-07-28 konkret ändert
   (Sitzungsmodell → per-Request-Metadaten, server/discover), welche Fehler
   beim Migration eines Bestandsservers passieren, und wo Rückwärts-
   kompatibilität endet. Mit Migrationsbeispiel in TypeScript.

2. **Die sechs Sicherheitslücken in MCP-Anbindungen:** Offene Endpunkte,
   ein Key für alles, fehlende Idempotenz bei Schreibaktionen, Mandanten-
   trennung über Tool-Argumente, irreführende Tool-Beschreibungen,
   ungeklärte Modellprovider-Datenflüsse. Je Fall: Wie der Fehler aussieht,
   wie ein Agent daran scheitert (oder Schaden anrichtet), wie der Fix
   aussieht.

3. **Tool-Beschreibungen sind Code:** Warum Beschreibungen die wichtigste
   Schnittstelle am MCP-Server sind, wie man sie regressionstestet (3
   Modell-Clients, 10 Aufgaben), und was „gut" messbar bedeutet.

Ich bin Einzelunternehmer aus Sankt Augustin und baue MCP-Server im
Kundenauftrag. Belege (Probe-Ergebnisse, Testprotokolle) können vollständig
bereitgestellt werden. Keine Produktwerbung im Artikel; das Projekt nenne ich
nur im Autorenprofil.

Über eine Rückmeldung freue ich mich.

Mika Niedbala · MCP Clinic · mcpclinic.dev

---

*Hinweis intern: heise nimmt Pitches meist über das Kontaktformular oder
direkte Redakteurskontakte. Wenn ein bekannter heise-Autor im Netzwerk ist:
empfohlener Weg. Der Artikel selbst wäre für uns Autorität + Backlink +
GSC-Autoritätsschub in einem.*
