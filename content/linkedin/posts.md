# LinkedIn-Posts (Deutsch) — für Mikas persönliches Profil

> Regeln: Aus Mikas Stimme (Ich-Form, nüchtern, keine Marketing-Floskeln), keine
> Hashtag-Ketten am Ende (max 2), Zeilenumbrüche wie bei LinkedIn üblich, Zahlen
> dürfen greifen. Reihenfolge = empfohlene Veröffentlichung, 1/Woche. Jeder Post
> endet mit EINEM Weg (nicht mehreren).

---

## Post 1 — Der Report (Startpost, stärkste Zahl)

Wir haben 21 deutsche B2B-SaaS-APIs darauf getestet, ob KI-Agenten (Claude,
ChatGPT, Copilot) sie heute bedienen können.

Ergebnis: 2.

Von 21. Zwei Anbieter haben einen offiziellen MCP-Endpunkt. 15 haben nicht
einmal eine maschinenlesbare API-Beschreibung. 9 arbeiten mit statischen
Keys — ihr Kunde kann einem Assistenten also nicht mal "nur lesen" erlauben.

Wir haben alles automatisiert geprüft und die Ergebnisse nebst Methodik
öffentlich gemacht: 21 Firmen, benannt, mit Score.

Kommentar mit "Report" und ich schicke den Link. 

(Alternativ: Link in den Kommentaren — besser als im Posttext für die
Reichweite.)

## Post 2 — Was ein Agent mit eurer Software machen würde

Meine Assistentin soll folgendes können:

"Such die Rechnung von Meier GmbH, prüf ob sie überfällig ist, und schreib
Herrn Meier eine höfliche Zahlungserinnerung."

Technisch ist das heute möglich. Rechtsabteilung und CRM erklären das
trotzdem für unmöglich — weil die Software dem Assistenten keine Werkzeuge
gibt, mit denen er es darf.

Genau dafür gibt es MCP: eine Standardschnittstelle, über die Agenten mit
eurer Software arbeiten — im Namen des Nutzers, mit dessen Rechten, mit
Protokoll.

Wir haben eine kostenlose Prüfung gebaut, die in unter einer Minute zeigt,
wie weit eure API davon entfernt ist. Link in den Kommentaren.

## Post 3 — Die Community baut, was der Hersteller nicht liefert (Zammad/Lexware)

Zwei Beobachtungen aus den letzten Wochen:

1. Zammad-Kunden fragen im Herstellerforum nach MCP-Anbindung. Antwort der
   Admins: "not really planned". Parallel sammelt ein Community-Server 41
   Sterne auf GitHub.

2. Für Lexware Office gibt es einen 31-Sterne-Community-Server — mit eigenem
   OAuth-Ansatz, Docker, Tests. Gebaut von Leuten, die einfach arbeiten
   wollen.

In beiden Fällen gilt: Der Key, den die Community nutzt, darf alles. Keine
Scopes, kein Protokoll, keine Mandantentrennung.

Wenn eure Kunden anfangen, eure API mit Fremd-Code zu verbinden, ist das
kein Marketing-Problem. Es ist ein Signal, dass die Nachfrage da ist — und
dass jemand anderes sie gerade bedient.

## Post 4 — awork macht es richtig (und das ist gut für alle)

In unserem Test von 21 deutschen B2B-SaaS-APIs gibt es genau einen
Benchmark: awork.

Der Anbieter hat einen offiziellen MCP-Endpunkt mit OAuth 2.1, PKCE und
einer maschinenlesbaren Server Card. Unangemeldete Anfragen werden sauber
abgewiesen, der Login-Standard ist dokumentiert, die Werkzeuge sind
beschrieben.

Warum ich das öffentlich lobe: Es beweist, dass "agentenfähig" keine
Frage der Firmengröße ist. awork ist kein Konzern.

Und es macht die Frage an jeden anderen Anbieter einfach:
"Wann?"

## Post 5 — Der Staat zahlt 80% (BAFA-Hook für Geschäftsführer)

Für die meisten kleinen Softwarehäuser ist externe Beratung ein Kostenpunkt.
Es gibt aber ein Programm, das genau das ändert:

"Förderung unternehmerischen Know-hows" (BAFA). Für KMU: 50–80% Zuschuss
auf Beratungskosten.

Wir machen Agent-Readiness-Audits für B2B-Software: ein Protokoll-Check,
ob euer Produkt für KI-Agenten nutzbar ist — mit Fixplan. 2.400 € brutto.
Mit BAFA-Förderung bleibt für euch deutlich weniger hängen.

Wir bereiten den Antrag vor, ihr unterschreibt. Wenn ihr wissen wollt, ob
eure API förderfähig geprüft werden kann: Kommentar oder DM.

## Post 6 — Erkenntnis aus dem ersten Audit (wenn soweit — Platzhalter)

[Rückenwind-Post nach dem ersten echten Audit: 1 anonymisiertes Finding
als Geschichte erzählen. Nicht schreiben, bevor es ihn gibt.]

---

## Veröffentlichungs-Checkliste (pro Post)

1. Als MIKA aus dem persönlichen Profil, nicht von einer Firmen-Seite
2. Werktags 8–10 Uhr
3. Link in den ersten Kommentar, nicht in den Posttext
4. Auf Kommentare in den ersten 2 Stunden antworten
5. Nicht mehr als 1 Post/Woche; wenn eine Woche eng ist, lieber auslassen
