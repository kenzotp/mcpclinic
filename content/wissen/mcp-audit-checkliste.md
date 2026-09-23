# Was ein MCP-Audit prüfen muss: Die Checkliste

*Ziel-Keywords: MCP-Audit, MCP-Audit Checkliste, Agent-Readiness-Audit, MCP Security Audit*

**Meta-Description:** Was ein MCP-Audit prüfen muss: Endpunkt und Spezifikationsstand, OAuth-Delegation, Write-Safety, Werkzeug-Beschreibungen, DSGVO-Kette und Live-Agententests. Die vollständige Checkliste.

:::stat 40/100 | Punkte der Agenten-Fähigkeit entfallen allein auf ein echtes MCP-Angebot. Der Teil, den ein Audit zuerst prüft

:::takeaway
- Ein MCP-Audit prüft sechs Blöcke: Endpunkt und Spezifikationsstand, Authentifizierung und Delegation, Schreib-Sicherheit, Werkzeug-Beschreibungen, Dokumentations-Oberfläche und das Verhalten echter Agenten.
- Automatisierte Scanner sehen davon nur die Oberfläche. Was sie nicht sehen: Live-Durchläufe, Mandantentrennung, das Verhalten bei Wiederholung, die Beschreibungsqualität aus Modellsicht.
- Das Ergebnis ist kein Score zum Sammeln, sondern ein Fixplan: Befunde nach Schweregrad, Maßnahmen mit Aufwandsschätzung.
- Wenn der Audit-Anbieter seine eigene Checkliste nicht offenlegt: Vorsicht. Diese hier ist vollständig.
:::

---

Nachdem vier von 21 geprüften deutschen Anbietern inzwischen eigene MCP-Endpunkte haben und der Rest [nachzieht](/wissen/mcp-faehig-machen), stellt sich die nächste Frage: Woran erkennt man, ob ein Endpunkt nicht nur existiert, sondern produktionsreif ist? Genau dafür ist das Audit da. Diese Checkliste ist dieselbe, die unser [Agent-Readiness-Audit](/mcp-audit) in 2–3 Tagen durchgeht, abgeleitet aus dem, was wir beim [Deutscher MCP-Report 2026](/report) über 21 APIs gemessen haben.

## Block 1: Endpunkt und Spezifikationsstand

- Erreichbarkeit über Streamable HTTP, ein Endpunkt, POST-Verhalten korrekt
- Protokollversion per Header, [server/discover](/wissen/remote-mcp-server) beantwortet
- Origin-Prüfung aktiv (Schutz vor DNS-Rebinding)
- Alte SSE-Transports abgeschaltet oder sauber geführt

## Block 2: Authentifizierung und Delegation

- 401 mit korrektem WWW-Authenticate-Wegweiser (RFC 9728)
- Protected-Resource-Metadata und Authorization-Server-Metadata auffindbar ([RFC 9728/8414](/wissen/mcp-api-key-oauth))
- PKCE erzwungen, Token auf Ihren Endpunkt zugeschnitten (RFC 8707)
- Scopes pro Werkzeug, Mandantentrennung serverseitig, Token-Lebensdauer definiert

## Block 3: Schreib-Sicherheit

- Idempotenz bei Wiederholung: derselbe Agent-Aufruf legt nicht zwei Rechnungen an
- Bestätigungspflicht für destruktive Operationen
- Vollständiges Audit-Protokoll ohne sensible Werte
- Rate-Limits pro Agent, nicht nur pro IP

## Block 4: Werkzeug-Beschreibungen

- Pro Werkzeug: Ist-Zustand, Problem, Neuentwurf
- Verifiziert mit 3 Modell-Clients: wählt das Modell das richtige Werkzeug, übergibt es korrekte Argumente? ([Details](/wissen/mcp-tool-beschreibungen))

## Block 5: Dokumentations-Oberfläche

- Maschinenlesbare API-Beschreibung (OpenAPI) vorhanden und aktuell
- robots.txt-Politik für die 13 relevanten KI-Crawler definiert
- security.txt gepflegt; llms.txt als kosmetisches Extra

## Block 6: Das, was Scanner nicht sehen

Automatisierte Scanner prüfen Block 1 und Teile von Block 5, und genau darin liegt ihre [Grenze](/wissen/agent-scanner-limits). Was fehlt: Live-Durchläufe echter Agenten mit echten Aufgaben (Rechnungen finden, Entwürfe anlegen, Adressen ändern), das Verhalten bei Wiederholung und Kollision, Mandantentrennung unter Last, und die DSGVO-Datenflüsse in Modellprovider. Genau dieser Block trennt einen Score von einer Diagnose.

## Das Ergebnis

Ein sauberes Audit endet nicht mit einer Zahl, sondern mit einem priorisierten Fixplan: Befunde nach Schweregrad (Hoch/Mittel/Niedrig), Maßnahmen mit Aufwandsschätzung, und ein Angebot für den [Bau](/mcp-server-entwickeln), falls der Endpunkt erst noch gebaut werden muss.

**→ Erst messen, dann auditieren: Der [kostenlose Live-Test](/test) zeigt die Oberfläche Ihrer API in unter einer Minute.**
