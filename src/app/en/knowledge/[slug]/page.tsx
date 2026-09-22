import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { wissenAll, wissenPost, wissenSlugs, deSlugFor } from "@/lib/wissen";

export async function generateStaticParams() {
  return (await wissenSlugs("en")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await wissenPost(slug, "en");
  if (!post) return { title: "Knowledge — MCP Clinic" };
  return {
    title: `${post.title} — MCP Clinic Knowledge`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://mcpclinic.dev/en/knowledge/${slug}`,
      languages: {
        en: `https://mcpclinic.dev/en/knowledge/${slug}`,
        "de-DE": `https://mcpclinic.dev/wissen/${deSlugFor(slug)}`,
      },
    },
  };
}

// Internal links in posts point at bare routes — keep them on-site.
function internalize(html: string): string {
  return html.replace(/href="(\/[a-z-]*)"/g, 'href="$1"');
}

// Generative packet-field header, deterministic per slug — every article gets
// its own unique field, but the same article always renders the same one.
function fieldHeader(slug: string): string {
  let seed = 2166136261;
  for (const c of slug) seed = ((seed ^ c.charCodeAt(0)) * 16777619) % 4294967296;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const W = 1000, H = 190;
  const nodes: { x: number; y: number }[] = [];
  let guard = 0;
  while (nodes.length < 16 && guard++ < 400) {
    const x = 30 + rnd() * (W - 60);
    const y = 20 + rnd() * (H - 40);
    if (nodes.every((n) => (n.x - x) ** 2 + (n.y - y) ** 2 > 95 ** 2)) nodes.push({ x, y });
  }
  let edges = "";
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 190)
        edges += `<line x1="${a.x.toFixed(0)}" y1="${a.y.toFixed(0)}" x2="${b.x.toFixed(0)}" y2="${b.y.toFixed(0)}" stroke="rgba(255,255,255,${(0.08 * (1 - d / 190)).toFixed(3)})"/>`;
    }
  const dots = nodes
    .map((n) => `<circle cx="${n.x.toFixed(0)}" cy="${n.y.toFixed(0)}" r="${(1.2 + rnd() * 1.2).toFixed(1)}" fill="rgba(255,255,255,${(0.25 + rnd() * 0.3).toFixed(2)})"/>`)
    .join("");
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" style="width:100%;height:${H}px;display:block" aria-hidden="true"><rect width="${W}" height="${H}" fill="rgba(255,255,255,0.02)"/>${edges}${dots}</svg>`;
}

export default async function EnWissenPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await wissenPost(slug, "en");
  if (!post) notFound();
  const others = (await wissenAll("en")).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Nav lang="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            mainEntityOfPage: `https://mcpclinic.dev/en/wissen/${slug}`,
            author: { "@type": "Organization", name: "MCP Clinic" },
            publisher: { "@type": "Organization", name: "MCP Clinic" },
          }),
        }}
      />
      <main className="relative z-10 mx-auto max-w-2xl px-6 pb-10 pt-32">
        <Reveal>
          <Link href="/en/knowledge" className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)] transition-colors hover:text-[var(--ink-2)]">
            ← Knowledge
          </Link>
          <h1 className="font-display mt-5 text-3xl md:text-4xl font-light leading-tight tracking-tight">{post.title}</h1>
          {post.description && <p className="mt-4 text-[15px] text-[var(--ink-2)]">{post.description}</p>}
          <p className="mt-4 text-xs text-[var(--ink-3)]">{post.readingMinutes} min read</p>
        </Reveal>
        <Reveal delay={80}>
          <article
            className="wissen mt-10 text-[15px] leading-[1.75] text-[var(--ink-2)]"
            dangerouslySetInnerHTML={{ __html: internalize(post.html) }}
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="hairline-t mt-16 pt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Keep reading</p>
            <div className="mt-4 flex flex-col gap-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/en/knowledge/${p.slug}`} className="text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </main>
      <Footer lang="en" />
    </>
  );
}
