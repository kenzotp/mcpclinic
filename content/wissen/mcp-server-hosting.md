# MCP-Server betreiben: Hosting, Wartung und was Betrieb wirklich kostet

*Ziel-Keywords: MCP Server Hosting, MCP Server betreiben, MCP Server Wartung, MCP Server Betrieb*

**Meta-Description:** Ein MCP-Endpunkt ist kein Projekt mit Ende, sondern ein Betrieb: Hosting-Optionen, was sich ständig ändert (Spezifikation, Modelle, Auth), und was Wartung im Monat kostet.

:::stat 2026-07-28 | Die letzte MCP-Spezifikation hat Sitzungen abgeschafft und Dynamic Client Registration ersetzt. Betrieb heißt: mit jeder Version mitgehen

:::takeaway
- Ein MCP-Server ist ein dauerhaft exponierter Dienst: Authentifizierung, Rate-Limits, Monitoring und Protokollversionen wollen betreut sein.
- Zwei Hosting-Wege: Ihre Infrastruktur (Docker, Sie besitzen alles) oder eine EU-Umgebung des Dienstleisters.
- Was sich laufend ändert: die Spezifikation, die Modell-Clients (Claude, ChatGPT, Copilot verhalten sich bei jedem Release anders), und Ihre eigene API.
- Praxisgröße: EU-Hosting ab +49 €/Monat, Wartung als Retainer 400–800 €/Monat mit monatlichem Regressionstest und Prioritäts-Fixes.
:::

---

Der Bau eines MCP-Endpunkts ist der kleinere Teil. Der größere ist der Betrieb: Ein MCP-Server ist ein dauerhaft im Internet exponierter Dienst, der von den ungeduldigsten Nutzern sprach ever, Sprachmodellen, gegen Ihre Produktions-API arbeitet. Was Betrieb konkret bedeutet und was er kostet:

## Hosting: zwei Wege

**In Ihrer Infrastruktur.** Der Server läuft als Docker-Dienst bei Ihnen oder Ihrem Hosting-Partner. Sie besitzen den kompletten Stack, die DSGVO-Kette ist kurz (Modellprovider plus Sie), und Ihre Compliance-Abteilung kann alles selbst begutachten. Voraussetzung: jemand betreibt den Dienst.

**In einer EU-Umgebung des Dienstleisters.** Gleiches Bild, aber Betrieb und Verfügbarkeit liegen beim Partner. Für Teams ohne eigene Betreiberkapazität der schnellere Weg; ab **+49 €/Monat** bei unserem [Standardbau](/mcp-server-entwickeln).

Beide Wege haben dieselbe harte Voraussetzung: Der Endpunkt ist mit [OAuth, Scopes und Protokoll](/wissen/mcp-faehig-machen) gebaut. Hosting ersetzt keine Sicherheit.

## Was sich laufend ändert

1. **Die Spezifikation.** Die Version 2026-07-28 hat Sitzungen abgeschafft, Dynamic Client Registration für veraltet erklärt und [server/discover](/wissen/remote-mcp-server) als Pflichtmethode eingeführt. Die vorherige Version hatte beides noch anders. Ein Server von Ende 2025 wäre heute in Teilen nicht mehr konform.
2. **Die Modell-Clients.** Claude, ChatGPT und Copilot wählen Werkzeuge auf eigene Faust, und jedes Modell-Release ändert das Auswahlverhalten. Deshalb gehört ein [Regressionstest mit 3 Modell-Clients](/wissen/mcp-tool-beschreibungen) in den Wartungsrhythmus, nicht in die Projektabnahme.
3. **Ihre eigene API.** Jede Änderung an Ihrem Backend ändert die Werkzeuge. Der MCP-Server muss bei jedem API-Release mitgetestet werden.

## Was Wartung im Rhythmus bedeutet

- **Monatlich:** Regressionstest der Werkzeuge mit Modell-Clients, Protokollversion gegen die aktuelle Spezifikation geprüft, Audit-Log gesichtet, Rate-Limit- und Token-Konfiguration kontrolliert.
- **Bei Spezifikations- und Client-Änderungen:** Prioritäts-Fixes, bevor Ihre Kunden sie bemerken.
- **Dauerhaft:** Monitoring auf Erreichbarkeit und Latenz, Authentifizierungs-Fehlerraten, und ein Protokoll, das im Ernstfall die Frage beantwortet: "Was hat der Agent wann getan?"

## Was es kostet

Die Praxisgrößen aus unserem [Standardbau](/mcp-server-entwickeln): EU-Hosting ab **+49 €/Monat**, Wartung als Betriebs-Retainer **400–800 €/Monat** je nach Umfang (Spezifikationsänderungen, monatlicher Regressionstest, Prioritäts-Fixes). Zum Vergleich: Ein Endpunkt, der nach dem Bau ungepflegt bleibt, ist innerhalb weniger Modell-Releases wieder das, was er vorher war: nicht agentenfähig.

**→ Die Basis für jeden Betrieb ist ein sauber gebauter Endpunkt: [So bauen wir ihn](/mcp-server-entwickeln), und der [kostenlose Live-Test](/test) zeigt, was Ihre API heute hat.**
