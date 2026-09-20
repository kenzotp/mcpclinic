import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

// wissen posts live at content/wissen/*.md (repo root, shared with the editorial
// workflow). INDEX.md is the calendar, not a post.

export interface WissenPost {
  slug: string;
  title: string;
  description: string;
  keywords?: string;
  html: string;
}

function parse(raw: string, slug: string): WissenPost {
  let t = raw;
  // title: first "# " line
  const titleMatch = t.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  if (titleMatch) t = t.replace(titleMatch[0], "");
  // meta-description line: "**Meta-Description:** ..."
  const descMatch = t.match(/\*\*Meta-Description:\*\*\s*(.+)/);
  const description = descMatch ? descMatch[1].trim() : "";
  if (descMatch) t = t.replace(descMatch[0], "");
  // keywords line: "*Ziel-Keywords: ...*"
  const kwMatch = t.match(/\*Ziel-Keywords:\s*(.+?)\*/);
  const keywords = kwMatch ? kwMatch[1].trim() : undefined;
  if (kwMatch) t = t.replace(kwMatch[0], "");

  const html = marked.parse(t.trim(), { async: false }) as string;
  return { slug, title, description, keywords, html };
}

export async function wissenSlugs(): Promise<string[]> {
  const dir = path.join(process.cwd(), "content", "wissen");
  const files = await readdir(dir);
  return files
    .filter((f) => f.endsWith(".md") && f !== "INDEX.md")
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

export async function wissenPost(slug: string): Promise<WissenPost | null> {
  try {
    const raw = await readFile(path.join(process.cwd(), "content", "wissen", `${slug}.md`), "utf8");
    return parse(raw, slug);
  } catch {
    return null;
  }
}

export async function wissenAll(): Promise<WissenPost[]> {
  const slugs = await wissenSlugs();
  const posts = await Promise.all(slugs.map((s) => wissenPost(s)));
  return posts.filter((p): p is WissenPost => p !== null);
}
