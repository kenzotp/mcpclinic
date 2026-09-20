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
| `freellm:MODEL` | **FreeLLMAPI auf dem Hub** (`http://127.0.0.1:3411/v1`, Docker) — OpenAI-kompatibler Aggregator über 34 Free-Provider, 238 Modelle | `FREELLMAPI_API_KEY` |
| `openai:MODEL` | OpenAI `/chat/completions` | `OPENAI_API_KEY` |
| `claude:MODEL` | Anthropic Messages | `ANTHROPIC_API_KEY` |
| `glm:MODEL` | Z.ai Anthropic-kompatibler Endpunkt (thinking explizit aus) | `GLM_API_KEY` |
| `openrouter:VENDOR/MODEL` | OpenRouter (OpenAI-kompatibel) | `OPENROUTER_API_KEY` |
| `nvidia:VENDOR/MODEL` | NVIDIA NIM (OpenAI-kompatibel, ~40 rpm) | `NVIDIA_API_KEY` |

**Nicht erlaubt (Mika, verbindlich): Groq.** Erlaubt sind OpenAI, Claude, GLM,
OpenRouter, NVIDIA NIM — und der selbst gehostete FreeLLMAPI-Router.

**Empfehlung für Audit-Läufe: `freellm:auto`** — der Router wählt das beste
verfügbare freie Modell und fallbackt bei Rate-Limits automatisch
(live verifiziert: korrekte Tool-Calls + saubere Antworten über den Router).
Spezifische Modell-Namen nur nutzen, wenn der dahinterliegende Provider-Key
auf der FreeLLMAPI-Keys-Seite konfiguriert ist (sonst `model_not_found`);
einzelne Routen haben Provider-Cooldowns — der Router fängt das ab, hart
pinieren führt zu `rate_limit_error`.

**Keys auf dem Hub:** `~/.zuuna-secrets/mcpclinic.env` (chmod 600) —
FREELLMAPI_API_KEY (unified key des Hub-Proxys), GLM_API_KEY (= ZAI_API_KEY
aus audit-sweep), OPENROUTER_API_KEY, NVIDIA_API_KEY. Claude läuft über die
Subscription — **Achtung: kein API-Key; Subscription-als-API ist ToS-rechtlich
angreifbar (mail-ai-bridge-Präzedenz). Claude im Audit über den FreeLLMAPI-Router
(`claude-sonnet-4-5` im Katalog) oder via `openrouter:anthropic/claude-…`,
sobald OpenRouter-Guthaben existiert.**

**Live-Verifiziert 2026-09-20:**

- `freellm:auto` — Tool-Calling durch den Router bestätigt, Harness-Lauf
  komplett erfolgreich. **Standard für Audit-Läufe.**
- `nvidia:nvidia/nemotron-3-super-120b-a12b` — direkter NIM-Fallback, ebenfalls
  verifiziert (40 rpm reichen; sendet `reasoning_content` mit — wird ignoriert).
- `glm:glm-5.3` — Key gültig, Coding-Plan-Wochenlimit erreicht (Reset
  2026-09-24). Danach nutzbar.
- `openrouter:` — Key gültig, Free-Tier-Limit (50/Tag) erschöpft; 10 € Guthaben
  → 1000/Tag.
- NIM/Free-Modelle rotieren schnell (llama-3.3-70b EOL 8/2026,
  minimax-:free delisted) — vor Audits aktuellen Stand prüfen
  (`/v1/models` beim Proxy bzw. NIM).

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
