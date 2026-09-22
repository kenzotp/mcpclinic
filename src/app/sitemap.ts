import type { MetadataRoute } from "next";

// wissen posts are generated from content/wissen — mirror the slugs here.
import { wissenSlugs } from "@/lib/wissen";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://mcpclinic.dev";
  const now = new Date();
  const slugs = await wissenSlugs();
  return [
    { url: base, lastModified: now, priority: 1 },
    { url: `${base}/test`, lastModified: now, priority: 0.9 },
    { url: `${base}/report`, lastModified: now, priority: 0.9 },
    { url: `${base}/mcp-audit`, lastModified: now, priority: 0.8 },
    { url: `${base}/mcp-server-entwickeln`, lastModified: now, priority: 0.8 },
    { url: `${base}/wissen`, lastModified: now, priority: 0.7 },
    ...slugs.map((s) => ({ url: `${base}/wissen/${s}`, lastModified: now, priority: 0.6 })),
    { url: `${base}/en`, lastModified: now, priority: 0.5 },
    { url: `${base}/en/test`, lastModified: now, priority: 0.5 },
    { url: `${base}/en/report`, lastModified: now, priority: 0.9 },
    { url: `${base}/en/mcp-audit`, lastModified: now, priority: 0.8 },
    { url: `${base}/en/mcp-server-development`, lastModified: now, priority: 0.8 },
    { url: `${base}/en/knowledge`, lastModified: now, priority: 0.7 },
    ...(await wissenSlugs("en")).map((s) => ({ url: `${base}/en/knowledge/${s}`, lastModified: now, priority: 0.6 })),
  ];
}
