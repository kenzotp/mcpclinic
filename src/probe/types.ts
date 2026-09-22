// Shared types for the MCP Clinic probe engine.

export type CheckStatus = "pass" | "warn" | "fail" | "info";

export interface Check {
  id: string;
  label: string;          // German, user-facing
  status: CheckStatus;
  detail: string;         // German, user-facing
  points?: number;        // achieved points, if scored
  maxPoints?: number;
}

export interface ToolInfo {
  name: string;
  description: string;
  writeAction: boolean;
  quality: number;        // 0..1 description-quality heuristic
  qualityNotes: string[];
}

export interface AuthSignals {
  authRequired: boolean;              // endpoint returned 401/403 without credentials
  wwwAuthenticate?: string;
  resourceMetadataUrl?: string;       // RFC 9728 metadata URL (from header or well-known)
  resourceMetadata?: Record<string, unknown>;
  authorizationServers?: string[];    // AS issuers from resource metadata
  asMetadataUrlsProbed: string[];     // RFC 8414 locations we probed
  asMetadataFound?: Record<string, unknown>;
}

export interface CardInfo {
  url?: string;
  present: boolean;
  fields?: Record<string, unknown>;
  note?: string;
}

export interface McpProbeResult {
  url: string;
  reachable: boolean;
  transport?: "streamable-http" | "legacy-sse";
  protocolVersion?: string;           // negotiated via initialize
  supportedVersions?: string[];       // via server/discover (2026-07-28), if answered
  serverInfo?: { name?: string; version?: string };
  tools: ToolInfo[];
  toolCount: number;
  writeToolCount: number;
  auth: AuthSignals;
  card: CardInfo;
  checks: Check[];
}

export interface AgentRobotRule {
  agent: string;          // e.g. GPTBot, ClaudeBot
  policy: "allowed" | "blocked" | "none"; // none = not mentioned
}

export interface SurfaceProbeResult {
  url: string;                        // origin or docs URL probed
  openapi: { url?: string; title?: string; version?: string; paths?: number };
  robots: { url: string; found: boolean; agents: AgentRobotRule[]; lastStatus?: number };
  llmsTxt: { url: string; found: boolean };
  securityTxt: { url: string; found: boolean };
  checks: Check[];
}

export interface CompanyReport {
  name: string;
  surface: SurfaceProbeResult;
  mcp?: McpProbeResult;               // only if an MCP endpoint is known/declared
  officialMcp?: string;               // "yes"/"no"/"beta"/... from research
  researchNote?: string;              // community servers etc., from research
  apiHost?: string;
  score: number;                      // 0..100
  grade: string;
}

export interface ScoreBreakdown {
  mcp: number; auth: number; docs: number; descriptions: number; total: number;
}
