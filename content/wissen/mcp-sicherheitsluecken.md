# MCP-Sicherheitslücken: Wie KI-Agenten zu einem Angriffsvektor werden (und was Ihre API dagegen tun muss)

*Ziel-Keywords: MCP Sicherheitslücken, MCP Server Sicherheit, KI-Agent API Sicherheit*

**Meta-Description:** Die 6 häufigsten Sicherheitslücken bei MCP-Anbindungen: von offenen Servern ohne Login bis zu löschenden Agenten ohne Bestätigung. Mit Beispielen aus unserem Report über 21 deutsche SaaS-APIs.

:::takeaway
- Die typischen Lücken wiederholen sich: offene Endpunkte, ein Key für alles, Schreibaktionen ohne Bremsen.
- Mandantentrennung muss auf der Serverseite erzwungen werden, nie über Tool-Argumente.
- Kostenlose Scanner sehen keine dieser Lücken; sie verschwinden erst hinter dem Login, den Scanner nie durchqueren.
:::

---

Wer MCP-Server liest, denkt zuerst an Komfort. Sicherheitsleute lesen sie anders, und sie hätten recht: Ein MCP-Server gibt einem Sprachmodell **ausführende Hände** an Ihrer Software. Was bei einem unvorsichtigen Nutzer ein Klick ist, ist bei einem Agenten ein API-Aufruf in Millisekunden: wiederholbar, skriptbar und ohne dass ein Mensch hinsieht.

Die gute Nachricht: Die typischen Lücken wiederholen sich. Hier sind die sechs, die wir am häufigsten sehen, in Community-Servern genauso wie in schnell gebauten Eigenlösungen.

## 1. Server ohne eigene Authentifizierung

Der größte Fehler: Der MCP-Endpunkt steht offen, und die Tools selbst führen den API-Key des Betreibers aus. Wer den Endpunkt findet, darf mitreden. Und mitmachen.

**So sieht richtig aus:** Der Endpunkt antwortet auf jeden unangemeldeten Aufruf mit 401 und zeigt über den OAuth-Standard (RFC 9728), wie man sich anmeldet. Genau das prüft unser Live-Test automatisch.

## 2. Ein Key für alles

Viele APIs arbeiten mit einem statischen API-Key ohne Einschränkungen. Für Agenten ist das fatal: „Dieser Assistent darf Rechnungen *lesen*" ist ohne OAuth-Scopes technisch nicht ausdrückbar. In unserem Report arbeiten **9 von 21 geprüften APIs** mit statischen Keys ohne OAuth: Delegierte, eingeschränkte Agentenzugriffe sind dort schlicht nicht abbildbar.

## 3. Schreibaktionen ohne Bremsen

Ein Tool namens `delete_contact` oder `send_invoice` ohne Schutzmechanismen ist eine Warte-zu-Passieren-Plattform: Ein Missverständnis des Sprachmodells genügt. Minimalstandard für jedes Schreib-Tool:

- **Idempotenz-Keys**: Derselbe Auftrag führt nicht zu doppelt angelegten Objekten
- **Bestätigungspflicht** bei destruktiven Aktionen (ein explizites `confirm: true`, das der Nutzer im Client bewusst absegnet)
- **Audit-Log** für jede Aktion: wer, was, wann, ohne sensible Werte

## 4. Mandantentrennung nur in der Doku

Der Klassiker aus Multi-Tenant-Systemen: Das Tool akzeptiert eine `tenant_id` als Parameter. Ein Agent kann sie auch mit einer fremden ID füttern. Richtig ist die Trennung **auf der Serverseite**: Die Mandanten-ID kommt aus dem angemeldeten Token, nie aus den Tool-Argumenten. Wenn Ihre Antwort auf „zeig mir die Kontakte von Mandant B" von der Argumentstruktur abhängt, haben Sie eine Lücke.

## 5. Werkzeugbeschreibungen, die in die Irre führen

Klingt unspektakulär, ist aber eine Sicherheitsfrage: Wählt das Modell wegen vager Beschreibungen das falsche Tool (etwa `delete_ticket` statt `close_ticket`), wird aus einem Missverständnis ein Incident. Gute Beschreibungen nennen Aufgabe, Parameter mit Format, Rückgabe und Fehlerverhalten. Wir regressionstesten sie deshalb mit drei verschiedenen Modell-Clients.

## 6. Datenflüsse, die keiner gebilligt hat

Jeder Agenten-Aufruf schickt Ihre Kundendaten an einen Modellprovider. Welche Daten, zu welchem Anbieter, mit welchem Auftragsverarbeitungsvertrag, mit welcher Löschfrist: das muss der SaaS-Betreiber beantworten können, bevor der erste Kunde fragt. (Eigener Artikel: [MCP und DSGVO](/wissen/mcp-server-dsgvo).)

## Was Scanner nicht finden und Agenten schon gar nicht

Kostenlose Scanner prüfen, ob eine Datei existiert. Sie melden nicht, ob `delete_user` eine Bestätigung verlangt, ob Mandant A Mandant B lesen kann oder ob der Agent nach einem Fehler blind weiterrät. Genau das passiert im **[Agent-Readiness-Audit](/mcp-audit)**: 10 Standardaufgaben, live mit echten Modellen gegen Ihre API, protokolliert, plus Fixes zum Festpreis.

**→ Erst grob sortieren? [Kostenloser MCP-Live-Test](/test) in unter einer Minute.**
