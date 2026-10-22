"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type ProjectCarouselProps = {
  images: string[];
  /** Alt text for every slide. Use "" for purely decorative heroes. */
  alt?: string;
  /** Milliseconds between automatic slides. */
  interval?: number;
};

/**
 * Crossfading hero carousel. Fills its nearest positioned parent,
 * exactly like a single <Image fill />, so it drops into PageHead's `visual`
 * prop or any `relative` container.
 */
export function ProjectCarousel({ images, alt = "", interval = 5500 }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = images.length;

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(t);
  }, [count, paused, reduceMotion, interval]);

  if (count === 0) return null;

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photo carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      {images.map((src, n) => (
        <div
          key={src}
          role="group"
          aria-roledescription="slide"
          aria-label={`${n + 1} of ${count}`}
          aria-hidden={n !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${n === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={n === 0}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      ))}

      {count > 1 && (
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3 rounded-full bg-ink/50 px-3 py-2 backdrop-blur-sm">
          <button type="button" aria-label="Previous photo" onClick={() => go(index - 1)} className="grid h-6 w-6 place-items-center text-paper">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3 5 8l5 5" /></svg>
          </button>
          <div className="flex gap-1.5">
            {images.map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`Show photo ${n + 1}`}
                aria-current={n === index}
                onClick={() => go(n)}
                className={`h-1.5 rounded-full bg-paper transition-all ${n === index ? "w-5" : "w-1.5 opacity-50"}`}
              />
            ))}
          </div>
          <button type="button" aria-label="Next photo" onClick={() => go(index + 1)} className="grid h-6 w-6 place-items-center text-paper">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 3 5 5-5 5" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}