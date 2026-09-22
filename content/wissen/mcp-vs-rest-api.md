# MCP und REST: Warum beides und warum die REST-API allein nicht mehr reicht

*Ziel-Keywords: MCP vs REST API, REST API KI-Agenten, MCP Endpunkt REST Unterschied*

**Meta-Description:** MCP ersetzt Ihre REST-API nicht. Es baut darauf auf. Der ehrliche Vergleich: was REST für Maschinen leistet, was Agenten zusätzlich brauchen, und warum 15 von 21 deutschen APIs an genau dieser Stelle scheitern.

:::stat 15/21 | geprüfte deutsche APIs haben keine maschinenlesbare API-Dokumentation: Für Agenten ist das ist wie ein Laden ohne Türschild

:::takeaway
- REST bleibt das Fundament: Daten, Endpunkte, Rechte. Daran ändert MCP nichts.
- MCP fügt die Ebene hinzu, die REST nicht hat: **Werkzeuge mit Beschreibungen**, aus denen ein Sprachmodell ableitet, was es wann womit tut.
- Der Aufwand ist kleiner als der Ruf, aber erst nach einer ehrlichen Prüfung der eigenen API (Doku, Auth, Schreib-Sicherheit).
- Ausprobieren kostet nichts: der Live-Test prüft Ihre öffentliche API in Minuten.
:::

---

Die Frage kommt bei fast jedem ersten Gespräch: „Wir haben doch eine REST-API. Warum brauchen wir jetzt noch ein Protokoll?" Die kurze Antwort: Weil REST für **Programmierer** gebaut ist. Und Agenten keine sind.

## Was REST leistet und was es offenlässt

Eine gute REST-API ist präzise dokumentiert: Endpunkte, Parameter, Antwortformate, Fehlercodes. Ein Entwickler liest die Doku, schreibt den Client, testet, fertig. Für diesen Zweck ist REST (oder GraphQL) weiterhin das Fundament. Auch ein MCP-Server spricht im Hintergrund fast immer mit einer REST-API.

Ein KI-Agent aber liest keine Doku. Er bekommt bei Verbindungsstart eine **Liste von Werkzeugen**, und zu jedem Werkzeug einen Beschreibungstext, aus dem das Sprachmodell ableitet: Wofür ist das da? Welche Argumente braucht es? Was passiert, wenn ich es aufrufe? Diese Beschreibungen sind keine Dekoration; sie sind die Schnittstelle. Eine unklare Beschreibung führt nicht zu einer Fehlermeldung, sondern zu falschen Buchungen.

Genau diese Ebene (geprüfte, stabile, beschriebene Werkzeuge über Ihrer API) ist MCP. Plus die Regeln drumherum: Anmeldung im Namen des Nutzers ([OAuth statt API-Key](/wissen/mcp-api-key-oauth)), Bestätigungspflichten für destruktive Aktionen, Protokollierung.

## Wo deutsche APIs heute stehen

Unser [Deutscher MCP-Report 2026](/report) hat 21 B2B-SaaS-APIs automatisiert geprüft. Die Lücke liegt doppelt:

1. **Nur 2 von 21** bieten einen eigenen MCP-Endpunkt an (awork und seven.io, beide vorbildlich dokumentiert).
2. **15 von 21** haben nicht einmal eine maschinenlesbare API-Dokumentation unter Standardpfaden. Ein Agent (und jedes Werkzeug, das ihn bauen will) findet die Tür nicht.

Die Community springt in die Bresche: Für mindestens 8 der geprüften Produkte existieren inoffizielle MCP-Server auf GitHub, gebaut von Nutzern, ohne API-Zugang der Hersteller, oft ohne Sicherheitsschichten. Wenn Ihre Kunden die Agenten-Fähigkeit Ihrer Software irgendwo anders herholen, haben Sie die Kontrolle über Rechte und Protokoll bereits abgegeben.

## Was der Umstieg real kostet

Die REST-API bleibt, wie sie ist. Darauf kommt ein MCP-Layer: 10–20 Werkzeuge, die Ihre wichtigsten Anwendungsfälle abbilden, mit Beschreibungen, die mit echten Modell-Clients regressionstestet werden, mit Idempotenz für Schreibaktionen und Bestätigungsflow für destruktive. [In Zahlen](/wissen/was-kostet-ein-mcp-server): Audit als Festpreis, Build in 2–4 Wochen.

Der erste Schritt kostet nichts und verpflichtet zu nichts: der [Live-Test](/test) zeigt in Minuten, wie agentenfähig Ihre öffentliche API heute ist, und wo sie gegenüber den 2 von 21 steht.
