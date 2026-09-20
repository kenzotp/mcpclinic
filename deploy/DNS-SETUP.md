# DNS-Setup mcpclinic.dev / mcpclinic.de — LIVE 2026-09-20

**Erledigt (via Namecheap-API, gleiche Anlage wie kills.dog/nied.cc):**
Credentials liegen auf dem Hub in `~/.namecheap-secrets/namecheap.env`
(Var-Namen `NC_API_USER`, `NC_USERNAME`, `NC_API_KEY`, `NC_CLIENT_IP` —
die Whitelist-IP ist hinterlegt und funktioniert). Gesetzt wurde pro Domain:

| Host | Typ | Wert | TTL |
|---|---|---|---|
| `@` | A | 188.194.170.22 (Hub) | 300 |
| `www` | CNAME | mcpclinic.dev. bzw. mcpclinic.de. | 300 |

`www` als CNAME bewusst: beim Hetzner-Umzug ändert man pro Domain nur EINEN Record.
Verifiziert über `namecheap.domains.dns.getHosts` (beide Status OK, IsActive=true)
und über die autoritativen Nameserver (dns1/dns2.registrar-servers.com antworten
mit 188.194.170.22). **Alle vier Let's-Encrypt-Zertifikate wurden erfolgreich
ausgestellt** — damit ist externe Erreichbarkeit über 443 bewiesen.

Caddy-Block auf dem Hub ist AKTIV (Platzhalterseite + noindex, siehe
`Caddyfile.snippet`; Backup `~/caddy/Caddyfile.bak-pre-mcpclinic-20260920`).
noindex beim Launch entfernen.

## Nach den Namcheap-Parking-Records (historisch, nur zur Erklärung)

Vor dem Setzen der Records serve Namecheap BasicDNS für record-lose Domains
Parking-IPs (mcpclinic.dev → 192.64.119.14, mcpclinic.de → parity-Domains).
Caching-Resolver können diese alten Antworten bis zu ihrer TTL (~1 h) weiter-
liefern — externe Checker können in der ersten Stunde also noch Timeouts zeigen,
obwohl die autoritativen Server längst richtig antworten. Kein Handlungsbedarf.

## Referenz: API-Aufruf (setHosts ersetzt ALLE Records der Domain!)

```bash
source ~/.namecheap-secrets/namecheap.env   # auf dem Hub
curl -s "https://api.namecheap.com/xml.response?ApiUser=${NC_API_USER}&ApiKey=${NC_API_KEY}&UserName=${NC_USERNAME}&Command=namecheap.domains.dns.setHosts&ClientIp=${NC_CLIENT_IP}&SLD=mcpclinic&TLD=dev&HostName1=%40&RecordType1=A&Address1=188.194.170.22&TTL1=300&HostName2=www&RecordType2=CNAME&Address2=mcpclinic.dev.&TTL2=300"
```

Beim Hetzner-Umzug: nur `Address1` auf die neue IP ändern (auf beiden Domains),
Caddy-Snippet dort entsprechend aufschalten.
