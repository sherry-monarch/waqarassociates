"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Counter } from "./counter";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import { projects, site } from "@/lib/site";
const ease = [0.16, 1, 0.3, 1] as const;

export function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <motion.p initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1, ease }}
        className="max-w-4xl font-display text-3xl font-medium leading-tight md:text-5xl">{site.intro}</motion.p>
      <dl className="mt-20 grid grid-cols-2 gap-y-12 border-t border-ink/15 pt-12 md:grid-cols-4">
        {site.stats.map((s) => (
          <div key={s.label}>
            <dd className="font-display text-5xl font-semibold md:text-6xl"><Counter to={s.value} suffix={s.suffix} plain={s.plain} /></dd>
            <dt className="mt-2 text-sm text-ink/60">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Expertise() {
  return (
    <section className="bg-paper pb-28">
      <div className="mx-auto grid max-w-7xl gap-px bg-ink/15 px-0 md:grid-cols-2 lg:grid-cols-4">
        {site.expertise.map((e) => (
          <motion.div key={e.title} whileHover="h" initial="r" className="relative overflow-hidden bg-paper p-8">
            <motion.div variants={{ r: { y: "100%" }, h: { y: 0 } }} transition={{ duration: 0.55, ease }} className="absolute inset-0 bg-navy" />
            <motion.div variants={{ r: { color: "#0B1533" }, h: { color: "#F3F4F8" } }} transition={{ duration: 0.4 }} className="relative min-h-[230px]">
              <h3 className="font-display text-2xl font-semibold">{e.title}</h3>
              <p className="mt-6 max-w-sm leading-relaxed opacity-80">{e.body}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Sectors() {
  return (
    <section className="bg-ink px-6 py-28 text-paper">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl font-semibold md:text-6xl">What we build</h2>
        <ul className="mt-14 border-t border-paper/20">
          {site.sectors.map((s) => (
            <motion.li key={s} whileHover="h" initial="r" className="border-b border-paper/20">
              <Link href={`/projects?sector=${encodeURIComponent(s)}`} className="flex items-center justify-between py-7">
                <motion.span variants={{ r: { x: 0, color: "#F3F4F8" }, h: { x: 24, color: "#EAC22E" } }} transition={{ duration: 0.45, ease }} className="font-display text-3xl md:text-5xl">{s}</motion.span>
                <motion.span variants={{ r: { opacity: 0, x: -20 }, h: { opacity: 1, x: 0 } }} transition={{ duration: 0.4, ease }}><ArrowRight className="text-gold" /></motion.span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Featured() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-4xl font-semibold md:text-6xl">Latest projects</h2>
        <Button asChild variant="ink" className="hidden md:inline-flex"><Link href="/projects">All projects</Link></Button>
      </div>
      <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
        {projects.slice(0, 3).map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
      </div>
    </section>
  );
}

export function Now() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <div className="flex flex-col gap-4 border-l-4 border-gold bg-ink p-8 text-paper md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-gold">
            <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" /><span className="relative inline-flex size-2.5 rounded-full bg-gold" /></span>Now building
          </p>
          <p className="mt-4 max-w-2xl font-display text-3xl font-medium leading-tight md:text-4xl">Commercial buildings and units, alongside our town development and infrastructure work.</p>
        </div>
        <Button asChild><Link href="/projects">See current projects</Link></Button>
      </div>
    </section>
  );
}