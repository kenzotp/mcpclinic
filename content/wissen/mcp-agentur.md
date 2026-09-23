# Die MCP-Agentur: Worauf Sie bei der Auswahl achten sollten

*Ziel-Keywords: MCP-Agentur, MCP-Agentur Deutschland, MCP-Beratung, MCP Consulting, MCP-Entwicklung Agentur*

**Meta-Description:** Eine MCP-Agentur zu finden ist einfach, eine gute ist selten. Acht Kriterien, an denen Sie einen Partner für Ihren MCP-Endpunkt in 30 Minuten erkennen, plus die roten Flaggen.

:::stat 8 Kriterien | an denen Sie eine MCP-Agentur im Erstgespräch erkennen, bevor ein Euro geflossen ist

:::takeaway
- Der Markt wächst schnell: Agenturen bieten MCP-Entwicklung und MCP-Beratung an, internationale und deutsche. Qualität ist derzeit der Engpass, nicht Verfügbarkeit.
- Acht Kriterien entscheiden: Spezifikationsstreue, OAuth mit echter Delegation, Scopes pro Werkzeug, Idempotenz, Audit-Protokoll, Regressionstests mit Modell-Clients, DSGVO-Kette, Übergabe ohne Lock-in.
- Rote Flaggen: Angebote ohne Test-Zugang, Proxy-only-Lösungen als Endpreis, keine Antwort auf die Frage nach destruktiven Aktionen.
- Fordern Sie einen Fixplan gegen einen festen Umfang. Wer Scope erst nach Unterschrift definiert, wird ihn nie definieren.
:::

---

Die Nachfrage nach MCP-Endpunkten wächst schneller als das Angebot an Leuten, die sie sauber bauen. Entsprechend schnell entstehen Angebote: internationale [spezialisierte Agenturen](https://www.mcp-agency.com), deutsche Häuser mit [DSGVO-Fokus](https://www.workflow-agentur.com), Plattform-Anbieter und einzelne Freelancer. Für einen SaaS-Hersteller, der [MCP-fähig werden will](/wissen/mcp-faehig-machen), ist der Markt damit unübersichtlich geworden: Wer kann es wirklich?

Diese Auswahlhilfe ist aus unserer eigenen Praxis geschrieben: Wir bauen [MCP-Endpunkte](/mcp-server-entwickeln) und haben im [Deutscher MCP-Report 2026](/report) 21 deutsche B2B-SaaS-APIs mit demselben Prüfraster gemessen, das wir unten als Kriterienliste verwenden. Nehmen Sie die Liste zu jedem Erstgespräch mit, auch zu uns.

## Die acht Kriterien

1. **Spezifikationsstreue:** Fragt die Agentur nach der aktuellen [Spezifikationsversion](https://modelcontextprotocol.io/specification/2026-07-28), nach Streamable HTTP, nach server/discover? Wer "SSE reicht auch" sagt, ohne die Ablösung zu erwähnen, baut auf der Streichliste.
2. **OAuth mit echter Delegation:** Werkzeuge dürfen nicht an einem globalen API-Key hängen. Gefragt ist OAuth im Nutzernamen mit Scopes: "dieser Agent darf nur Rechnungen lesen" muss technisch erzwingbar sein, nicht versprochen.
3. **Scopes pro Werkzeug:** Lesen und Schreiben trennbar, Mandantentrennung auf Werkzeug-Ebene. Nachfragen: "Wie verhindern Sie, dass ein Agent Mandant B die Daten von Mandant A liest?"
4. **Idempotenz:** Agenten wiederholen Aufrufe. Wenn die Antwort auf "was passiert bei doppeltem Aufruf?" nicht "Idempotenz-Keys" enthält, werden Ihre Kunden doppelte Rechnungen finden.
5. **Bestätigungspflicht und Audit-Protokoll:** Destruktive Aktionen mit Bestätigung, jede Aktion protokolliert ohne sensible Werte. [Warum das die Zugangshälfte ist](/wissen/mcp-api-key-oauth).
6. **Regressionstests mit Modell-Clients:** Werkzeug-Beschreibungen sind Code. Nachfragen: "Mit wie vielen Modell-Clients testen Sie, ob das Sprachmodell die Werkzeuge korrekt wählt?" Drei sind der [Stand der Praxis](/wissen/mcp-tool-beschreibungen).
7. **DSGVO-Kette:** Wo laufen Modellaufrufe, wer ist Empfänger, gibt es AVVs? Eine MCP-Agentur, die diese Frage nicht strukturiert beantworten kann, hat sie noch nicht durchdacht.
8. **Übergabe ohne Lock-in:** Tests, Betriebshandbuch, Docker, Nutzungsrechte am Gesamtsystem. Wer nur "Betrieb über uns" anbietet, verkauft Abhängigkeit statt Fähigkeit.

## Die roten Flaggen

- **Kein Test-Zugang zum eigenen Ergebnis:** Eine Agentur, die MCP-Endpunkte baut, zeigt ihre Arbeit live. Wenn nichts vorzeigbar ist, ist nichts gebaut.
- **Proxy oder Gateway als Endpreis:** Beides hat seinen Platz [als Weg zum Testen](/wissen/self-host-oder-gateway). Als Endergebnis für ein Produkt mit Kundendaten taugen beide nicht.
- **"MCP können wir nebenbei":** Die Spezifikation bewegt sich (Stand 2026-07-28 hat Sitzungen abgeschafft und [DCR durch CIMD ersetzt](/wissen/remote-mcp-server)). Wer die Änderungsdynamik nicht im Erstgespräch erwähnt, liest sie nicht mit.
- **Keine Frage an Sie:** Eine gute Agentur fragt nach API-Host, Test-Zugängen, Staging und Einschränkungen, bevor sie einen Preis nennt.

## Was ein Angebot enthalten muss

Ein Festpreis-Angebot benennt: Umfang (eine API, bis zu N Werkzeuge), die acht Kriterien als Zusagen, einen Zeitplan mit Test-Instanz ab Woche 1, Abnahmekriterien (Regressionstest mit Modell-Clients), und die Übergabe. [Unser Referenzangebot](/mcp-server-entwickeln) steht offen als Vergleichsmaßstab; setzen Sie es neben jedes andere.

**→ Den Zustand Ihrer API vor jedem Gespräch zeigt der [kostenlose Live-Test](/test): die Faktenbasis für Ihre Agentur-Anfrage.**

---

*Unabhängigkeitshinweis: Die genannten Fremdanbieter sind weder empfohlen noch abgewertet; die Kriterienliste ist aus unserer eigenen Bau- und Prüfpraxis abgeleitet.*
