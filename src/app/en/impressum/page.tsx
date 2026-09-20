import Impressum from "../../impressum/page";

export const metadata = {
  title: "Imprint — MCP Clinic",
  robots: { index: false, follow: false },
};

// EN mirror, noindex like the German original.
export default function EnImpressum() {
  return <Impressum />;
}
