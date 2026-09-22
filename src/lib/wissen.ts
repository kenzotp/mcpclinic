import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

// wissen posts live at content/wissen/*.md (repo root, shared with the editorial
// workflow). INDEX.md is the calendar, not a post.
//
// Visual directives inside posts (converted before markdown parsing):
//   :::stat 53/100 | label text          → big thin number + grey label
//   :::box Titel                         → glass finding box, body is markdown
//  _BODY_
//   :::
//   :::takeaway                          → "Das Wichtigste" bullet box
//   - Punkt 1
//   - Punkt 2
//   :::

export interface WissenPost {
  slug: string;
  title: string;
  description: string;
  keywords?: string;
  html: string;
  readingMinutes: number;
  takeaways: string[];
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Convert ::: directives into raw HTML (marked passes raw HTML through). */
function renderDirectives(raw: string): { body: string; takeaways: string[] } {
  const takeaways: string[] = [];
  const out: string[] = [];
  let i = 0;
  const lines = raw.split("\n");
  while (i < lines.length) {
    const m = lines[i].match(/^:::(stat|box|takeaway)(?:\s+(.*))?$/);
    if (!m) {
      out.push(lines[i]);
      i++;
      continue;
    }
    const kind = m[1];
    const arg = (m[2] ?? "").trim();

    // single-line directive: :::stat <num> | <label>
    if (kind === "stat") {
      const [num, ...label] = arg.split("|");
      out.push(
        `<div class="stat-block"><div class="stat-num">${esc(num.trim())}</div><div class="stat-label">${esc(label.join("|").trim())}</div></div>`,
      );
      i++;
      continue;
    }

    // block directives: :::box <title> / :::takeaway, closed by :::
    const block: string[] = [];
    i++;
    while (i < lines.length && lines[i].trim() !== ":::") {
      block.push(lines[i]);
      i++;
    }
    i++; // skip closing :::
    const body = block.join("\n").trim();

    if (kind === "box") {
      out.push(
        `<div class="find-box"><div class="find-title">${esc(arg)}</div><div class="find-body">${marked.parse(body, { async: false })}</div></div>`,
      );
    } else if (kind === "takeaway") {
      const items = body.split("\n").map((l) => l.replace(/^[-*]\s*/, "").trim()).filter(Boolean);
      takeaways.push(...items);
      if (items.length) {
        out.push(
          `<div class="takeaway"><div class="takeaway-title">Das Wichtigste in 30 Sekunden</div><ul>${items
            .map((it) => `<li>${marked.parse(it, { async: false })}</li>`)
            .join("")}</ul></div>`,
        );
      }
    }
  }
  return { body: out.join("\n"), takeaways };
}

function parse(raw: string, slug: string): WissenPost {
  let t = raw;
  const titleMatch = t.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  if (titleMatch) t = t.replace(titleMatch[0], "");
  const descMatch = t.match(/\*\*Meta-Description:\*\*\s*(.+)/);
  const description = descMatch ? descMatch[1].trim() : "";
  if (descMatch) t = t.replace(descMatch[0], "");
  const kwMatch = t.match(/\*(?:Ziel-Keywords|Target keywords):\s*(.+?)\*/);
  const keywords = kwMatch ? kwMatch[1].trim() : undefined;
  if (kwMatch) t = t.replace(kwMatch[0], "");

  const { body, takeaways } = renderDirectives(t);
  const html = marked.parse(body.trim(), { async: false }) as string;
  const words = t.split(/\s+/).length;
  return {
    slug,
    title,
    description,
    keywords,
    html,
    readingMinutes: Math.max(1, Math.round(words / 190)),
    takeaways,
  };
}

function wissenDir(lang: "de" | "en"): string {
  return path.join(process.cwd(), "content", lang === "en" ? "wissen-en" : "wissen");
}

export async function wissenSlugs(lang: "de" | "en" = "de"): Promise<string[]> {
  const dir = wissenDir(lang);
  const files = await readdir(dir);
  return files
    .filter((f) => f.endsWith(".md") && f !== "INDEX.md")
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

export async function wissenPost(slug: string, lang: "de" | "en" = "de"): Promise<WissenPost | null> {
  try {
    const raw = await readFile(path.join(wissenDir(lang), `${slug}.md`), "utf8");
    return parse(raw, slug);
  } catch {
    return null;
  }
}

export async function wissenAll(lang: "de" | "en" = "de"): Promise<WissenPost[]> {
  const slugs = await wissenSlugs(lang);
  const posts = await Promise.all(slugs.map((s) => wissenPost(s, lang)));
  return posts.filter((p): p is WissenPost => p !== null);
}
