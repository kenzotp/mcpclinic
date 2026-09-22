import { readFile } from "node:fs/promises";
import path from "node:path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const metadata = {
  title: "German MCP Report 2026 | MCP Clinic",
  description:
    "How agent-ready are 21 German B2B SaaS APIs? Ranking, scores, and findings from our public surface assessment — tested with the same probe as our free live test.",
  alternates: {
    canonical: "https://mcpclinic.dev/en/report",
    languages: {
      en: "https://mcpclinic.dev/en/report",
      "de-DE": "https://mcpclinic.dev/report",
    },
  },
};

type Company = {
  name: string;
  score: number;
  grade: string;
  mcp?: { reachable: boolean } | null;
};

export default async function EnReportPage() {
  const dir = process.cwd();
  const companies: Company[] = JSON.parse(
    await readFile(path.join(dir, "report", "out", "results.json"), "utf8"),
  );
  const meta = JSON.parse(await readFile(path.join(dir, "report", "meta.en.json"), "utf8"));
  const ranked = [...companies].sort((a, b) => b.score - a.score);

  return (
    <>
      <Nav lang="en" />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Report · As of {meta.generatedAt ?? "2026-09-22"}</p>
          <h1 className="font-display mt-4 text-4xl font-extralight leading-tight tracking-tight md:text-5xl">
            How agent-ready are 21 German B2B SaaS APIs?
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">
            {meta.intro?.split("\n\n")[0]}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14">
            <h2 className="font-display text-xl font-medium">Ranking</h2>
            <div className="glass mt-6 overflow-hidden rounded-2xl">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-[var(--ink-3)]">
                    <th className="px-6 py-4 font-medium">#</th>
                    <th className="px-6 py-4 font-medium">Company</th>
                    <th className="px-6 py-4 font-medium">Score</th>
                    <th className="hidden px-6 py-4 font-medium md:table-cell">MCP</th>
                  </tr>
                </thead>
                <tbody>
                  {ranked.map((c, i) => (
                    <tr key={c.name} className="hairline-t transition-colors hover:bg-white/[0.03]">
                      <td className="px-6 py-3 text-[var(--ink-3)]">{i + 1}</td>
                      <td className="px-6 py-3">{c.name}</td>
                      <td className="px-6 py-3 text-[var(--ink-2)]">{c.score}/100 ({c.grade})</td>
                      <td className="hidden px-6 py-3 text-[var(--ink-2)] md:table-cell">
                        {c.mcp?.reachable ? "official" : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-16">
            <h2 className="font-display text-xl font-medium">Key findings</h2>
            <div className="mt-6 flex flex-col gap-4">
              {(meta.keyFindings ?? []).map((f: string, i: number) => (
                <div key={i} className="glass rounded-xl p-5 text-sm leading-relaxed text-[var(--ink-2)]"
                  dangerouslySetInnerHTML={{ __html: f.replace(/\*\*(.+?)\*\*/g, "<strong class='text-[var(--ink)] font-semibold'>$1</strong>") }} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-16">
            <h2 className="font-display text-xl font-medium">Methodology</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-2)] whitespace-pre-line">{meta.methodology}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass mt-16 rounded-2xl p-8 text-center">
            <div className="font-display text-lg font-medium">The full per-company breakdown</div>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--ink-2)]">
              Every check result for all 21 companies — crawler policies, discovered specs,
              authentication signals — is published in the detailed German report.
            </p>
            <Link
              href="/report"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Open the detailed report (German) <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass mt-10 rounded-2xl p-8 text-center" data-field-cta>
            <div className="font-display text-lg font-medium">Your product is listed — or missing?</div>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--ink-2)]">
              We test your API for free, or deliver the full diagnosis with live agent tests at a fixed price.
            </p>
            <Link
              href="/en/test"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Start the free MCP live test <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer lang="en" />
    </>
  );
}
