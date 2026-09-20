import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TestExperience from "@/components/TestExperience";
import { Suspense } from "react";

export const metadata = { title: "MCP-Live-Test — MCP Clinic" };

export default function TestPage() {
  return (
    <>
      <Nav lang="de" />
      <Suspense>
        <TestExperience lang="de" />
      </Suspense>
      <Footer lang="de" />
    </>
  );
}
