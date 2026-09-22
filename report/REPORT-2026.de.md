# Deutscher MCP-Report 2026: Wie agentenfähig sind 21 deutsche B2B-SaaS-APIs?

*Stand: 2026-09-20 · Automatisiert getestet mit dem MCP-Live-Test von [mcpclinic.dev](https://mcpclinic.dev)*

KI-Agenten (Claude, ChatGPT, Copilot & Co.) können Software nur dann selbstständig bedienen, wenn die API dafür gebaut ist: ein MCP-Endpunkt (Model Context Protocol), saubere Authentifizierung im OAuth-Standard, maschinenlesbare Dokumentation. Wir haben die APIs von 21 deutschen B2B-SaaS-Anbietern aus den Branchen Büro- und Buchhaltungssoftware, ERP, Personal, E-Commerce, Immobilien und Kommunikation einer öffentlichen Oberflächenprüfung unterzogen, mit demselben automatisierten Test, den unser kostenloser MCP-Live-Test für jede API durchführt.

Getestet wurde ausschließlich die öffentliche Oberfläche (keine Zugangsdaten, keine Schreibzugriffe): MCP-Handshake, OAuth-Discovery nach RFC 9728/8414, OpenAPI-Verfügbarkeit, Agent-Crawler-Politik in robots.txt, Server-Card-Kandidaten. Ergänzt um eine manuelle Recherche zu offiziellen Ankündigungen und Community-Projekten.

## Kernbefunde

- **2 von 21 Unternehmen bieten einen offiziellen MCP-Server an: awork und seven.io.** Beide Endpunkte bestehen unseren Live-Test mit vorbildlicher OAuth-Discovery (RFC 9728). Der Rest der Branche fehlt in einer Technologie, die der Markt bereits als Standard einstuft.
- **Kein Unternehmen erreicht die Hälfte der möglichen 100 Punkte.** Bestwert awork: 53/100, und damit deutscher Benchmark. Der Schnitt liegt unter 10.
- **15 von 21 stellen keine maschinenlesbare API-Beschreibung bereit.** Ohne OpenAPI-Spec bleibt jeder Agenten-Integration ein handgebautes GitHub-Repos, Fehlerquellen inklusive. Genau solche inoffiziellen Wrapper existieren bereits für mindestens 8 der geprüften Produkte.
- **Die Nachfrage existiert ohne Angebot:** Zammad-Kunden fordern MCP im offiziellen Forum (561 Aufrufe), die Herstellerantwort ist „not really planned“, während ein Community-Server 41 Sterne sammelt. Personio, propstack und Xentral liefern inzwischen llms.txt für KI-Systeme aus, bieten aber keinen Agentenzugang zum Produkt.
- **Authentifizierung ist der blinde Fleck:** 9 der 21 APIs arbeiten mit statischen Keys ohne OAuth-Flow. Damit ist delegierter, eingeschränkter Agentenzugriff („dieser Agent darf nur Rechnungen lesen“) technisch gar nicht abbildbar.

## Ranking

| Unternehmen | Score | MCP | OpenAPI | blockiert Agenten |
|---|---|---|---|---|
| awork | 53/100 (C) | 🔒 OAuth | ✅ |  |
| seven.io | 30/100 (D) | 🔒 OAuth | — |  |
| JTL-Software | 18/100 (F) | — | ✅ |  |
| Xentral ERP | 18/100 (F) | — | ✅ |  |
| easybill | 15/100 (F) | — | ✅ |  |
| Clockodo | 12/100 (F) | — | ✅ |  |
| PlentyONE (plentymarkets) | 12/100 (F) | — | ✅ |  |
| Personio | 8/100 (F) | — | — |  |
| propstack | 8/100 (F) | — | — |  |
| Maileon | 8/100 (F) | — | — |  |
| rexx systems | 8/100 (F) | — | — |  |
| Zammad | 5/100 (F) | — | — |  |
| Lexware Office | 5/100 (F) | — | — |  |
| weclapp | 5/100 (F) | — | — |  |
| softgarden | 5/100 (F) | — | — |  |
| onOffice | 5/100 (F) | — | — |  |
| Userlike (jetzt Lime Connect) | 5/100 (F) | — | — |  |
| pretix | 2/100 (F) | — | — |  |
| sevdesk | 2/100 (F) | — | — |  |
| Collmex | 2/100 (F) | — | — |  |
| d.vinci | 0/100 (F) | — | — | 🚫 |

## Einzelergebnisse

### awork: 53/100 (Note C)

**Recherche:** Vorreiter: offizieller MCP-Server plus eigene Agents-API und KI-Produktseiten. Offizielle OpenAPI-3.1-Spec mit 566 Pfaden; OAuth 2.1 mit PKCE und Dynamic Client Registration.

**Eigenes MCP-Angebot:** JA: offizieller MCP-Server (api.awork.com/api/v1/mcp, OAuth 2.1 + PKCE, Setup-Guides für Claude Code/VS Code/ChatGPT)

**Dokumentations-Oberfläche:**

- ✅ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** https://developers.awork.com/openapi.json · 566 Pfade · API v1 Reference
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ✅ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** https://developers.awork.com/llms.txt vorhanden
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

**MCP-Endpunkt** (https://api.awork.com/api/v1/mcp):

- ✅ **Endpunkt erreichbar:** HTTP-Antwort erhalten (Transport unklar)
- ℹ️ **MCP-Handshake (initialize):** Authentifizierung erforderlich: ohne Zugangsdaten kein Handshake (aus Agent-Sicht: gut gesichert, aber Client-Einstieg prüfen)
- ⚠️ **Aktueller Stand (2026-07-28, server/discover):** server/discover (Spez 2026-07-28) nicht beantwortet: älterer Stand oder Auth nötig
- ✅ **Authentifizierung:** OAuth-Discovery vorhanden (https://api.awork.com/.well-known/oauth-protected-resource/mcp) · Authorization Server: https://api.awork.com/
- ℹ️ **Tools sichtbar (tools/list):** Toolsliste nach Auth geschützt (aus Agent-Sicht korrekt)
- ℹ️ **Tool-Beschreibungen (Qualität für Tool-Auswahl durch LLMs):** ohne Toolsliste nicht bewertbar
- ✅ **MCP Server Card (Entwurf, Working Group):** gefunden: https://api.awork.com/.well-known/mcp.json

### seven.io: 30/100 (Note D)

**Recherche:** Agenten-forward: betreibt eigenen gehosteten MCP-Server mit über 40 Tools (SMS, Voice, HLR, Kontakte) und dokumentiert ihn offiziell. API-Key-Auth für die REST-API, OAuth2 PKCE für MCP.

**Eigenes MCP-Angebot:** JA: „Seven MCP“ (mcp.seven.io/mcp, Streamable HTTP mit OAuth2 PKCE; zusätzlich npm @seven.io/mcp für stdio)

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

**MCP-Endpunkt** (https://mcp.seven.io/mcp):

- ✅ **Endpunkt erreichbar:** HTTP-Antwort erhalten (Transport unklar)
- ℹ️ **MCP-Handshake (initialize):** Authentifizierung erforderlich: ohne Zugangsdaten kein Handshake (aus Agent-Sicht: gut gesichert, aber Client-Einstieg prüfen)
- ⚠️ **Aktueller Stand (2026-07-28, server/discover):** server/discover (Spez 2026-07-28) nicht beantwortet: älterer Stand oder Auth nötig
- ✅ **Authentifizierung:** OAuth-Discovery vorhanden (https://mcp.seven.io/.well-known/oauth-protected-resource/mcp) · Authorization Server: https://mcp.seven.io
- ℹ️ **Tools sichtbar (tools/list):** Toolsliste nach Auth geschützt (aus Agent-Sicht korrekt)
- ℹ️ **Tool-Beschreibungen (Qualität für Tool-Auswahl durch LLMs):** ohne Toolsliste nicht bewertbar
- ⚠️ **MCP Server Card (Entwurf, Working Group):** kein Server-Card-Kandidat gefunden (/.well-known/mcp.json u.a.)

### JTL-Software: 18/100 (Note F)

**Recherche:** Nächster Kandidat: Spec-Dateien explizit „indexiert für KI-Tools (MCP, llms.txt)“, OAuth 2.0 für Cloud-Apps, aber kein eigenes MCP-Angebot. Keine Community-MCP-Server gefunden.

**Eigenes MCP-Angebot:** nein, aber Entwicklerportal mit llms.txt und „Build with AI“-Seite

**Dokumentations-Oberfläche:**

- ✅ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** https://developer.jtl-software.com/openapi/erp/2.2.json · 340 Pfade · JTL-WAWI API (Cloud)
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ✅ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** https://developer.jtl-software.com/llms.txt vorhanden
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### Xentral ERP: 18/100 (Note F)

**Recherche:** Öffentliche OpenAPI-Specs auf GitHub (aktiv gepflegt). Ein kleiner Community-Server (mjmirza/xentral-mcp). Auth via Personal Access Tokens ohne OAuth-Flow dokumentiert: schwach für delegierte Agentenzugriffe.

**Eigenes MCP-Angebot:** nein: Docs aber LLM-freundlich (llms.txt, .md-Versionen)

**Dokumentations-Oberfläche:**

- ✅ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** https://raw.githubusercontent.com/xentral/api-spec-public/main/openapi/xentral-api.openapi-3.0.0.json · 206 Pfade · Xentral API
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ✅ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** https://developer.xentral.com/llms.txt vorhanden
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### easybill: 15/100 (Note F)

**Recherche:** Verifizierte Swagger-Spec (57 Pfade, Bearer API-Key). Support- und Entwicklerportal hinter Cloudflare/Login: für Agenten und Recherche gleichermaßen verschlossen.

**Eigenes MCP-Angebot:** nein (Gerücht „offizieller MCP-Connector“ nicht belegbar; alle Treffer sind Drittanbieter wie viaSocket)

**Dokumentations-Oberfläche:**

- ✅ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** https://api.easybill.de/rest/v1/swagger.json · 57 Pfade · easybill REST API
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### Clockodo: 12/100 (Note F)

**Recherche:** Verifizierte OpenAPI-3.1-Spec (80 Pfade). Mehrere hobbyhafte Community-Server. API-Key-Header statt OAuth: für Agenten-Stellvertreter ungeeignet.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ✅ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** https://docs.clockodo.com/openapi.yaml · (YAML spec)
- ⚠️ **Agent-Crawler-Politik (robots.txt):** keine robots.txt: Anwortverhalten für Agenten undefiniert
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### PlentyONE (plentymarkets): 12/100 (Note F)

**Recherche:** OpenAPI v2+v3 auf GitHub, aber Login-basierte Auth (E-Mail/Passwort gegen /rest/login): ohne OAuth keine saubere Agenten-Delegation. Dritte bestätigen ausdrücklich: kein Vendor-MCP. Kein Community-Server.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ✅ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** https://raw.githubusercontent.com/plentymarkets/api-doc/master/plentymarkets/openApiV3/openApiV3.json · 1199 Pfade · plentymarkets REST-API
- ⚠️ **Agent-Crawler-Politik (robots.txt):** keine robots.txt: Anwortverhalten für Agenten undefiniert
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### Personio: 8/100 (Note F)

**Recherche:** Entwicklerhub mit llms.txt, OAuth2 Client Credentials. Ein winziger Community-Server (1 Stern). Zugleich Hinweis: developer.personio.com hinter Vercel-Bot-Wall. Maschinenlesbare Docs sind hier durchaus Thema.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ✅ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** https://developer.personio.de/llms.txt vorhanden
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### propstack: 8/100 (Note F)

**Recherche:** llms.txt vorhanden, API-Key via X-API-KEY, keine Spec-Datei. Fünf persönliche Community-MCP-Repos. Signal: Nutzer wollen es.

**Eigenes MCP-Angebot:** nein, aber eigene KI-Assistentin „Proppi“

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ✅ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** https://docs.propstack.de/llms.txt vorhanden
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### Maileon: 8/100 (Note F)

**Recherche:** HTTP Basic mit API-Key als Pseudo-Username; keine Spec. Kein Community-Server.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ✅ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** https://support.maileon.com/llms.txt vorhanden
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### rexx systems: 8/100 (Note F)

**Recherche:** FAQ nennt „offene API“, öffentliche Doku fehlt jedoch vollständig (keine Docs-Domain erreichbar). Keine Community-Server.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ✅ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** https://www.rexx-systems.com/llms.txt vorhanden
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### Zammad: 5/100 (Note F)

**Recherche:** Größte Community-Lücke: 41-Sterne-Community-Server (basher83/Zammad-MCP) + Feature-Request mit 561 Aufrufen; GitHub-Epic „Chat assistant for agents“ aktiv. Zammad 7 wird „all AI“. Offizieller MCP fehlt trotzdem. Keine OpenAPI-Spec.

**Eigenes MCP-Angebot:** nein: offiziell „not really planned“ (Community-Forum 2/2026)

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### Lexware Office: 5/100 (Note F)

**Recherche:** API-Key als Bearer, keine OpenAPI-Datei. Lebendige Community (u. a. marselsel/Lexware-MCP-Server mit 31 Sternen und OAuth-2.1-Wrapper). Kunden bauen bereits selbst.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### weclapp: 5/100 (Note F)

**Recherche:** Swagger-UI JS-gerendert, Spec nur pro Mandant abrufbar (SDK generiert sie per API-Key). Custom-Header-Auth statt OAuth. Zwei Miniatur-Community-Server.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### softgarden: 5/100 (Note F)

**Recherche:** OAuth2 Client Credentials, aber kein OpenAPI-Spec, teils deprecated Docs. Keine Community-Server.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### onOffice: 5/100 (Note F)

**Recherche:** Action-basierter Einzel-Endpunkt mit HMAC-SHA256-Signatur pro Aufruf: für LLM-Agenten praktisch unbenuzbar ohne Wrapper. API-Modul ist kostenpflichtiges Enterprise-Add-on.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### Userlike (jetzt Lime Connect): 5/100 (Note F)

**Recherche:** Rebrand zu Lime Connect; keine klassische REST-API (Webhook-Add-ons, JSON-Export ab Enterprise). AI-Produktmarketing („AI Automation Hub“) ohne Agent-Zugang zur eigenen API.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ✅ **Agent-Crawler-Politik (robots.txt):** ausdrücklich erlaubt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### pretix: 2/100 (Note F)

**Recherche:** API-first mit OAuth2 („Connect with pretix“) und Token-Auth, aber ohne OpenAPI-Spec. Kein MCP-Angebot, ein geschlossener Drittanbieter-Wrapper (mcpbundles.com).

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ⚠️ **Agent-Crawler-Politik (robots.txt):** keine robots.txt: Anwortverhalten für Agenten undefiniert
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### sevdesk: 2/100 (Note F)

**Recherche:** API-Token ohne Bearer/OAuth-Schema; Swagger-UI nur JS-gerendert, keine offizielle Spec-Datei. Vier kleine Community-Server auf GitHub. Der Markt improvisiert.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ⚠️ **Agent-Crawler-Politik (robots.txt):** keine robots.txt: Anwortverhalten für Agenten undefiniert
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### Collmex: 2/100 (Note F)

**Recherche:** CSV-Satz-Protokoll über HTTP-POST statt REST/JSON; API-Doku nur in der App-Hilfe. Auth per LOGIN-Datensatz. Für Agenten ohne dedizierten Adapter unbrauchbar.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ⚠️ **Agent-Crawler-Politik (robots.txt):** keine robots.txt: Anwortverhalten für Agenten undefiniert
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

### d.vinci: 0/100 (Note F)

**Recherche:** Keine öffentliche API-Dokumentation; Schnittstellen nur als vorkonfigurierte Verbindungen zu ~40 Jobbörsen, direkten Zugang via Service Desk. Bewirbt „integrierten AI Agent“: für externe Agenten geschlossen.

**Eigenes MCP-Angebot:** nein

**Dokumentations-Oberfläche:**

- ❌ **Maschinenlesbare API-Beschreibung (OpenAPI/Swagger):** keine öffentliche Spec unter Standardpfaden gefunden
- ❌ **Agent-Crawler-Politik (robots.txt):** blockiert: GPTBot
- ℹ️ **llms.txt (kosmetisch, laut Google-Studie 6/2026 ohne Effekt):** nicht vorhanden (unkritisch)
- ⚠️ **security.txt (Sicherheitskontakt):** nicht vorhanden

## Methodik

Geprüft wurden pro Unternehmen: (1) MCP-Endpunkt unter der dokumentierten Adresse: Handshake (initialize/tools/list, Streamable HTTP, Fallback legacy SSE), Protokollversion inkl. server/discover nach Spezifikation 2026-07-28; (2) Authentifizierungssignale: 401/403-Verhalten, WWW-Authenticate mit resource_metadata, OAuth-Protected-Resource-Metadata (RFC 9728), Authorization-Server-Metadata (RFC 8414); (3) MCP Server Card (Working-Group-Entwurf: /.well-known/mcp.json u. a.); (4) Dokumentations-Oberfläche: OpenAPI/Swagger an Standardpfaden und in der Recherche verifizierten Adressen, robots.txt-Richtlinien für 13 bekannte KI-Crawler (GPTBot, ClaudeBot, PerplexityBot u. a.), llms.txt (bewertet als kosmetisch, da Google in einer Studie von 6/2026 keinen Auswirkung nachwies), security.txt.

Scoring: 40 Punkte für ein echtes MCP-Angebot (Handshake 15, abrufbare Tools 10, aktueller Spezifikationsstand 5, Server Card 10), 25 Punkte für Authentifizierungs- und Sicherheits-Signale, 20 Punkte für maschinenlesbare Dokumentation, 15 Punkte für Tool-Beschreibungsqualität. Die Punkteverteilung ist bewusst so gebaut, dass ein Unternehmen ohne MCP-Angebot die Bestnote rechnerisch nicht erreichen kann. Ein Dutzend Blogartikel ersetzen keinen Endpunkt.

Begrenzung: Die Prüfung ist ein Snapshot der öffentlichen Oberfläche (19.–20. September 2026) und ersetzt keine Sicherheitsaudit. Was dieser Test nicht sehen kann (Live-Durchläufe echter Agenten, Tool-Berechtigungen im Detail, Mandantentrennung, DSGVO-Datenflüsse), ist Gegenstand unseres bezahlten Audits.

---

## Ihr Produkt ist dabei oder fehlt?

Wir prüfen Ihre API kostenlos und automatisiert: **[MCP-Live-Test starten](https://mcpclinic.dev/test)**. Für die tiefere Diagnose (Live-Agententests, Auth- und Schreib-Sicherheitsreview, DSGVO-Einordnung) bieten wir das **Agent-Readiness-Audit zum Festpreis von 2.400 €** (zzgl. USt.) an, inklusive priorisiertem Fixplan und Wiederholungsprüfung.

*MCP Clinic: Wir machen deutsche SaaS-Produkte agentenfähig. [mcpclinic.dev](https://mcpclinic.dev)*
