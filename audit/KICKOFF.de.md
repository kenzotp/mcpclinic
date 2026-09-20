# Kickoff-Formular — Agent-Readiness-Audit

*Bitte ausfüllen und vor Prüfbeginn an info@zuuna.de zurücksenden. Alle Angaben
behandeln wir vertraulich. Rückfragen beantworten wir in der Regel innerhalb von
24 Stunden.*

## 1. System

| Frage | Antwort |
|---|---|
| Produktname + Kurzbeschreibung (1–2 Sätze) | |
| Öffentliche API-Dokumentation (URL) | |
| API-Basis-URL (Produktion) | |
| Staging-/Test-Umgebung (URL) — für Schreibtests | |

## 2. Zugang

| Frage | Antwort |
|---|---|
| Test-Token/-Key (nur Leserechte, minimal berechtigt) | |
| Gilt derselbe Zugang für Staging? Falls nein: Staging-Token | |
| Gibt es bereits einen MCP-Endpunkt? Wenn ja: URL + Zugangsweise | |
| Rate-Limits, die wir einhalten müssen | |

**Wichtig:** Wir benötigen niemals Produktions-Schreibrechte oder Voll-Admin-Token.
Schreibprüfungen laufen ausschließlich gegen Staging oder von Ihnen freigegebene
Wegwerf-Objekte (z. B. `TESTKONTAKT`).

## 3. Technischer Rahmen

| Frage | Antwort |
|---|---|
| OpenAPI/Swagger-Datei (URL oder Anhang), falls vorhanden | |
| Authentifizierungsverfahren der API (OAuth2 / API-Key / anderes) | |
| Gibt es Rollen/Rollenmodell mit eingeschränkten Rechten? Welche? | |
| Einschränkungen (Wartungsfenster, Mesh/VPN, IP-Allowlist) | |

## 4. Organisation

| Frage | Antwort |
|---|---|
| Technische Ansprechperson (Name, E-Mail, Telefon optional) | |
| Gewünschte Sprache des Berichts (Deutsch/Englisch) | |
| Rechnungsdaten (falls abweichend von der Auftragserteilung) | |

## 5. Datenschutz-Rahmen (Kurzinfo, keine Rechtsberatung)

- Der Audit-Zugang sollte so minimal wie möglich sein (Empfehlung: read-only).
- Live-Agententests senden Aufgaben an Modellprovider (Claude/GPT/OpenRouter).
  Enthält Ihre Testumgebung echte personenbezogene Daten, sagen Sie Bescheid —
  wir prüfen dann den Ablauf gemeinsam, bevor Tests starten.
- Prüfprotokolle speichern wir für die Dauer des Projekts + 30 Tage.
