"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "./hero-carousel";

const lines = ["Planning the", "city before", "it's built."];

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <HeroCarousel />
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:pb-24">
        <h1 className="font-display text-[clamp(2.75rem,8.5vw,8rem)] font-semibold leading-[0.93] tracking-tight">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-2">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}>{l}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
          <p className="max-w-md text-lg text-paper/80">Urban development and town planning across Pakistan since 1991. Based in Islamabad.</p>
          <Button asChild><Link href="/projects">View our Projects</Link></Button>
          <Button asChild variant="outline"><Link href="/contact">Talk to us</Link></Button>
        </motion.div>
      </div>
    </section>
  );
}