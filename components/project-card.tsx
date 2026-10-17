"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Placeholder } from "./placeholder";
import type { Project } from "@/lib/site";
export function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Link href={`/projects/${p.slug}`} className="group block">
        <div className="overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            {p.image ? (
              <div className="relative aspect-[4/3] w-full bg-ink">
                <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            ) : (
              <Placeholder i={i} className="aspect-[4/3] w-full" />
            )}
          </motion.div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-ink/60">{p.sector} in {p.location}</p>
            {p.status && <p className="mt-1 text-sm text-navy">{p.status}</p>}
          </div>
          <ArrowUpRight className="mt-1 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}