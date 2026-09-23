# MCP vs Agent Skills: Zwei Schichten, die SaaS-Hersteller verwechseln

*Ziel-Keywords: MCP vs Agent Skills, Agent Skills Unterschied MCP, Claude Skills für Unternehmen, Agent Skills SaaS*

**Meta-Description:** Agent Skills lehren KI-Agenten, WIE sie eine Aufgabe angehen. MCP gibt ihnen den Zugang zu Ihrer Software. Warum SaaS-Hersteller an der ersten Schicht nicht vorbeikommen.

:::stat 2 Schichten | entscheiden über Agenten-Fähigkeit: Zugang (MCP) und Vorgehen (Skills). Software-Hersteller brauchen die erste, bevor über die zweite gesprochen werden kann

:::takeaway
- Agent Skills (SKILL.md-Format) sind wiederverwendbare Anweisungspakete: Sie lehren einen Agenten, eine Aufgabe mit einem bestimmten Vorgehen zu erledigen.
- MCP ist das Live-Protokoll, über das ein Agent Werkzeuge und Daten einer fremden Software erreicht. Skills steuern das Vorgehen, MCP stellt den Zugang bereit.
- Für SaaS-Hersteller ist die Reihenfolge eindeutig: Ohne MCP-Endpunkt gibt es nichts, worauf ein Skill angewendet werden könnte.
- Die Kombination ist der Endzustand: Ein offizieller Skill, der die Nutzung Ihres Endpunkts lehrt, ist Product-Dokumentation für Agenten.
:::

---

Seit Anthropic das Agent-Skills-Format (SKILL.md plus Skripte und Ressourcen) eingeführt hat, stellen deutsche SaaS-Teams die berechtigte Frage: Brauchen wir das jetzt statt MCP? Die kurze Antwort: Nein. Die lange Antwort lohnt sich, weil die beiden Dinge auf verschiedenen Schichten liegen und die Verwechslung teuer werden kann.

## Skills: das Vorgehen als Paket

Ein Agent Skill ist ein Anweisungspaket, das einem Agenten beibringt, wie eine bestimmte Aufgabe fachlich korrekt abläuft: welche Schritte, welche Qualitätskriterien, welche Sonderfälle. Skills sind wiederverwendbar, versionierbar und werden geteilt. Der Markt behandelt sie bereits als eigenen Standard mit eigenen Verzeichnissen.

Skills lösen ein Wissensproblem. Der Agent weiß danach zum Beispiel, wie eine sachliche Zahlungserinnerung formuliert wird oder welche Prüfreihenfolge vor einer Kündigung gilt.

## MCP: der Zugang als Protokoll

[MCP](/wissen/was-ist-mcp) löst ein Zugangsproblem. Ohne MCP kann ein Sprachmodell Text lesen und schreiben; mit MCP bekommt es Werkzeuge: *Rechnung suchen*, *Entwurf anlegen*, *Adresse ändern*, authentifiziert im Namen eines Nutzers, mit dessen Rechten, mit Protokoll. Die [Kette von der 401 bis zum Login](/wissen/remote-mcp-server) ist spezifiziert, und [Werkzeug-Beschreibungen](/wissen/mcp-tool-beschreibungen) sind der Teil, über den der Agent entscheidet, welches Werkzeug er wann wählt.

## Warum die Schichten nicht vertauschbar sind

Ein Skill ohne MCP ist Vorgehenswissen ohne Hände: Der Agent weiß, wie eine Zahlungserinnerung aufgebaut ist, kann sie aber nicht in Ihrem System anlegen. Ein MCP-Endpunkt ohne Skill ist Zugang ohne Vorgehen: Der Agent kann Rechnungen suchen, macht es aber ohne das Fachwissen Ihres Hauses.

Für Sie als Software-Hersteller folgt daraus eine klare Reihenfolge:

1. **Zuerst der Endpunkt.** Er ist die Schnittstelle, die Ihre Kunden für jede Agenten-Integration brauchen, egal welches Skill-Ökosystem sich durchsetzt.
2. **Dann die Beschreibungen.** Werkzeug-Beschreibungen sind Ihre eigentlichen Skills: Sie müssen aus der Software heraus korrekt sein, [regressionstestet mit Modell-Clients](/wissen/mcp-tool-beschreibungen).
3. **Optional ein offizieller Skill.** Ein SKILL.md-Paket, das die Nutzung Ihres Endpunkts lehrt, ist Product-Dokumentation für Agenten. Er setzt voraus, was Sie zuerst gebaut haben.

Der [Deutscher MCP-Report 2026](/report) zeigt, wo das Feld steht: 4 von 21 geprüften Anbietern haben einen eigenen MCP-Endpunkt, der Median des Feldes liegt bei 8 von 100 Punkten. Über Skills diskutiert in diesem Feld aktuell niemand, weil die Zugangsschicht fehlt.

**→ Der erste Baustein ist die Zugangsschicht: Der [kostenlose Live-Test](/test) zeigt in unter einer Minute, ob Ihre API sie schon hat.**
