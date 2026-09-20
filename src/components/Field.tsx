"use client";

// The Field — MCP Clinic's living background.
// A dark procedural network: nodes drift, packets of light travel the edges,
// the cursor bends the field, packets converge on whatever CTA is in view.
// Fixed canvas behind all content. Monochrome by design; inverts for light mode.

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; ox: number; oy: number; phase: number; speed: number; r: number };
type Edge = { a: number; b: number; alpha: number };
type Packet = {
  edge: number; t: number; speed: number; size: number; alpha: number; dir: 1 | -1;
  seek: null | { x: number; y: number; vx: number; vy: number; life: number };
};

const TAU = Math.PI * 2;

function makeSprite(rgb: string, size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  const s = (c.width = c.height = size);
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grad.addColorStop(0, `rgba(${rgb},0.85)`);
  grad.addColorStop(0.35, `rgba(${rgb},0.28)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  return c;
}

export default function Field() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1;
    let lastW = 0, lastH = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];
    let raf = 0;
    let running = true;
    let t = 0;
    let last = performance.now();

    // palette, swapped via field:theme event (Nav toggle)
    let rgb = "255,255,255";
    let composite: GlobalCompositeOperation = "lighter";

    // interaction state
    const mouse = { x: -9999, y: -9999, active: false };
    let dim = 1;              // global brightness (hero = 1, content ≈ 0.22)
    let scan = false;         // /test loader mode
    let attractor: { x: number; y: number } | null = null;

    const sprite = () => makeSprite(rgb, 48);
    let packetSprite = sprite();

    function applyTheme() {
      const light = document.documentElement.dataset.theme === "light";
      rgb = light ? "16,16,18" : "255,255,255";
      composite = light ? "source-over" : "lighter";
      packetSprite = sprite();
    }
    applyTheme();

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      const widthChanged = Math.abs(nw - lastW) > 1;
      const heightJump = Math.abs(nh - lastH) > 160;
      // Mobile scroll collapses/expands the address bar → tiny height changes
      // fire resize constantly. Rebuilding the scene there teleports every
      // packet mid-flight; small height-only deltas keep the scene untouched.
      if (lastW > 0 && !widthChanged && !heightJump) return;
      lastW = nw; lastH = nh;
      w = nw;
      h = nh;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (widthChanged || heightJump || nodes.length === 0) buildScene();
    }

    function buildScene() {
      const count = Math.max(10, Math.min(22, Math.round((w * h) / 62000)));
      nodes = [];
      let guard = 0;
      while (nodes.length < count && guard++ < 900) {
        const x = 40 + Math.random() * (w - 80);
        const y = 40 + Math.random() * (h - 80);
        if (nodes.every((n) => (n.x - x) ** 2 + (n.y - y) ** 2 > (Math.min(w, h) / 4.6) ** 2)) {
          nodes.push({
            x, y, ox: x, oy: y,
            phase: Math.random() * TAU,
            speed: 0.05 + Math.random() * 0.08,
            r: 1 + Math.random() * 1.4,
          });
        }
      }
      // edges: connect near neighbours, fainter with distance
      edges = [];
      const maxD = Math.min(w, h) * 0.34;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < maxD) edges.push({ a: i, b: j, alpha: 0.1 * (1 - d / maxD) });
        }
      }
      packets = [];
      const pc = Math.round(Math.min(64, Math.max(28, edges.length * 1.7)));
      for (let i = 0; i < pc; i++) spawn();
    }

    function spawn(): void {
      if (edges.length === 0) return;
      packets.push({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.1 + Math.random() * 0.22,
        size: 8 + Math.random() * 14,
        alpha: 0.3 + Math.random() * 0.55,
        dir: Math.random() < 0.5 ? 1 : -1,
        seek: null,
      });
    }

    function edgePoint(e: Edge, tt: number): { x: number; y: number } {
      const a = nodes[e.a], b = nodes[e.b];
      // ease along the edge for organic pacing
      const k = tt * tt * (3 - 2 * tt);
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
    }

    function step(dt: number) {
      t += dt;
      // nodes: slow orbit around their origin + gentle cursor attraction
      for (const n of nodes) {
        n.x = n.ox + Math.cos(n.phase + t * n.speed) * 14;
        n.y = n.oy + Math.sin(n.phase * 1.7 + t * n.speed * 0.8) * 14;
        if (mouse.active) {
          const dx = mouse.x - n.x, dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 260 * 260 && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / 260) * 0.06;
            n.x += dx * f; n.y += dy * f;
          }
        }
      }
      // scan mode: attractor sweeps a line across the upper-middle band
      let ax: number | null = null, ay: number | null = null;
      if (scan) {
        const sweep = (t * 0.22) % 2;
        ax = w * (sweep < 1 ? sweep : 2 - sweep);
        ay = h * 0.44;
      } else if (attractor) {
        ax = attractor.x; ay = attractor.y;
      }

      for (const p of packets) {
        if (p.seek) {
          // free flight toward a target point
          p.seek.life -= dt;
          const dx = p.seek.x - p.seek.vx, dy = p.seek.y - p.seek.vy;
          const d = Math.hypot(dx, dy) || 1;
          const v = 260 + 260 * (1 - Math.min(1, d / 400));
          p.seek.vx += (dx / d) * v * dt;
          p.seek.vy += (dy / d) * v * dt;
          p.t += dt;
          if (d < 14 || p.seek.life <= 0) {
            Object.assign(p, { seek: null } as Partial<Packet>);
            spawnInto(p);
          }
          continue;
        }
        p.t += p.speed * p.dir * dt;
        if (p.t > 1 || p.t < 0) {
          // chance to divert toward an active target, else continue on a new edge
          if (ax !== null && ay !== null && Math.random() < 0.5) {
            const at = edgePoint(edges[p.edge], Math.min(1, Math.max(0, p.t)));
            p.seek = { x: ax, y: ay, vx: at.x, vy: at.y, life: 2.2 };
          } else {
            spawnInto(p);
          }
        }
      }
    }

    function spawnInto(p: Packet) {
      if (edges.length === 0) return;
      p.edge = Math.floor(Math.random() * edges.length);
      p.t = Math.random();
      p.dir = Math.random() < 0.5 ? 1 : -1;
      p.seek = null;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = composite;

      // edges
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        ctx.strokeStyle = `rgba(${rgb},${(e.alpha * dim).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      // nodes: 1px rings
      for (const n of nodes) {
        ctx.strokeStyle = `rgba(${rgb},${(0.35 * dim).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, TAU);
        ctx.stroke();
      }
      // packets: soft glow sprites, brighter near the cursor
      for (const p of packets) {
        const pos = p.seek
          ? { x: p.seek.vx, y: p.seek.vy }
          : edgePoint(edges[p.edge], Math.min(1, Math.max(0, p.t)));
        let glow = 1;
        if (mouse.active) {
          const d = Math.hypot(pos.x - mouse.x, pos.y - mouse.y);
          if (d < 220) glow = 1 + (1 - d / 220) * 0.9;
        }
        const s = p.size * glow;
        ctx.globalAlpha = p.alpha * dim;
        ctx.drawImage(packetSprite, pos.x - s / 2, pos.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      // scan line in test-loader mode
      if (scan) {
        const sweep = (t * 0.22) % 2;
        const x = w * (sweep < 1 ? sweep : 2 - sweep);
        const grad = ctx.createLinearGradient(x - 220, 0, x + 220, 0);
        grad.addColorStop(0, `rgba(${rgb},0)`);
        grad.addColorStop(0.5, `rgba(${rgb},${0.5 * dim})`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 220, h * 0.44);
        ctx.lineTo(x + 220, h * 0.44);
        ctx.stroke();
      }

      // cursor halo
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
        g.addColorStop(0, `rgba(${rgb},${0.05 * dim})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 260, mouse.y - 260, 520, 520);
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function loop(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(loop);
    }

    // brightness follows scroll: hero full, content dimmed
    function onScroll() {
      const hero = document.querySelector<HTMLElement>("[data-field-hero]");
      const fade = hero ? hero.offsetHeight * 0.9 : window.innerHeight;
      dim = Math.max(0.2, Math.min(1, 1 - window.scrollY / fade));
    }

    // convergence: attract packets toward the visible [data-field-cta] center
    function pickAttractor() {
      if (scan) return;
      attractor = null;
      for (const el of document.querySelectorAll<HTMLElement>("[data-field-cta]")) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > 0 && r.width > 0) {
          attractor = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          return;
        }
      }
    }

    function onMove(e: PointerEvent) {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
    }
    function onLeave() { mouse.active = false; }
    function onVisibility() {
      running = !document.hidden && !reduced;
      if (running) { last = performance.now(); raf = requestAnimationFrame(loop); }
      else cancelAnimationFrame(raf);
    }
    const onMode = (e: Event) => { scan = (e as CustomEvent<{ mode: string }>).detail.mode === "scan"; };
    const onTheme = () => { applyTheme(); };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("field:mode", onMode);
    window.addEventListener("field:theme", onTheme);
    const attractorTimer = window.setInterval(pickAttractor, 400);
    pickAttractor();

    if (reduced) {
      draw(); // one quiet static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearInterval(attractorTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("field:mode", onMode);
      window.removeEventListener("field:theme", onTheme);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
