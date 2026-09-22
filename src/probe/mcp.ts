// MCP endpoint probe: handshake, tools list, auth signals, server card.
// All checks are public-surface only: no credentials, no write actions, bounded requests.

import { httpGet, httpPost, extractJsonRpcMessages, sleep, REQUEST_GAP_MS } from "./http.ts";
import { isWriteAction, descriptionQuality } from "./heuristics.ts";
import { assertPublicHost } from "./ssrf.ts";
import type { McpProbeResult, ToolInfo, AuthSignals, CardInfo, Check } from "./types.ts";

const CLIENT_INFO = { name: "mcpclinic-live-test", version: "0.1.0" };
const CURRENT_SPEC = "2026-07-28";
const LEGACY_SPEC = "2025-06-18"; // last spec with the classic initialize handshake

function initRequest(protocolVersion: string) {
  return {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion,
      capabilities: {},
      clientInfo: CLIENT_INFO,
    },
  };
}

interface RpcResponse {
  result?: any;
  error?: { code: number; message: string };
  id?: unknown;
}

function firstResponse(res: { body: string | null; contentType: string }): RpcResponse | null {
  const msgs = extractJsonRpcMessages(res as any);
  return msgs.find((m) => m && (m.result !== undefined || m.error !== undefined)) ?? null;
}

function mapTool(t: any): ToolInfo {
  const name = String(t.name ?? "?");
  const description = String(t.description ?? "");
  const { score, notes } = descriptionQuality(name, description);
  return { name, description, writeAction: isWriteAction(name, description), quality: score, qualityNotes: notes };
}

export async function probeMcpEndpoint(endpoint: string): Promise<McpProbeResult> {
  const url = await assertPublicHost(endpoint);
  const auth: AuthSignals = { authRequired: false, asMetadataUrlsProbed: [] };
  const card: CardInfo = { present: false };
  const checks: Check[] = [];
  let transport: McpProbeResult["transport"];
  let protocolVersion: string | undefined;
  let supportedVersions: string[] | undefined;
  let serverInfo: McpProbeResult["serverInfo"];
  let tools: ToolInfo[] = [];
  let reachable = false;

  // --- Step 1: unauthenticated initialize over streamable HTTP (also the auth test) ---
  const initRes = await httpPost(endpoint, initRequest(LEGACY_SPEC), {
    headers: { accept: "application/json, text/event-stream" },
  }).catch(() => null);
  reachable = initRes !== null; // any HTTP response proves liveness; DNS/timeout → unreachable

  if (initRes && (initRes.status === 401 || initRes.status === 403)) {
    auth.authRequired = true;
    auth.wwwAuthenticate = initRes.headers.get("www-authenticate") ?? undefined;
    await discoverAuth(endpoint, auth);
  } else if (initRes && initRes.ok) {
    const resp = firstResponse(initRes);
    if (resp?.result) {
      transport = "streamable-http";
      protocolVersion = resp.result.protocolVersion;
      serverInfo = resp.result.serverInfo;
      const sessionId = initRes.headers.get("mcp-session-id");
      await sleep(REQUEST_GAP_MS);
      // legacy flow: notifications/initialized, then tools/list
      await httpPost(
        endpoint,
        { jsonrpc: "2.0", method: "notifications/initialized", params: {} },
        { headers: { accept: "application/json, text/event-stream", ...(sessionId ? { "mcp-session-id": sessionId } : {}) } },
      ).catch(() => null);
      await sleep(REQUEST_GAP_MS);
      const toolsRes = await httpPost(
        endpoint,
        { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
        { headers: { accept: "application/json, text/event-stream", ...(sessionId ? { "mcp-session-id": sessionId } : {}) } },
      );
      const toolsResp = firstResponse(toolsRes);
      const rawTools: any[] = toolsResp?.result?.tools ?? [];
      tools = rawTools.map(mapTool);

      // 2026-07-28 stateless discovery (optional on older servers)
      await sleep(REQUEST_GAP_MS);
      const discRes = await httpPost(endpoint, {
        jsonrpc: "2.0",
        id: 3,
        method: "server/discover",
        params: {
          _meta: {
            "io.modelcontextprotocol/protocolVersion": CURRENT_SPEC,
            "io.modelcontextprotocol/clientInfo": CLIENT_INFO,
            "io.modelcontextprotocol/clientCapabilities": {},
          },
        },
      }, { headers: { accept: "application/json, text/event-stream" } });
      const disc = firstResponse(discRes);
      if (disc?.result && Array.isArray(disc.result.supportedVersions)) {
        supportedVersions = disc.result.supportedVersions.map(String);
        serverInfo = disc.result?._meta?.["io.modelcontextprotocol/serverInfo"] ?? serverInfo;
      }
    }
  }

  // --- Step 2: legacy SSE fallback (2024-11-05 transport) ---
  if (!transport && !auth.authRequired) {
    const legacy = await legacySseHandshake(endpoint);
    if (legacy) {
      transport = "legacy-sse";
      protocolVersion = legacy.protocolVersion;
      serverInfo = legacy.serverInfo;
      tools = legacy.tools;
    }
  }

  // --- Step 3: server card discovery (working-group draft: /.well-known/mcp.json etc.) ---
  await discoverCard(url.origin, card);

  buildChecks({ checks, endpoint, reachable, transport, protocolVersion, supportedVersions, serverInfo, tools, auth, card });

  return {
    url: endpoint,
    reachable,
    transport,
    protocolVersion,
    supportedVersions,
    serverInfo,
    tools,
    toolCount: tools.length,
    writeToolCount: tools.filter((t) => t.writeAction).length,
    auth,
    card,
    checks,
  };
}

async function discoverAuth(endpoint: string, auth: AuthSignals): Promise<void> {
  // 1) RFC 9728: resource_metadata URL from WWW-Authenticate wins.
  let resourceUrl: string | undefined;
  const www = auth.wwwAuthenticate;
  if (www) {
    const m = www.match(/resource_metadata="([^"]+)"/i);
    if (m) resourceUrl = m[1];
  }
  // 2) Well-known fallbacks: path-inserted first, then root.
  const u = new URL(endpoint);
  const path = u.pathname.replace(/\/+$/, "");
  const candidates = [
    resourceUrl,
    `${u.origin}/.well-known/oauth-protected-resource${path}`,
    `${u.origin}/.well-known/oauth-protected-resource`,
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const res = await httpGet(candidate).catch(() => null);
    if (res?.ok && res.body) {
      try {
        auth.resourceMetadataUrl = candidate;
        auth.resourceMetadata = JSON.parse(res.body);
        const servers = (auth.resourceMetadata as any).authorization_servers;
        if (Array.isArray(servers)) auth.authorizationServers = servers.map(String);
        break;
      } catch { /* keep probing */ }
    }
  }

  // 3) RFC 8414: authorization-server metadata for each issuer (first one only — enough as a signal).
  for (const issuer of auth.authorizationServers?.slice(0, 1) ?? []) {
    const i = new URL(issuer);
    const asCandidates = [
      `${i.origin}/.well-known/oauth-authorization-server${i.pathname === "/" ? "" : i.pathname}`,
      `${i.origin}/.well-known/openid-configuration`,
    ];
    for (const candidate of asCandidates) {
      auth.asMetadataUrlsProbed.push(candidate);
      const res = await httpGet(candidate).catch(() => null);
      if (res?.ok && res.body) {
        try {
          auth.asMetadataFound = JSON.parse(res.body);
          return;
        } catch { /* try next */ }
      }
    }
  }
}

