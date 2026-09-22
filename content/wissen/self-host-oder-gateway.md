# Selbst betreiben oder Drittanbieter-Gateway? Der Unterschied, den Ihre Kundschaft spürt

*Ziel-Keywords: MCP Server selbst hosten, MCP Gateway vs eigenem Server, DSGVO MCP Server*

**Meta-Description:** Drittanbieter-Gateways machen MCP-Anbindung zum Ein-Klick-Erlebnis und verschieben Daten, Rechte und Verantwortung zu Dritten. Ein ehrlicher Vergleich beider Wege.

:::stat 1 Key | reicht einem Drittanbieter-Gateway, um Ihre komplette Kundendatenbank zu lesen

:::takeaway
- Gateways sind bequem, aber Ihr API-Key wandert in fremde Infrastruktur: ohne Scopes, ohne Ihr Protokoll, ohne Ihre Verantwortungsbegrenzung.
- Ein selbst betriebener MCP-Server bleibt in Ihrer Kontrolle: Ihre Infrastruktur, Ihr Log, Ihre Berechtigungsgrenzen, Ihre DSGVO-Dokumentation.
- Fertige Community-Server aus dem Netz sind die dritte Variante: Der Schlüssel bleibt bei Ihnen, aber fremder Code führt ihn aus, ohne Auditierung und ohne Wartungszusage.
- Faustregel: Ausprobieren im Gateway, Produktion im eigenen Server.
:::

---

Der schnellste Weg, eine bestehende API „KI-Agenten-fähig" zu machen, führt heute über ein **Gateway**: Registrieren, API-Key einfügen, fertig. Der Gateway spricht die API und bietet dem Agenten fertige Werkzeuge an. Anbieter wie viaSocket und Dutzende ähnliche Plattformen verkaufen genau das, und für den ersten Versuch ist das legitim.

Der zweite Blick gehört auf die Unterschiede, denn sie sind substanzieller als der Komfortunterschied.

## Wo Ihr Schlüssel liegt, liegt Ihr Problem

Ein Gateway arbeitet mit **Ihrem API-Key**. Das bedeutet konkret:

- Der Dienst kann mit Ihrem Key **alles**, was der Key kann: bei statischen Keys ohne Scopes (der Normalfall in unserem [Report](/report): 9 von 21 APIs) also alles.
- Ihre Kunden- und Geschäftsdaten fließen durch die Infrastruktur eines Dritten: mit dessen Aufbewahrungsfristen, Ausfällen und Preisänderungen.
- In der DSGVO-Kette ist der Gateway ein weiterer Empfänger, den Sie benennen und vertraglich fassen müssen. Viele Betriebe vergessen genau diesen Punkt.

## Was ein eigener MCP-Server anders macht

Ein selbst betriebener MCP-Server (in Ihrer Infrastruktur oder in Ihrer gemieteten EU-Umgebung) verändert die Grundlagen:

1. **Ihre Daten verlassen Ihr System nur in eine Richtung, die Sie definiert haben**: zum Modellprovider, mit dem Sie den AVV haben. Keine Zwischenebene.
2. **Berechtigungsgrenzen werden technisch erzwungen**: Werkzeuge nur mit dem nötigen Scope, destruktive Aktionen nur mit Bestätigung, Mandantentrennung am Server.
3. **Sie haben das Protokoll**: jede Agenten-Aktion nachvollziehbar, für Sie, für Ihre Kunden, für jeden Vorfall.

Der Preis: Aufwand. Ein sauberer Server für eine überschaubare API ist kein Wochenendprojekt, wenn er wirklich sicher sein soll: Idempotenz, Bestätigungspflichten, Protokoll und Regressionstests sind die Pflicht, nicht die Kür. Mit einer Standardarchitektur ([so bauen wir es](/mcp-server-entwickeln)) liegt das bei 2–4 Wochen Festpreis.

## Die dritte Variante: Community-Server aus dem Netz

Neben den Gateways wächst eine zweite Sorte fertiger Anbindung: offene Community-Projekte, die die API eines Herstellers als MCP-Server abbilden. Sie werden nicht gehostet, sondern heruntergeladen und selbst gestartet, meist per npm oder Docker. Der Schlüssel bleibt formal bei Ihnen, aber Sie führen fremden Code mit vollem Schlüsselzugriff aus: ohne Auditierung, ohne Haftung, ohne Sicherheitsprozess des Autors. Und Sie hängen an der Pflegefreudigkeit einer Person. Stellt das Projekt ein, erlischt Ihre Anbindung mit dem nächsten Major-Update Ihrer API.

Wie verbreitet das inzwischen ist, zeigt eine eigene Zählung auf GitHub (Stand 22. September 2026):

| Hersteller | Community-MCP-Server | Größtes Projekt |
|---|---|---|
| Lexware Office | 7 | [Lexware-MCP-Server](https://github.com/marselsel/Lexware-MCP-Server) (32★) |
| Zammad | 6 | [Zammad-MCP](https://github.com/basher83/Zammad-MCP) (41★) |
| Propstack | 5 | [propstack-mcp](https://github.com/ashev87/propstack-mcp) (8★) |
| Personio | 4 | 1★ |
| Xentral | 3 | 1★ |
| awork, seven.io | 0 | offizielle Endpunkte vorhanden |

Das Muster ist eindeutig: Wo der Hersteller keine offizielle Agenten-Anbindung anbietet, baut die Community sie unangekündigt nach. Die Projekte werden über Verzeichnisse wie [Glama](https://glama.ai/mcp/servers) längst für Endkunden auffindbar, und selbst der fehlende Authentifizierungslayer wird nachgerüstet: Ein eigener Fork des Zammad-Servers existiert allein zu dem Zweck, OAuth zu aktivieren. Für Sie als Anwender bleibt die Bewertung dieselbe wie beim Gateway, nur ohne dessen Geschäftsbetrieb: Fremder Code bekommt Ihren Produktionskey, und niemand trägt dafür Verantwortung. Für Sie als Hersteller ist es das deutlichste Nachfragesignal, das es gibt: Ihre Kunden improvisieren die Anbindung bereits, gerade zum siebten Mal, weil der offizielle Weg fehlt.

## Die ehrliche Entscheidungstabelle

| | Gateway | Eigener Server |
|---|---|---|
| Einrichtung | Minuten | Tage bis Wochen |
| Monatliche Kosten | Abo + teils Datenmengen | Hosting (klein) |
| Wo liegt Ihr Key? | Beim Drittanbieter | Bei Ihnen |
| Berechtigungen pro Werkzeug | Nein (Key-Umfang) | Ja (Scopes) |
| Protokollierung | Beim Anbieter | Bei Ihnen, vollständig |
| DSGVO-Kette | Dritter Empfänger | Nur Sie + Modellprovider (mit AVV) |
| Wartung | Anbieter, und dessen Preisänderungen | Sie (oder [Retainer](/mcp-server-entwickeln)) |

## Unsere Empfehlung nach Größe

- **Einzelnutzer, Experiment:** Gateway geht: mit einem Wegwerf-Key und ohne sensible Daten.
- **Team, echte Kundendaten:** eigener Server. Der Aufwand amortisiert sich über den ersten vermiedenen Vorfall.
- **Software-Hersteller mit eigenen Kunden:** niemals den Kunden in ein Gateway schicken. Baut (oder lasst bauen) den offiziellen Endpunkt: Das ist der Unterschied zwischen Feature und Haftungsrisiko.

**→ Wo Ihre API heute steht, zeigt der [kostenlose Live-Test](/test) in unter einer Minute.**
