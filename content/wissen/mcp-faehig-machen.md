# Software MCP-fähig machen: Die drei Wege im Vergleich

*Ziel-Keywords: Software MCP-fähig machen, MCP-fähig machen, SaaS agentenfähig machen, MCP-Integration, agentenfähige API*

**Meta-Description:** MCP-fähig machen heißt: ein Endpunkt, echte Delegation, maschinenlesbare Doku, Sicherheitslage. Die drei Wege (Proxy, Gateway, eigener Endpunkt) im Vergleich, mit Entscheidungshilfe.

:::stat 17 von 21 | geprüften deutschen B2B-SaaS-Anbietern haben keinen eigenen MCP-Endpunkt. Für die meisten ist die Frage nicht mehr ob, sondern wie

:::takeaway
- MCP-fähig bedeutet vier Bausteine: ein MCP-Endpunkt, Authentifizierung mit echter Nutzer-Delegation, maschinenlesbare Beschreibung der Werkzeuge, und eine Sicherheitslage, die Schreibaktionen kontrolliert.
- Weg 1: Ein Proxy übersetzt Ihre bestehende API. Schnell, aber die Sicherheit liegt beim Proxy-Betreiber.
- Weg 2: Ein hosted Gateway macht Dritt-Software anbindungsfähig, verschiebt aber Ihren API-Key zu einem Drittanbieter.
- Weg 3: Ein eigener MCP-Endpunkt ist der offizielle Weg: Ihre Infrastruktur, Ihre Scopes, Ihr Protokoll. Standardbauweise: 2–4 Wochen.
:::

---

Immer mehr Kunden stellen die gleiche Frage, ausgesprochen oder unausgesprochen: "Kann ich Ihre Software mit Claude, ChatGPT oder einem eigenen Agenten benutzen?" Die ehrliche Antwort für 17 von 21 von uns geprüften deutschen B2B-SaaS-Anbietern lautet [aktuell: nein](/report). Die gute: Der Weg zur Antwort "ja" ist kürzer, als die meisten denken. Er beginnt mit der Frage, welche der drei Varianten zur eigenen Situation passt.

## Was "MCP-fähig" konkret bedeutet

MCP (Model Context Protocol) ist der offizielle Standard, über den KI-Agenten mit Software arbeiten. MCP-fähig ist eine Software, wenn vier Bausteine stehen:

1. **Ein MCP-Endpunkt**, der den [Handshake der Spezifikation](https://modelcontextprotocol.io/specification/2026-07-28) spricht.
2. **Echte Delegation:** Der Agent handelt im Namen eines angemeldeten Nutzers, mit dessen Rechten, per OAuth. Ein globaler API-Key ist keine Delegation.
3. **Maschinenlesbare Beschreibung:** Jedes Werkzeug so dokumentiert, dass ein Sprachmodell es korrekt wählt.
4. **Kontrollierte Schreibaktionen:** Idempotenz bei Wiederholung, Bestätigungspflicht für Destruktives, ein Audit-Protokoll.

Die gute Nachricht: Ihre REST-API bleibt, wie sie ist. MCP legt sich als Schicht davor ([der Unterschied im Detail](/wissen/mcp-vs-rest-api)).

## Weg 1: Ein Proxy vor der bestehenden API

Ein Proxy-Produkt oder -Dienst adaptert Ihre bestehende API zu MCP-Werkzeugen. Am schnellsten, oft ohne eine Zeile eigenen Code.

Der Haken: Die Werkzeuge erben Ihre API inklusive ihrer Schwächen. Wenn Ihre API keine Scopes kennt, kann der Proxy keine erzählen. Wenn Ihre API bei einem doppelten Aufruf zwei Rechnungen anlegt, ist der Proxy dabei. Und Sie hängen am Pflegezyklus eines Drittanbieters, dessen Übersetzung Sie nicht prüfen können.

Passt für: Erste interne Experimente, Wegwerf-Keys, nichts Kundennahes.

## Weg 2: Ein hosted Gateway

Gateways machen den umgekehrten Weg bequem: Nicht Ihre Software wird MCP-fähig, sondern der Agent wird mit einer Vielzahl fertiger Software-Anbindungen versorgt. Registrieren, API-Key einfügen, fertig ([ehrlicher Vergleich](/wissen/self-host-oder-gateway)).

Der Preis: Ihr Schlüssel liegt bei einem Drittanbieter, Ihre Kundendaten fließen durch dessen Infrastruktur, und in der DSGVO-Kette ist der Gateway ein weiterer Empfänger. Für Produktion und Kundendaten ist das kein Zustand, sondern ein Risiko.

Passt für: Proof of Concept mit Wegwerf-Key. Nicht für: echte Kundendaten.

## Weg 3: Der eigene MCP-Endpunkt

Der offizielle Weg: Sie betreiben einen eigenen MCP-Server vor Ihrer API, mit OAuth im Nutzernamen, Scopes pro Werkzeug, Idempotenz, Bestätigungspflichten und Audit-Protokoll. [awork](/wissen/awork-mcp) und [clockodo](/wissen/clockodo-mcp) zeigen, dass genau das der Standard wird: awork als Benchmark mit 53/100, clockodo mit einem Endpunkt, den [unser Test fand, bevor er dokumentiert wurde](/wissen/clockodo-mcp).

Der Aufwand ist der Preis, und er ist kalkulierbar: Mit einer [Standardarchitektur](/mcp-server-entwickeln) liegen Bau und Übergabe bei 2–4 Wochen Festpreis. Danach gehört der Endpunkt Ihnen.

## Die Entscheidung

| | Proxy | Gateway | Eigener Endpunkt |
|---|---|---|---|
| Bis erste Demo | Tage | Minuten | 2–4 Wochen |
| Wer hält den Schlüssel? | Proxy-Anbieter | Gateway-Anbieter | Sie |
| Sicherheit pro Werkzeug | Nein | Nein | Ja (Scopes) |
| Audit-Protokoll | Nein | Beim Anbieter | Ja, bei Ihnen |
| Für Kundendaten | Nein | Nein | Ja |

**→ Wo Ihre API heute steht, zeigt der [kostenlose Live-Test](/test) in unter einer Minute: Erreichbarkeit, Entdeckbarkeit und OAuth-Signale, gemessen statt vermutet.**
