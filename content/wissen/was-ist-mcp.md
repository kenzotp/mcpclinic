# Was ist MCP? — und warum Ihre SaaS-Kunden bald davon erwarten, dass es funktioniert

*Ziel-Keywords: Was ist MCP, Model Context Protocol erklärt, KI-Agenten an SaaS anbinden*

**Meta-Description:** MCP (Model Context Protocol) erklärt — ohne Fachjargon: was KI-Agenten brauchen, um mit Ihrer Software zu arbeiten, und warum 19 von 21 geprüften deutschen SaaS-Anbietern es noch nicht anbieten.

:::stat 2/21 | deutsche B2B-SaaS-APIs bieten heute einen eigenen MCP-Endpunkt an (Deutscher MCP-Report 2026)

:::takeaway
- MCP ist die Schnittstelle, über die KI-Agenten Ihre Software selbstständig bedienen — mit Ihren Berechtigungen und Ihrem Protokoll.
- Der Standard ist da: Claude, ChatGPT und Copilot sprechen ihn alle.
- Das Problem ist nicht die Technik, sondern dass fast kein deutscher Anbieter sie anbietet — 2 von 21 im Report.
:::

---

Ein Kunde schreibt Ihnen: „Ich habe Claude gerade gebeten, die offenen Posten von Kunde Meier zusammenzufassen — warum funktioniert das nicht mit eurer Software?"

Die ehrliche Antwort lautet heute: weil Ihre Software dafür nicht gebaut ist. Die technische Antwort heißt MCP — und die gute Nachricht ist, dass das keine Rakete ist, sondern ein Standard mit klaren Regeln.

## Die Ein-Satz-Erklärung

**MCP (Model Context Protocol) ist die Schnittstelle, über die ein KI-Agent Ihre Software bedienen kann — mit Ihren Berechtigungen, Ihren Regeln und Ihrem Audit-Log.**

Ein Bild: Vor MCP konnte ein KI-Modell Texte lesen und schreiben. Mit MCP bekommt es **Hände** — klar definierte Werkzeuge („Tools"): *Rechnung erstellen*, *Kontakt suchen*, *Projekt abschließen*. Jedes Werkzeug hat eine Beschreibung, Parameter und eine Rückgabe — so wie eine gute API, aber für einen Nutzer, der kein Handbuch liest: das Sprachmodell.

## Was ein Agent damit konkret macht

1. Ihr Kunde tippt in Claude/ChatGPT/Copilot: „Erstelle Anna Beispiel aus der Firma Beispiel GmbH als Kontakt und lege einen Angebotsentwurf an."
2. Der Agent liest die verfügbaren Tools und wählt das richtige (deshalb sind gute Tool-Beschreibungen Gold wert).
3. Der Agent ruft das Tool über MCP auf — **mit dem Token Ihres Kunden**, in dessen Namen, mit dessen Rechten.
4. Ihre Software macht, was sie immer macht — nur eben agenten-bedient.

Der entscheidende Unterschied zu einem Screen-Scraper-Bot: Der Agent arbeitet über Ihre offizielle Schnittstelle, mit echtem Login, echten Berechtigungen und einem Protokoll, das Sie kontrollieren.

## Warum das jetzt alle erreichen wird

- Die großen KI-Plattformen (Claude, ChatGPT, Copilot und andere) sprechen MCP — der Standard hat sich 2025/2026 als De-facto-Schnittstelle für Agenten etabliert.
- Die Spezifikation wird aktiv weiterentwickelt (zuletzt im Juli 2026 — ein Grund, warum Betriebe einen Wartungspartner brauchen).
- **Deutsche B2B-SaaS hinkt hinterher:** In unserem Deutscher MCP-Report 2026 haben wir 21 deutsche B2B-SaaS-APIs geprüft. Genau 2 bieten einen eigenen MCP-Server an (awork und seven.io). 15 von 21 stellen nicht einmal eine maschinenlesbare API-Beschreibung bereit.

## Was „MCP-fähig" technisch bedeutet

| Baustein | Was das heißt | Was schiefgeht, wenn's fehlt |
|---|---|---|
| MCP-Server vor Ihrer API | Ein Dienst, der Ihre API-Funktionen als Tools anbietet | Kunden bauen inoffizielle GitHub-Wrappers — ohne Ihre Kontrolle |
| OAuth-Anmeldung | Agent agiert im Namen des angemeldeten Nutzers | Statische API-Keys: kein „dieser Agent darf nur lesen" |
| Berechtigungen pro Tool | Lesen/Schreiben trennbar, Mandanten strikt getrennt | Ein Fehler des Agenten wird zum Datenvorfall |
| Sichere Schreibaktionen | Idempotenz, Bestätigungspflicht bei destruktiven Schritten | „Lösche den Testkontakt" löscht den echten |
| Gute Tool-Beschreibungen | Das Sprachmodell wählt das richtige Werkzeug | Falsche Tools, falsche Parameter, Frust |
| Protokollierung | Jede Agenten-Aktion nachvollziehbar | Keine Chance bei der Aufklärung eines Vorfalls |

## Der realistische nächste Schritt

Nicht jeder braucht sofort einen MCP-Server. Aber jeder B2B-SaaS-Betreiber sollte **wissen, wo er steht**. Dafür gibt es unseren kostenlosen MCP-Live-Test: eine Minute, keine Anmeldung, ein Score von 0–100 plus Mängelliste.

**→ [MCP-Live-Test starten](/test)** — oder gleich das **[Agent-Readiness-Audit für 2.400 € Festpreis](/mcp-audit)**, wenn Sie die volle Diagnose wollen: Live-Agententests, Sicherheits- und DSGVO-Review, priorisierter Fixplan.
