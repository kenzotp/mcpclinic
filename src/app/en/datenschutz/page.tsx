import Datenschutz from "../../datenschutz/page";

export const metadata = {
  title: "Privacy — MCP Clinic",
  robots: { index: false, follow: false },
};

// EN mirror, noindex like the German original.
export default function EnDatenschutz() {
  return <Datenschutz />;
}
