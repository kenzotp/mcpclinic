# SEO-Strategie mcpclinic.dev — vollständig (Stand 2026-09-21)

## Ausgangslage

- Monorepo Next.js 15 (SSG), sitemap.xml + robots.txt live, JSON-LD (ProfessionalService
  mit Offers; Article-Schema auf wissen-Seiten), OG/Twitter-Cards, mobile-optimiert.
- GSC: Domain-Property per TXT-Record bestätigt (Mika). Content: 12 wissen-Artikel,
  Report, 2 Angebotsseiten. Domain ist neu → keine Authority, Indexierung startet bei null.

## Keyword-Map (Ziel → Seite)

| Keyword-Cluster | Wettbewerb | Seite | Status |
|---|---|---|---|
| MCP Agentur / MCP Beratung | ~2 Firmen, kein Festpreis | / | Landing live |
| MCP Server entwickeln lassen | fast leer | /mcp-server-entwickeln | live |
| MCP Audit / Agent Readiness Check | Scanner, keine Audits | /mcp-audit | live |
| easybill MCP | Suchvolumen durch Gerücht | /wissen/easybill-mcp | live |
| Zammad MCP | Forum-Thread rankt | /wissen/zammad-mcp | live |
| awork MCP / seven.io MCP | Hersteller-Seiten dominieren | /wissen/awork-mcp, seven-io-mcp | live |
| JTL/Personio/Xentral/propstack MCP | nahezu leer | je wissen-Seite | live |
| MCP Sicherheitslücken / MCP DSGVO | Liste/Artikel, keine Lösung | wissen | live |
| XRechnung MCP (Brücke zum geparkten Produkt) | leer | Batch 3 | geplant |
| isitagentready / Agent Scanner Vergleich | englischlastig | agent-scanner-limits | live |

## Technisch (erledigt/geplant)

- [x] SSG, keine JS-Pflicht für Content, sitemap.xml, robots.txt (indexierbar, /api/ ausgeschlossen)
- [x] JSON-LD: ProfessionalService + Offers (Layout), Article-Schema (wissen/[slug])
- [x] Canonical-Einzigartigkeit durch SSG- Routen; legal pages noindex/nofollow
- [ ] hreflang- Paare de↔en ausbauen (wenn /en/wissen existiert)
- [ ] Core Web Vitals messen (Lighthouse von Zeit zu Zeit; Field-Animation ist passive Canvas, ok)

## Cadence

- 2 wissen-Posts/Woche (Inventory: 12 fertig ≈ 6 Wochen Puffer; Batch 3 im Repo-Kalender)
- Nach Indexierung: 1 EN-Stück/Woche ab Woche 4 (dev.to/HN-Kommentare, kein Launch-Spam)

## Off-Page (der eigentliche Hebel bei neuer Domain)

1. **Report als Linkmagnet**: die 21 Firmen-Seiten verlinken von deren Blog/PR aus —
   Courtesy-Mails (Entwurf ready) sind der Türöffner. Ein einziger Backlink von einer
   Fachpresse (heise, t3n) wiegt mehr als 50 Social-Posts.
2. **GitHub**: mcp-clockodo (showcase) README → mcpclinic.dev. Clockodo-Community lesen/denken.
3. **Communities** (ab Woche 4): r/programmierung, r/devops-Diskussionen — value-first,
   nie Launch-Spam; MCP-Threads wo die Fragen bereits gestellt wurden.
4. **heise developer Pitch** (~Woche 6): „Was beim MCP-Bau wirklich schiefgeht" — gilt als
   offizieller Autor-Kanal; Thread ist vorbereitet im Playbook.

## Messung

- GSC: Abdeckung + Queries ab Woche 2 prüfen (Domain-Property, TXT bestätigt)
- Umami: Test-Läufe (funnel event), CTA-Klicks
- Ranking-Checks manuell 1×/Woche für die 10 Cluster-Keywords (kein Tool nötig)

## Realistische Erwartung

Monat 1: Indexierung + erste Long-Tail-Impressionen. Monat 2–3: erste echte
organische Tests (30–100/Monat Ziel). Monat 3+: erste Audit-Anfragen aus SEO.
Der schnellere Kanal bleiben die 21 Report-Mails + Communities.
