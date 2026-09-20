# Agent-Readiness-Audit — interner Runbook (Festpreis 2.400 €, 2–3 Arbeitstage)

> Internes Arbeitsdokument. Nicht Teil des Kundenreports. Der Kundenreport entsteht
> aus der Vorlage `REPORT-TEMPLATE.de.md`, gefüllt mit den Ergebnissen dieser Schritte.

## Zielbild

Der Kunde weiß nach dem Audit exakt: (1) Was passiert, wenn ein echter KI-Agent
heute mit seinem Produkt arbeitet? (2) Wo sind Auth, Berechtigungen und
Schreibaktionen unsicher? (3) Welche DSGVO-Pflichten entstehen durch Agentenverkehr?
(4) Was wird in welcher Reihenfolge mit welchem Aufwand gefixt?

## Vorbereitung (vor Tag 1, ~2 h)

- [ ] Auftragsbestätigung + Rechnung 2.400 € (50 % vorab bei Neukunden ohne Bonitätshistorie)
- [ ] Kickoff-Formular vom Kunden einsammeln: API-Host, Test-Zugang (read-only), ggf. Staging-URL, OpenAPI-Datei falls intern, Einschränkungen (Rate Limits, Wartungsfenster), Ansprechpartner für technische Rückfragen
- [ ] Kunden-Zugang nur als **read-only-Rolle** akzeptieren; Schreibtests NUR auf Staging oder mit Wegwerf-Entitäten, die das Kickoff-Formular freigibt
- [ ] Probe-Clients vorbereiten: Claude (API), GPT (API), Groq-Modell (open) — Systemprompt: „Du bist ein geschäftlicher Anwender von <Produkt>. Nutze die bereitgestellten Tools, um die Aufgabe zu erledigen.“
- [ ] DSGVO-Checkliste (siehe Tag 2) an Juravorlage koppeln; AVV-Status des Kunden erfragen

## Tag 1 — Live-Agententests + Auth & Schreibsicherheit

### 1. Live-Agententests (~4 h)

10 Standardaufgaben je Modell (Claude + GPT + Groq), jedes Protokoll wird geloggt
(Tabelle in `findings/day1-flows.csv`: Modell, Aufgabe, gewähltes Tool, Schritte,
Fehler, Erholung, Zeit, Ergebnis korrekt?):

1. „Finde die letzten 5 Rechnungen von Kunde X“
2. „Erstelle einen Angebotsentwurf für Y“ (nur Staging)
3. „Aktualisiere die Adresse von Kunde Z“
4. „Suche alle offenen Posten über 1.000 €“
5. „Fasse den Status von Projekt P zusammen“
6. „Exportiere die Kontaktliste als CSV“ (falls vorgesehen)
7. „Welche Rechnung ist überfällig?“ (Querschnittsaufgabe)
8. „Erstelle eine neue Notiz/Ticket zu Vorgang W“
9. „Lösche den Testkontakt“ (nur Staging — zeigt, ob der Agent destruktive Aktionen korrekt einfordert/bestätigt)
10. Freie Aufgabe aus dem echten Kundensupport des Auftraggebers

Bewertung je Aufgabe: `correct / wrong-tool / wrong-args / hallucinated-parameter / stuck / refused` + Anzahl Modellrunden.

### 2. Auth- und Berechtigungs-Review (~2 h)

- [ ] OAuth-Discovery nach RFC 9728/8414 vorhanden? (`npm run probe-mcp -- <endpunkt>`)
- [ ] Scopes pro Tool definiert und dokumentiert? Delegation möglich („Agent darf nur X“)?
- [ ] Token-Lebensdauer, Refresh, Revocation dokumentiert?
- [ ] Mandantentrennung: kann ein Token von Mandant A auf Daten von Mandant B zugreifen? (Code-/Docs-Review + ein Staging-Test, falls möglich)
- [ ] Statische API-Keys im Umlauf? (Schwachstelle für Agentendelegation — als Finding mit Severity)

### 3. Schreibaktions-Sicherheit (~2 h)

