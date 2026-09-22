import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { wissenAll } from "@/lib/wissen";

export const metadata = {
  title: "Knowledge — MCP Clinic",
  description:
    "Analyses and teardowns around MCP, agent readiness, and German B2B SaaS: vendor teardowns, security patterns, GDPR. Published in German.",
  alternates: {
    canonical: "https://mcpclinic.dev/en/wissen",
    languages: {
      en: "https://mcpclinic.dev/en/wissen",
      "de-DE": "https://mcpclinic.dev/wissen",
    },
  },
};

export default async function EnWissenIndex() {
  const posts = await wissenAll();
  return (
    <>
      <Nav lang="en" />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-10 pt-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Knowledge</p>
          <h1 className="font-display mt-4 text-4xl font-extralight tracking-tight">
            Analyses &amp; teardowns
          </h1>
          <p className="mt-4 text-[15px] text-[var(--ink-2)]">
            Our knowledge base is written for the German market and published in German. Every
            article follows the same rules as our report: only numbers we measured ourselves,
            vendors described fairly, and exactly one recommended next step.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 40, 240)}>
              <Link
                href={`/wissen/${p.slug}`}
                className="glass block rounded-2xl p-5 transition-transform duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-display text-base font-medium">{p.title}</div>
                  <div className="shrink-0 text-xs text-[var(--ink-3)]">{p.readingMinutes} min · DE</div>
                </div>
                <p className="mt-1 text-sm text-[var(--ink-3)]">{p.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer lang="en" />
    </>
  );
}
