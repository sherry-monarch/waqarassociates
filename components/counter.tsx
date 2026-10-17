"use client";
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
export function Counter({ to, suffix = "", plain }: { to: number; suffix?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null), seen = useInView(ref, { once: true, margin: "-20%" });
  useEffect(() => {
    if (!seen || !ref.current) return;
    const c = animate(plain ? 1950 : 0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = (plain ? Math.round(v) : Math.round(v).toLocaleString()) + suffix; } });
    return () => c.stop();
  }, [seen, to, suffix, plain]);
  return <span ref={ref}>{plain ? 1950 : 0}{suffix}</span>;
}
