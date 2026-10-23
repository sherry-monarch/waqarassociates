"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FOUNDED, nav, site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false), [open, setOpen] = useState(false), [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => { setHidden(y > (scrollY.getPrevious() ?? 0) && y > 200); setSolid(y > 60); });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => { removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header animate={{ y: hidden && !open ? "-100%" : 0 }} transition={{ duration: 0.4, ease }}
        className={`fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-300 ${solid || open ? "bg-ink/90 backdrop-blur" : ""} ${open ? "!bg-ink" : ""}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, since ${FOUNDED}`}>
            <Image src="/logo.png" alt="" width={68} height={45} priority className="h-11 w-auto md:h-12" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight md:text-xl">{site.name}</span>
              <span className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.28em] text-gold">Since {FOUNDED}</span>
            </span>
          </Link>

          <nav className="hidden gap-9 md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className="group relative py-2 text-sm">
                {n.label}
                <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-300 ${active(n.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            ))}
          </nav>

          <button className="relative -mr-2 size-11 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className={`absolute left-2.5 right-2.5 h-0.5 -mt-px bg-current transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-[17px]"}`} />
            <span className={`absolute left-2.5 right-2.5 h-0.5 -mt-px bg-current transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-[26px]"}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 text-paper md:hidden">
            <motion.ul initial="h" animate="s" transition={{ staggerChildren: 0.06, delayChildren: 0.1 }} className="border-t border-paper/15">
              {nav.map((n, i) => (
                <motion.li key={n.href} variants={{ h: { opacity: 0, y: 20 }, s: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease }} className="border-b border-paper/15">
                  <Link href={n.href} onClick={() => setOpen(false)} aria-current={active(n.href) ? "page" : undefined} className="flex items-center justify-between py-5">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`font-display text-3xl font-semibold ${active(n.href) ? "text-gold" : ""}`}>{n.label}</span>
                    </span>
                    <ArrowUpRight className={active(n.href) ? "text-gold" : "text-paper/40"} size={22} />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.25 }} className="mt-auto space-y-5">
              <div className="space-y-1.5 text-sm text-paper/70">
                {site.phone.split(" / ").map((n) => <a key={n} href={`tel:${n.replace(/\s/g, "")}`} className="block">{n}</a>)}
                <a href={`mailto:${site.email}`} className="block break-all">{site.email}</a>
              </div>
              <Link href="/contact" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center rounded-full bg-gold text-sm font-medium text-ink">Get in touch</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}