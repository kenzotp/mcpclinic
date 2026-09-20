# JTL-MCP: Warum JTLs „Build with AI" die richtige Richtung ist — und trotzdem noch kein Agenten-Zugang ist

*Ziel-Keywords: JTL MCP, JTL API KI-Agent, JTL Wawi Claude anbinden, JTL Build with AI*

**Meta-Description:** JTL öffnet seine Entwickler-Dokumentation ausdrücklich für KI-Tools — Specs für MCP indexiert, llms.txt, Build-with-AI-Seite. Ein offizieller MCP-Endpunkt fehlt trotzdem. Einordnung.

---

Unter den deutschen E-Commerce- und ERP-Anbietern nimmt JTL eine Sonderstellung ein: Es ist der einzige Hersteller in unserem Report-Umfeld, der KI-Systeme **ausdrücklich einlädt**, seine Dokumentation zu lesen. Und gleichzeitig ein Beispiel dafür, dass Einladung zum Lesen noch kein Agenten-Zugang ist.

## Was JTL heute bietet

Das [Entwicklerportal](https://developer.jtl-software.com/) hat eine eigene Seite „Build with AI" und liefert eine llms.txt aus; die OpenAPI-Beschreibungen der JTL-Cloud-APIs (u. a. die ERP-API in mehreren Versionen, dazu Marketplace-Channels und Vouchers) sind als JSON-Dateien direkt abrufbar und werden explizit „für KI-Tools indexiert (MCP, llms.txt)". Authentifizierung der Cloud-APIs läuft über OAuth 2.0 (Client-Credentials für Apps), die On-Premise-Wawi über API-Keys.

Verglichen mit der Konkurrenz ist das die sauberste Ausgangslage im Feld: In unserem [Report](/report) fehlen 15 von 21 Herstellern sogar die maschinenlesbare Beschreibung — JTL liefert sie inklusive KI-Ladezeichen.

## Was trotzdem fehlt

Ein Entwickler, der mit JTL-Daten arbeiten will, kann heute Folgendes bauen: eigene Scripts gegen die API, eigene MCP-Server, Copilot-Erweiterungen — die Doku hilft dabei. Was er **nicht** bekommt:

1. **Einen offiziellen MCP-Endpunkt**, den ein Händler in seinem JTL-Konto freischaltet — also Zugang im Namen des Nutzers, mit dessen Rechten.
2. **Ein Scope-Modell für Agenten** auf Produktseite („dieser Agent darf Bestellungen lesen, aber nicht stornieren").
3. **Ein gehostetes, protokolliertes Tool-Angebot** mit dem Security- und Support-Versprechen des Herstellers.

Die Folge ist das bekannte Muster: Der vielleicht zehntausendste JTL-Händler-Dienstleister wird genau diese Werkzeuge einzeln und inoffiziell bauen — mit unterschiedlicher Qualität, ohne gemeinsames Berechtigungskonzept, jeder ein eigenes Wartungsrisiko.

## Warum JTL trotzdem die richtige Richtung zeigt

Der Vergleich mit den Mitbewerbern im Report macht es deutlich: Xentral und Personio liefern llms.txt fürs Lesen, PlentyONE hat Specs auf GitHub, aber die meisten stehen bei null. JTL geht einen Schritt weiter und sagt: „Wir *wollen*, dass KI-Systeme unsere Schnittstelle verstehen." Das ist die korrekte Lesung der Zeit — der verkaufliche Schritt danach ist klein und naheliegend: **ein MCP-Endpunkt vor der eigenen Cloud-API**, gebaut wie awork es vorgemacht hat (OAuth 2.1, Scopes, Dynamic Client Registration — Bestwert unseres Reports mit 53/100).

## Was Händler und Dienstleister jetzt tun können

- **Read-only heute:** Mit der offenen API-Doku lassen sich Lese-Abfragen (Bestellstatus, Lagerstände, Kundensuche) sauber an KI-Clients anbinden — idealerweise über einen selbst betriebenen, protokollierten MCP-Server statt über enfernte Gateways.
- **Schreibaktionen zurückhalten**, bis ein Berechtigungskonzept steht — Stornierungen und Preisänderungen durch einen Sprachmodell-Agenten sind ohne Idempotenz und Bestätigungspflicht ein kein-go.
- **Hersteller-Direktweg:** Wer viele JTL-Kunden betreut, hat ein Argument, das JTL-Produktmanagement hört: Die Nachfrage nach agentenfähigem Zugang bündelt sich besser in einem offiziellen Endpunkt als in hundert Wrappers. Wir unterstützen genau diese Diskussion mit dem [Agent-Readiness-Audit](/mcp-audit) — und liefern den Endpunkt mit dem [MCP-Endpoint-Build](/mcp-server-entwickeln).

**→ Einschätzung für Ihr Setup: [Kostenloser MCP-Live-Test](/test) oder direkt [sprechen](/mcp-audit).**