async function discoverCard(origin: string, card: CardInfo): Promise<void> {
  // Server Card = working-group draft (format close to registry server.json).
  // Emerging discovery patterns checked conservatively.
  const candidates = [
    `${origin}/.well-known/mcp.json`,
    `${origin}/.well-known/mcp/server.json`,
    `${origin}/.well-known/ai-card.json`,
  ];
  for (const candidate of candidates) {
    const res = await httpGet(candidate).catch(() => null);
    if (res?.ok && res.body?.trim().startsWith("{")) {
      try {
        card.url = candidate;
        card.present = true;
        card.fields = JSON.parse(res.body);
        return;
      } catch { /* not JSON, keep looking */ }
    }
  }
  card.note = "kein Server-Card-Kandidat gefunden (/.well-known/mcp.json u.a.)";
}

interface LegacyResult {
  protocolVersion?: string;
  serverInfo?: { name?: string; version?: string };
  tools: ToolInfo[];
}

/** 2024-11-05 HTTP+SSE transport: open GET stream, POST to the announced endpoint. */
async function legacySseHandshake(endpoint: string): Promise<LegacyResult | null> {
  const controller = new AbortController();
  const deadline = setTimeout(() => controller.abort(), 25_000);
  try {
    const stream = await fetch(endpoint, {
      headers: { "user-agent": "mcpclinic-live-test/0.1", accept: "text/event-stream" },
      signal: controller.signal,
    });
    if (!stream.ok || !stream.body) return null;

    const pending = new Map<number, (r: RpcResponse) => void>();
    let postEndpoint: string | null = null;
    let announce: (url: string) => void;
    const announced = new Promise<string>((resolve) => { announce = resolve; });

    const pump = (async () => {
      const reader = stream.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const block = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          const event = block.match(/^event:\s*(.+)$/m)?.[1]?.trim();
          const data = block.match(/^data:\s*(.+)$/m)?.[1]?.trim();
          if (!data) continue;
          if (event === "endpoint" && !postEndpoint) {
            postEndpoint = new URL(data, endpoint).toString();
            announce!(postEndpoint);
            continue;
          }
          try {
            const msg = JSON.parse(data);
            if (msg.id !== undefined && pending.has(msg.id)) {
              const resolve = pending.get(msg.id)!;
              pending.delete(msg.id);
              resolve(msg);
            }
          } catch { /* ignore non-JSON */ }
        }
      }
    })();

    const gotEndpoint = await Promise.race([
      announced,
      new Promise<null>((r) => setTimeout(() => r(null), 8_000)),
    ]);
    if (!gotEndpoint) { controller.abort(); return null; }

    const waitFor = (id: number, ms: number) =>
      Promise.race([
        new Promise<RpcResponse | null>((resolve) => pending.set(id, resolve)),
        new Promise<null>((r) => setTimeout(() => r(null), ms)),
      ]);

    await httpPost(gotEndpoint, initRequest(LEGACY_SPEC)).catch(() => null);
    const initResp = await waitFor(1, 8_000);
    await httpPost(gotEndpoint, { jsonrpc: "2.0", method: "notifications/initialized", params: {} }).catch(() => null);
    await httpPost(gotEndpoint, { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }).catch(() => null);
    const toolsResp = await waitFor(2, 8_000);

    controller.abort();
    await pump.catch(() => null);

    const rawTools: any[] = toolsResp?.result?.tools ?? [];
    return {
      protocolVersion: initResp?.result?.protocolVersion,
      serverInfo: initResp?.result?.serverInfo,
      tools: rawTools.map(mapTool),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(deadline);
  }
}

