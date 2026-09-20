# Vertrag über den Bau eines MCP-Endpoints („MCP-Endpoint-Build")

*(AI-Entwurf 2026-09-20 — Festpreis wird nach Audit-Scope fixiert; vor Verwendung Platzhalter füllen)*

zwischen

**[AUFTRAGGEBER], [ANSCHRIFT]** — „Auftraggeber" —

und

**[AUFTRAGNEHMER], [ANSCHRIFT]** — „Auftragnehmer" —

## § 1 Gegenstand

Der Auftragnehmer entwickelt und übergibt einen produktionsreifen MCP-Server („Endpoint") vor der im Audit vom [DATUM] („Audit-Bericht") definierten API des Auftraggebers.

## § 2 Leistungsumfang (Standard-Scope)

(1) Umfang: **eine API, bis zu 20 Werkzeuge („Tools")**, gemäß Fixplan des Audit-Berichts. Weiterer Umfang wird nach Aufwand oder als weiterer Festpreis beauftragt.
(2) Enthalten: TypeScript auf Basis des Standardarchitektur-Templates des Auftragnehmers; Authentifizierung (pro-Nutzer-OAuth, soweit die API des Auftraggebers dies unterstützt, sonst eingeschränkte Service-Keys); Berechtigungen pro Tool; Mandantentrennung auf Tool-Ebene; Idempotenz für Schreibaktionen; Bestätigungsflow für destruktive Aktionen; Audit-Protokollierung; agentenlesbare Dokumentation; Regressionstest der Tool-Beschreibungen mit 3 Modell-Clients; Übergabe mit Tests und Betriebshandbuch.
(3) **Nicht enthalten:** Entwicklungen an der API oder Anwendungen des Auftraggebers selbst; clientseitige App-Entwicklung; Betrieb über die Abnahme hinaus (siehe ggf. gesonderten Retainer-Vertrag).

## § 3 Mitwirkung des Auftraggebers

Bereitstellung: API-Zugänge (auch Schreibrechte auf Staging), OAuth-Infrastruktur oder Schlüssel nach Absprache, Testdaten, eine technische Ansprechperson, Infrastruktur für Abnahmetests. Verzögerungen aus fehlender Mitwirkung verlängern Termine entsprechend.

## § 4 Termine und Abnahme

(1) Umsetzungszeitraum: 2–4 Wochen ab Startfreigabe (abhängig von OAuth-Voraussetzungen).
(2) Der Auftragnehmer übergibt inkl. Abnahmetests (Protokoll aus § 2 Abs. 2). Der Auftraggeber erklärt die Abnahme innerhalb von 10 Werktagen oder meldet begründete Abweichungen; ohne Meldung gilt die Abnahme als erteilt.

## § 5 Vergütung

Festpreis: **[XX.XXX] € zuzüglich USt.**, fixiert nach Audit-Scope vor Vertragsabschluss. Zahlung: 50 % bei Auftragserteilung, 50 % bei Abnahme.

## § 6 Rechte

(1) Der Auftraggeber erhält das einfache, zeitlich und räumlich unbeschränkte Nutzungsrecht am erstellten Code einschließlich Weitergabe an Dienstleister (Betrieb/Weiterentwicklung).
(2) Der Auftragnehmer behält Rechte an seinen vorbestehenden Standardbausteinen (Template „mcp-basis") und darf das Template und anonymisierte Erkenntnisse eigenständig nutzen und veröffentlichen.
(3) Der Auftraggeber kann auf Wunsch eine OSS-Veröffentlichung des Endpunktsystems vereinbaren (gesonderte Regelung).

## § 7 Gewährleistung und Haftung

(1) Gewährleistung: 60 Tage Nachbesserung von Abweichungen vom Audit-Fixplan, ohne Aufwandsgrenze seitens des Auftragnehmers für Mängel der übergebenen Leistung.
(2) Haftung wie folgt: unbeschränkt bei Vorsatz/grober Fahrlässigkeit; bei einfacher Fahrlässigkeit begrenzt auf den Auftragswert. Keine Haftung für Folgen außerhalb der übergebenen Leistung, insbesondere für Verhalten von Modellprovidern oder Agenten-Clients Dritter.

## § 8 Sonstiges

Gerichtsstand [SITZ AUFTRAGNEHMER]; deutsches Recht. Änderungen bedürfen der Textform. Nach der Abnahme empfohlen: Betriebs-Retainer (gesonderter Vertrag) zur Begleitung von Spezifikationsänderungen.

[ORT, DATUM] — Unterschriften
