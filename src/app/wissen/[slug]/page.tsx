import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { wissenAll, wissenPost, wissenSlugs } from "@/lib/wissen";

export async function generateStaticParams() {
  return (await wissenSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await wissenPost(slug);
  if (!post) return { title: "Wissen — MCP Clinic" };
  return {
    title: `${post.title} — MCP Clinic Wissen`,
    description: post.description,
    keywords: post.keywords,
  };
}

// Internal links in posts point at bare routes — keep them on-site.
function internalize(html: string): string {
  return html.replace(/href="(\/[a-z-]*)"/g, 'href="$1"');
}

export default async function WissenPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await wissenPost(slug);
  if (!post) notFound();
  const others = (await wissenAll()).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-2xl px-6 pb-10 pt-32">
        <Reveal>
          <Link href="/wissen" className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)] transition-colors hover:text-[var(--ink-2)]">
            ← Wissen
          </Link>
          <h1 className="font-display mt-5 text-3xl md:text-4xl font-light leading-tight tracking-tight">{post.title}</h1>
          {post.description && <p className="mt-4 text-[15px] text-[var(--ink-2)]">{post.description}</p>}
        </Reveal>
        <Reveal delay={80}>
          <article
            className="wissen mt-10 text-[15px] leading-[1.75] text-[var(--ink-2)]"
            dangerouslySetInnerHTML={{ __html: internalize(post.html) }}
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="hairline-t mt-16 pt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Weiterlesen</p>
            <div className="mt-4 flex flex-col gap-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/wissen/${p.slug}`} className="text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </main>
      <Footer lang="de" />
    </>
  );
}
