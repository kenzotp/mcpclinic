// MCP Clinic mark — Mikas Logo (Pfeil/Delta im Kreis). Monochrome Badge,
// funktioniert auf dark und light (schwarzer Kreis eingebrannt).

export default function Logo({ size = 20 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      className="rounded-full"
      style={{ width: size, height: size }}
    />
  );
}
