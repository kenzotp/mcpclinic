# Tool-Beschreibungen sind Code: Die unterschätzte Schnittstelle Ihres MCP-Servers

*Ziel-Keywords: MCP Tool Description, Tool Beschreibungen schreiben, MCP Server Testing, Prompt Werkzeugbeschreibung*

**Meta-Description:** Ein KI-Agent entscheidet anhand Ihrer Werkzeugbeschreibungen, was er tut. Und eine unklare Beschreibung produziert keine Fehlermeldung, sondern falsche Buchungen. Warum Beschreibungen Code sind und wie man sie regressionstestet.

:::stat 3 Modelle × 10 Aufgaben | sind unser Minimum, um Werkzeugbeschreibungen gegen Modell-Updates regressionssicher zu machen

:::takeaway
- Die wichtigste Schnittstelle eines MCP-Servers ist nicht der Endpunkt, sondern der Beschreibungstext jedes Werkzeugs. Dort entscheidet das Sprachmodell, was es tut.
- Beschreibungen veralten wie Code: Ein neues Modell-Release kann das Verhalten verschieben, ohne dass sich am Server eine Zeile geändert hat.
- Deshalb gehören Beschreibungen in die Regressionstests: feste Aufgabenkataloge, mehrere Modell-Clients, klare Erfolgskriterien.
- Im [Report](/report) scheitern Agenten an deutschen APIs öfter an Beschreibbarkeit als an Technik: 15/21 haben keine maschinenlesbare Doku als Ausgangsmaterial.
:::

---

Wenn ein MCP-Server anfängt, seltsame Dinge zu tun (doppelt gebuchte Ausgaben, gelöschte Entitäten, die keiner bestellt hat), suchen die meisten Teams den Fehler im Code. Häufig liegt er in einem Text: der **Werkzeugbeschreibung**, die das Sprachmodell gelesen hat, bevor es gehandelt hat.

## Warum ein Satz manchmal mehr bewegt als eine Funktion

Ein Agent sieht Ihre API nicht. Er sieht eine Liste von Werkzeugen, und zu jedem Werkzeug: Name, Beschreibung, Parameterschema. Aus diesen Texten baut sich das Sprachmodell eine Vorstellung davon, *wann es welches Werkzeug benutzt und wie es die Argumente füllt*. Ein Beispiel aus der Praxis-Form:

- „Erstellt eine Rechnung." Klingt harmlos. Das Modell wird es benutzen, sobald der Nutzer „mach mal eine Rechnung für Müller" sagt, auch wenn ihm Kundennummer, Positionen und Zahlungsziel fehlen.
- „Erstellt eine Rechnung für einen bestehenden Kunden. Erfordert Kundennummer, mindestens eine Position mit Menge und Einzelpreis. Wenn Angaben fehlen: erst nachfragen, nicht mit Platzhaltern erstellen. Rechnungen sind Finanzdokumente; bei Unsicherheit über den Inhalt: unterlassen."

Derselbe Endpunkt. Der Unterschied liegt nicht in der Technik, sondern in der Anweisungslage. Und er entscheidet, ob Ihr Server in einem Kundensystem verantwortbar ist.

## Beschreibungen verhalten sich wie Code

Drei Eigenschaften machen sie zur Wartungslast, die niemand auf dem Schirm hat:

1. **Sie sind Verhalten.** Ein Text ändert das Handeln des Agenten: funktional äquivalent zu einer Code-Änderung, nur ohne Code-Review.
2. **Sie können regressionieren.** Ein neues Modell-Release (beim eigenen Provider oder beim Client Ihrer Kunden) kann Interpretationen verschieben. Der Server ist unverändert; das Verhalten nicht mehr.
3. **Sie sind unbeaufsichtigt, wenn niemand sie testet.** Unit-Tests prüfen die Funktion, nicht die Interaktion zwischen Text und Modell.

## Regressionstest in der Praxis

Der Aufwand ist kleiner als das Problem, wenn man ihn systematisch macht. So sieht unser Standard aus ([Bestandteil jedes Builds](/mcp-server-entwickeln)):

1. **Aufgabenkatalog**: 10–20 echte Nutzerformulierungen pro Werkzeug („buch das mal", „wie war das noch bei Müller im September", unvollständige Angaben, Angriffsvarianten).
2. **Mehrere Modell-Clients**: mindestens drei Modelle von mindestens zwei Anbietern. Modelle reagieren unterschiedlich auf dieselbe Beschreibung, und die Clients Ihrer Kunden werden mit allem umgehen.
3. **Erfolgskriterien pro Aufgabe**: richtiges Werkzeug, korrekt gefüllte Argumente, korrektes Nachfragen bei Lücken, korrekte Bestätigungseinholung bei destruktiven Aktionen.
4. **Ausführung gegen Staging oder Wegwerf-Objekte**: nie gegen Produktion. Die Freigaben dafür regelt das Kickoff-Formular vor dem Audit.
5. **Wiederholung bei jedem Modell-Release**, der relevant ist: Der Test ist billig, der Vorfall ist es nicht.

## Der Preis des Weglassens

Wer Beschreibungen „später mal weiterdenkt", baut die Verantwortungslücke ein: Der Server funktioniert im Demo, und der erste echte Nutzer mit einer schwammigen Formulierung wird zum Lastentest. Im [Audit](/mcp-audit) ist der Beschreibungscheck deshalb ein fester Prüfpunkt: mit dem Aufgabenkatalog aus der Harness, also genau der Art von Nutzung, die Ihre Kunden später an den Tag legen.
