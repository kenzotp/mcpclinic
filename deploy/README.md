# Deploy — DNS LIVE, Platzhalter-Seite an, Rest vorbereitet

Stand 2026-09-20: **DNS live** (beide Domains → Hub, alle 4 LE-Zertifikate
ausgestellt, siehe `DNS-SETUP.md`). Caddy-Block auf dem Hub AKTIV mit
Platzhalterseite (`Caddyfile.snippet` = der echte Block; Backup
`~/caddy/Caddyfile.bak-pre-mcpclinic-20260920`). Das `noindex` im Block kommt
beim Launch raus. Hosting zunächst Hub, Umzug nach Hetzner sobald belastbar.
Website-Gestaltung ist ausdrücklich zurückgestellt (Mika).

## Reihenfolge zum echten Launch (wenn Design steht)

1. Caddy-Block von Platzhalter auf `reverse_proxy` zur Site umbauen (`docker compose up -d` vorher)
2. `import noindex` aus dem Block entfernen
3. Healthcheck gegen `/-/health`, dann `caddy reload`
4. Live-Test unter `/test` (DE/EN-Umschalter) zuerst, Landing danach

## Enthaltene Dateien

- `docker-compose.yml` — zwei Services: `site` (später Next.js) und `probe`
  (die Probe-Engine als HTTP-Wrapper; bis dahin nur intern nutzbar)
- `Caddyfile.snippet` — die vier Server-Blöcke, wie sie (mit Platzhalter) live sind
- `DNS-SETUP.md` — LIVE-Doku der DNS-Records + Namecheap-API-Referenz
  (setHosts ersetzt ALLE Records einer Domain — Vorsicht!)
