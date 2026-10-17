"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
export function PageHead({ title, sub, eyebrow, visual }: { title: string; sub?: string; eyebrow?: string; visual?: ReactNode }) {
  return (
    <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-ink px-6 pb-16 pt-40 text-paper">
      <div className="absolute inset-0">{visual}</div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl">
        {eyebrow && (
          <motion.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-10 bg-gold" />{eyebrow}
          </motion.p>
        )}
        <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight">
          {title.split(" ").map((w, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom">
              <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        {sub && <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-8 max-w-2xl text-lg text-paper/70">{sub}</motion.p>}
      </div>
    </section>
  );
}
