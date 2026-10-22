"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type CarouselProps = {
  children: ReactNode;
  /** Tailwind width classes for each slide. Controls how many show at once. */
  slideClassName?: string;
  /** Accessible name for the carousel region */
  label?: string;
  className?: string;
};

/**
 * Dependency-free carousel built on CSS scroll-snap.
 * Touch/trackpad swipe works natively; arrows, dots and arrow keys are added on top.
 */
export function Carousel({
  children,
  slideClassName = "basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]",
  label = "Carousel",
  className = "",
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const slides = Children.toArray(children);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
    setIndex(Math.round(el.scrollLeft / step));
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, slides.length]);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (!el || !target) return;
    el.scrollTo({ left: target.offsetLeft - (el.children[0] as HTMLElement).offsetLeft, behavior: "smooth" });
  };

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={`relative ${className}`}
    >
      <div
        ref={trackRef}
        tabIndex={0}
        onScroll={update}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); scrollByPage(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); scrollByPage(-1); }
        }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-current motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={`shrink-0 grow-0 snap-start ${slideClassName}`}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-current" : "w-2 bg-current opacity-30"}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            disabled={!canPrev}
            onClick={() => scrollByPage(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-current disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3 5 8l5 5" /></svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={!canNext}
            onClick={() => scrollByPage(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-current disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 3 5 5-5 5" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}