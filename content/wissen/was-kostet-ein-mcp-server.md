# Was kostet ein MCP-Server? Die ehrliche Kalkulation

*Ziel-Keywords: MCP Server Kosten, was kostet ein MCP-Server, MCP Server entwickeln lassen*

**Meta-Description:** Was kostet ein produktionsreifer MCP-Server? Eine transparente Aufschlüsselung nach Aufwandsposten — Authentifizierung, Schreib-Sicherheit, Tests, Betrieb — und was die günstige Variante am Ende teuer macht.

:::stat 2–4 Wochen | braucht ein produktionsreifer MCP-Server für eine überschaubare API im Festpreis-Build — vom Audit bis zur Abnahme

:::takeaway
- Die reine Technologie ist der kleine Posten: Das MCP-Protokoll ist offen, Libraries sind gratis. Kosten entstehen bei Sicherheit, Tests und Betrieb.
- Vier Posten bestimmen den Preis: Authentifizierung (OAuth statt API-Key), Schreib-Sicherheit (Idempotenz, Bestätigungen), Regressionstests mit echten Modell-Clients und laufende Anpassung bei Spezifikationsänderungen.
- Realistische Größenordnung 2026: Audit im Festpreis (bei uns 2.400 € netto), Build ab 8.000 € netto je nach Umfang, Betrieb als Monatspauschale.
:::

---

Wer „MCP-Server entwickeln lassen" googelt, findet zwei extreme Angebote: Gratis-Open-Source-Starter zum Selbstaufsetzen und Agentur-Projekte mit sechsstelligem Rahmen. Beide Zahlen sind ehrlich — für jeweils ein anderes Produkt. Was einen **produktionsreifen** Server kostet, entscheidet sich an vier Aufwandsposten, die kein Preisvergleich ausweist.

## Posten 1: Authentifizierung — der größte Einzelhebel

Ein MCP-Server handelt **im Namen eines Benutzers**. Genau dafür gibt es OAuth 2.0: der Agent bekommt einen eingeschränkten, widerrufbaren Zugang im Namen des konkreten Nutzers. Ein statischer API-Key dagegen ist ein Hauptzimmerherrn-Schlüssel: alles oder nichts, keine Nutzerzuordnung, kein Scope.

In unserem [Report](/report) nutzen 9 von 21 geprüften deutschen APIs ausschließlich statische Keys. Für diese ist ein MCP-Server entweder unsicher (Key im Server hinterlegt, volle Rechte) oder er braucht zusätzlich eine eigene Rechteschicht. **Je weniger OAuth Ihre API mitbringt, desto teurer wird derselbe Server.**

## Posten 2: Schreib-Sicherheit

Lesen ist leicht. Schreiben über einen Agenten bedeutet: Ein Sprachmodell entscheidet auf Basis von Text, ob gebucht, gelöscht oder verschickt wird. Produktionsreif heißt dann:

- **Idempotenz**: derselbe Befehl zweimal ausgeführt führt nicht zu zwei Rechnungen.
- **Bestätigungspflicht** für destruktive Aktionen: Der Agent muss eine explizite Zusage einholen, bevor er unwiderrubare Schritte ausführt.
- **Protokollierung**: jede Aktion nachvollziehbar — wer, wann, mit welchem Werkzeug (nicht: mit welchem Inhalt).

Diese drei Punkte sind im Open-Source-Starter meist nicht drin. Sie sind aber genau das, was eine Rechtsabteilung im Audit fragen wird.

## Posten 3: Tests, die niemandem als Erstes auffallen

Ein MCP-Server spricht mit Sprachmodellen — und Sprachmodelle lesen. Die wichtigste Schnittstelle des Servers sind nicht seine Endpunkte, sondern die **Werkzeugbeschreibungen**, aus denen das Modell ableitet, wann es welches Werkzeug wie benutzt. Eine vielversprechende Beschreibung, die ein Modell in der Praxis falsch versteht, erzeugt falsche Buchungen — nicht Fehlermeldungen.

Deshalb gehört ein Regressionstest mit **mehreren Modell-Clients und echten Aufgaben** in jedes Projekt. Nicht, weil die Technik kompliziert wäre, sondern weil das Verhalten der Modelle sich mit jedem Release verschieben kann.

## Posten 4: Betrieb

Die MCP-Spezifikation hat 2026 bereits zwei revisionierte Versionen gesehen (aktuell: [Juli 2026](/wissen/mcp-spezifikation-juli-2026)). Transport- und Sitzungsmodelle ändern sich, Modellprovider liefern neue Versionen aus. Ein Server, der im März korrekt war, kann im Oktober Anpassungsbedarf haben — dazu haben wir [die Juli-2026-Änderungen einzeln erklärt](/wissen/mcp-spezifikation-juli-2026) — oder man begleitet sie als laufende Betreuung.

## Was das konkret kostet

Unsere Kalkulation ist offen: Das [Audit](/mcp-audit) (Festpreis 2.400 € netto) liefert den Befundplan, der **Build ab 8.000 € netto** (eine API, bis zu 20 Werkzeuge, 2–4 Wochen) daraus umsetzt, der Betriebs-Retainer begleitet Spezifikationsänderungen. Wer dieselben Anforderungen intern ausschreibt, sollte mit denselben Größenordnungen rechnen — der Preis liegt nicht im Schreiben des Servers, sondern in den vier Posten oben.

Wer es erst einmal unverbindlich prüfen will: Der [Live-Test](/test) zeigt in Minuten, wo Ihre API heute steht.
