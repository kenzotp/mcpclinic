# MCP-Server und DSGVO: Was Sie einrichten müssen, bevor Ihre Kunden KI-Agenten an Ihre API lassen

*Ziel-Keywords: MCP Server DSGVO, KI-Agenten DSGVO, Auftragsverarbeitung KI-Provider*

**Meta-Description:** Datenflüsse, Auftragsverarbeitung, Löschfristen, EU-Hosting: die DSGVO-Pflichten rund um MCP-Server — technisch sortiert, ohne Rechtsberatung.

:::takeaway
- Jeder Agenten-Aufruf sendet Kundendaten an einen Modellprovider — welche, zu wem, mit welchem AVV, muss dokumentiert sein.
- Der stärkste Hebel ist Datenminimierung im Tool-Design: Felder begrenzen, Seitengrößen deckeln.
- Statische API-Keys machen delegierte, eingeschränkte Agentenzugriffe unmöglich — OAuth-Scopes sind die Voraussetzung.
:::

---

Sobald ein KI-Agent mit Ihrer SaaS arbeitet, verlassen Kundendaten Ihr System. Das war bei klassischen Integrationen nicht anders — nur geschah es dort auf dokumentierten Wegen mit geregelten Verträgen. Agentenverkehr braucht dieselbe Sorgfalt, nur schneller. Hier die fünf Fragen, die Sie beantworten können sollten, bevor der erste Kunde fragt.

*(Wir sind Techniker, keine Anwälte — das hier ist technische Einordnung, keine Rechtsberatung.)*

## 1. Welche Daten fließen wohin?

Ein Agenten-Aufruf besteht aus zwei Datenströmen: Die Aufgabe des Nutzers („fasse die offenen Posten von Meier zusammen" — enthält Namen!) geht an den Modellprovider; die Tool-Antwort (Kontaktdaten, Rechnungspositionen) kommt zurück und fließt ebenfalls durch das Modell. Konkret zu dokumentieren:

- Welche Modellprovider kommen zum Einsatz (auch über Zwischendienste)?
- Verarbeiten sie Daten in der EU oder außerhalb?
- Besteht mit jedem Anbieter ein Auftragsverarbeitungsvertrag (AVV)?

In der Praxis hat sich bewährt, das in der API-Doku offen zu kommunizieren — es wird ohnehin gefragt.

## 2. Datenminimierung am Tool-Design

Der unterschätzte Hebel: Tool-Rückgaben so klein wie nötig. Ein `contacts_search`-Tool, das auf jede Anfrage den kompletten Kontakt mit allen Feldern zurückgibt, schickt mehr personenbezogene Daten durchs Modell als nötig. Besser: Felder pro Tool-Zweck begrenzen, Seitengrößen deckeln, interne IDs statt Klartext in Beschreibungen. Das ist DSGVO-Arbeit, die man beim Bauen erledigt — nicht danach.

## 3. Protokollierung mit Retention

Für Incident-Aufklärung brauchen Sie ein Audit-Log jeder Agenten-Aktion. Das Log selbst ist wieder ein personenbezogener Datensatz: Definieren Sie Löschfristen (z. B. 30–90 Tage), speichern Sie **Feldnamen statt Feldwerte** wo es geht, und trennen Sie Betriebs-Logs von Inhaltsdaten.

## 4. Wer darf einen Agenten anschließen?

Der Kunde gewährt einem Agenten Zugriff auf sein Konto — aber darf es ein *Sitzungs*-Zugriff sein, der nach Feierabend erlischt? Empfehlung: Agenten-Zugriff als eigene Berechtigungsstufe pro Nutzer abbilden (OAuth-Scopes: `agent.read` vs. `agent.write`), standardmäßig lesend, vom Nutzer aktivierbar. Wer heute statische API-Keys ausgibt (in unserem Report: 9 von 21 APIs), kann diese Frage schlicht nicht beantworten — das ist der eigentliche DSGVO-Engpass.

## 5. EU-Hosting als Option

Nicht immer nötig, oft ein Verkaufsargument: der eigene MCP-Server (nicht das Modell!) läuft in der EU, ideally in Ihrer eigenen Infrastruktur. Unser Standard-Bau läuft als Docker-Container bei Ihnen — oder bei uns in der EU, wenn Sie das wollen.

## Der praktische Rat

DSGVO bei Agenten ist kein Zusatzpaket, das man hinterher draufschiebt — es sind Designentscheidungen am Tool-Interface: minimal zurückgeben, scopen, protokollieren, Löschfristen. Die kostet nachträglich ein Vielfaches.

**→ Wir prüfen das im [Agent-Readiness-Audit](/mcp-audit) als eigenen Prüfbereich (Datenflüsse, AVV-Bedarf, Protokollkonzept) und liefern den Fixplan zum Festpreis. Vorab: der [kostenlose MCP-Live-Test](/test).**
