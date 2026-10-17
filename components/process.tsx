"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
const steps = [
  { n: "01", t: "Survey", b: "Topography, access, utilities and the rules that apply to the land." },
  { n: "02", t: "Road network", b: "A clear hierarchy of arterials and local streets that sets the structure." },
  { n: "03", t: "Zoning", b: "Homes, commerce, parks and civic space, balanced block by block." },
  { n: "04", t: "Development", b: "Infrastructure first, then plots and buildings delivered in phases." },
];
function Step({ s, i, p }: { s: (typeof steps)[number]; i: number; p: MotionValue<number> }) {
  const o = useTransform(p, [i / 4 - 0.05, i / 4 + 0.1], [0.25, 1]);
  return (
    <motion.div style={{ opacity: o }}>
      <span className="block size-6 rounded-full border-4 border-ink bg-gold" />
      <p className="mt-6 font-mono text-sm text-gold">{s.n}</p>
      <h3 className="mt-2 font-display text-2xl font-semibold">{s.t}</h3>
      <p className="mt-3 max-w-xs text-paper/70">{s.b}</p>
    </motion.div>
  );
}
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const w = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <section ref={ref} className="bg-ink px-6 py-16 md:py-28 text-paper">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl font-semibold md:text-6xl">How a plan becomes a city</h2>
        <div className="relative mt-10 md:mt-16">
          <div className="absolute left-0 right-0 top-3 h-px bg-paper/15" />
          <motion.div style={{ width: w }} className="absolute left-0 top-3 h-px bg-gold" />
          <div className="relative grid gap-12 md:grid-cols-4">{steps.map((s, i) => <Step key={s.n} s={s} i={i} p={p} />)}</div>
        </div>
      </div>
    </section>
  );
}