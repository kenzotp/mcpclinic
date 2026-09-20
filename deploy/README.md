# Deploy — Vorbereitung (NICHT aktiviert)

Stand 2026-09-20: Domain gekauft (mcpclinic.dev + .de, Namecheap), Hosting
laut Mika zunächst auf dem Hub, Umzug nach Hetzner sobald belastbar.
Website-Gestaltung ist ausdrücklich zurückgestellt — deshalb ist hier nur
Vorbereitung, nichts ist scharf geschaltet.

## Reihenfolge zum Scharfschalten (wenn Design steht)

1. **DNS** (siehe `DNS-SETUP.md` — Namecheap-API braucht IP-Whitelist, deshalb Mika/Hub-ausgeführt)
2. **Caddy-Block** auf dem Hub ergänzen (`Caddyfile.snippet`, additive Zeilen, `caddy validate` vorher, ein Reload)
3. **Container** bauen und starten (`docker compose up -d`), Healthcheck gegen `/-/health`
4. Erste öffentliche Seite: Live-Test unter `/test` (DE/EN-Umschalter), Landing erst danach

## Enthaltene Dateien

- `docker-compose.yml` — zwei Services: `site` (später Next.js) und `probe`
  (die Probe-Engine als HTTP-Wrapper; bis dahin nur intern nutzbar)
- `Caddyfile.snippet` — die zwei Server-Blöcke (apex + www, beide Domains)
- `DNS-SETUP.md` — exakte DNS-Einträge + Namecheap-API-Hinweise (Whitelist!)
