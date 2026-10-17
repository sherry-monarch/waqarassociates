"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { projects, site } from "@/lib/site";
const filters = ["All", ...site.sectors];
export function ProjectsGrid({ initial = "All" }: { initial?: string }) {
  const [f, setF] = useState(filters.includes(initial) ? initial : "All");
  const list = projects.filter((p) => f === "All" || p.sector === f);
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} className="relative rounded-full px-5 py-2 text-sm">
            {f === x && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className={`relative ${f === x ? "text-paper" : ""}`}>{x}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">{list.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}</AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="mt-12 text-ink/60">No projects in this sector yet.</p>}
    </>
  );
}
