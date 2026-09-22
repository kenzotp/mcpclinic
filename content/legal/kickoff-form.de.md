# Kickoff-Formular: MCP-Audit

*(Vom Kunden auszufüllen, vor Prüftag 1 zurück an info@zuuna.de. Basis für § 2 des Audit-Vertrags: Ohne dieses Formular startet die Prüfung nicht, und die 10-Werktage-Frist beginnt erst mit vollständiger Rückgabe.)*

**Kunde / Unternehmen:** ________________________________

**Produkt / geprüfte API:** ________________________________

**1. API-Grundlagen**
- Basis-URL der produktiven API: ________________________________
- Öffentliche API-Dokumentation (URL): ________________________________
- OpenAPI-/Swagger-Datei, falls vorhanden (URL oder Anhang): ________________________________
- Falls die Doku nur intern existiert: bitte Datei mitliefern.

**2. Testzugang** *(ausnahmslos minimale Rechte, siehe § 2 des Audit-Vertrags)*
- Art der Authentifizierung: ☐ API-Key ☐ OAuth 2.0 (Flow: ______) ☐ Basic ☐ Sonstiges: ______
- Zugangsdaten (werden nach Prüfende gelöscht): ________________________________
- Rolle/Scopes des Zugangs: ________________________________
- ✍ Bestätigung: Der Zugang ist mit **Lese-Rechten** eingerichtet. ☐

**3. Staging / Schreibtests**
- Staging-URL (falls vorhanden): ________________________________
- Zugang zum Staging: ________________________________
- Falls kein Staging existiert: freigegebene Wegwerf-Objekte für Schreibtests (z. B. Test-Kunde „MCP-Audit-Dummy“): ________________________________
- ✍ Bestätigung: Schreibtests sind NUR auf Staging oder gegen die oben genannten Wegwerf-Objekte freigegeben. ☐

**4. Einschränkungen**
- Rate Limits (Anfragen/Minute, Tageslimits): ________________________________
- Wartungsfenster / gesperrte Zeiträume: ________________________________
- IPs, die auf eine Whitelist müssen (unsere Prüfroutine läuft aus dem EU-Ausland): ________________________________

**5. Ansprechpartner**
- Technische Rückfragen (Name, E-Mail, Telefon, erreichbar am Prüftag): ________________________________
- Freigabe dieser Angaben (Name, Funktion): ________________________________

**6. Kontext (optional, verbessert den Bericht)**
- Geplante oder gewünschte Agenten-Anwendungsfälle: ________________________________
- Bisherige Erfahrungen mit Agenten-Zugriffen auf die API: ________________________________

---

**Datenschutz-Hinweis:** Die Angaben werden ausschließlich zur Durchführung des Audits verwendet, nach Berichtsübergabe gelöscht (Zugangsdaten sofort nach Prüftag 3) und nicht an Dritte weitergegeben. Details: https://mcpclinic.dev/impressum

**Rückgabe:** ausgefüllt an **info@zuuna.de**. Rückfragen zum Formular beantworten wir vor der Prüfung.
