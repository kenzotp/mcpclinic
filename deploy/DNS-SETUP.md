# DNS-Setup mcpclinic.dev / mcpclinic.de — VORBEREITET, NICHT AUSGEFÜHRT

Stand 2026-09-20. Beide Domains liegen bei Namecheap (gekauft). Laut Mika ist
die Verwaltung über die Namecheap-API möglich; **die API nimmt nur Anfragen von
einer vorher als Whitelist-Eintrag hinterlegten IP an (keine CIDR-Bereiche)** —
und die Haus-IP ist dynamisch. Deshalb: DNS-Änderungen von Mika ausführen lassen
(oder Hub-IP in der Namecheap-Whitelist hinterlegen) — Details im Brain unter
`homelab/oracle-cloud-static-ip.md` bzw. `homelab/dns-cloudflare.md`.

## Ziel-Einträge

| Domain | Typ | Host | Wert | TTL |
|---|---|---|---|---|
| mcpclinic.dev | A | @ | 188.194.170.22 (Hub) | 5 min bis Launch, danach 1 h |
| mcpclinic.dev | A | www | 188.194.170.22 | dito |
| mcpclinic.de | A | @ | 188.194.170.22 | dito |
| mcpclinic.de | A | www | 188.194.170.22 | dito |
| (optional, nach Hetzner-Umzug) | A | @/www | neue Hetzner-IP | — |

Caddy auf dem Hub besorgt die TLS-Zertifikate automatisch, sobald DNS auflöst
und der Block aktiv ist (siehe `Caddyfile.snippet`).

## Namecheap-API (nur falls automatisiert)

- Whitelist: Namecheap-Panel → Profile → Tools → API Access → IP whitelisting
- Endpunkt: `https://api.namecheap.com/xml.response?ApiUser=…&ApiKey=…&UserName=…&Command=namecheap.domains.dns.setHosts&…`
- Credentials: nicht in diesem Repo. Falls noch nicht vorhanden: bei Mika
  hinterlegen lassen (Muster: `~/.zuuna-secrets/*.env` auf dem Hub, chmod 600).
- Achtung: zuuna.de nutzt Cloudflare-DNS trotz Namecheap-Registration —
  mcpclinic soll NICHT über Cloudflare laufen (kein Grund, kein Proxy-Bedarf).

## Check nach dem Setzen

```bash
dig +short mcpclinic.dev A      # → 188.194.170.22
dig +short mcpclinic.de A       # → 188.194.170.22
```
