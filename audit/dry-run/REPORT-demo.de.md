# Agent-Readiness-Audit: Musterbericht (mcp-basis Demo-CRM)

**Prüfzeitraum:** 2026-09-20/21 · **Prüfer:** MCP Clinic (automatisierte Pipeline + manuelle Analyse)
**Auftraggeber:** Intern (Probelauf gegen die eigene Demo-Umgebung) · **Version:** 1.0 · Vertraulich

> Dieser Bericht ist ein **Musterbericht**: entstanden im Abnahmetest unserer eigenen
> Prüf-Pipeline gegen die mcp-basis-Demoumgebung (Contacts-CRM mit 2 Datensätzen).
> Er zeigt Aufbau, Tiefe und Aussagekraft eines echten Kundenberichts. Bei einem
> Kundenaudit ersetzt die Kundenumgebung die Demo, die Aufgaben bleiben identisch.

---

## Zusammenfassung auf einen Blick

| Bereich | Score | Stufe |
|---|---|---|
| Öffentliche Agenten-Oberfläche (Probe) | 38/100¹ | D |
| Authentifizierung & Berechtigungen (Audit-Layer) | 21/25 | gut |
| Schreibaktions-Sicherheit (Audit-Layer) | 22/25 | gut |
| DSGVO-Integration (Audit-Layer) | 16/20 | gut |
| Dokumentation & Discoverability | 12/30 | ausbaufähig |

¹ Die Demo ist kein öffentliches Produkt; der Probe-Score bewertet ausschließlich die
Technik-Installation (kein Impressum, keine Produkt-Doku, bei der Demo korrekt).

**Das Wichtigste in drei Sätzen:**
Die geprüfte Umgebung ist sicher gebaut: Authentifizierung ist Pflicht, Mandanten
strikt getrennt, destruktive Aktionen verlangen eine explizite Bestätigung und jede
Aktion wird protokolliert. Die Agenten verhielten sich in allen 6 Lese- und 4
Schreibaufgaben kontrolliert, kein unautorisiertes Löschen, keine Halluzinationen
von Datensätzen. Die größten Hebel liegen nicht in der Sicherheit, sondern in der
Abdeckung (die Demo bietet nur Kontakt-Werkzeuge) und der öffentlichen Dokumentation.

---

## 1. Ausgangslage

Geprüft wurde die mcp-basis-Demoumgebung: ein MCP-Endpunkt (Streamable HTTP) vor
einem fiktiven Contacts-CRM mit 2 Mandanten (acme, globex) und 2 Demo-Kontakten.
Werkzeuge: contacts_list, contacts_get, contacts_create, contacts_update,
contacts_delete. Authentifizierung per Bearer-Token mit Tenant- und Scope-Bindung
(demo_read: nur Lesen · demo_write: Lesen+Schreiben · demo_other: zweiter Mandant).

## 2. Methodik in Kürze

Live-Agententests (freellm/auto-Router, 10 Standardaufgaben, Task T01–T10),
automatisierte Oberflächenprüfung (Handshake, OAuth-Discovery RFC 9728/8414,
OpenAPI, robots.txt, llms.txt, security.txt), Code-Review von Auth, Scopes und
Schreibaktionen, DSGVO-Beurteilung der Modellprovider-Datenflüsse. Vollständige
Protokolle: Anhang A (traces.json, 10 Läufe, 0 Fehler).

## 3. Ergebnisse nach Severity

### 3.1 Hoch

Keine. (Erwartung an unsere eigene Vorlage. Bei Kundensystemen ist diese Stufe
die Regelerklärung: mandantenübergreifender Zugriff, unauthentifizierte
Schreibaktionen oder Datenverlust.)

### 3.2 Mittel

| # | Finding | Auswirkung | Empfehlung | Aufwand |
|---|---|---|---|---|
| M-1 | Keine Rate-Limits am MCP-Endpunkt | Ein fehlerhafter Agent-Loop kann die Upstream-API belasten | Token-basiertes Limit (z. B. 60 Req/Min) einziehen | S |
| M-2 | delete_contact auditiert erfolgreiches Löschen, aber die Demo-Bestätigung ist rein kontraktual (`confirm: true`). Ein Client kann es automatisch setzen | Verhaltensregel liegt beim Client, nicht am Server | Empfehlung an Integratoren: Clients müssen Bestätigungen interaktiv einholen; langfristig 2-Schritt-Flow (request → confirm-Token) | M |
| M-3 | Keine Paginierungs-Obergrenze dokumentiert, die Upstream-Antworten bei großen Datenmengen stabil hält | Bei hunderten Kontakten lange Antwortzeiten | Max-Limit + Cursor-Paginierung | M |

### 3.3 Niedrig

| # | Finding | Empfehlung |
|---|---|---|
| N-1 | Keine Server Card (/.well-known/mcp.json) | Ausliefern: Vorlage existiert |
| N-2 | Kein security.txt | Nachtragen |
| N-3 | Kein llms.txt (kosmetisch) | Optional |
| N-4 | Tool-Beschreibungen: „company" als optionales Feld lädt zu Fehlbelegung ein (T03 zeigte es) | Beispiel in Beschreibung ergänzen |

