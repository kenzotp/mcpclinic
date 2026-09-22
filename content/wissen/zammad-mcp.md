# Zammad-MCP: Kunden wollen es, die Community baut es, offiziell ist es „not really planned"

*Ziel-Keywords: Zammad MCP, Zammad KI-Agenten, Zammad API Claude anbinden*

**Meta-Description:** Zammad hat keine offizielle MCP-Anbindung, aber eine aktive Community, einen 41-Sterne-Community-Server und eine Rolle für Agenten im Ticketsupport. Was heute geht und was fehlt.

:::stat 41★ | der Community-Server, während offizieller MCP „not really planned" ist

:::takeaway
- Zammad 7 wird „all AI", aber fremde Agenten haben keinen offiziellen Zugang zum Produkt.
- Der 41-Sterne-Community-Server läuft lokal (stdio) mit Token-Auth: legitim für Einzelnutzung, kein Angebot für Geschäftskunden.
- Schreibaktionen dort ohne Idempotenz, Bestätigungspflicht und Protokoll, genau die Lücke, die ein herstellereigener Endpunkt schließt.
:::

---

Der Fall Zammad zeigt in Reinform, was gerade in der deutschen B2B-SaaS-Landschaft passiert: Die Nachfrage ist längst da, die Community handelt, und das offizielle Angebot hinkt hinterher.

## Was der Hersteller sagt

Im offiziellen Community-Forum fragten Nutzer im Februar 2026 nach einer MCP- und Agenten-Integration ([Thread „MCP and AI agentic integration"](https://community.zammad.org/t/mcp-and-ai-agentic-integration/19660), 561 Aufrufe). Die Herstellerantwort im Wesentlichen: nicht wirklich geplant. Man schaue auf Community-Lösungen, und die kommende Version 7 setze auf eigene KI-Features. Ein GitHub-Epic zur „Chat assistant for agents" ist zuletzt im September 2026 aktiv bearbeitet und erwähnt In-Process-MCP-Tools: Die Richtung ist also vorhanden, ein ausgelieferter offizieller MCP-Server ist es nicht.

Zammad 7 wird konsequent „AI": Ticket-Zusammenfassungen, Antwortvorschläge, eigene Agenten-Features *im Produkt*. Was fehlt, ist die Umkehrung: dass *fremde* Agenten (Claude, ChatGPT, Copilot) Zammad offiziell bedienen können, über den Standard, der gerade dabei ist, die Art, wie Nutzer mit Software arbeiten, umzubauen.

## Was die Community gebaut hat

Der De-facto-Standard ist **[Zammad-MCP von basher83](https://github.com/basher83/Zammad-MCP)** (rund 41 Sterne, aktiv gepflegt): ein Python-MCP-Server, der die Zammad-REST-API als Werkzeuge anbindet, inklusive Schreibaktionen wie Tickets anlegen und aktualisieren. Daneben existieren kleinere Projekte (u. a. eine Go-Implementierung).

Unser kurzer Blick in den Code zeigt das Muster, das wir in Community-Servern regelmäßig sehen:

- **Transport: stdio**. Der Server läuft lokal beim Nutzer. Das ist für Einzelpersonen völlig legitim, aber kein Angebot, das ein *Hersteller* seinen Geschäftskunden unter die Arme greifen könnte.
- **Authentifizierung** erfolgt mit Zammad-Tokens (HTTP-Token oder OAuth2-Token) per Umgebungsvariable oder Datei: gegenüber Zammad also sauber, aber ohne Mandanten- und Scope-Konzept *auf der MCP-Ebene*.
- **Schreibaktionen** sind ohne die Absicherung gebaut, die ein Produktionsbetrieb bräuchte: Idempotenz-Keys, Bestätigungspflicht für destruktive Aktionen, Audit-Log. Ein Agent kann Tickets anlegen und Anhänge löschen: Es hängt allein am Client, ob ein Mensch das kontrolliert.

Das ist keine Kritik am Projekt: Es ist genau das, was Community-Server leisten können und sollen. Es zeigt nur die Lücke: **Der Hersteller-Raum zwischen „inoffizielle Bastellösung" und „produktionsreifer, eingeschränkter, protokollierter Endpunkt" ist leer.**

## Was Zammad-Nutzern heute realistisch bleibt

1. **Jetzt:** Den Community-Server lokal nutzen, read-only beginnen, niemals mit einem Voll-Admin-Token betreiben. Schreibaktionen nur mit Client, der jeden Aufruf anzeigt.
2. **Für Teams:** Den Zugang als bewusste Ausnahme behandeln: eigenes Zammad-Nutzerkonto für den Agenten, minimale Rechte, Aktivität beobachten.
3. **Für Zammad selbst** wäre der Weg klar: ein gehosteter, OAuth-gesicherter MCP-Endpunkt (`/api/v1/mcp`), der im Namen des angemeldeten Nutzers mit Scopes arbeitet. So hat es awork gebaut und damit in unserem [Deutscher MCP-Report](/report) den Bestwert erreicht.

## Unser Angebot in diesem Zusammenhang

Wir bauen genau diese Endpoint-Klasse, unter anderem mit einer offiziellen, eingeschränkten Variante für Software-Hersteller. Wenn Sie Zammad einsetzen und Agenten-Zugriff **richtig** wollen (Authentifizierung, Scopes, Protokoll), sprechen wir darüber: [Agent-Readiness-Audit](/mcp-audit) als Start, [MCP-Endpoint-Build](/mcp-server-entwickeln) als Umsetzung.
