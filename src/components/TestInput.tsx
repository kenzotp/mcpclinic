"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

// Hero input: the only conversion element. Routes to /test with the URL.
export default function TestInput({ lang }: { lang: "de" | "en" }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const placeholder =
    lang === "de" ? "API-Doku oder MCP-Endpunkt …" : "API docs or MCP endpoint …";
  const label = lang === "de" ? "Testen" : "Run test";

  return (
    <form
      data-field-cta
      className="glass-strong mx-auto mt-10 flex w-full max-w-xl items-center gap-2 rounded-full p-2 pl-6 shadow-[0_0_60px_rgba(255,255,255,0.04)]"
      onSubmit={(e) => {
        e.preventDefault();
        const clean = url.trim();
        if (!clean) return;
        router.push(`${lang === "de" ? "/test" : "/en/test"}?url=${encodeURIComponent(clean)}`);
      }}
    >
      <input
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-3)]"
      />
      <button
        type="submit"
        className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        {label}
        <ArrowRight size={14} weight="bold" />
      </button>
    </form>
  );
}
