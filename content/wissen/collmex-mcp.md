# Collmex-MCP: Wenn die API selbst das Anti-Muster ist

*Ziel-Keywords: Collmex MCP, Collmex API KI-Agent, Collmex Schnittstelle*

**Meta-Description:** Collmex spricht kein REST und kein JSON, sondern ein CSV-Satz-Protokoll hinter einer CGI-URL: mit LOGIN-Datensatz statt Authentifizierungsstandard. Warum das für KI-Agenten das härteste Ergebnis unseres Reports ist.

:::takeaway
- Collmex hat keine REST-API, sondern ein CSV-Satz-Protokoll über HTTP-POST: ohne Authentifizierungsstandard, ohne maschinenlesbare Doku.
- Für KI-Agenten ist das die härteste Klasse im Report: keine Hülle, die man anbinden könnte.
- Auch hier gilt: ein Übersetzungs-Server (MCP vor dem Protokoll) löst das Problem für Ihre Kunden, ohne Wartezeit auf den Hersteller.
:::

---

In unserem [Deutscher MCP-Report 2026](/report) landet Collmex mit 2/100 am unteren Ende. Die Wertung klingt hart, und sie ist es auch. Aber der interessante Teil ist nicht die Zahl, sondern *warum* sie so fällt. Collmex veranschaulicht eine Kategorie, die in der Diskussion um KI-Agenten meist übersehen wird: **Produkte, deren API selbst das Anti-Muster ist.**

## Was Collmex stattdessen einer API nennt

Collmex spricht kein REST und kein JSON. Die Schnittstelle ist ein **CSV-Satz-Protokoll über HTTP-POST** an eine CGI-URL: Man schickt Datensätze im Format `VECTOR;...`, beginnend mit einem LOGIN-Satz aus Kundennummer, Benutzername und Passwort, gefolgt von fachlichen Sätzen („RECHNUNG;...“, „KONTAKT;...“). Die Antwort ist wiederum CSV mit Status-Sätzen.

Das war für die Jahre, in denen es gebaut wurde, eine legitime und robuste Entscheidung: CSV-Sätze sind deterministisch, Diff-bar, batch-freundlich. Für einen KI-Agenten ist es eine Fremdsprache ohne Wörterbuch: kein Schema, das ein Modell lesen und daraus Werkzeuge ableiten könnte, keine beschriebenen Felder, keine Fehlercodes mit Bedeutung.

Dazu kommt die Authentifizierung: kein OAuth, kein Bearer-Token, sondern der LOGIN-Satz **in der Payload**. Es gibt also keinen standardisierten Weg, einem Agenten eingeschränkte Rechte zu geben: Entweder-Oder mit dem vollen Login.

## Warum wir das nicht als Herstellervorwurf lesen

Collmex ist kein Versäumnis der letzten Jahre: Die Architektur ist älter als der Agenten-Hype und hat ihren Kunden jahrzehntelang gedient. Die ehrliche Lesung: **Das Produkt stammt aus einer Ära, in der API-Konsumenten Integratoren mit Handbuch waren.** Die neue Konsumentenart (Sprachmodelle, die aus Beschreibungen Werkzeuge ableiten) hat andere Anforderungen, und die lassen sich nicht per Feature-Update in ein CSV-Protokoll hineinkonfigurieren.

Der Report wertet das trotzdem, denn für die Kaufentscheidung zählt der Ist-Zustand: Wer heute Collmex einsetzt und Agenten-Zugriff will, braucht eine **Übersetzungsschicht**, einen Dienst, der das CSV-Protokoll spricht und dem Agenten saubere, dokumentierte Werkzeuge anbietet, mit echtem Login-Konzept, Feldvalidierung, Idempotenz und Protokoll. Genau das ist unsere [Bauform](/mcp-server-entwickeln), und für Alt-Protokolle ist der Bau-Aufwand größer, aber völlig machbar.

## Die allgemeine Lektion für den Report

Der Report misst drei Stufen, und Collmex zeigt, dass es sie wirklich gibt:

1. **Zugang** (MCP-Endpunkt vorhanden? OAuth? Scopes?): Nur 4 von 21 schaffen das.
2. **Lesbarkeit** (OpenAPI? llms.txt? beschriebene Felder?): 6 von 21.
3. **Protokoll-Ära** (REST/JSON vs. CSV-Sätze, CGI, HMAC-Signaturen): Hier stehen die collmex-artigen Fälle.

Wer in Stufe 3 steht, hat den längsten Weg, aber auch den größten Vorsprung gegenüber der Konkurrenz im eigenen Segment, wenn er geht. Stufe für Stufe ist der Weg dokumentiert: [Live-Test](/test) für den Ist-Zustand, [Audit](/mcp-audit) für den Plan, [Build](/mcp-server-entwickeln) für die Umsetzung.
