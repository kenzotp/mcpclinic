# Xentral-MCP: Öffentliche API-Specs, aber die Agenten-Delegation fehlt

*Ziel-Keywords: Xentral MCP, Xentral API KI-Agent, XERP API Claude anbinden*

**Meta-Description:** Xentral pflegt seine API-Specs öffentlich auf GitHub und liefert LLM-freundliche Doku — ein offizieller MCP-Endpunkt und ein OAuth-Delegationsmodell fehlen trotzdem. Analyse.

:::takeaway
- Öffentliche OpenAPI-Specs auf GitHub (aktiv gepflegt) plus llms.txt — die Doku-Ebene ist besser als bei den meisten Mitbewerbern.
- Personal Access Tokens ohne Scopes und Ablauf sind die schwächste Basis für Agenten: ein geleakter PAT ist ein voller Kontoübergriff.
- Bis zu einem offiziellen Endpunkt gilt: Lesen ja, Schreiben nur hinter einer eigenen Kontrollschicht.
:::

---

Xentral ist eines der interessantesten Beispiele im [Deutscher MCP-Report 2026](/report), weil der Hersteller auf der Dokumentationsseite vieles richtig macht — und die Prüfung dann trotzdem mit einer ernüchternden Gesamtwertung endet. Das Muster dahinter ist lehrreich für die ganze Branche.

## Was gut ist

- **Öffentliche API-Beschreibungen auf GitHub** (Repo `xentral/api-spec-public`, aktiv gepflegt, zuletzt im September 2026 aktualisiert): OpenAPI 3.0, maschinenlesbar, ohne Registrierung abrufbar. Das kann nicht jede der 21 geprüften APIs von sich behaupten.
- **LLM-freundliche Dokumentation:** llms.txt und Markdown-Versionen der Dokumentationsseiten — Xentral denkt an maschinelle Leser.
- **REST-Konventionen**, die integrationsfreundlich sind: keine CSV-Satz-Protokolle, keine HMAC-Signaturorgien pro Aufruf.

Für Entwickler, die heute eine Anbindung bauen wollen, ist das ein echtes Plus: Ein Agent-Framework kann aus der Spec sauber Werkzeuge generieren — und mehrere community-Projekte haben das bereits getan (u. a. ein Server mit Lese-Werkzeugen und kontrollierten Schreibaktionen).

## Was fehlt

1. **Kein offizieller MCP-Endpunkt.** Xentral-Kunden, die ihrem Assistenten Zugriff auf Bestellungen, Lager oder Rechnungen geben wollen, sind auf Community-Bauten oder Eigenbau verwiesen.
2. **Kein Delegationsmodell auf Nutzerebene.** Die dokumentierte Authentifizierung läuft über Personal Access Tokens (PAT) — unbegrenzt laufende, umfassende Schlüssel, die ein Admin anlegt. Für Agenten ist das die schwächste denkbare Basis: keine Scopes („nur lesen"), keine Ablaufzeiten, keine Nutzerzuschreibung. Ein geleakter PAT ist ein voller Kontoübergriff.
3. **Kein Berechtigungskonzept für Werkzeuge.** Was ein Agent nach dem Login darf, entscheidet der Token-Umfang — nicht ein produktseitiges Scope-Modell.

Interessante Randnotiz aus unserer Recherche: Es gibt einen Token-Exchange-Endpunkt in der Plattform-Architektur — die Richtung stimmt, die agentengerechte Dokumentation eines echten Nutzerkontext-Flows fehlt aber noch.

## Was Xentral-Nutzer heute praktisch tun sollten

- **Nur mit minimum-necessary-Token arbeiten:** eigenes Dienstkonto, PAT so eng wie irgend möglich, read-only bevorzugt, Rotation einplanen. Ein PAT im Agenten ist so vertraulich wie ein Passwort.
- **Schreibaktionen vermeiden oder kapseln** — Werteränderungen im ERP durch Sprachmodell-Entscheidungen sind ohne Idempotenz- und Bestätigungsschicht nicht verantwortbar.
- **Für Agentur-Kunden:** eine eigene Zwischenschicht (kontrollierter MCP-Server) statt direkter PAT-Weitergabe an Client-Tools — genau die Bauform unseres [MCP-Endpoint-Builds](/mcp-server-entwickeln).

## Die allgemeine Lektion

Xentral zeigt: Öffentliche Specs und llms.txt sind nötig, aber nicht ausreichend. Die Wertung unserer Probe erkennt den Unterschied (Xentral landet dank Spec im besseren Unterfeld der Report-Tabelle), aber der eigentliche Mehrwert — kontrollierter Agenten-Zugang im Nutzernamen — entsteht erst mit Endpunkt und Delegationsmodell. Bis dahin gilt für Kunden: **Lesen ja, schreiben nur mit einer eigenen Schutzschicht.** Und für Hersteller: Der Weg von „Doku für KI" zu „Zugang für KI" ist kürzer, als er von außen wirkt.

**→ Standortbestimmung für Ihre API: [MCP-Live-Test](/test) in unter einer Minute.**
