// Append-only JSONL audit log: every tool call, who, what, outcome.
// Swap the sink (client SIEM/DB) by replacing `write`.

import { appendFile } from "node:fs/promises";

export interface AuditEntry {
  ts: string;
  tenant: string;
  tool: string;
  ok: boolean;
  argsSummary: string; // field names only — never raw argument values (PII discipline)
  error?: string;
  idempotencyKey?: string;
}

export class AuditLog {
  constructor(private file: string | null = process.env.AUDIT_LOG ?? null) {}

  async write(entry: AuditEntry): Promise<void> {
    const line = JSON.stringify(entry) + "\n";
    if (this.file) {
      await appendFile(this.file, line, "utf8").catch(() => {});
    } else {
      process.stderr.write(line);
    }
  }
}
