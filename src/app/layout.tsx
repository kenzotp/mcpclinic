import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Field from "@/components/Field";
import "./globals.css";

// Self-hosted Umami (stats.kills.dog) — cookieless, no consent banner needed.
// Website id created 2026-09-20 for mcpclinic.dev.
const UMAMI_WEBSITE_ID = "10558c89-a8dd-443b-b6b9-7a8ac127b086";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mcpclinic.dev"),
  title: "MCP Clinic — Wir machen deutsche SaaS agentenfähig",
  description:
    "Kostenloser MCP-Live-Test, Agent-Readiness-Audit zum Festpreis und MCP-Endpoint-Build: Wir machen deutsche B2B-SaaS-Produkte für KI-Agenten nutzbar.",
  openGraph: {
    title: "MCP Clinic — Wir machen deutsche SaaS agentenfähig",
    description:
      "Kostenloser MCP-Live-Test, Agent-Readiness-Audit zum Festpreis und MCP-Endpoint-Build.",
    url: "https://mcpclinic.dev",
    siteName: "MCP Clinic",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="dark" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${manrope.variable} min-h-screen antialiased`}>
        <Field />
        <div className="relative z-10">{children}</div>
        <Script defer src="https://stats.kills.dog/script.js" data-website-id={UMAMI_WEBSITE_ID} />
      </body>
    </html>
  );
}
