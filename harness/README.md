# Audit-Harness — Agent-Flow-Tests mit echten Modell-Clients

Das ist die Maschine hinter Tag 1 des [Audit-Runbooks](../audit/RUNBOOK.de.md):
Die 10 Standardaufgaben werden mit echten Modellen (OpenAI / Claude / GLM / OpenRouter)
gegen einen MCP-Endpunkt gefahren. Jede Runde wird protokolliert: welches Tool
gewählt, mit welchen Argumenten, Fehler, Antwort — das Protokoll IST die
Audit-Evidenz (Anhang A des Kundenberichts).

## Nutzung

```bash
cd harness && npm install

# Read-only-Standardlauf (7 Aufgaben ohne Schreibwirkung):
OPENAI_API_KEY=sk-... ANTHROPIC_API_KEY=sk-ant-... npm run harness -- \
  --endpoint https://kunde.example/mcp \
  --token "$TEST_TOKEN" \
  --models openai:gpt-5,claude:claude-sonnet-4-5,glm:glm-5.3 \
  --fixtures fixtures/demo.json \
  --out findings/kunde-2026-10-01

# Mit Schreibaufgaben (NUR gegen Staging, --allow-writes=1):
... --allow-writes=1 --tasks T01,T02,T03,T08,T09
```

Ergebnisse: `findings/<lauf>/traces.json` (voll), `summary.csv` (Auswertung),
`summary.md` (lesbar, wandert in den Audit-Bericht).

## Model-Registry

| Kürzel | API | Env-Key |
|---|---|---|
| `openai:MODEL` | OpenAI `/chat/completions` | `OPENAI_API_KEY` |
| `claude:MODEL` | Anthropic Messages | `ANTHROPIC_API_KEY` |
| `glm:MODEL` | Z.ai Anthropic-kompatibler Endpunkt | `GLM_API_KEY` |
| `openrouter:VENDOR/MODEL` | OpenRouter (OpenAI-kompatibel) | `OPENROUTER_API_KEY` |

**Nicht erlaubt (Mika, verbindlich): Groq.** Erlaubt sind OpenAI, Claude, GLM,
OpenRouter. Hinweis DSGVO: für Kundendaten in Audits vorab die AVV-Frage je
Provider klären; bei sensiblen Zielen EU-Routing bevorzugen.

## Aufgaben (fixtures steuern die Beispieldaten)

T01 Rechnungen lesen · T02 Angebotsentwurf (write) · T03 Adresse ändern (write) ·
T04 offene Posten > Schwelle · T05 Projekt zusammenfassen · T06 Kontaktliste ·
T07 überfällige Rechnungen · T08 Notiz anlegen (write) · T09 Testkontakt löschen
(write, destruktiv) · T10 freie Aufgabe.

Die Fixtures-JSON mappt generische Namen auf die jeweiligen Demo-Daten des
Kunden (Kundennamen, Schwellwerte …), damit Läufe zwischen Audits vergleichbar
bleiben. Beispiel:

```json
{ "customer": "Meier GmbH", "customer2": "Beispiel GmbH", "threshold": "1000",
  "deleteTarget": "Testkontakt" }
```

## Bewertungs-/Verwendungs-Hinweise

- Auswertung manuell anhand der Traces (R1-Fluss der Runbook-Tabelle):
  `correct / wrong-tool / wrong-args / hallucinated-parameter / stuck / refused`.
- `temperature: 0` überall — deterministische Läufe für die Audit-Vergleichbarkeit.
- Kosten: typischer Lauf ≈ 30 Modellrunden über 3 Modelle, Cent-Bereich.
- Credentials: nur Testzugänge mit minimalen Rechten; Schreibläufe nur Staging.
