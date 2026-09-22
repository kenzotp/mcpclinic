# MCP-Spezifikation Juli 2026: Was sich geändert hat und warum Ihre Anbindung Wartung braucht

*Ziel-Keywords: MCP Spezifikation 2026, MCP Juli 2026 Änderungen, Model Context Protocol 2026-07-28, MCP Wartung*

**Meta-Description:** Die MCP-Spezifikation 2026-07-28 hat das Protokoll grundlegend umgebaut: stateless, neue Discovery, neue Auth-Details. Was das für bestehende Anbindungen bedeutet.

:::takeaway
- MCP ist nicht „fertig": die Spezifikation 2026-07-28 hat den Protokollkern auf stateless umgebaut und Discovery neu geregelt.
- Alte Anbindungen funktionieren weiter, bis Clients und Plattformen die neuen Wege erwarten.
- Ohne Wartung veraltet jede MCP-Anbindung aus demselben Grund, aus dem Apps Wartung brauchen: Der Standard bewegt sich.
:::

---

Wer 2025 einen MCP-Server gebaut hat, hielt einen Bauplan in der Hand, der sich 2026 unter den Füßen geändert hat. Die Spezifikation **2026-07-28** ist keine Kleinausgabe: Sie hat die Architektur des Protokolls selbst umgestellt. Hier die Änderungen, die für Betriebe zählen, ohne Spec-Sprachgewirr.

## 1. Stateless statt sitzungsbasiert

Bisher hielt ein MCP-Server eine **Sitzung** mit jedem Client: verbinden, aushandeln, Sitzung-ID merken. Die neue Spezifikation macht Anfragen **zustandslos**: Jede Anfrage trägt alle Informationen mit sich (Version, Client-Info, Fähigkeiten) statt eine Sitzung vorauszusetzen.

Was das praktisch heißt: Server lassen sich wie normale Webdienste skalieren (keine Sitzungs-Stickiness, keine abgelaufenen Sitzungs-IDs als Fehlerquelle), und Lastverteilung wird trivial. Bestehende Server mit Sitzungsmodell funktionieren weiter, aber sie tragen technisches Risiko mit sich, das neue Builds gar nicht erst haben.

## 2. server/discover: die Visitenkarte per Protokoll

Neu ist ein eigener Entdeckungsmechanismus: Clients können sich mit **einer Anfrage** die unterstützten Versionen, Fähigkeiten und die Identität des Servers liefern lassen. Dazu kommt ein Caching-Konzept für diese Antworten.

Für Betriebe heißt das: Wer einen alten Server betreibt, fällt in Client-Übersichten zunehmend als „unbekannt" auf. Wer den aktuellen Stand spricht, wird korrekt beschrieben. Überall.

## 3. Authentifizierungsdetails schärfen

Die OAuth-Regeln (Resource-Metadata nach RFC 9728, Entdeckungsreihenfolge) sind präzisiert. Server, die nur einen 401 ohne Metadaten liefern, schaffen es zunehmend nicht mehr durch die automatisierten Anmeldeketten moderner Clients. Unser [Live-Test](/test) prüft exakt diese Kette.

## 4. Was das für bestehende Anbindungen bedeutet

- **Server vor 7/2026 gebaut:** Laufen meist weiter (Rückwärtskompatibilität ist im Standard vorgesehen). Aber: Jeder neue Client erwartet zunehmend die neuen Muster; der Zeitpunkt für ein Update ist jetzt, nicht wenn es bricht.
- **Community-Server:** Oft auf alten Ständen. Wer einen betreibt, sollte Version und Spec-Stand prüfen oder auf einen gepflegten Bau wechseln.
- **Wer gerade baut:** Nach aktueller Spezifikation bauen, nicht nach Blogbeiträgen von 2025. Ein Fundament wie [mcp-basis](/mcp-server-entwickeln) abstrahiert genau diese Bewegung.

## 5. Der Punkt für Entscheidungen: Das Protokoll bewegt sich, dauerhaft

Das ist keine Einmalumstellung. MCP entwickelt sich aktiv: Server Cards als Entdeckungsstandard sind im Kommen, Erweiterungen (Tasks, Apps) kommen dazu, Authentifizierungsdetails werden geschärft. Jede der nächsten Runden kann Anbindungen betreffen, die heute laufen.

Daraus folgt eine schlichte Betriebseinschätzung: **Eine MCP-Anbindung ohne Wartung ist eine Time-bomb in Zeitlupe.** Nicht weil MCP kaputt ist, sondern weil es lebt, so wie TLS, wie APIs, wie jeder lebende Standard. Der Unterschied: Hier ist der Wartungsaufwand klein (Monatstakt, Regressionstest, Anpassungen), wenn man ihn strukturiert angeht, etwa mit einem [Betriebs-Retainer](/mcp-server-entwickeln).

**→ Unklar, auf welchem Stand Ihre Anbindung ist? [Kostenloser Live-Test](/test). Er zeigt Ihnen auch, ob Ihre Architektur den aktuellen Stand spricht.**