function buildChecks(ctx: {
  checks: Check[];
  endpoint: string;
  reachable: boolean;
  transport?: string;
  protocolVersion?: string;
  supportedVersions?: string[];
  serverInfo?: { name?: string; version?: string };
  tools: ToolInfo[];
  auth: AuthSignals;
  card: CardInfo;
}): void {
  const { checks, reachable, transport, protocolVersion, supportedVersions, serverInfo, tools, auth, card } = ctx;

  checks.push({
    id: "reachable",
    label: "Endpunkt erreichbar",
    status: reachable ? "pass" : "fail",
    detail: reachable ? `HTTP-Antwort erhalten (${transport ?? "Transport unklar"})` : "Endpunkt nicht erreichbar",
  });

  checks.push({
    id: "handshake",
    label: "MCP-Handshake (initialize)",
    status: protocolVersion ? "pass" : auth.authRequired ? "info" : "fail",
    detail: protocolVersion
      ? `Protokollversion ${protocolVersion}${serverInfo?.name ? ` · Server: ${serverInfo.name}${serverInfo.version ? " " + serverInfo.version : ""}` : ""}`
      : auth.authRequired
        ? "Authentifizierung erforderlich: ohne Zugangsdaten kein Handshake (aus Agent-Sicht: gut gesichert, aber Client-Einstieg prüfen)"
        : "Kein gültiger MCP-Handshake",
  });

  checks.push({
    id: "transport-current",
    label: "Aktueller Stand (2026-07-28, server/discover)",
    status: supportedVersions ? "pass" : "warn",
    detail: supportedVersions
      ? `unterstützt: ${supportedVersions.join(", ")}`
      : "server/discover (Spez 2026-07-28) nicht beantwortet: älterer Stand oder Auth nötig",
  });

  checks.push({
    id: "auth",
    label: "Authentifizierung",
    status: auth.authRequired ? "pass" : "fail",
    detail: auth.authRequired
      ? auth.resourceMetadataUrl
        ? `OAuth-Discovery vorhanden (${auth.resourceMetadataUrl})${auth.authorizationServers?.length ? ` · Authorization Server: ${auth.authorizationServers.join(", ")}` : ""}`
        : "Zugang geschützt (401/403), aber keine OAuth-Resource-Metadata auffindbar (RFC 9728)"
      : "WARNUNG: Tools ohne Authentifizierung abrufbar",
  });

  const writeTools = tools.filter((t) => t.writeAction);
  checks.push({
    id: "tools",
    label: "Tools sichtbar (tools/list)",
    status: tools.length > 0 ? "pass" : auth.authRequired ? "info" : "fail",
    detail: tools.length > 0
      ? `${tools.length} Tools${writeTools.length ? `, davon ${writeTools.length} mit Schreibwirkung: ${writeTools.slice(0, 5).map((t) => t.name).join(", ")}${writeTools.length > 5 ? " …" : ""}` : " (nur lesend)"}`
      : auth.authRequired
        ? "Toolsliste nach Auth geschützt (aus Agent-Sicht korrekt)"
        : "Keine Tools abrufbar",
  });

  const avgQuality = tools.length ? tools.reduce((s, t) => s + t.quality, 0) / tools.length : 0;
  checks.push({
    id: "description-quality",
    label: "Tool-Beschreibungen (Qualität für Tool-Auswahl durch LLMs)",
    status: tools.length === 0 ? "info" : avgQuality >= 0.6 ? "pass" : avgQuality >= 0.35 ? "warn" : "fail",
    detail: tools.length === 0
      ? "ohne Toolsliste nicht bewertbar"
      : `Durchschnittsscore ${(avgQuality * 100).toFixed(0)}/100${tools.some((t) => t.qualityNotes.length) ? ` · häufige Mängel: ${[...new Set(tools.flatMap((t) => t.qualityNotes))].slice(0, 3).join("; ")}` : ""}`,
  });

  checks.push({
    id: "server-card",
    label: "MCP Server Card (Entwurf, Working Group)",
    status: card.present ? "pass" : "warn",
    detail: card.present ? `gefunden: ${card.url}` : (card.note ?? "nicht vorhanden"),
  });
}
