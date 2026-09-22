# Wer baut die MCP-Server für den deutschen Mittelstand? Ein Ökosystem-Bericht

*Ziel-Keywords: MCP Server Deutschland, MCP Server Liste, deutscher MCP Server, MCP Server Anbieter*

**Meta-Description:** Für die meisten deutschen B2B-SaaS-Produkte gibt es keinen offiziellen MCP-Server, dafür aber eine wachsende Community-Welle: allein für die geprüften Produkte über 25 inoffizielle Projekte. Ein Datenbericht über die Lücke, die niemand füllt.

:::stat 26 | Community-MCP-Server zählen wir allein für die 21 geprüften deutschen B2B-SaaS-Produkte, bei 4 von 21 gibt es einen offiziellen

:::takeaway
- Wo kein offizieller MCP-Endpunkt existiert, baut die Community ihn nach: für Zammad 6 Projekte, für Lexware Office 7, für Propstack 5, für Personio 4, für Xentral 3.
- Wo ein offizieller Endpunkt existiert (awork, seven.io), baut niemand daneben: Die Community füllt ausschließlich Lücken.
- Die Community-Projekte sind beeindruckend, aber niemand von ihnen löst die Schicht, die im Betriebsalltag zählt: Mandantenmodell, Idempotenz, Audit-Protokoll, echte Delegation.
- Für Mittelständler ist der Einsatz eines fremden Community-Servers mit dem Produktionskey ein Risiko ohne Verantwortlichen. Für Hersteller ist es das deutlichste Nachfragesignal, das es gibt.
:::

---

Unser [Deutscher MCP-Report 2026](/report) hat 21 deutsche B2B-SaaS-APIs auf Agenten-Fähigkeit geprüft. Beim Blick über den Tellerrand entstand ein zweites Bild, das eigenständig erzählenswert ist: Wer eigentlich baut gerade die MCP-Server für deutsche Software? Die Antwort nach einer Zählung auf GitHub (Stand 22. September 2026): überwiegend Einzelne, in ihrer Freizeit, ohne Bindung an den Hersteller.

## Die Karte des Feldes

| Hersteller | Offizieller MCP-Server | Community-Projekte | Größtes Community-Projekt |
|---|---|---|---|
| awork | ja | 0 | — |
| seven.io | ja | 0 | — |
| Clockodo | ja, seit kurzem | 0 | [mcp.clockodo.com](https://mcp.clockodo.com/mcp) |
| Personio | ja, undokumentiert | 4 | 1★ |
| Lexware Office | nein | 7 | [Lexware-MCP-Server](https://github.com/marselsel/Lexware-MCP-Server) (32★) |
| Zammad | nein | 6 | [Zammad-MCP](https://github.com/basher83/Zammad-MCP) (41★) |
| Propstack | nein | 5 | [propstack-mcp](https://github.com/ashev87/propstack-mcp) (8★) |
| Personio | nein | 4 | 1★ |
| Xentral ERP | nein | 3 | 1★ |
| easybill | nein | 1 | 0★ |
| JTL-Software, Collmex | nein | 0 | — |

Drei Muster springen heraus. **Erstens: Wo kein offizieller MCP-Endpunkt existiert, baut die Community ihn nach:** für Zammad 6 Projekte, für Lexware Office 7, für Propstack 5, für Personio 4, für Xentral 3. **Zweitens: Wo ein offizieller Endpunkt existiert, baut niemand daneben:** awork und seven.io haben als etablierte offizielle Anbieter keine Community-Kopien. **Drittens: Der neueste Zuwachs kam erst durch systematisches Nachscannen ans Licht:** Unser Live-Test fand bei clockodo einen bislang nicht kommunizierten Endpunkt unter mcp.clockodo.com (OAuth-geschützt, erreichbar), denselben Scan legte bei personio einen geschützten Endpunkt unter mcp.personio.de offen (undokumentiert), und Verzeichnisse wie [Glama](https://glama.ai/mcp/servers) machen auch die Community-Projekte für Endkunden auffindbar.

## Wie gut ist die Community-Welle?

Wir haben in die größten Projekte geschaut ([Lexware](/wissen/lexware-mcp), [Zammad](/wissen/zammad-mcp)): aktive Pflege, Tests, teils Docker, im besten Fall ein eigener OAuth-Wrapper. Das ist weit mehr, als man von Wochenendprojekten erwartet. Es fehlt dennoch durchweg dieselbe Schicht: kein Mandanten- und Rechte-Modell über den API-Key hinaus, keine Idempotenz bei Schreibaktionen, kein Audit-Protokoll, kein Delegations-OAuth zum Produkt selbst. Sieben Lexware-Projekte sind sieben Mal dieselbe Antwort auf dieselbe Lücke, ohne dass eines von ihnen die Lücke schließt.

Aufschlussreich ist auch ein Detail aus dem Zammad-Feld: Ein Projekt existiert in erster Linie als Fork, um **OAuth nachzurüsten**. Die Community signalisiert damit selbst, welche Schicht fehlt und wer sie verlangt.

## Was das für Ihren Betrieb bedeutet

Wenn Sie ein deutsches B2B-Produkt nutzen und ein Mitarbeiter einen Community-MCP-Server anbindet, führt fremder Code Ihren Produktions-API-Key aus: ohne Auditierung, ohne Haftung, ohne Sicherheitsprozess, abhängig von der Pflegefreudigkeit einer Person. Die bequeme Alternative, ein hosted Gateway, verlagert das Risiko nur: Dort liegt der Schlüssel beim Drittanbieter ([Vergleich](/wissen/self-host-oder-gateway)).

Wenn Sie Hersteller sind, ist die Zählung oben Ihre Produkt-Roadmap in Reinform: Ihre Kunden wollen Agenten-Zugang so sehr, dass sie ihn sich ohne Sie bauen. Der offizielle Endpunkt ist der Unterschied zwischen Feature und Haftungsrisiko, und er ist kleiner, als er von außen wirkt ([so bauen wir ihn](/mcp-server-entwickeln)).

**→ Wie agentenfähig Ihre API heute im Detail dasteht, zeigt der [Deutscher MCP-Report 2026](/report): 21 Anbieter, geprüft und benannt.**

---

*Unabhängigkeitshinweis: Wir sind mit keinem der genannten Projekte oder Hersteller verbunden. Die Zählung ist eine Momentaufnahme (22. September 2026) und erhebt keinen Anspruch auf Vollständigkeit; GitHub-Suche findet nur, was öffentlich gelistet ist.*
