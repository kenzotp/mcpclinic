# Was kostenlose Agent-Scanner nicht prüfen und warum 40/100 daraus kein gutes Zeugnis macht

*Ziel-Keywords: Agent Readiness Scanner, isitagentready, MCP Audit, API agentenfähig prüfen*

**Meta-Description:** Kostenlose Scanner prüfen, ob Dateien existieren. Wir schicken echte Agenten gegen Ihre API. Der Unterschied zwischen Oberflächen-Score und Einsatzfähigkeit: im Detail.

:::takeaway
- Scanner prüfen die Fassade: Dateien, Header, Endpunkt-Verhalten ohne Login.
- Ob ein Agent das richtige Werkzeug wählt, sicher schreibt und Mandanten trennt, sieht nur ein Live-Test.
- Sinnvolle Reihenfolge: erst der kostenlose Scan. Wenn er gut ausfällt, entscheidet das Audit über die Einsatzfähigkeit.
:::

---

Es gibt inzwischen mehrere kostenlose „Agent-Readiness"-Checks: Cloudflares [isitagentready.com](https://isitagentready.com), diverse SEO-Anbieter, einzelne Blog-Tools. Die sind nützlich. Wir selbst betreiben einen ([MCP-Live-Test](/test)). Aber es ist wichtig zu verstehen, wo deren Wertebereich endet. Denn zwischen „Scanner sagt 40/100" und „ein Agent kann mit Ihrer API arbeiten" liegt eine ganze Ingenieursdisziplin.

## Was Scanner sehen: die Fassade

Kostenlose Scanner prüfen öffentliche Dateien und Header. Typische Checks:

- Existiert eine `llms.txt`?
- Steht in der `robots.txt`, wie KI-Crawler behandelt werden?
- Liegt eine OpenAPI-Beschreibung an einem Standardpfad?
- Gibt es ein MCP-Server-Card-Dokument?
- Erwidert ein Endpunkt unter `/mcp` etwas?

Das ist die **Fassade**, und sie ist nicht wertlos: Wer keine dieser Dateien hat, ist nicht agentenfähig, Punkt. Unser eigener Live-Test geht in derselben Klasse und prüft zusätzlich den MCP-Handshake, die OAuth-Discovery nach RFC 9728/8414 und die Qualität der Werkzeugbeschreibungen.

## Was Scanner nicht sehen: der Betrieb

Alles, was zählt, nachdem ein Agent eingeloggt hat, passiert hinter Authentifizierung, und genau dort hören Scanner auf. Was dann offen bleibt, sind die Fragen, über die Software-Entscheider eigentlich urteilen wollen:

| Frage | Scanner | Unser Audit |
|---|---|---|
| Findet der Agent das richtige Werkzeug? | ✗ | 10 Standardaufgaben mit 3 Modellen, protokolliert |
| Formuliert er korrekte Argumente oder halluziniert IDs? | ✗ | Schritt-für-Schritt-Trace je Aufgabe |
| Kann er nach einem Fehler weiterarbeiten? | ✗ | Fehler- und Erholungsverhalten im Protokoll |
| Ist „nur lesen" technisch erzwungen oder nur versprochen? | ✗ | Scope- und Berechtigungs-Review |
| Was passiert bei „Lösche den Testkontakt"? | ✗ | Destruktive Aktionen nur im Staging, mit Protokoll |
| Kann Mandant A Mandant B sehen? | ✗ | Isolationstest an der Trennungsgrenze |
| Welche Kundendaten fließen in welches Modell? | ✗ | DSGVO-Layer: Flüsse, AVV-Bedarf, Protokollaufbewahrung |
| Wird der Zugang im Namen des angemeldeten Nutzers geführt? | ✓/✗ (nur Header) | Vollständige Login-Kette inkl. Token-Austausch |

## Warum das „Scanner vs. Audit" keine Konkurrenz ist, sondern eine logische Reihenfolge

Wir verkaufen keine Scanner-Ablehnung; wir nutzen selbst einen. Die sinnvolle Lesart ist eine Triage:

1. **Scanner schlecht** → es gibt Grundsätzliches zu tun (keine Doku, kein MCP, kein Login-Muster). Gut: das ist billig messbar und oft schnell fixbar.
2. **Scanner gut** → jetzt wird es interessant: Genau dann entscheidet sich im Live-Betrieb, ob der Score was trägt. Ein 40/100-Scanner-Score mit sauberem OAuth-Setup kann produktionsreifer sein als ein 70/100-Score ohne jede Prüfung der Schreibaktionen.

Unsere Empfehlung in Kundengesprächen ist deshalb banal und ehrlich: **Starten Sie mit dem kostenlosen Test. Wenn er gut ausgeht, erst dann lohnt sich die Frage, ob Sie das [Audit](/mcp-audit) brauchen.** Und wenn der Test schlecht ausgeht, haben Sie trotzdem etwas Konkretes: eine Mängelliste nach Priorität.

## Der Punkt

Ein Scanner erzählt Ihnen, ob die Tür vorhanden ist. Ein Audit erzählt Ihnen, ob jemand, der durch die Tür geht, sich dort unten nicht den Fuß bricht und was es kostet, das zu fixen. Für eine Entscheidung über Ihren Agenten-Vertrieb ist nur das zweite eine Basis.

**→ [MCP-Live-Test](/test) starten (kostenlos) · [Agent-Readiness-Audit](/mcp-audit) ansehen (2.400 € Festpreis)**
