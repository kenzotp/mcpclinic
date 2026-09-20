# Personio und llms.txt: Warum „KI-freundliche Dokumentation" noch lange kein Agenten-Zugang ist

*Ziel-Keywords: Personio MCP, Personio API KI-Agent, llms.txt sinnvoll, agentenfähige API*

**Meta-Description:** Personio liefert llms.txt und OAuth2 — aber keinen MCP-Endpunkt. Eine Einordnung, was Dokumentations-Signale über die echte Agenten-Fähigkeit einer API aussagen (und was nicht).

:::takeaway
- llms.txt und moderne Doku sind die Lesbarkeits-Hälfte — die Zugangshälfte (Endpunkt, Delegation, Scopes) fehlt bei Personio komplett.
- OAuth2 Client Credentials ist ein Maschinen-Login, kein Nutzer-im-Auftrag-Login — für Agenten der falsche Stil.
- Käufer-Fragen statt Marketing-Sprüchen: Gibt es einen offiziellen Endpunkt? Agiert der Agent im Nutzernamen? Gibt es Scopes pro Werkzeug?
:::

---

Es gibt in unserem [Deutscher MCP-Report 2026](/report) eine Gruppe von Anbietern, die auf den ersten Blick KI-ready aussieht: llms.txt wird ausgeliefert, die Dokumentation ist modern, vielleicht sogar explizit für maschinelles Lesen aufbereitet. Personio gehört dazu — und ist zugleich das beste Beispiel dafür, warum diese Signale die Hälfte der Wahrheit sind.

## Was Personio heute bietet

- **Entwicklerhub mit llms.txt** — die Datei, die KI-Systemen den Einstieg in die Doku erleichtern soll (personio.de-Entwicklerhub).
- **OAuth2 Client Credentials** für die API (v2) — solide authentifizierungstechnische Basis.
- **Eine offizielle Swagger-Beschreibung**, laut Doku auf GitHub gepflegt.

Das ist mehr als die Mehrheit des Feldes zeigt: 15 von 21 geprüften Anbietern stellen gar keine maschinenlesbare Beschreibung bereit. Personio hat die Hausaufgaben der **Lesbarkeit** gemacht.

## Was fehlt — und warum es der wichtigere Teil ist

Ein KI-Agent, der Personio bedienen soll, braucht drei Dinge, die keine llms.txt der Welt ersetzt:

1. **Einen Endpunkt**, an dem Agenten-Werkzeuge offiziell angeboten werden — Personio hat keinen MCP-Server.
2. **Ein Delegationskonzept**: „Dieser Assistent darf Urlaubsanträge *lesen*, aber nicht genehmigen." OAuth2 Client Credentials ist ein Maschinen-Login, kein Nutzer-im-Auftrag-Login — für Agenten der falsche Authentifizierungsstil, weil alles mit einem Dienstkonto läuft und die Zuschreibung auf einzelne Nutzer fehlt.
3. **Werkzeug-Verantwortung**: Beschreibungen, Scopes, Bestätigungspflichten, Protokoll — die Schicht, die aus „API funktioniert" „Agenten-Einsatz ist kontrollierbar" macht.

## Die allgemeine Lektion: Lesbar ≠ Betretbar

Wir sehen dieses Muster bei mehreren Anbietern des Reports (Personio, Xentral, propstack — jeweils mit llms.txt oder öffentlichen Specs): Die Dokumentationsebene zieht an, die Zugangsebene steht. Verständlich, denn Doku-Maßnahmen sind günstig und risikofrei. Aber der Wert für Kunden entsteht erst auf der Zugangsebene — und genau deshalb sind die Unterschiede im Report so groß: **2 von 21 Anbietern liefern den Zugang, ein Dutzend liefern Literatur.**

Ein Praxishinweis für Käufer, die „KI-fähig" als Auswahlkriterium hören: Fragen Sie nicht nach llms.txt. Fragen Sie nach drei Dingen: Gibt es einen offiziellen Agenten-Endpunkt? Agiert der Agent im Namen des angemeldeten Nutzers (OAuth im Nutzerkontext)? Und: Können Berechtigungen pro Werkzeug eingeschränkt werden? Drei „Nein" bedeuten: KI-Fähigkeit ist in diesem Produkt derzeit Broschüre.

## Für Personio-Kunden

Interne Assistenz-Anbindungen an die Personio-API sind heute möglich — mit eigenen, kontrollierten MCP-Servern auf Basis der offiziellen API (Authentifizierung per Client Credentials, idealseise über ein Dienstkonto mit minimalen Rechten). Was dabei von Anfang an mitgedacht werden sollte: Protokollierung jeder Aktion und die Entscheidung, welche personalbezogenen Daten überhaupt durch ein Sprachmodell laufen dürfen. Genau diese Fragen sortiert das [Agent-Readiness-Audit](/mcp-audit); der Weg zu einem Produktionsendpunkt steht im [MCP-Endpoint-Build](/mcp-server-entwickeln).
