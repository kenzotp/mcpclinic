import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { wissenAll } from "@/lib/wissen";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Wissen — MCP Clinic",
  description:
    "Analysen und Anleitungen rund um MCP, Agenten-Fähigkeit und deutsche B2B-SaaS: Teardowns, Sicherheitsmuster, DSGVO.",
};

export default async function WissenIndex() {
  const posts = await wissenAll();
  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-10 pt-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Wissen</p>
          <h1 className="font-display mt-4 text-4xl font-extralight tracking-tight">
            Analysen &amp; Teardowns
          </h1>
          <p className="mt-4 text-[15px] text-[var(--ink-2)]">
            Wie agentenfähig ist deutsche B2B-Software? Jede Analyse ist an echten Prüfungen
            festgemacht — mit Zahlen aus dem{" "}
            <Link href="/report" className="underline decoration-[var(--hairline)] underline-offset-4 transition-colors hover:text-[var(--ink)]">
              Deutschen MCP-Report
            </Link>
            .
          </p>
        </Reveal>
        <div className="mt-12 flex flex-col">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 4) * 60}>
              <Link
                href={`/wissen/${p.slug}`}
                className="hairline-t group flex flex-col gap-1 py-6 transition-colors"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg font-medium transition-colors group-hover:text-[var(--ink-2)]">
                    {p.title}
                  </span>
                  <ArrowRight
                    size={15}
                    className="shrink-0 text-[var(--ink-3)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--ink)]"
                  />
                </span>
                {p.description && (
                  <span className="text-sm leading-relaxed text-[var(--ink-2)]">{p.description}</span>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer lang="de" />
    </>
  );
}