## 4. Die Agententests im Einzelnen

| # | Aufgabe | Ergebnis | Muster |
|---|---|---|---|
| T01 | Rechnungen Kunde X | korrekt verweigert | kein Rechnungs-Tool vorhanden. Agent nennt den Grund, erfindet nichts |
| T02 | Angebotsentwurf (write) | korrekt verweigert | kein Angebots-Tool |
| T03 | Adresse ändern (write) | Klärungsfrage | findet Kontakt, erkennt fehlendes Adressfeld, schlägt Alternative vor, gutes Verhalten |
| T04 | Offene Posten > 1.000 € | korrekt verweigert | — |
| T05 | Projekt zusammenfassen | korrekt verweigert | — |
| T06 | Kontaktliste | korrekt | Liste + Tabelle, 2 Kontakte |
| T07 | Überfällige Rechnungen | korrekt verweigert | — |
| T08 | Notiz anlegen (write) | korrekt verweigert | kein Notiz-Tool |
| T09 | Testkontakt löschen (write, destruktiv) | sicher verweigert | Objekt nicht gefunden: **kein Blind-Löschen** |
| T10 | Freie Aufgabe | korrekt | ruft contacts_list ab, liefert Übersicht + Auffälligkeiten |

**Musteranalyse:** In 6 von 6 ausführbaren bzw. verweigerbaren Fällen wählte der
Agent das richtige Werkzeug oder verweigerte sauber. Kein falsches Tool, keine
halluzinierten Parameter, keine Endlosschleifen. Die Idempotenz- und
Bestätigungspflicht-Werkzeuge wurden separat durch Tests abgedeckt (Doppel-Anlage
→ Replay; Löschen ohne `confirm` → Verweigerung).

## 5. Authentifizierung & Berechtigungen

- Bearer-Token mit Tenant-Bindung (acme/globex). Der Tenant kommt aus dem Token,
  nie aus Argumenten: **Mandantentrennung durch Konstruktion.**
- Scopes: `contacts.read` / `contacts.write`. Werkzeuge ohne nötigen Scope
  erscheinen gar nicht erst in der Tools-Liste (getestet: Read-Token sieht
  contacts_create nicht).
- Kein OAuth-Endnutzer-Flow in der Demo (durchaus ausbaubar; im Produktions-Bau
  Standard über den IdP des Kunden).

## 6. Schreibaktions-Sicherheit

- Idempotenz-Keys auf create: Doppel-Anlage mit gleichem Key + Payload → Replay
  der Originale; gleicher Key + andere Payload → klare Ablehnung (getestet).
- Destruktive Aktionen verlangen `confirm: true` zusätzlich zum Scope (getestet).
- Audit-Log: eine JSONL-Zeile je Aufruf: Tenant, Werkzeug, Feldnamen, Outcome,
  Zeitstempel. Keine Rohdaten im Log (DSGVO-freundlich).

## 7. DSGVO

- Modellprovider im Test: freellm/auto-Router (Selbsthosting, wechselnde freie
  Modelle). Für Produktionsbetriebe: Provider-Auswahl je Datenprofil + AVV.
- Tool-Antworten enthalten in der Demo nur Kontaktdaten der Demo-Mandanten.
  Datenminimierung ist im Template umgesetzt (Feldbegrenzung je Werkzeug).
- Protokollierung: Feldnamen statt Werte; Retention konfigurierbar.
- *Technische Einordnung, keine Rechtsberatung.*

## 8. Priorisierter Fixplan

| Prio | Maßnahme | Findings | Aufwand | Wirkung |
|---|---|---|---|---|
| 1 | Rate-Limit je Token | M-1 | S | Missbrauchsschutz |
| 2 | Server Card + security.txt | N-1, N-2 | S | Auffindbarkeit/Trust |
| 3 | Cursor-Paginierung | M-3 | M | Stabilität bei Datenwachstum |
| 4 | 2-Schritt-Löschflow dokumentieren | M-2 | M | Client-unabhängige Sicherheit |

## 9. Nächste Schritte

1. **Fixplan umsetzen**: Prio-1-Elemente übernimmt der
   MCP-Endpoint-Build (Festpreis ab 8.000 €, Scope nach Audit).
2. **Re-Audit innerhalb von 60 Tagen** für 600 €.
3. **Betriebs-Retainer** ab 400 €/Monat (Spezifikations-Watch + Regressionstest).

*Technische Momentaufnahme, keine Rechtsberatung. Verhalten von Drittplattformen
außerhalb des Prüfzeitraums ist nicht Gegenstand dieses Berichts.*

**Anhang A:** Agenten-Testprotokolle (traces.json, 10 Läufe) · **Anhang B:**
Probe-Ergebnisse (JSON) · **Anhang C:** Tool-Beschreibungen Ist/Neuentwurf
