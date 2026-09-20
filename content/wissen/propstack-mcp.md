# propstack-MCP: Fünf Community-Projekte, null offizielle Antwort — ein Nachweis von Nachfrage

*Ziel-Keywords: propstack MCP, propstack API KI-Agent, propstack Claude*

**Meta-Description:** Bei propstack existieren mindestens fünf private MCP-Projekte, aber kein offizieller Endpunkt. Warum so ein Muster das beste Nachfragesignal ist, das es gibt.

---

Manchmal ist das lauteste Signal die Stille eines Herstellers. Der Fall propstack — die Immobilien-CRM-Plattform mit der KI-Assistentin „Proppi" — zeigt es besonders deutlich.

## Der Befund

Unser [Deutscher MCP-Report 2026](/report) listet propstack mit 8/100. Was die Zahl nicht zeigt: Bei unserer Recherche zu Community-Projekten fanden wir **mindestens fünf eigenständige MCP-Server-Projekte** zu propstack auf GitHub — einzelne Entwickler, die sich die API (API-Key per `X-API-KEY`, JSON/REST, Doku mit llms.txt) selbst agentenfähig gebaut haben. Keines davon stammt vom Hersteller. Keines ist offiziell. Alle zusammen sind trotzdem eine Botschaft:

**Wenn Nutzer in dieser Zahl eigene Anbindungen bauen, existiert eine Nachfrage — sie fließt nur an der Produktstrategie vorbei.**

## Das Muster kennen wir schon

Propstack ist kein Einzelfall, sondern der Standardzustand des deutschen B2B-Marktes im Report: Community baut, Hersteller schaut zu. Die Spanne reicht vom Zammad-Forum-Thread mit 561 Aufrufen („not really planned") über sevdesk- und Lexware-Wrappers mit 30+ Sternen bis zu den fünf propstack-Einzelprojekten. Auffällig ist immer dasselbe:

- **Authentifizierung:** Der Nutzer legt seinen API-Key in ein Tool von Fremden — oder in ein eigenes Script, das niemand auditiert hat.
- **Keine Scopes:** Der Key darf alles; der Agent erbt alles.
- **Kein Protokoll:** Was der Agent wann gelesen oder geändert hat, landet in keinem Log.

Und der Hersteller liest hinterher in einem Support-Ticket von einem Datenvorfall, den er weder verursacht noch einsehen kann.

## Was die fünf Repos für propstack bedeuten

1. **Produktentscheidung vorbereitet:** Die Nachfrage ist belegt — Kunden wollen Propstack-Daten in Claude, ChatGPT und Copilot nutzen. Ein offizieller Endpunkt muss diese Projekte nicht ersetzen, nur überflüssig machen.
2. **Das Fear-of-Losing-Fenster:** Solange keine offizielle Lösung existiert, übernehmen Drittanbieter-Gateways die Rolle — mit den Datenflüssen im fremden Buckel und ohne DSGVO-Ordnung des Herstellers.
3. **Die Bauvorlage existiert:** awork und seven.io zeigen im selben Report, wie ein offizieller Endpunkt aussieht. Der Spezifikationsaufwand für eine API wie propstacks (sauberes REST, ein Auth-Mechanismus, überschaubares Objektmodell) ist überschaubar.

## Für Propstack-Nutzer

Wenn Sie einen der Community-Server nutzen: Behandeln Sie Ihren API-Key wie ein Passwort, ziehen Sie in Erwägung, ein eigenes Dienstkonto mit minimalen Rechten anzulegen, und protokollieren Sie, was der Agent tut. Für ernsthafte Nutzung (Team, sensible Objektdaten) ist eine selbst betriebene, kontrollierte Zwischenschicht der bessere Weg — bei einer API dieser Größe ein klar umrissenes Projekt (Festpreis, 2–4 Wochen — [MCP-Endpoint-Build](/mcp-server-entwickeln)).

**→ Und wenn Sie Hersteller sind und fünf Fremd-Repos zu Ihrer API zählen: Der [MCP-Live-Test](/test) zeigt Ihnen in einer Minute, was Ihre API einem Agenten heute bietet.**
