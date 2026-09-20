"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun, GlobeSimple } from "@phosphor-icons/react/dist/ssr";
import Logo from "@/components/Logo";

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const current = (document.documentElement.dataset.theme as "dark" | "light") || "dark";
    setTheme(current);
  }, []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("mcpc-theme", next); } catch {}
    window.dispatchEvent(new Event("field:theme"));
    setTheme(next);
  }
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
      className="grid size-8 place-items-center rounded-full text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
    >
      {theme === "dark" ? <Sun size={15} weight="light" /> : <Moon size={15} weight="light" />}
    </button>
  );
}

export default function Nav({ lang }: { lang: "de" | "en" }) {
  const t = {
    de: { weg: "Weg", report: "Report", angebote: "Angebote", wissen: "Wissen" },
    en: { weg: "Process", report: "Report", angebote: "Services", wissen: "Knowledge" },
  }[lang];

  function setTheme(initial: string) {
    document.documentElement.dataset.theme = initial;
  }
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("mcpc-theme"); } catch {}
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    window.dispatchEvent(new Event("field:theme"));
  }, []);

  const other = lang === "de" ? "/en" : "/";
  return (
    <nav className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div className="glass flex items-center gap-1 rounded-full px-2 py-1.5 text-[13px]">
        <Link href={lang === "de" ? "/" : "/en"} className="font-display flex items-center gap-2 px-3 py-1 font-semibold tracking-tight">
          <Logo size={17} />
          MCP&nbsp;Clinic
        </Link>
        <span className="h-4 w-px bg-[var(--hairline)]" />
        <Link href={lang === "de" ? "/#weg" : "/en#weg"} className="rounded-full px-3 py-1 text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
          {t.weg}
        </Link>
        <Link href={lang === "de" ? "/report" : "/en/report"} className="rounded-full px-3 py-1 text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
          {t.report}
        </Link>
        <Link href={lang === "de" ? "/wissen" : "/wissen"} className="rounded-full px-3 py-1 text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
          {t.wissen}
        </Link>
        <Link href={lang === "de" ? "/#angebote" : "/en#angebote"} className="rounded-full px-3 py-1 text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
          {t.angebote}
        </Link>
        <span className="h-4 w-px bg-[var(--hairline)]" />
        <Link
          href={other}
          className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
          aria-label="Language"
        >
          <GlobeSimple size={14} weight="light" />
          {lang === "de" ? "EN" : "DE"}
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
