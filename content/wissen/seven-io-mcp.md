# seven.io-MCP: Der SMS-Anbieter, der Agenten-Zugang ernster nimmt als so manche CRM-Schmiede

*Ziel-Keywords: seven.io MCP, seven.io Claude anbinden, SMS API KI-Agent, seven-mcp*

**Meta-Description:** seven.io liefert mit „Seven MCP" einen gehosteten OAuth-gesicherten MCP-Endpunkt plus npm-Paket. Was der zweite offizielle Anbieter im Deutschen MCP-Report richtig macht.

:::stat 30/100 | Platz 2 im Report — gehosteter Endpunkt mit OAuth 2.0 PKCE und über 40 Tools

:::takeaway
- Seven MCP läuft gehostet (mcp.seven.io/mcp, OAuth 2.0 PKCE) und zusätzlich lokal per npm — für beide Nutzungsarten ist offiziell gesorgt.
- Unser Live-Test bestätigt die saubere OAuth-Discovery; der Score verliert nur bei der maschinenlesbaren API-Doku.
- Schnittstellen-Anbieter mit Entwickler-Kundschaft haben den klartesten Business Case für einen eigenen Endpunkt — seven.io nutzt ihn.
:::

---

Von allen Unternehmen in unserem [Deutscher MCP-Report 2026](/report) ist seven.io die vielleicht unterschätzteste Geschichte: ein SMS-/Kommunikations-API-Anbieter, der mit **„Seven MCP"** als einer von nur zwei deutschen Anbietern einen offiziellen, gehosteten MCP-Endpunkt betreibt — und nebenher demonstriert, wie man eine API für Agenten denkt statt nur für Menschen.

## Was es gibt

- **Gehosteter Endpunkt:** `mcp.seven.io/mcp` — Streamable HTTP, Anmeldung per OAuth 2.0 mit PKCE. Kein lokales Setup nötig; der Endpunkt läuft im Namen des angemeldeten seven.io-Kontos.
- **Lokale Alternative:** wer den Agenten am eigenen Rechner betreibt, installiert das offizielle Paket (`@seven.io/mcp`, npm) und nutzt stdio.
- **Werkzeugumfang:** über 40 Tools — SMS, Voice, HLR/CNAM-Abfragen, Guthaben, Kontakte, Nummernverwaltung, Webhooks. Der Endpunkt ist damit keine Marketing-Probe, sondern eine echte Arbeitsoberfläche.
- **Dokumentation:** eine eigene MCP-Sektion in der offiziellen Doku — Setup, Tools, Beispiele.

Unser Live-Test bestätigt die saubere Umsetzung: Unangemeldete Anfragen werden korrekt mit 401 beantwortet, und die OAuth-Discovery (RFC 9728) ist vollständig vorhanden — ein Agent findet den Login-Weg ohne Fremdanleitung. Wertung im Report: 30/100, Platz 2 — der Rückstand auf awork entsteht vor allem bei der maschinenlesbaren API-Doku (keine öffentliche OpenAPI-Spec) und Details der Spec-Konformität, nicht am Endpunkt selbst.

## Warum gerade ein SMS-Anbieter hier vorne liegt

Die Antwort liegt in der Produktlogik: seven.io verkauft Kommunikation als API — Kunden sind Entwickler. Genau diese Kundschaft hat begonnen, ihre Werkzeuge über Agenten zu steuern („schick allen Teilnehmern eine SMS mit dem neuen Termin"). Ein Anbieter von Entwickler-Infrastruktur, der dort nicht offiziell present ist, wird von den Kunden selbst angehängt — seven.io hat den offensichtlichen Schritt einfach früh und ordentlich gemacht.

Der kontrastierende Befund unseres Reports: Die großen deutschen Geschäftssoftware-Anbieter (ERP, Buchhaltung, HR) sind alle noch nicht vertreten — obwohl ihre Nutzer die gleiche Frage stellen: „Kann mein Assistent das nicht einfach machen?"

## Was Nutzer damit heute anfangen können

- **Direkt verbinden:** seven.io in einem MCP-fähigen Client hinterlegen ( OAuth-Login), fertig. Lesen von Guthaben und Kontakte, Versand von Nachrichten — alles über die offiziellen Tools.
- **Sicher denken:** Der Agent sendet echte SMS (kostet Geld, erreicht echte Menschen). Für den Produktiveinsatz gilt: eigene Absenderregeln, Empfängerprüfung im Prozess, und für Teams ein eigenes Konto mit Limiten statt eines Sammelkontos.
- **Für Software-Häuser:** der two-minute-Vergleich mit dem eigenen Stand lohnt sich — unser [MCP-Live-Test](/test) zeigt in einer Minute, ob Ihre API so weit ist wie seven.io.

## Einordnung

Zwei von 21 — awork und seven.io — haben offiziell MCP. Beide sind kleiner und API-zentrierter als die Schwergewichte des deutschen B2B-Marktes. Das Umschlagblatt: Agenten-Fähigkeit ist aktuell eine Frage von Priorität, nicht von Größe. Wer über [MCP-Endpoint-Build](/mcp-server-entwickeln) nachdenkt, findet in beiden eine gute Blaupause — und mit uns einen Bauherrn, der genau diese Klasse von Endpunkten standardisiert liefert.
