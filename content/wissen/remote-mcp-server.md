# Remote-MCP-Server: Was Ihr Endpunkt braucht, damit Claude und ChatGPT ihn per URL verbinden

*Ziel-Keywords: Remote MCP Server, Remote MCP Server Claude, MCP Server URL Claude, Remote MCP Server OAuth, MCP Server ChatGPT*

**Meta-Description:** Was ein gehosteter MCP-Server nach Spezifikation 2026-07-28 können muss, damit Claude und ChatGPT ihn per URL anbinden: Transport, OAuth 2.1, Metadaten.

:::stat 2/21 | geprüfte deutsche B2B-SaaS-APIs betreiben einen Remote-MCP-Endpunkt mit OAuth-Metadaten nach RFC 9728 (awork und seven.io)

:::takeaway
- Ein Remote-MCP-Server ist ein HTTPS-Endpunkt wie `https://api.example.com/mcp`, der Streamable HTTP spricht. Das ältere HTTP+SSE-Verfahren ist abgekündigt.
- Seit der Spezifikation 2026-07-28 ist MCP zustandslos: keine Sitzungs-IDs mehr, dafür ein Versions-Header bei jeder Anfrage und die Pflichtmethode `server/discover`.
- Die Anmeldung ist eine Kette: 401 mit Verweis auf Ihre Metadaten, Anmeldeserver finden, Client registrieren, Login mit PKCE, Token nur für Ihren Server. Reißt ein Glied, kommt keine Verbindung zustande.
- Bei der Client-Registrierung lösen Client ID Metadata Documents die Dynamic Client Registration ab. Claude und ChatGPT können beides.
:::

---

