// Idempotency for write actions: same key + same payload => stored result replayed,
// same key + different payload => rejected (client bug, not silently accepted).

import crypto from "node:crypto";

interface Entry {
  payloadHash: string;
  result: unknown;
  expiresAt: number;
}

export class IdempotencyStore {
  private store = new Map<string, Entry>();
  constructor(private ttlMs = 24 * 60 * 60 * 1000) {}

  private hash(payload: unknown): string {
    return crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  }

  private sweep(): void {
    const now = Date.now();
    for (const [k, v] of this.store) if (v.expiresAt < now) this.store.delete(k);
  }

  /** Returns stored result if key+payload match; null if new; throws if payload differs. */
  check(key: string, payload: unknown): unknown | null {
    this.sweep();
    const hash = this.hash(payload);
    const existing = this.store.get(key);
    if (!existing) return null;
    if (existing.payloadHash !== hash) {
      throw new Error(`idempotency key '${key}' was already used with a different payload`);
    }
    return existing.result;
  }

  save(key: string, payload: unknown, result: unknown): void {
    this.store.set(key, { payloadHash: this.hash(payload), result, expiresAt: Date.now() + this.ttlMs });
  }
}
