# Agent-Readiness-Audit: {{KUNDE}}, {{PRODUKT}}

**Prüfzeitraum:** {{DATUM_VON}} – {{DATUM_BIS}} · **Prüfer:** MCP Clinic ({{PRUEFER}})
**Auftraggeber:** {{KUNDE_GMBH}} · **Version:** 1.0 · Vertraulich

---

## Zusammenfassung auf einen Blick

| Bereich | Score | Stufe |
|---|---|---|
| Öffentliche Agenten-Oberfläche (wie MCP-Live-Test) | {{SCORE_PUBLIC}}/100 | {{GRADE}} |
| Authentifizierung & Berechtigungen (Audit-Layer) | {{SCORE_AUTH}}/25 | {{AUTH_STUFE}} |
| Schreibaktions-Sicherheit (Audit-Layer) | {{SCORE_WRITE}}/25 | {{WRITE_STUFE}} |
| DSGVO-Integration (Audit-Layer) | {{SCORE_DSGVO}}/20 | {{DSGVO_STUFE}} |
| Dokumentation & Discoverability | {{SCORE_DOCS}}/30 | {{DOCS_STUFE}} |

**Das Wichtigste in drei Sätzen:**

{{DREI_SAETZE}}

---

## 1. Ausgangslage

{{AUSGANGSLAGE: Produkt, API-Umfang, Zielbild des Kunden, eingeschränkter Prüfumfang}}

## 2. Methodik in Kürze

Live-Agententests (Claude, GPT, {{MODEL_3}}: 10 Standardaufgaben), automatisierte
Oberflächenprüfung (MCP-Handshake, OAuth-Discovery RFC 9728/8414, OpenAPI,
Agent-Crawler-Politik, Server Card), Code-/Docs-Review von Auth, Scopes und
Schreibaktionen, DSGVO-Beurteilung der Datenflüsse in Modellprovider.
Vollständige Protokolle der Agententests liegen als Anhang A bei.

## 3. Ergebnisse nach Severity

### 3.1 Hoch

{{FINDING_HOCH: Nr., Titel, Befund, Beweis (Protokollauszug), Auswirkung, Empfehlung, Aufwand S/M/L}}

### 3.2 Mittel

{{FINDING_MITTEL}}

### 3.3 Niedrig

{{FINDING_NIEDRIG}}

## 4. Die Agententests im Einzelnen

| # | Aufgabe | Claude | GPT | {{MODEL_3}} | Muster |
|---|---|---|---|---|---|
| 1 | {{AUFGABE_1}} | {{ERG}} | {{ERG}} | {{ERG}} | {{MUSTER}} |
{{TABELLE_WEITERE}}

**Musteranalyse:** {{WELCHE_TOOLS_WERDEN_VERWECHSELT, WELCHE_PARAMETER_SCHEITERN}}

## 5. Authentifizierung & Berechtigungen

{{IST_MODELL: OAuth/Keys/Scopes/Delegation/Mandantentrennung, je Finding mit Severity}}

## 6. Schreibaktions-Sicherheit

{{IDEMPOTENZ, DESTRUKTIVE_AKTIONEN, AUDIT_LOG, RATE_LIMITS}}

## 7. DSGVO

{{MODELLPROVIDER, AVV, EU_HOSTING, RETENTION, DATENMINIMIERUNG, EMPFEHLUNG_OPT_IN}}
*Hinweis: Technische Einordnung, keine Rechtsberatung.*

## 8. Priorisierter Fixplan

| Prio | Maßnahme | Findings | Aufwand | Wirkung |
|---|---|---|---|---|
| 1 | {{MASSNAHME}} | F-x, F-y | {{S/M/L}} | {{WIRKUNG}} |
{{WEITERE_ZEILEN}}

## 9. Nächste Schritte

1. **Fixplan umsetzen**: Bei Prio-1-Elementen unterstützen wir mit dem
   MCP-Endpoint-Build (Festpreis ab 8.000 €, exakter Scope nach diesem Audit, Dauer 2–4 Wochen).
2. **Re-Audit innerhalb von 60 Tagen** zum Festpreis von 600 €, Gutschein beiliegend.
3. **Betriebs-Retainer (optional)** ab 400 €/Monat: Spezifikationsänderungen beobachten,
   monatlicher Agenten-Regressionstest, Prioritäts-Fixes.

*Dieses Dokument ist eine technische Momentaufnahme und keine Rechtsberatung.
Es macht keine Aussagen über das Verhalten von Drittplattformen (Modellprovider,
Agent-Anbieter) außerhalb des geprüften Zeitraums.*

**Anhang A:** Agenten-Testprotokolle · **Anhang B:** Automatisierte Probe-Ergebnisse (JSON) · **Anhang C:** Tool-Beschreibungen Ist/Neuentwurf
