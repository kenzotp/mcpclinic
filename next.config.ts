import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      { source: "/en/wissen", destination: "/en/knowledge", permanent: true },
      { source: "/en/wissen/was-ist-mcp", destination: "/en/knowledge/what-is-mcp", permanent: true },
      { source: "/en/wissen/mcp-sicherheitsluecken", destination: "/en/knowledge/mcp-security-vulnerabilities", permanent: true },
      { source: "/en/wissen/mcp-server-dsgvo", destination: "/en/knowledge/mcp-server-gdpr", permanent: true },
      { source: "/en/wissen/mcp-spezifikation-juli-2026", destination: "/en/knowledge/mcp-specification-july-2026", permanent: true },
      { source: "/en/wissen/mcp-tool-beschreibungen", destination: "/en/knowledge/mcp-tool-descriptions", permanent: true },
      { source: "/en/wissen/mcp-oekosystem", destination: "/en/knowledge/mcp-ecosystem", permanent: true },
      { source: "/en/wissen/self-host-oder-gateway", destination: "/en/knowledge/self-host-or-gateway", permanent: true },
      { source: "/en/wissen/was-kostet-ein-mcp-server", destination: "/en/knowledge/mcp-server-pricing", permanent: true },
      { source: "/en/wissen/:path*", destination: "/en/knowledge/:path*", permanent: true },
      { source: "/en/knowledge/mcp-faehig-machen", destination: "/en/knowledge/mcp-ready", permanent: true },
      { source: "/en/knowledge/mcp-agentur", destination: "/en/knowledge/mcp-agency", permanent: true },
      { source: "/en/knowledge/mcp-audit-checkliste", destination: "/en/knowledge/mcp-audit-checklist", permanent: true },
      { source: "/en/knowledge/ki-agenten-anbinden", destination: "/en/knowledge/connect-ai-agents", permanent: true },
      { source: "/en/mcp-server-entwickeln", destination: "/en/mcp-server-development", permanent: true },
    ];
  },
};

export default nextConfig;
