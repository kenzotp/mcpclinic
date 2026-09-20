// OG share image generator: node scripts/og.mjs (needs sharp; run where sharp
// is installed, e.g. /tmp/icongen on the hub). deterministic packet-field,
// brand fonts must be installed via fontconfig (see deploy/README).
import sharp from "sharp";

let seed = 20260920;
function rnd() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }

const W = 1200, H = 630;
const nodes = [];
let guard = 0;
while (nodes.length < 26 && guard++ < 800) {
  const x = 40 + rnd() * (W - 80);
  const y = 40 + rnd() * (H - 80);
  if (nodes.every((n) => (n.x - x) ** 2 + (n.y - y) ** 2 > 130 ** 2)) nodes.push({ x, y, r: 1.5 + rnd() * 1.5 });
}
let edges = "";
for (let i = 0; i < nodes.length; i++)
  for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i], b = nodes[j];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < 210) edges += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="rgba(255,255,255,${(0.09 * (1 - d / 210)).toFixed(3)})"/>`;
  }
const packets = [];
for (let i = 0; i < 14; i++) {
  const a = nodes[Math.floor(rnd() * nodes.length)];
  const b = nodes[Math.floor(rnd() * nodes.length)];
  const t = 0.2 + rnd() * 0.6;
  const x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t;
  packets.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3 + rnd() * 4).toFixed(1)}" fill="url(#glow)"/>`);
}
const nodeDots = nodes.map((n) => `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="none" stroke="rgba(255,255,255,0.3)"/>`).join("");

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow">
      <stop offset="0%" stop-color="rgba(255,255,255,0.9)"/>
      <stop offset="40%" stop-color="rgba(255,255,255,0.3)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <radialGradient id="heroglow" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0%" stop-color="#101013"/>
      <stop offset="100%" stop-color="#060607"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#heroglow)"/>
  ${edges}
  ${nodeDots}
  ${packets.join("")}
  <g transform="translate(72,64)">
    <rect width="44" height="44" rx="10" fill="#0A0A0C" stroke="rgba(255,255,255,0.14)"/>
    <text x="58" y="29" font-family="Plus Jakarta Sans" font-weight="600" font-size="21" fill="#F4F4F3" letter-spacing="-0.3">MCP Clinic</text>
  </g>
  <text x="72" y="318" font-family="Plus Jakarta Sans" font-weight="300" font-size="58" fill="#F4F4F3" letter-spacing="-1.5">Deine Kunden nutzen schon</text>
  <text x="72" y="386" font-family="Plus Jakarta Sans" font-weight="300" font-size="58" fill="#7C7C85" letter-spacing="-1.5">KI-Agenten. Deine Software</text>
  <text x="72" y="454" font-family="Plus Jakarta Sans" font-weight="300" font-size="58" fill="#7C7C85" letter-spacing="-1.5">weiß es nicht.</text>
  <text x="72" y="540" font-family="Manrope" font-weight="400" font-size="21" fill="#A3A3AB">Kostenloser MCP-Live-Test · Agent-Readiness-Audit 2.400 € fest · mcpclinic.dev</text>
</svg>`;

const base = sharp(Buffer.from(svg)).composite([
  {
    input: await sharp(process.argv[3] ?? "/tmp/mcp_logo2.png").resize(44, 44).png().toBuffer(),
    top: 64, left: 72,
  },
]);
await base.png({ compressionLevel: 9 }).toFile(process.argv[2] ?? "og.png");
console.log("og written");