- [ ] Idempotency-Keys unterstützt (create/update)?
- [ ] Destruktive Aktionen: Bestätigungspflicht im Flow? `destructiveHint`-Annotationen gesetzt?
- [ ] Audit-Log pro Schreibaktion?
- [ ] Rate Limits pro Token/Tool dokumentiert?
- [ ] Tool-Beschreibungen: LLM-Test (3 Modelle) — wird bei N Varianten das richtige Tool gewählt?

## Tag 2 — Beschreibungsqualität, Server Card, DSGVO, Docs

### 4. Tool-Beschreibungs-Rewrite (~3 h)

Für jedes Tool: Ist-Beschreibung → Problemanalyse (wurde in Tag-1-Tests das Tool
verwechselt/falsch parametriert?) → Neuentwurf nach mcp-basis-Muster
(Aufgabe, Parameter mit Format, Rückgabeform, Fehlerverhalten).
Deliverable: Tabelle `findings/day2-descriptions.md` (Tool / Ist / Problem / Neuentwurf).

### 5. MCP Server Card + api-catalog (~1 h)

- [ ] `/.well-known/mcp.json` oder Server-Card-Kandidat vorhanden und gepflegt?
- [ ] Registry-Eintrag (server.json-Format) sinnvoll/nötig? Empfehlung ja/nein mit Begründung.

### 6. DSGVO-Layer (~3 h)

- [ ] Welche Modellprovider bekommen welche Daten bei Agentenverkehr? (Kundenprompts + API-Antworten = PII)
- [ ] AVV mit jedem involvierten Modellprovider vorhanden? EU-Hosting möglich/aktiviert?
- [ ] Löschfristen/Retention der Agentenprotokolle definierbar?
- [ ] Thu-data-minimization: Werden Tool-Antworten unnötig groß (vollständige Objekte statt Felder)? → Finding „Datenminimierung“
- [ ] Empfehlung: Opt-in-Stufe für Agentenzugriff pro Endkunde? Logging-Optionen?

### 7. Docs & strukturierte Daten (~1 h)

- [ ] OpenAPI-Spec aktuell + öffentlich? (`npm run probe-surface -- <docs-host>`)
- [ ] robots.txt-Politik für GPTBot/ClaudeBot/PerplexityBot definiert (Empfehlung: explizit erlauben, dokumentieren)
- [ ] security.txt vorhanden?

## Tag 3 — Report, Fixplan, Angebot

- [ ] Scores berechnen (Probe-Engine + manuelle Layer): Gesamt 0–100 nach dem Public-Scoremodell + interne Zusatzpunkte für die nicht-öffentlichen Layer (Auth-Review, Write-Safety, DSGVO)
- [ ] Kundenreport aus `REPORT-TEMPLATE.de.md` generieren (15–25 Seiten): Findings mit Severity (Hoch/Mittel/Niedrig), priorisierter Fixplan mit Aufwandsschätzungen (S/M/L), Zitat-Angebot Build (ab 8.000 €, Festpreis nach Scope), Gutschein Re-Audit 600 € innerhalb 60 Tagen
- [ ] interne 30-min-Reviewschleife Mika vor Versand (Fachfreigabe)
- [ ] Übergabecall 45 min: Befund Nr. 1–3 live zeigen (Auth-Discovery-Demo mithilfe der Probe-Engine), Fixplan, Angebot
- [ ] Nachverfolgung W2+W4 nach Übergabe (2 freundliche Mail-Termine, sonst keine Kaltakquise)

## Severity-Modell

| Stufe | Kriterium | Beispiel |
|---|---|---|
| Hoch | Datenverlust, mandantenübergreifender Zugriff, unauthentifizierte Schreibaktionen | Tools offen ohne Auth; Agent kann Daten von fremdem Mandanten lesen |
| Mittel | Agent wählt falsche Tools/Parameter, kein Idempotency, keine Scopes | „Lösche Kontakt“ ohne Bestätigung; falsche Rechnung aktualisiert |
| Niedrig | Docs/Discoverability, llms.txt, security.txt, Beschreibungsqualität | Server Card fehlt; Spec nicht öffentlich |

## Ausschlüsse (im Vertrag verankern)

Technische Momentaufnahme, keine Rechtsberatung; keine Garantie über
Verhalten von Drittplattformen (Modellprovider, Agent-Anbieter); Re-Audit
innerhalb von 60 Tagen zum Festpreis von 600 €.
