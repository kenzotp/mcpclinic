# Deploy — LIVE auf mcpclinic.dev (seit 2026-09-20, nach Mikas Design-Freigabe)

**Stand:** Die echte Site läuft auf dem Hub als systemd-User-Unit `mcpclinic.service`
(`next start -p 3300` im Repo-Root), hinter Caddy:
- `mcpclinic.dev` → reverse_proxy 172.25.0.1:3300, **indexierbar** (kein noindex)
- `www.mcpclinic.dev`, `mcpclinic.de`, `www.mcpclinic.de` → 301 auf mcpclinic.dev
- `mcpclinic-dev.kills.dog` → Review-Instanz, **noindex** bleibt

Caddy-Backups: `Caddyfile.bak-pre-mcpclinicdev-20260920` (Review-Block),
`Caddyfile.bak-pre-mcpcliniclaunch-20260920` (Launch-Switch).

**OFFEN vor ernsthafter Öffentlichkeit:** Impressum + Datenschutz sind
Platzhalter und brauchen Mikas Angaben (Rechtsträger, Anschrift, Kontakt-E-Mail,
USt-ID-Status). Bis dahin ist die Seite technisch live, rechtlich unvollständig.

## Betrieb

- Die Site läuft als systemd-User-Unit `~/.config/systemd/user/mcpclinic.service` (`next start -p 3300` im Repo-Root, startet beim Boot, `Restart=always`). Die Unit-Datei liegt nur auf dem Hub, nicht im Repo.
- Site neu starten (nach Code-Änderung): `cd ~/projects/mcpclinic && npm run build` (auf dem Hub), danach `systemctl --user restart mcpclinic`
- Status und Log: `systemctl --user status mcpclinic`, `journalctl --user -u mcpclinic -f`
- Die `/test`-Rate-Limits (3/Tag/IP) laufen in-memory — Neustart setzt Zähler zurück (v1 akzeptiert).
- Hetzner-Umzug später: Container/Prozess dorthin, Caddy-Block auf neue Quelle, DNS-A-Record ändern (nur `@`, www ist CNAME).

## Enthaltene Dateien

- `docker-compose.yml` — für den späteren Hetzner-Umzug (Site + Probe als Container)
- `Caddyfile.snippet` — die Live-Blöcke (Spiegel der Hub-Caddyfile-Abschnitte)
- `caddy-dev-block.txt` — Review-VHost (mcpclinic-dev.kills.dog, noindex)
- `DNS-SETUP.md` — DNS-Live-Doku + Namecheap-API-Referenz (setHosts ersetzt ALLE Records!)
