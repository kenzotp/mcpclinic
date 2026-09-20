import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TestExperience from "@/components/TestExperience";
import { Suspense } from "react";

export const metadata = { title: "MCP Live-Test — MCP Clinic" };

export default function EnTestPage() {
  return (
    <>
      <Nav lang="en" />
      <Suspense>
        <TestExperience lang="en" />
      </Suspense>
      <Footer lang="en" />
    </>
  );
}
