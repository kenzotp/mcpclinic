# Clockodo-MCP-Server: Wie wir den dritten offiziellen Endpunkt gefunden haben

*Ziel-Keywords: Clockodo MCP, Clockodo MCP-Server, Clockodo Zeiterfassung KI, Clockodo API Claude*

**Meta-Description:** Clockodo betreibt einen eigenen MCP-Endpunkt unter mcp.clockodo.com: erreichbar, OAuth-geschützt, Werkzeuge hinter Auth. Dokumentiert wird er nirgends. Wie wir ihn gefunden haben und was er zeigt.

:::stat 37/100 | clockodo nach dem korrigierten Bericht: offizieller MCP-Endpunkt gefunden, dokumentiert wird er nirgends

:::takeaway
- Clockodo betreibt einen eigenen MCP-Endpunkt unter mcp.clockodo.com/mcp: erreichbar, mit OAuth-Discovery nach RFC 9728, Werkzeuge sauber hinter Auth.
- Dokumentiert wird der Endpunkt nirgends: keine Ankündigung, kein Setup-Guide, kein Eintrag in der Doku (Stand 22. September 2026).
- Damit bietet ein dritter von 21 geprüften Anbietern offiziell MCP an; im Ranking springt clockodo auf 37/100 und Platz 2. (Derselbe Scan fand tags darauf einen vierten: personio, mcp.personio.de, undokumentiert.)
- Was noch fehlt: Server Card, aktuelles server/discover und ein öffentlicher Setup-Weg. Genau die Bausteine, die aus einem Endpunkt ein Angebot machen.
:::

---

Bei einem Testlauf unseres kostenlosen Live-Tests ist uns etwas aufgefallen, das in keinem Dokument steht: **Clockodo betreibt einen eigenen MCP-Endpunkt unter mcp.clockodo.com/mcp.** Gefunden haben wir ihn nicht durch Recherche, sondern durch das Scannen ableitender Hosts: Wer auf einer Anbieter-Domain nach mcp., api., docs. und developer.-Adressen sucht, findet Dinge, die die Dokumentation verschweigt.

Wir haben den Fund verifiziert, in unseren [Deutscher MCP-Report 2026](/report) aufgenommen und clockodo neu bewertet.

## Was der Endpunkt zeigt

Der Endpunkt verhält sich beim unauthentifizierten Test vorbildlich:

- **Erreichbar** unter mcp.clockodo.com/mcp, mit HTTP-Antwort auf Anfragen.
- **Anmeldung über OAuth-Discovery:** Der Server stellt seine Protected-Resource-Metadata unter /.well-known/oauth-protected-resource bereit (RFC 9728). Ein Client erfährt daraus, welcher Autorisierungsserver zuständig ist, bevor irgendein Token fließt.
- **Werkzeuge sind sauber geschützt:** tools/list antwortet erst nach Authentifizierung. Aus Agent-Sicht ist das die korrekte Haltung: nichts offen, nichts versteckt.

Diese Kette (401 mit Wegweiser, Metadaten nach RFC 9728, Login dahinter) ist genau der Ablauf, den die [MCP-Spezifikation](https://modelcontextprotocol.io/specification/2026-07-28) vorsieht. Clockodo hat ihn gebaut, ohne ihn groß zu erzählen.

## Was noch fehlt

Drei Bausteine trennen den Endpunkt von einem vollwertigen Angebot:

1. **Kein server/discover:** Auf die Pflichtmethode der aktuellen Spezifikation antwortet der Endpunkt (noch) nicht; der Spezifikationsstand ist damit nicht maschinell erkennbar.
2. **Keine Server Card:** Unter /.well-known/mcp.json und den üblichen Kandidaten-Adressen findet sich kein Karten-Kandidat. Die Server Card ist der Visitenkarten-Standard, der Endpunkten Sichtbarkeit in Verzeichnissen gibt.
3. **Kein öffentlicher Setup-Weg:** Weder Doku noch Blog erwähnen den Endpunkt (Stand 22. September 2026). Ein Kunde, der Clockodo mit Claude oder ChatGPT verbinden will, findet den Weg nicht, wenn er nicht zufällig auf denselben Scan stößt wie wir.

Hinzu kommt: Ohne Test-Zugang bleiben die Werkzeuge selbst unbewertet. Wie viele es sind, wie gut beschrieben ist, ob Idempotenz und Bestätigungspflichten vorhanden sind: Das sieht erst ein [Audit](/mcp-audit) mit echten Zugängen.

## Einordnung: das Feld hat jetzt drei

Mit clockodo bieten drei von 21 geprüften Anbietern offiziell MCP an: [awork](/wissen/awork-mcp) (53/100), [clockodo](/report) (37/100) und [seven.io](/wissen/seven-io-mcp) (30/100). Derselbe Scan deckte einen vierten auf: personio betreibt mcp.personio.de (OAuth-geschützt, undokumentiert). Interessant an clockodo ist die Kombination: Auf der REST-Seite existiert eine verifizierte OpenAPI-3.1-Spec mit 80 Pfaden, auf der MCP-Seite ein OAuth-geschützter Endpunkt ohne Dokumentation. Die Bausteine für Agenten-Fähigkeit sind also alle vorhanden, sie sind nur noch nicht zusammengesetzt und kommuniziert.

Für die Branche ist die Botschaft dieselbe wie bei [awork](/wissen/awork-mcp): Es beweist kein Konzern, dass agentenfähig machbar ist. Es beweist ein Zeiterfassungs-Tool aus dem Mittelstand.

**→ Ob Ihr Endpunkt die ersten Glieder dieser Kette besteht, zeigt der [kostenlose Live-Test](/test): Er prüft Erreichbarkeit, server/discover und ob Ihre OAuth-Metadaten nach RFC 9728 auffindbar sind.**

---

*Unabhängigkeitshinweis: Wir sind mit clockodo weder geschäftlich noch persönlich verbunden. Der Befund ist eine Momentaufnahme vom 22. September 2026; ein nachträgliches Committen des Endpunkts in die Doku begrüßen wir ausdrücklich.*
