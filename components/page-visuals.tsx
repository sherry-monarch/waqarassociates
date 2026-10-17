"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* Company: topographic contour lines that draw in and breathe. */
export function Contours() {
  const path = (r: number, i: number) => {
    const pts: string[] = [];
    for (let a = 0; a <= 360; a += 12) {
      const t = (a * Math.PI) / 180, rr = r * (1 + 0.18 * Math.sin(t * 3 + i * 0.7) + 0.1 * Math.cos(t * 5 - i));
      pts.push(`${(780 + rr * 1.6 * Math.cos(t)).toFixed(1)} ${(300 + rr * Math.sin(t)).toFixed(1)}`);
    }
    return "M" + pts.join("L") + "Z";
  };
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      {Array.from({ length: 11 }, (_, i) => (
        <motion.path key={i} d={path(30 + i * 32, i)} fill="none" stroke={i % 4 === 0 ? "#EAC22E" : "#4A66C9"} strokeOpacity={i % 4 === 0 ? 0.85 : 0.55} strokeWidth={1.3}
          style={{ transformOrigin: "780px 300px" }} initial={{ pathLength: 0 }} animate={{ pathLength: 1, rotate: i % 2 ? 5 : -5 }}
          transition={{ pathLength: { duration: 1.2, delay: i * 0.02, ease: [0.65, 0, 0.35, 1] }, rotate: { duration: 9 + i, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }} />
      ))}
    </svg>
  );
}

/* Expertise: plan layers (terrain, roads, zoning, buildings) that separate. */
const LAYERS = [
  { n: "Terrain", bg: "linear-gradient(135deg,#101F4A,#1B2A6B)" },
  { n: "Road network", bg: "repeating-linear-gradient(0deg,#EAC22E88 0 2px,transparent 2px 40px),repeating-linear-gradient(90deg,#EAC22E88 0 2px,transparent 2px 40px),#16245F" },
  { n: "Zoning", bg: "repeating-conic-gradient(#4A66C9 0 25%,#EAC22E 0 50%,#A9BDF0 0 75%,#fff 0 100%) 0 0/80px 80px" },
  { n: "Buildings", bg: "radial-gradient(#EAC22E 38%,transparent 41%) 0 0/40px 40px" },
];
export function Layers() {
  return (
    <div className="absolute right-[-18%] top-1/2 h-[440px] w-[440px] -translate-y-[48%] sm:right-[2%] md:right-[6%]" aria-hidden>
      {LAYERS.map((l, i) => (
        <motion.div key={l.n} className="absolute inset-0 rounded-sm border border-white/30" style={{ background: l.bg, transformPerspective: 1400, rotateX: 58, rotateZ: -38 }}
          initial={{ y: 70, opacity: 0 }} animate={{ y: 140 - i * 92, opacity: 1 }} transition={{ type: "spring", stiffness: 70, damping: 16, delay: i * 0.04 }} />
      ))}
      {LAYERS.map((l, i) => (
        <motion.span key={l.n} className="absolute left-0 text-xs uppercase tracking-widest text-gold" style={{ top: 222 + 140 - i * 92 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: i * 0.03 }}>{l.n}</motion.span>
      ))}
    </div>
  );
}

/* Projects: a plot grid that lights up in zone colours under the cursor. */
export function PlotGrid() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!, S = 44, Z = ["#4A66C9", "#EAC22E", "#A9BDF0", "#FFFFFF"];
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, cols = 0, rows = 0, heat = new Float32Array(0), raf = 0;
    const m = { x: -999, y: -999 };
    const size = () => {
      const r = c.getBoundingClientRect(), d = Math.min(devicePixelRatio, 2);
      w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      cols = Math.ceil(w / S); rows = Math.ceil(h / S); heat = new Float32Array(cols * rows);
    };
    const mv = (e: MouseEvent) => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; };
    size(); addEventListener("resize", size); addEventListener("mousemove", mv);
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      if (!calm) for (let k = 0; k < 2; k++) heat[(Math.random() * heat.length) | 0] = 0.55 + Math.random() * 0.4;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const idx = j * cols + i, d = Math.hypot(i * S + S / 2 - m.x, j * S + S / 2 - m.y);
        if (d < 150) heat[idx] = Math.max(heat[idx], 1 - d / 150);
        if (heat[idx] > 0.02) {
          ctx.globalAlpha = heat[idx] * 0.85; ctx.fillStyle = Z[(((i * 73856093) ^ (j * 19349663)) >>> 0) % 4];
          ctx.fillRect(i * S + 2, j * S + 2, S - 4, S - 4); heat[idx] *= 0.95;
        }
      }
      ctx.globalAlpha = 1; ctx.strokeStyle = "rgba(169,189,240,0.14)"; ctx.beginPath();
      for (let i = 0; i <= cols; i++) { ctx.moveTo(i * S, 0); ctx.lineTo(i * S, h); }
      for (let j = 0; j <= rows; j++) { ctx.moveTo(0, j * S); ctx.lineTo(w, j * S); }
      ctx.stroke(); raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("mousemove", mv); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/* Contact: survey crosshair with live Islamabad coordinates. */
export function Crosshair() {
  const box = useRef<HTMLDivElement>(null), x = useMotionValue(0.7), y = useMotionValue(0.4);
  const sx = useSpring(x, { stiffness: 140, damping: 20 }), sy = useSpring(y, { stiffness: 140, damping: 20 });
  useEffect(() => {
    const mv = (e: MouseEvent) => { const r = box.current!.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width); y.set((e.clientY - r.top) / r.height); };
    addEventListener("mousemove", mv); return () => removeEventListener("mousemove", mv);
  }, [x, y]);
  const left = useTransform(sx, (v) => `${v * 100}%`), top = useTransform(sy, (v) => `${v * 100}%`);
  const lat = useTransform(sy, (v) => `${(33.6844 + (0.5 - v) * 0.04).toFixed(4)}° N`);
  const lon = useTransform(sx, (v) => `${(73.0479 + (v - 0.5) * 0.06).toFixed(4)}° E`);
  return (
    <div ref={box} className="absolute inset-0" aria-hidden>
      {[1, 2, 3, 4].map((i) => (
        <motion.span key={i} className="absolute left-[72%] top-[40%] rounded-full border border-gold/60" style={{ width: i * 140, height: i * 140, marginLeft: -i * 70, marginTop: -i * 70 }}
          animate={{ scale: [0.5, 1.1], opacity: [0.8, 0] }} transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }} />
      ))}
      <span className="absolute left-[72%] top-[40%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      <motion.div className="absolute inset-y-0 w-px bg-gold/40" style={{ left }} />
      <motion.div className="absolute inset-x-0 h-px bg-gold/40" style={{ top }} />
      <motion.div className="absolute whitespace-nowrap rounded-sm border border-gold bg-ink/80 px-2 py-1 font-mono text-xs text-gold" style={{ left, top, x: 12, y: 12 }}>
        <motion.span>{lat}</motion.span> · <motion.span>{lon}</motion.span>
      </motion.div>
    </div>
  );
}
