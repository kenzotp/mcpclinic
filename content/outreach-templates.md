# Benachrichtigungs-Mails für den Deutscher MCP-Report (Entwürfe, Versand = Mikas Entscheidung)

> Spielregel aus dem Playbook (§3.3): Höflichkeits-Mails an die PR-/Dev-Adressen
> der getesteten Unternehmen, *"Sie wurden in unserem Report getestet"*, als
> PR-Gesten, NICHT als Verkaufsanschreiben. Kein Follow-up, kein Pitch.
> Ein Versand pro Unternehmen, niemals Massen-BCC, echte Absenderadresse.
>
> **ABSENDER-DOMAIN-FRAGE:** Absender @mcpclinic.dev setzt einen funktionierenden
> Mailversand für die Domain voraus (SPF/DKIM), noch nicht eingerichtet.
> Alternativ gtm@zuuna.de mit klarer Signatur MCP Clinic. Vor erstem Versand klären.
>
> Empfangsadressen pro Unternehmen (press@, dev-rel@, info@) stehen noch nicht in
> targets.json, bei Versand: je 1 Adresse recherchieren, jede Mail einzeln senden.

---

## Variante A: Unternehmen MIT MCP (awork, seven.io)

Betreff: awork im Deutscher MCP-Report 2026 getestet: Benchmark-Wertung 53/100

Hallo [NAME/Team],

wir betreiben mcpclinic.dev und haben kürzlich den Deutschen MCP-Report 2026 veröffentlicht: eine automatisierte, öffentliche Oberflächenprüfung von 21 deutschen B2B-SaaS-APIs auf Agenten-Fähigkeit (MCP-Endpunkt, OAuth-Discovery, maschinenlesbare Doku).

[PRODUKT] ist dabei einer von genau zwei Anbietern mit eigenem MCP-Endpunkt und mit 53/100 unser Bestwert. Eure OAuth-Discovery (RFC 9728) hat unseren Live-Test in vorbildlicher Form bestanden. Das wollten wir als Benchmark-Autor kurz zurückmelden.

Details zur Wertung: [LINK zur Unternehmensseite im Report]

Falls ihr Anmerkungen zur Prüfung habt, korrigieren wir gern und schnell.

Viele Grüße
[MIKA: Vorname Nachname, Rolle]
MCP Clinic · mcpclinic.dev

---

## Variante B: Unternehmen OHNE MCP, mit API (die große Mehrheit)

Betreff: [PRODUKT] im Deutscher MCP-Report 2026 getestet: Ergebnis [X]/100

Hallo [NAME/Team],

kurze Höflichkeitsnachricht: Wir haben bei mcpclinic.dev den Deutschen MCP-Report 2026 veröffentlicht, eine automatisierte, öffentliche Oberflächenprüfung von 21 deutschen B2B-SaaS-APIs darauf, wie gut KI-Agenten (Claude, ChatGPT, Copilot) sie heute bedienen können. [PRODUKT] ist dabei und erreicht [X]/100, mit dem Detailbefund [1-2 WORTE: „kein MCP-Endpunkt, aber offene OpenAPI" o. ä.].

Der Report ist neutral und konstruktiv gehalten: https://mcpclinic.dev/report#[slug]

Falls ihr zu einzelnen Prüfungen etwas ergänzen wollt (etwa interne Endpunkte, die wir nicht sehen konnten), korrigieren wir gern. Und falls das Thema „eigener MCP-Endpunkt" auf eurer Roadmap steht: genau das ist unser Fach: Festpreis-Audit und -Bau, alles öffentlich auf der Seite.

Viele Grüße
[SIGNATUR]
MCP Clinic · mcpclinic.dev

---

## Variante C: Unternehmen ohne öffentliche API-Doku (d.vinci, rexx, Collmex …)

Betreff: [PRODUKT] im Deutschen MCP-Report 2026: Konnten wir etwas übersehen?

Hallo [NAME/Team],

wir haben bei mcpclinic.dev einen öffentlichen Agenten-Fähigkeits-Report deutscher B2B-SaaS-APIs veröffentlicht. Bei [PRODUKT] konnten wir keine öffentlich dokumentierte API finden und haben das im Report entsprechend abgebildet, mit der ausdrücklichen Einschränkung „keine öffentliche Doku gefunden", nicht „keine API vorhanden".

Falls es eine Dokumentation oder einen Entwickler-Zugang gibt, den wir übersehen haben: Ein Hinweis genügt, wir korrigieren die Wertung umgehend und verlinken die Doku.

Report: https://mcpclinic.dev/report#[slug]

Viele Grüße
[SIGNATUR]
MCP Clinic · mcpclinic.dev

---

## Regeln für den Versand (wenn Mika freigibt)

1. Jede Mail einzeln, echte Adresse, keine Verfolgungspixel.
2. Max. 5 pro Tag, verteilt, kein Massenmail-Muster.
3. Reaktionslink checken: Unternehmensseite im Report muss vor dem Versand live sein.
4. Antworten innerhalb 24 h: „korrigieren wir gern" muss stimmen; dafür liegt die Probe-Engine bereit (rerun per `npm run rank`).
5. Kein zweiter Kontakt, außer auf echte Antwort.