In Claude und ChatGPT fügt ein Nutzer eine Anbindung hinzu, indem er eine URL einträgt. Der Rest läuft automatisch: Der Client ruft den Endpunkt auf, bekommt eine Anmeldeaufforderung, sucht den zuständigen Anmeldeserver, registriert sich dort, schickt den Nutzer zum Login und arbeitet danach mit einem Token. Jeder dieser Schritte ist in der [MCP-Spezifikation](https://modelcontextprotocol.io/specification/2026-07-28) festgelegt, und jeder kann an einer Kleinigkeit scheitern.

Dieser Beitrag geht die Kette in der Reihenfolge durch, in der ein Client sie abarbeitet. Grundlage ist die aktuelle Spezifikation 2026-07-28 ([Versionsübersicht](https://modelcontextprotocol.io/specification/versioning)) und die Entwickler-Dokumentation von Anthropic und OpenAI, Stand 22. September 2026.

## Was „per URL verbinden" in Claude und ChatGPT heißt

**Claude:** Unter *Customize → Connectors → „Add custom connector"* trägt man die URL des Servers ein. Das geht laut Anthropic in den Plänen Free, Pro, Max, Team und Enterprise ([Claude-Doku: Custom connectors](https://claude.com/docs/connectors/custom/remote-mcp)). Beim Anlegen wählt man zwischen „No sign-in" und OAuth; für OAuth bietet Claude drei Wege an, auf die wir unten eingehen.

**ChatGPT:** Eigene MCP-Server bindet man über den Entwicklermodus an. OpenAI nennt dafür Pro, Plus, Business, Enterprise und Education im Web, als Transport SSE und Streamable HTTP, als Anmeldung OAuth, keine Anmeldung oder eine Mischform ([OpenAI: Developer mode](https://developers.openai.com/api/docs/guides/developer-mode)).

Nicht zu verwechseln damit: Beide Anbieter haben zusätzlich eine MCP-Anbindung in ihrer Programmier-API ([Anthropic](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector), [OpenAI](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)). Dort übergibt der Entwickler das Token selbst, die OAuth-Kette unten entfällt. In diesem Beitrag geht es um den Weg, den Ihre Kunden in der Chat-Oberfläche gehen.

## 1. Transport: Streamable HTTP an genau einem Endpunkt

Die Spezifikation verlangt einen einzigen HTTP-Pfad, den *MCP-Endpunkt*, der POST annimmt, zum Beispiel `https://example.com/mcp`. Jede Nachricht des Clients ist ein eigener POST; der Server antwortet entweder mit einem JSON-Objekt oder mit einem Ereignisstrom (Server-Sent Events, SSE), und der Client muss beides verstehen ([Spezifikation: Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)).

Seit 2026-07-28 gilt außerdem:

- **Kein GET-Stream und keine Sitzungen mehr.** Auf GET oder DELETE soll der Server mit `405 Method Not Allowed` antworten, einen `Mcp-Session-Id`-Header ignoriert er.
- **Jeder POST trägt den Header `MCP-Protocol-Version`**, und der Wert muss zur Version im Nachrichtentext passen. Weichen beide ab, lehnt der Server mit `400` ab.
- **Der `Origin`-Header wird geprüft.** Ist er vorhanden und ungültig, antwortet der Server mit `403`. Das schützt vor DNS-Rebinding, bei dem eine fremde Webseite den Browser eines Nutzers als Brücke zu Ihrem Server missbraucht.

Das alte HTTP+SSE-Verfahren aus Version 2024-11-05 ist seit 2025-03-26 abgekündigt; neue Server sollen es nicht mehr einsetzen ([ebd.](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)). Claude wählt es automatisch, wenn die URL auf `/sse` endet ([Claude-Doku](https://claude.com/docs/connectors/custom/remote-mcp)). Ein Server, der ausschließlich SSE spricht, ist heute noch erreichbar, steht aber auf der Streichliste.

## 2. Zustandslos: was 2026-07-28 am Server ändert

Die aktuelle Spezifikation nennt MCP ein zustandsloses Protokoll: Jede Anfrage enthält alles, was der Server zur Bearbeitung braucht ([Spezifikation: Basic](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#statelessness)). Den früheren `initialize`-Handshake gibt es nicht mehr; Protokollversion und Fähigkeiten des Clients reisen in jeder Anfrage mit ([Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)).

Zwei Folgen für Ihren Server:

- **`server/discover` ist Pflicht.** Darüber fragt ein Client vorab ab, welche Protokollversionen und Fähigkeiten Ihr Server hat und wie er heißt ([Spezifikation: server/discover](https://modelcontextprotocol.io/specification/2026-07-28/server/discover)).
- **Zustand über mehrere Aufrufe wird explizit.** Braucht ein Werkzeug Kontext aus einem früheren Aufruf, gibt der Server ein eigenes Kennzeichen aus, das der Client als normales Werkzeug-Argument zurückschickt ([Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)).

Der Vorteil für den Betrieb: Anfragen lassen sich auf beliebige Instanzen verteilen, ohne dass eine Sitzung an einem Rechner hängt. Was sich sonst mit dieser Version geändert hat, steht in unserem Beitrag zur [MCP-Spezifikation Juli 2026](/wissen/mcp-spezifikation-juli-2026).

## 3. Anmeldung: die OAuth-Kette, Glied für Glied

Autorisierung ist in der Spezifikation optional. Wer sie über HTTP anbietet, soll aber dem festgelegten Ablauf auf Basis von OAuth 2.1 folgen ([Spezifikation: Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)). Für einen B2B-Dienst mit Kundendaten ist das der Normalfall. Warum ein statischer API-Key dafür nicht reicht, erklärt unser Beitrag [API-Key oder OAuth?](/wissen/mcp-api-key-oauth).

1. **401 mit Wegweiser.** Ruft ein Client ohne Token auf, antwortet der Server mit `401 Unauthorized` und nennt im Header `WWW-Authenticate` unter `resource_metadata` die Adresse seiner Metadaten. Alternativ liegen die Metadaten unter einer festen Adresse (`/.well-known/oauth-protected-resource`, mit oder ohne den Pfad des Endpunkts); Clients müssen beide Wege beherrschen ([Spezifikation: Discovery](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/authorization-server-discovery)). Claude verlangt den Statuscode 401 ausdrücklich: Ein `WWW-Authenticate`-Header an einer 200-Antwort wird ignoriert ([Claude-Doku: Authentication](https://claude.com/docs/connectors/building/authentication)).

2. **Resource-Metadaten nach RFC 9728.** Das ist ein kleines JSON-Dokument, das sagt, welcher Anmeldeserver für Ihren MCP-Server zuständig ist. Der Server muss es anbieten, und es muss das Feld `authorization_servers` mit mindestens einem Eintrag enthalten ([ebd.](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/authorization-server-discovery)).

3. **Metadaten des Anmeldeservers.** Der Anmeldeserver beschreibt sich nach RFC 8414 (`/.well-known/oauth-authorization-server`) oder nach OpenID Connect Discovery (`/.well-known/openid-configuration`). Einer der beiden Wege muss vorhanden sein; Clients probieren beide ([Spezifikation: Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)).

4. **PKCE mit S256.** PKCE sichert jeden Login mit einem Einmal-Geheimnis ab, das einen abgefangenen Anmeldecode wertlos macht. Clients müssen es verwenden und brechen ab, wenn der Anmeldeserver das Feld `code_challenge_methods_supported` nicht angibt ([Spezifikation: Security](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations)). Claude schickt S256 bei jeder Anmeldung mit, OpenAI verlangt, dass Ihr Anmeldeserver S256 ausweist ([Claude-Doku](https://claude.com/docs/connectors/building/authentication), [OpenAI: Auth](https://developers.openai.com/apps-sdk/build/auth)).

5. **Client-Registrierung.** Ihr Anmeldeserver muss wissen, wer sich anmelden will. Die Spezifikation nennt eine Reihenfolge: vorab registrierte Zugangsdaten, dann *Client ID Metadata Documents* (CIMD: Der Client veröffentlicht seine Angaben unter einer URL, und diese URL ist seine Client-ID), dann *Dynamic Client Registration* (DCR, RFC 7591: Der Client registriert sich beim ersten Kontakt selbst). DCR gilt seit 2026-07-28 als veraltet und bleibt nur aus Kompatibilitätsgründen erlaubt ([Spezifikation: Client Registration](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration)). In der Praxis unterstützen Claude und ChatGPT heute beide Verfahren; Claude empfiehlt CIMD und erlaubt zusätzlich eine selbst eingetragene Client-ID ([Claude-Doku](https://claude.com/docs/connectors/custom/remote-mcp), [OpenAI: Auth](https://developers.openai.com/apps-sdk/build/auth)).

6. **Das Token gehört Ihrem Server.** Clients geben bei Login und Token-Abruf den Parameter `resource` mit (RFC 8707), also die Adresse Ihres MCP-Servers; ChatGPT hängt ihn an beide Anfragen an ([OpenAI: Auth](https://developers.openai.com/apps-sdk/build/auth)). Ihr Server muss prüfen, dass ein Token genau für ihn ausgestellt wurde, und darf fremde Tokens weder annehmen noch an Ihre eigentliche API durchreichen ([Spezifikation: Access Token Usage](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#access-token-usage)). Braucht der MCP-Server Zugriff auf Ihre API, meldet er sich dort mit eigenen Zugangsdaten an, etwa als eigener OAuth-Client.

7. **Die Rücksprungadresse.** Nach dem Login schickt Ihr Anmeldeserver den Nutzer zurück zum Client. Für Claude im Web, auf dem Desktop und mobil ist das `https://claude.ai/api/mcp/auth_callback` ([Claude-Doku](https://claude.com/docs/connectors/building/authentication)). Rücksprungadressen müssen HTTPS verwenden oder auf `localhost` zeigen ([Spezifikation: Security](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations)).

8. **Fehlende Rechte sauber melden.** Reicht der Umfang (Scope) eines Tokens für ein Werkzeug nicht, soll der Server mit `403` und `error="insufficient_scope"` samt benötigtem Scope antworten. Der Client kann dann gezielt mehr Rechte anfragen, statt den Nutzer neu anmelden zu lassen ([Spezifikation: Scope Challenge](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#scope-challenge-handling)).

In unserem [Report](/report) ist [awork](/wissen/awork-mcp) das Beispiel, bei dem sich die Kette von außen nachvollziehen lässt: Anmeldeaufforderung mit `resource_metadata`, Resource-Metadaten, Anmeldeserver-Metadaten mit S256 und einem Registrierungs-Endpunkt für DCR.

:::box Drei Bruchstellen, die man leicht übersieht
- **200 statt 401:** Der Server antwortet ohne Token mit 200 und legt den Wegweiser nur in den Header. Claude wertet ihn dann nicht aus.
- **Kein `code_challenge_methods_supported`:** Der Anmeldeserver kann PKCE vielleicht, sagt es aber nicht. Spezifikationstreue Clients brechen ab.
- **Token durchgereicht:** Der MCP-Server gibt das Nutzer-Token unverändert an die Backend-API weiter. Die Spezifikation verbietet das ausdrücklich.
:::

## Ohne Anmeldung: wann das reicht

Claude bietet „No sign-in" an: Wer die URL kennt, kann die Anbindung nutzen. Verlangt der Server einen API-Key, trägt man ihn als Request-Header ein, und Claude speichert ihn als Zugangsdaten der Anbindung ([Claude-Doku](https://claude.com/docs/connectors/custom/remote-mcp)). ChatGPT kennt ebenfalls eine Verbindung ohne Anmeldung ([OpenAI: Developer mode](https://developers.openai.com/api/docs/guides/developer-mode)).

Für öffentliche Daten wie Dokumentation oder Fahrpläne ist das angemessen. Für Kundendaten fehlt damit, was OAuth leistet: Rechte pro Person und ein Widerruf, der nur einen Nutzer trifft.

## Netzwerk: woher Claude anklopft

Wer seinen Server hinter einer Firewall oder mit bedingtem Zugriff betreibt, braucht die Absenderadressen. Anthropic gibt für ausgehenden Verkehr an Ihren Server den Bereich `160.79.104.0/21` an ([Claude-Doku: Network reference](https://claude.com/docs/connectors/building/authentication)).

## Die Checkliste

| Prüfpunkt | Anforderung | Quelle |
|---|---|---|
| Endpunkt | HTTPS, ein Pfad, POST; Antwort als JSON oder SSE | Spezifikation, Transports |
| Version | Header `MCP-Protocol-Version` bei jedem POST; `server/discover` beantworten | Spezifikation |
| Origin | prüfen, bei ungültigem Wert `403` | Spezifikation, Transports |
| Ohne Token | `401` mit `WWW-Authenticate: … resource_metadata="…"` | Spezifikation, Claude-Doku |
| Resource-Metadaten | RFC 9728, Feld `authorization_servers` | Spezifikation |
| Anmeldeserver | RFC 8414 oder OpenID Connect Discovery | Spezifikation |
| PKCE | `S256` in `code_challenge_methods_supported` | Spezifikation, Claude, OpenAI |
| Registrierung | CIMD; DCR übergangsweise | Spezifikation |
| Token | Audience prüfen, nichts durchreichen | Spezifikation |
| Rücksprung | `https://claude.ai/api/mcp/auth_callback` zulassen | Claude-Doku |

## Quellen (Stand 22. September 2026)

- MCP-Spezifikation 2026-07-28: [Übersicht](https://modelcontextprotocol.io/specification/2026-07-28), [Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http), [Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization), [Client Registration](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration), [Security Considerations](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations), [server/discover](https://modelcontextprotocol.io/specification/2026-07-28/server/discover), [Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- Anthropic: [Custom connectors via remote MCP](https://claude.com/docs/connectors/custom/remote-mcp), [Authentication](https://claude.com/docs/connectors/building/authentication)
- OpenAI: [Developer mode](https://developers.openai.com/api/docs/guides/developer-mode), [Apps SDK: Authentication](https://developers.openai.com/apps-sdk/build/auth)

Diese Liste gilt für die Spezifikation 2026-07-28. Die nächste Version kann einzelne Punkte wieder ändern, so wie 2026-07-28 die Sitzungen abgeschafft und DCR für veraltet erklärt hat.

**→ Ob Ihr Endpunkt die ersten Glieder dieser Kette besteht, zeigt der [kostenlose Live-Test](/test): Er prüft Erreichbarkeit, `server/discover` und ob Ihre OAuth-Metadaten nach RFC 9728 auffindbar sind.**
