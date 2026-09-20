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
| `glm:MODEL` | Z.ai Anthropic-kompatibler Endpunkt (thinking explizit aus) | `GLM_API_KEY` |
| `openrouter:VENDOR/MODEL` | OpenRouter (OpenAI-kompatibel) | `OPENROUTER_API_KEY` |
| `nvidia:VENDOR/MODEL` | NVIDIA NIM (OpenAI-kompatibel, ~40 rpm) | `NVIDIA_API_KEY` |

**Nicht erlaubt (Mika, verbindlich): Groq.** Erlaubt sind OpenAI, Claude, GLM,
OpenRouter (und NVIDIA NIM, 2026-09-20 ergänzt).

**Keys auf dem Hub:** `~/.zuuna-secrets/mcpclinic.env` (chmod 600) —
GLM_API_KEY (= ZAI_API_KEY aus audit-sweep), OPENROUTER_API_KEY,
NVIDIA_API_KEY. Claude läuft über die Subscription — **Achtung: kein
API-Key; Subscription-als-API ist ToS-rechtlich angreifbar (gleiche Quelle
wie die mail-ai-bridge-Einfrierung). Sauberer Claude-Weg für Audits:
`openrouter:anthropic/claude-…` sobald OpenRouter-Guthaben existiert.**

**Live-Verifiziert 2026-09-20:**

- `nvidia:nvidia/nemotron-3-super-120b-a12b` — Tool-Calling bestätigt,
  Harness-Lauf erfolgreich (40 rpm reichen für Standardläufe locker).
  Es sendet `reasoning_content` mit — wird ignoriert, stört nicht.
- `glm:glm-5.3` — Key gültig, aber Coding-Plan-Wochenlimit erreicht
  (Reset 2026-09-24). Danach nutzbar; Alternative ohne Plan-ToS-Grau:
  `nvidia:z-ai/glm-5.3` auf NIM (hing im Test — vor Einsatz prüfen).
- `openrouter:` — Key gültig, Free-Tier-Limit (50/Tag) erschöpft; mit
  10 € Guthaben 1000/Tag. Freie Modelle wechseln schnell
  (`minimax-…:free` wurde delisted); vor Lauf aktuelle belegen.
- NIM-Modelle rotieren (llama-3.3-70b EOL 8/2026) — vor Audits
  `GET /v1/models` gegenchecken.

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
