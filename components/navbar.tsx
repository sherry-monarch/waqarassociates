"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
export function Navbar() {
  const [hidden, setHidden] = useState(false), [open, setOpen] = useState(false), [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => { setHidden(y > (scrollY.getPrevious() ?? 0) && y > 200); setSolid(y > 60); });
  return (
    <>
      <motion.header animate={{ y: hidden && !open ? "-100%" : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? "bg-ink/90 backdrop-blur" : ""} text-paper`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3"><Image src="/logo.png" alt="" width={44} height={34} priority className="[filter:drop-shadow(0_0_1px_#fff)_drop-shadow(0_0_1px_#fff)]" /><span className="font-display text-xl font-semibold tracking-tight">{site.name}</span></Link>
          <nav className="hidden gap-9 md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="group relative py-2 text-sm">
                {n.label}<span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-ink px-6 text-paper md:hidden">
            {nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-display text-5xl font-semibold">{n.label}</Link>)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}