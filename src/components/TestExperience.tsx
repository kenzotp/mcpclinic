"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Warning, X, Info } from "@phosphor-icons/react/dist/ssr";

type Check = { id: string; label: string; status: "pass" | "warn" | "fail" | "info"; detail: string };
type ApiOk = {
  ok: true; kind: "surface" | "mcp"; target: string; score: number; grade: string;
  checks: Check[]; surfaceChecks?: Check[];
};
type ApiErr = { ok: false; code: string; message: string };
type State =
  | { phase: "idle" }
  | { phase: "scanning"; url: string }
  | { phase: "result"; data: ApiOk }
  | { phase: "error"; message: string };

const STR = {
  de: {
    title: "MCP-Live-Test",
    sub: "Eine URL — unter einer Minute. Keine Anmeldung, keine Zugangsdaten.",
    placeholder: "https://docs.ihre-software.de",
    run: "Test starten",
    scanning: "Prüfe Ihre öffentliche Oberfläche …",
    score: "von 100",
    rerun: "Neue URL testen",
    cta: "Das war die Oberfläche. Was ein echter Agent daraus macht, zeigt das Audit.",
    ctaBtn: "Agent-Readiness-Audit — 2.400 € Festpreis",
    rateLimited: "Limit erreicht: 3 Tests pro Tag und IP-Adresse.",
    fail: "Prüfung fehlgeschlagen.",
    mcpFound: "MCP-Endpunkt gefunden und geprüft.",
    surfaceOnly: "Kein MCP-Endpunkt an dieser URL — Dokumentations-Oberfläche geprüft.",
    verdict: (s: number) =>
      s >= 65 ? "Stark. Der Feinschliff entscheidet." :
      s >= 45 ? "Solide Basis — mit Lücken, die Agenten spüren." :
      s >= 25 ? "Erste Schritte vorhanden — der Zugang für Agenten fehlt." :
      "Für KI-Agenten praktisch nicht erreichbar.",
  },
  en: {
    title: "MCP Live-Test",
    sub: "One URL — under a minute. No sign-up, no credentials.",
    placeholder: "https://docs.your-product.com",
    run: "Run test",
    scanning: "Scanning your public surface …",
    score: "of 100",
    rerun: "Test another URL",
    cta: "That was the surface. What a real agent does with it — that's the audit.",
    ctaBtn: "Agent-Readiness Audit — €2,400 fixed",
    rateLimited: "Limit reached: 3 tests per day and IP.",
    fail: "Probe failed.",
    mcpFound: "MCP endpoint found and probed.",
    surfaceOnly: "No MCP endpoint at this URL — documentation surface checked.",
    verdict: (s: number) =>
      s >= 65 ? "Strong. The details decide now." :
      s >= 45 ? "Solid base — with gaps agents will feel." :
      s >= 25 ? "First steps exist — agent access is missing." :
      "Practically unreachable for AI agents.",
  },
} as const;

function Glyph({ status }: { status: Check["status"] }) {
  const cls = "mt-0.5 shrink-0";
  if (status === "pass") return <Check size={15} weight="bold" className={`${cls} text-[var(--ok)]`} />;
  if (status === "warn") return <Warning size={15} weight="fill" className={`${cls} text-[var(--warn)]`} />;
  if (status === "fail") return <X size={15} weight="bold" className={`${cls} text-[var(--bad)]`} />;
  return <Info size={15} weight="light" className={`${cls} text-[var(--ink-3)]`} />;
}

export default function TestExperience({ lang }: { lang: "de" | "en" }) {
  const t = STR[lang];
  const params = useSearchParams();
  const [state, setState] = useState<State>({ phase: "idle" });
  const [url, setUrl] = useState("");
  const busy = useRef(false);

  const run = useCallback(async (target: string) => {
    if (busy.current) return;
    busy.current = true;
    setState({ phase: "scanning", url: target });
    window.dispatchEvent(new CustomEvent("field:mode", { detail: { mode: "scan" } }));
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data = (await res.json()) as ApiOk | ApiErr;
      if (!data.ok) {
        setState({ phase: "error", message: data.code === "rate_limited" ? t.rateLimited : data.message || t.fail });
      } else {
        setState({ phase: "result", data });
      }
    } catch {
      setState({ phase: "error", message: t.fail });
    } finally {
      window.dispatchEvent(new CustomEvent("field:mode", { detail: { mode: "normal" } }));
      busy.current = false;
    }
  }, [t]);

  // ?url= from the hero input → auto-run once
  useEffect(() => {
    const q = params.get("url");
    if (q && !busy.current && state.phase === "idle") {
      setUrl(q);
      run(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const scanning = state.phase === "scanning";

  return (
    <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      {state.phase !== "result" && (
        <>
          <h1 className="font-display text-4xl font-light tracking-tight md:text-5xl">{t.title}</h1>
          <p className="mt-3 text-[15px] text-[var(--ink-2)]">{t.sub}</p>
          <form
            data-field-cta
            className="glass-strong mx-auto mt-10 flex w-full max-w-xl items-center gap-2 rounded-full p-2 pl-6"
            onSubmit={(e) => {
              e.preventDefault();
              const clean = url.trim();
              if (clean && !scanning) run(clean);
            }}
          >
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t.placeholder}
              disabled={scanning}
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--ink-3)] disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={scanning}
              className="shrink-0 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[13px] font-semibold text-[var(--bg-0)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40"
            >
              {t.run}
            </button>
          </form>
          {scanning && (
            <p className="mt-8 animate-pulse text-sm tracking-wide text-[var(--ink-2)]">{t.scanning}</p>
          )}
          {state.phase === "error" && (
            <p className="mt-8 text-sm text-[var(--bad)]">{state.message}</p>
          )}
        </>
      )}

      {state.phase === "result" && (
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div className="font-display text-[7rem] font-extralight leading-none tracking-tighter md:text-[9rem]">
              {state.data.score}
            </div>
            <div className="text-sm text-[var(--ink-3)]">{t.score} · {state.data.grade}</div>
            <p className="mt-4 max-w-xl text-[15px] text-[var(--ink-2)]">{t.verdict(state.data.score)}</p>
            <p className="mt-1 text-xs text-[var(--ink-3)]">
              {state.data.kind === "mcp" ? t.mcpFound : t.surfaceOnly} · {state.data.target}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl text-left">
            {[...(state.data.surfaceChecks ?? []), ...state.data.checks].map((c) => (
              <div key={c.id + c.label} className="hairline-b flex gap-3 py-3.5">
                <Glyph status={c.status} />
                <div>
                  <div className="text-sm font-medium">{c.label}</div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-[var(--ink-2)]">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="max-w-md text-sm text-[var(--ink-2)]">{t.cta}</p>
            <div className="flex flex-wrap items-center justify-center gap-3" data-field-cta>
              <Link
                href={lang === "de" ? "/#angebote" : "/en#angebote"}
                className="glass flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold transition-transform duration-300 hover:scale-[1.03]"
              >
                {t.ctaBtn}
                <ArrowRight size={14} weight="bold" />
              </Link>
              <button
                onClick={() => { setState({ phase: "idle" }); setUrl(""); }}
                className="px-4 py-3 text-[13px] text-[var(--ink-3)] transition-colors hover:text-[var(--ink-2)]"
              >
                {t.rerun}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
