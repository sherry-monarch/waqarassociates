"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SLIDE_MS, slides, type Slide  } from "@/lib/hero-slides";

const tones = [["#1B2A6B", "#0B1533"], ["#16245F", "#101F4A"], ["#2C44A6", "#0B1533"], ["#101F4A", "#1B2A6B"]];

function SlideView({ s, i, calm }: { s: Slide; i: number; calm: boolean }) {
  if (!s.src) {
    const [a, b] = tones[i % tones.length];
    return (
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(90deg,#EAC22E22 1px,transparent 1px),linear-gradient(0deg,#EAC22E22 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <p className="absolute right-6 top-24 text-xs uppercase tracking-[0.2em] text-paper/40">{s.type === "video" ? "Video" : "Image"} placeholder {String(i + 1).padStart(2, "0")}</p>
      </div>
    );
  }
  if (s.type === "video") {
    return <video className="absolute inset-0 h-full w-full object-cover" src={s.src} poster={s.poster} autoPlay muted loop playsInline preload="auto" aria-label={s.alt} />;
  }
  return (
    <motion.div className="absolute inset-0" initial={{ scale: 1 }} animate={{ scale: calm ? 1 : 1.08 }} transition={{ duration: SLIDE_MS / 1000 + 1.5, ease: "linear" }}>
      <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
    </motion.div>
  );
}

export function HeroCarousel() {
  const [i, setI] = useState(0), [paused, setPaused] = useState(false), [calm, setCalm] = useState(false);
  useEffect(() => {
    setCalm(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const vis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);
  useEffect(() => {
    if (slides.length < 2 || paused || calm) return;
    const id = setTimeout(() => setI((v) => (v + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [i, paused, calm]);

  return (
    <>
      <div className="absolute inset-0 bg-ink" aria-hidden={slides[i].type === "image" ? undefined : true}>
        <AnimatePresence initial={false}>
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
            <SlideView s={slides[i]} i={i} calm={calm} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/70" />

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-20 mx-auto flex max-w-7xl items-center justify-end gap-4 px-6">
          <span className="font-mono text-xs text-paper/70">{String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          <div className="flex gap-2">
            {slides.map((s, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Show slide ${n + 1}`} aria-current={n === i} className="group flex h-6 w-8 items-center md:w-12">
                <span className="relative block h-0.5 w-full overflow-hidden bg-paper/25">
                  {n < i && <span className="absolute inset-0 bg-paper/80" />}
                  {n === i && <motion.span key={`${i}-${calm}`} className="absolute inset-0 origin-left bg-gold" initial={{ scaleX: calm ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_MS / 1000, ease: "linear" }} />}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}