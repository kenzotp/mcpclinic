import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer({ lang }: { lang: "de" | "en" }) {
  const t =
    lang === "de"
      ? {
          claim: "Wir machen deutsche SaaS-Produkte agentenfähig.",
          nav: { test: "Live-Test", report: "Report", audit: "Audit", build: "Endpoint-Build", wissen: "Wissen" },
          legal: { impressum: "Impressum", datenschutz: "Datenschutz" },
        }
      : {
          claim: "We make German SaaS products agent-ready.",
          nav: { test: "Live-Test", report: "Report", audit: "Audit", build: "Endpoint Build", wissen: "Knowledge" },
          legal: { impressum: "Imprint", datenschutz: "Privacy" },
        };
  const p = (de: string, en: string) => (lang === "de" ? de : en);
  return (
    <footer className="hairline-t relative z-10 mt-28">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 text-sm md:grid-cols-[1fr_auto_auto]">
        <div>
          <div className="font-display flex items-center gap-2 text-base font-semibold">
            <Logo size={16} />
            MCP Clinic
          </div>
          <p className="mt-2 max-w-xs text-[var(--ink-3)]">{t.claim}</p>
        </div>
        <div className="flex flex-col gap-2 text-[var(--ink-2)]">
          <Link className="transition-colors hover:text-[var(--ink)]" href={p("/test", "/en/test")}>
            {t.nav.test}
          </Link>
          <Link className="transition-colors hover:text-[var(--ink)]" href="/report">
            {t.nav.report}
          </Link>
          <Link className="transition-colors hover:text-[var(--ink)]" href={p("/mcp-audit", "/mcp-audit")}>
            {t.nav.audit}
          </Link>
          <Link className="transition-colors hover:text-[var(--ink)]" href={p("/mcp-server-entwickeln", "/mcp-server-entwickeln")}>
            {t.nav.build}
          </Link>
          <Link className="transition-colors hover:text-[var(--ink)]" href="/wissen">
            {t.nav.wissen}
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-[var(--ink-3)]">
          <Link className="transition-colors hover:text-[var(--ink-2)]" href={lang === "de" ? "/impressum" : "/en/impressum"}>
            {t.legal.impressum}
          </Link>
          <Link className="transition-colors hover:text-[var(--ink-2)]" href={lang === "de" ? "/datenschutz" : "/en/datenschutz"}>
            {t.legal.datenschutz}
          </Link>
        </div>
      </div>
      <div className="hairline-t">
        <div className="mx-auto max-w-5xl px-6 py-5 text-xs text-[var(--ink-3)]">
          © {new Date().getFullYear()} MCP Clinic
        </div>
      </div>
    </footer>
  );
}
