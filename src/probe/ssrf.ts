// SSRF guard: the probe's job is fetching arbitrary public URLs, but it must
// never touch private infrastructure. Required by our own audit rules — the
// public /test endpoint later runs the same guard.

import dns from "node:dns/promises";
import { isIP } from "node:net";

const BLOCKED_V4_RANGES: [string, number][] = [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8],
  ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.0.0.0", 24], ["192.168.0.0", 16],
  ["198.18.0.0", 15], ["224.0.0.0", 4], ["240.0.0.0", 4],
];

function v4Blocked(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  return BLOCKED_V4_RANGES.some(([base, prefix]) => {
    const baseParts = base.split(".").map(Number);
    let bits = 0;
    for (let i = 0; i < 4 && bits < prefix; i++) {
      const take = Math.min(8, prefix - bits);
      const mask = (0xff << (8 - take)) & 0xff;
      if ((parts[i] & mask) !== (baseParts[i] & mask)) return false;
      bits += take;
    }
    return true;
  });
}

function v6Blocked(ip: string): boolean {
  const norm = ip.toLowerCase();
  if (norm === "::" || norm === "::1") return true;
  if (/^f[cd]/.test(norm)) return true; // fc00::/7 unique local
  if (/^fe[89ab]/.test(norm)) return true; // fe80::/10 link local
  if (/^ff/.test(norm)) return true; // multicast
  if (norm.startsWith("::ffff:")) {
    const v4 = norm.slice(7);
    return isIP(v4) === 4 && v4Blocked(v4);
  }
  return false;
}

function ipBlocked(ip: string): boolean {
  const v = isIP(ip);
  if (v === 4) return v4Blocked(ip);
  if (v === 6) return v6Blocked(ip);
  return true; // unparseable → refuse
}

/** Parse and validate a probe target; throws on non-public hosts. */
export async function assertPublicHost(raw: string): Promise<URL> {
  const url = new URL(raw);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`nicht erlaubtes Protokoll: ${url.protocol}`);
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host)) {
    if (ipBlocked(host)) throw new Error(`privater/reservierter Host nicht erlaubt: ${host}`);
    return url;
  }
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".internal") || host.endsWith(".local")) {
    throw new Error(`privater Host nicht erlaubt: ${host}`);
  }
  const addresses = await dns.lookup(host, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some((a) => ipBlocked(a.address))) {
    throw new Error(`Host löst auf private/reservierte Adresse auf: ${host}`);
  }
  return url;
}
