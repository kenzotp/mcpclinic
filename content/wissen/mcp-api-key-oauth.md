# API-Key oder OAuth? Warum Agenten mit dem Hauptzimmerherrn-Schlüssel nicht fahren sollten

*Ziel-Keywords: API Key vs OAuth, MCP OAuth 2.0, Agenten API Zugang, delegated authorization KI-Agenten*

**Meta-Description:** KI-Agenten handeln im Namen Ihrer Nutzer, und statische API-Keys sind dafür der falsche Schlüssel. Was OAuth 2.1, Scopes und automatische Client-Registrierung konkret bewirken und warum 9 von 21 deutschen APIs hier umgebaut werden müssen.

:::stat 9/21 | geprüfte deutsche B2B-SaaS-APIs sind ausschließlich mit statischen Keys nutzbar; delegierte Agenten-Zugriffe sind damit nicht sicher abbildbar

:::takeaway
- Ein API-Key identifiziert eine Anwendung. OAuth identifiziert einen **Nutzer** mit eingeschränkten Rechten; genau das braucht ein Agent, der im Namen eines Menschen handelt.
- Mit statischen Keys gibt es nur zwei Zustände: alles erlauben oder alles verbieten. Keine Scopes, keine Nutzerzuordnung, kein gezielter Widerruf.
- OAuth 2.1 mit PKCE und automatischer Client-Registrierung ist der Stand der Technik; awork zeigt, dass es in deutschen APIs bereits geht. Seit der MCP-Spezifikation 2026-07-28 sind dafür Client ID Metadata Documents vorgesehen, Dynamic Client Registration nur noch zur Kompatibilität.
- Ohne OAuth in der eigenen API bleibt nur die teurere Variante: eine eigene Rechteschicht zwischen Agent und API.
:::

---

Die häufigste Architekturfrage beim MCP-Bau ist nicht „welches Framework", sondern: **Wie meldet sich der Agent eigentlich an?** Die Antwort entscheidet über Sicherheit, Datenschutz und am Ende auch über den Preis.

## Was der Agent anders macht als Ihr Integrationssystem

Eine klassische Integration (z. B. ein ERP, das mit Ihrer API spricht) arbeitet als **eigener Akteur** mit eigenen Rechten: der Integrations-Nutzer, seine Rolle, fertig.

Ein KI-Agent dagegen handelt **stellvertretend für einen Menschen**. Er soll die Rechnungen des Vertriebs buchen, die dieser selbst buchen darf, und nicht mehr. Diese Stellvertretung ist der Kern von OAuth: Der Nutzer autorisiert einmalig einen eingeschränkten Zugang in seinem Namen, mit bestimmten Rechten (Scopes), jederzeit widerrufbar, ohne dass der Agent jemals sein Passwort sieht.

## Was statische Keys stattdessen bedeuten

Ein statischer API-Key gehört einer Anwendung, nicht einem Nutzer. Konkret heißt das für jeden Agenten-Einsatz:

1. **Rechte können nicht pro Nutzer eingeschränkt werden.** Entweder der Key darf alles (und der Agent auch), oder der Anwendungsfall funktioniert nicht.
2. **Keine Zuordnung im Protokoll.** Wer hat den Vorgang ausgelöst? Der Key sagt es nicht. Für Revision und [DSGVO-Dokumentation](/wissen/mcp-server-dsgvo) fehlt die Kette.
3. **Widerruf ist eine Amputation.** Verdächtigt man den Key, muss man ihn komplett drehen und alle Integrationen damit offline nehmen.

Unser [Report](/report) findet genau diese Konstellation bei 9 von 21 geprüften APIs, oft zusätzlich kombiniert mit fehlender maschinenlesbarer Dokumentation.

## Wie der Stand der Technik aussieht

Der Referenzfall aus unserem Report ist awork (53/100, bester Wert): MCP-Server mit **OAuth 2.1 plus PKCE** und **Dynamic Client Registration**, das heißt, ein Agent-Client kann sich selbstständig ordnungsgemäß registrieren lassen, ohne dass ein Mensch auf einer Entwicklerseite manuell eine Client-ID anlegen muss. Dazu Setup-Guides für Claude Code, VS Code und ChatGPT. Das ist keine Rakete. Es ist konsequente Anwendung dessen, was die OAuth-Welt seit Jahren kennt.

Ein Hinweis zum aktuellen Stand: Die [MCP-Spezifikation 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration) erklärt Dynamic Client Registration für veraltet. Vorgesehen sind jetzt Client ID Metadata Documents: Der Client veröffentlicht seine Angaben unter einer URL, und diese URL ist seine Client-ID. DCR bleibt aus Kompatibilitätsgründen erlaubt, Claude und ChatGPT unterstützen beide Verfahren. Wer heute neu baut, plant Client ID Metadata Documents ein. Die ganze Anmeldekette Schritt für Schritt: [Remote-MCP-Server: Was Ihr Endpunkt braucht](/wissen/remote-mcp-server).

Für den Server-Bau bedeutet OAuth außerdem weniger Eigenbau: Scopes landen direkt in der Werkzeuglogik ([so trennen wir Mandanten und Rechte pro Werkzeug](/mcp-server-entwickeln)), statt dass der Server eine zweite Berechtigungsschicht simulieren muss.

## Was zu tun ist, je nach Ausgangslage

- **API mit OAuth vorhanden:** Der MCP-Server wird an die bestehende Autorisierung angeschlossen. Der überschaubare Fall.
- **API nur mit statischen Keys:** Vor dem MCP-Bau lohnt die Frage an das API-Team: Gibt es eine OAuth-Roadmap? Falls nein, trägt der MCP-Server eine eigene Rechteschicht, machbar, aber der Aufwandposten Nr. 1.
- **Unklar, wo man steht:** Ein [Audit](/mcp-audit) prüft genau diesen Punkt mit allen übrigen Agenten-Anforderungen und liefert den Fixplan dafür, oder der [Live-Test](/test) gibt in Minuten eine erste Richtung.

Der API-Key war für die klassische Integration ein gutes Werkzeug. Für Agenten ist er der Schlüssel, der viel zu viel aufschließt.
