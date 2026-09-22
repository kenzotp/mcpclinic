# MCP Clinic — mcpclinic.dev / mcpclinic.de

Wir machen deutsche (und europäische) B2B-SaaS-Produkte für KI-Agenten nutzbar:
**kostenloser Live-Test → Festpreis-Audit (2.400 €) → MCP-Endpoint-Build (ab 8.000 €)
→ Betriebs-Retainer (400–800 €/Monat).** Alles inbound: kostenloses Tool, deutsche
Keywords, Deutscher MCP-Report. Gate: 3 bezahlte Audits in 8 Wochen, sonst Stopp.

## Aufbau des Repos

| Pfad | Inhalt | Stand |
|---|---|---|
| `src/` | Probe-Engine (MCP-Handshake, OAuth-Discovery RFC 9728/8414, Server Card, OpenAPI/robots/llms.txt, Scoring, DE-Report-Renderer) + CLI | getestet, 5/5 Unit-Tests |
| `mcp-basis/` | Template-Server für Build-Aufträge: Bearer-Auth mit Tenant+Scopes, scope-gefilterte Tools, Idempotenz, destruktive Aktionen mit `confirm`, JSONL-Audit-Log, RFC-9728-Endpunkte, Demo-Upstream, Docker | E2E-Tests 5/5 (echter SDK-Client gegen echten HTTP-Server) |
| `report/` | `targets.json` (21 geprüfte Unternehmen), `meta.de.json` (Report-Texte), `out/results.json` (Rohdaten), `REPORT-2026.de.md` (fertiger Report) | Daten vom 19.–20.09.2026 |
| `audit/` | `RUNBOOK.de.md` (3-Tage-Durchführung, intern) + `REPORT-TEMPLATE.de.md` (Kundenbericht 15–25 Seiten) | einsetzungsfähig |
| `content/` | Angebotsblätter DE/EN, Landing-Copy-Rohfassung (Text only — Design ausdrücklich später) | Textfertig |
| `deploy/` | Compose, Caddy-Snippet, DNS-Anleitung — **alles NICHT aktiviert** (DNS-Whitelist-Thema Namecheap, Website-Design zurückgestellt) | Vorbereitung |

## Kommandos

```bash
npm install
npm test                                   # Unit-Tests der Probe-Engine
npm run probe-mcp -- https://example.com/mcp        # einzelner MCP-Endpunkt
npm run probe-surface -- https://docs.example.com   # Docs-Oberfläche
npm run rank -- report/targets.json report/out      # komplettes Ranking
npx tsx src/cli.ts render                            # finaler Report (results + meta)
cd mcp-basis && npm install && npm test              # Template-Server E2E
```

## Der Report (Kernzahlen, Stand 20.09.2026)

- **4 von 21** haben einen offiziellen MCP-Server: **awork** (53/100, Benchmark —
  inkl. echter Server Card unter `/.well-known/mcp.json`), **seven.io** (30/100),
  **clockodo** (37/100, mcp.clockodo.com, OAuth-geschützt) und **personio**
  (33/100, mcp.personio.de, undokumentiert)
- Bestwert 53/100 — kein Unternehmen erreicht die Hälfte; Median 8/100
- 15 von 21 ohne maschinenlesbare OpenAPI-Spec; 9 mit statischen Keys ohne OAuth
- Detailbefunde pro Unternehmen in `report/REPORT-2026.de.md`

## Positionierung (Mika-Freigabe)

AI-first, agentische Ingenieurboutique — bewusst **nicht** die Zuuna-Positionierung
(deutsches Hosting, 100 % Vertrauen, keine KI). Hosting startet auf dem Hub,
Umzug nach Hetzner, sobald belastbar.
