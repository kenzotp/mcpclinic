# awork-MCP: So sieht der beste deutsche Agenten-Zugang aus — und was andere davon lernen können

*Ziel-Keywords: awork MCP, awork Claude anbinden, awork KI-Agenten, MCP-Server Beispiel*

**Meta-Description:** awork betreibt den derzeit besten deutschen MCP-Endpunkt (53/100 in unserem Report): OAuth 2.1 mit PKCE, offene OpenAPI-Spec, echte Server Card. Eine Analyse, warum das funktioniert.

---

In unserem [Deutscher MCP-Report 2026](/report) haben wir 21 deutsche B2B-SaaS-APIs auf Agenten-Fähigkeit geprüft. awork führt das Feld mit deutlichem Abstand an — nicht weil das Produkt „KI" im Namen trägt, sondern weil der Zugang technisch sauber gebaut ist. Eine reine Aufzählung wäre langweilig, also schauen wir genau hin: Was macht awork anders, und was bedeutet das für den Rest des Marktes?

## Was unser Live-Test bei awork gefunden hat

**1. Ein offizieller MCP-Endpunkt mit echtem Standard-Login.** Unter `api.awork.com/api/v1/mcp` läuft ein gehosteter Endpunkt. Unangemeldete Anfragen werden sauber mit 401 abgewiesen, und der Server verrät standardkonform, wie man sich anmeldet: `WWW-Authenticate` mit Resource-Metadata nach RFC 9728. Klingt nach Details — ist aber das entscheidende Detail. Genau dieser Mechanismus macht es Clients wie Claude oder Copilot möglich, den Login **ohneHandbuch** zu durchlaufen.

**2. OAuth 2.1 mit PKCE und Dynamic Client Registration.** Der Login läuft über aworks eigene OAuth-Infrastruktur — ein Agent agiert im Namen des angemeldeten Nutzers, mit dessen Rechten. Das ist die Voraussetzung für die Frage, die jede Datenschutzabteilung stellen wird: „Wer hat da gerade was gelesen?" — Antwort: der Nutzer, in dessen Auftrag, mit dessen Berechtigung.

**3. Eine gepflegte Server Card.** Unter `/.well-known/mcp.json` liegt ein maschinenlesbarer Ausweis des Endpunkts — awork implementiert hier einen Entwurf, der noch gar nicht final verabschiedet ist. Früh auf einen Standard zu setzen, der Auflösung findet, ist klassischer Vorsprung.

**4. Die Dokumentation macht den Rest.** Eine öffentliche OpenAPI-Beschreibung mit 566 Pfaden, eine `developers.awork.com`-Sektion zum MCP-Server mit Anleitungen für Claude Code, VS Code und ChatGPT, dazu llms.txt und eine ausdrücklich agentenfreundliche robots.txt. Wer einen Agenten anbinden will, findet alles ohne Support-Anfrage.

## Warum das wirtschaftlich klug ist

awork verkauft an Agenturen und Kreativteams — eine Kundschaft, die KI-Assistenten schon heute im Tagesgeschäft nutzt. Ein offizieller, eingeschränkter Endpunkt bedeutet für diese Kunden: keine Bastel-Repos von GitHub, keine Third-Party-Gateways, die ihre Projektdaten durchreichen, sondern der eine Weg, den der Hersteller selbst trägt. Damit wird aus einem Support-Thema („wie verbinde ich Claude mit awork?") ein Verkaufsargument.

Der Report zeigt die Leerstelle: **19 der 21 geprüften Anbieter haben nichts Vergleichbares.** Der Abstand zwischen awork und dem Feld ist gleichzeitig ein Zeitfenster — für Nachzügler ist es billiger, jetzt zu folgen, als später gegen etablierte Erwartungen zu bauen.

## Die Lehre für deutsche SaaS-Hersteller

Die Bausteine sind bekannt und im [MCP-Endpoint-Build](/mcp-server-entwickeln) Standard bei uns: Endpunkt vor der bestehenden API, OAuth im Namen des Nutzers, Scopes pro Werkzeug, Bestätigungspflicht für Schreibaktionen, Protokoll, Beschreibungen, die ein Sprachmodell korrekt versteht. Nichts davon ist Forschung — es ist saubere Ingenieursarbeit über 2–4 Wochen.

**→ Sie wollen wissen, wo Ihre API im Vergleich zu awork steht? [Kostenloser MCP-Live-Test](/test) — oder das [Agent-Readiness-Audit](/mcp-audit) mit Live-Agententests und Fixplan.**
