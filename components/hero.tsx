"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PHASES, ZONES } from "@/lib/plan";
const PlanScene = dynamic(() => import("./plan-scene"), { ssr: false });
const lines = ["Planning the", "city before", "it's built."];
export function Hero() {
  const [phase, setPhase] = useState(0);
  return (
    <section className="relative h-[100svh] min-h-[680px] overflow-hidden bg-ink text-paper">
      <PlanScene onPhase={setPhase} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/70" />

      <div className="absolute right-6 top-28 z-10 w-44 text-right text-sm">
        <ol className="space-y-2">
          {PHASES.map((p, i) => (
            <li key={p.name} className={`transition-colors duration-300 ${i === phase ? "text-gold" : i < phase ? "text-paper" : "text-paper/35"}`}>
              <span>{p.name}</span>
              <span className="mt-1 block h-px bg-paper/15"><motion.span className="block h-px origin-right bg-gold" initial={false} animate={{ scaleX: i <= phase ? 1 : 0 }} transition={{ duration: 0.4 }} /></span>
            </li>
          ))}
        </ol>
        <AnimatePresence>
          {phase >= 2 && (
            <motion.ul initial="h" animate="s" transition={{ staggerChildren: 0.06 }} className="mt-8 hidden space-y-2 md:block">
              {ZONES.map((z) => (
                <motion.li key={z.key} variants={{ h: { opacity: 0, x: 12 }, s: { opacity: 1, x: 0 } }} className="flex items-center justify-end gap-2 text-paper/80">
                  {z.name}<span className="size-2.5 rounded-sm" style={{ background: z.color }} />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 md:pb-20">
        <h1 className="font-display text-[clamp(2.75rem,8.5vw,8rem)] font-semibold leading-[0.93] tracking-tight">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-2">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}>{l}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
          <p className="max-w-md text-lg text-paper/80">Urban development and town planning across Pakistan since 1991. Based in Islamabad.</p>
          <Button asChild><Link href="/projects">View master plans</Link></Button>
          <Button asChild variant="outline"><Link href="/contact">Talk to us</Link></Button>
        </motion.div>
      </div>
    </section>
  );
}