import { readFile } from "node:fs/promises";
import path from "node:path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const metadata = { title: "Deutscher MCP-Report 2026 — MCP Clinic" };

type Check = { id: string; label: string; status: string; detail: string };
type Company = {
  name: string;
  score: number;
  grade: string;
  officialMcp?: string;
  researchNote?: string;
  mcp?: { reachable: boolean; toolCount: number } | null;
  surface: {
    openapi: { url?: string };
    robots: { found: boolean; agents: { agent: string; policy: string }[] };
    llmsTxt: { found: boolean };
    securityTxt: { found: boolean };
    checks: Check[];
  };
};

export default async function ReportPage() {
  const dir = process.cwd();
  const companies: Company[] = JSON.parse(
    await readFile(path.join(dir, "report", "out", "results.json"), "utf8"),
  );
  const meta = JSON.parse(await readFile(path.join(dir, "report", "meta.de.json"), "utf8"));
  const ranked = [...companies].sort((a, b) => b.score - a.score);

  return (
    <>
      <Nav lang="de" />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-3)]">Report · Stand {meta.generatedAt ?? "2026-09-20"}</p>
          <h1 className="font-display mt-4 text-4xl font-extralight leading-tight tracking-tight md:text-5xl">
            Wie agentenfähig sind 21 deutsche B2B-SaaS-APIs?
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
                    <th className="px-6 py-4 font-medium">Unternehmen</th>
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
                        {c.mcp?.reachable ? "offiziell" : "—"}
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
            <h2 className="font-display text-xl font-medium">Kernbefunde</h2>
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
            <h2 className="font-display text-xl font-medium">Einzelergebnisse</h2>
            <div className="mt-6 flex flex-col gap-10">
              {ranked.map((c) => (
                <div key={c.name} className="hairline-t pt-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg font-medium">{c.name}</h3>
                    <div className="font-display text-2xl font-extralight">{c.score}<span className="text-sm text-[var(--ink-3)]">/100</span></div>
                  </div>
                  {c.researchNote && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">{c.researchNote}</p>
                  )}
                  <div className="mt-4 flex flex-col gap-2">
                    {c.surface.checks.map((ch) => (
                      <div key={ch.id} className="flex gap-3 text-[13px]">
                        <span className="w-28 shrink-0 text-[var(--ink-3)]">{ch.label.split("(")[0].trim()}</span>
                        <span className="text-[var(--ink-2)]">{ch.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-16">
            <h2 className="font-display text-xl font-medium">Methodik</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-2)] whitespace-pre-line">{meta.methodology}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass mt-16 rounded-2xl p-8 text-center" data-field-cta>
            <div className="font-display text-lg font-medium">Ihr Produkt ist dabei — und fehlt?</div>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--ink-2)]">
              Wir prüfen Ihre API kostenlos — oder liefern die volle Diagnose mit Live-Agententests zum Festpreis.
            </p>
            <Link
              href="/test"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03]"
            >
              MCP-Live-Test starten <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer lang="de" />
    </>
  );
}
