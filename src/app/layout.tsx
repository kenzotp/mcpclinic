import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Field from "@/components/Field";
import "./globals.css";

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
  title: "MCP Clinic — Wir machen deutsche SaaS agentenfähig",
  description:
    "Kostenloser MCP-Live-Test, Agent-Readiness-Audit zum Festpreis und MCP-Endpoint-Build: Wir machen deutsche B2B-SaaS-Produkte für KI-Agenten nutzbar.",
  metadataBase: new URL("https://mcpclinic.dev"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="dark" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${manrope.variable} min-h-screen antialiased`}>
        <Field />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
