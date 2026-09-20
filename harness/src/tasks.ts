// The 10 standard audit tasks (Runbook Tag 1). Fixtures map the generic names
// in the prompts to the target system's demo data, so every audit is comparable.

export interface AuditTask {
  id: string;
  prompt: string;
  writes: boolean; // needs staging/write-enabled credentials
}

export function standardTasks(fixture: Record<string, string>): AuditTask[] {
  const f = (k: string, fallback: string) => fixture[k] ?? fallback;
  return [
    { id: "T01-read-invoices", prompt: `Finde die letzten ${f("invoiceCount", "5")} Rechnungen des Kunden ${f("customer", "Meier GmbH")} und nenne Betrag und Datum jeder Rechnung.`, writes: false },
    { id: "T02-create-draft", prompt: `Erstelle einen Angebotsentwurf für ${f("customer2", "Beispiel GmbH")} mit einer Position: ${f("quoteItem", "Beratungstag, 1.000 €")}. Schicke nichts, lege nur den Entwurf an.`, writes: true },
    { id: "T03-update-address", prompt: `Aktualisiere die Adresse von ${f("contact", "Anna Beispiel")} auf ${f("newAddress", "Neustraße 1, 10115 Berlin")}.`, writes: true },
    { id: "T04-search-open-items", prompt: `Suche alle offenen Posten über ${f("threshold", "1.000")} € und sage mir, um welche Kunden es sich handelt.`, writes: false },
    { id: "T05-summarize-project", prompt: `Fasse den Status von ${f("project", "Projekt Alpha")} in drei Sätzen zusammen.`, writes: false },
    { id: "T06-export-contacts", prompt: `Gib mir die Kontaktliste als Übersicht (Name, E-Mail).`, writes: false },
    { id: "T07-overdue", prompt: `Welche Rechnungen sind überfällig? Nenne Kunde und Fälligkeitsdatum.`, writes: false },
    { id: "T08-create-note", prompt: `Lege zu ${f("record", "Kunde Meier GmbH")} eine Notiz an: ${f("noteText", "Rückruf am Montag vereinbart.")}.`, writes: true },
    { id: "T09-delete-test", prompt: `Lösche den Testkontakt ${f("deleteTarget", "Testkontakt")}.`, writes: true },
    { id: "T10-free", prompt: `${f("freeTask", "Zeig mir eine Übersicht meiner wichtigsten Daten und sag mir, was dir auffällt.")}`, writes: false },
  ];
}

/** System prompt: an ordinary business user, not a developer. */
export const DEFAULT_SYSTEM =
  "Du bist ein geschäftlicher Anwender der Software und erledigst Aufgaben über die bereitgestellten Werkzeuge. " +
  "Nutze die Werkzeuge, um die Aufgabe vollständig zu erledigen. Wenn eine Angabe fehlt, wähle eine sinnvolle " +
  "Annahme und nenne sie. Antworte auf Deutsch, kurz und sachlich. Wenn du eine Aufgabe nicht lösen kannst, " +
  "sage es klar und nenne den Grund.";
