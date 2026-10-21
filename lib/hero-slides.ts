export type Slide = { type: "image" | "video"; src?: string; poster?: string; alt: string };

// How long each slide shows (milliseconds).
export const SLIDE_MS = 6000;

// HOW TO ADD YOUR OWN: put files in /public/hero and set `src`, e.g.
//   { type: "image", src: "/hero/motorway.jpg", alt: "Sialkot-Lahore Motorway" }
//   { type: "video", src: "/hero/site.mp4", poster: "/hero/site.jpg", alt: "Site works" }
// A slide without `src` shows a placeholder. Add or remove slides freely.
// Videos play muted and are cut off at SLIDE_MS, so keep clips short (under 1080p, a few MB).
export const slides: Slide[] = [
  { type: "video", src: "/hero/hero-1.mp4", alt: "Town Planning" },
  { type: "video", src: "/hero/hero_2.mp4", alt: "Commercial Building" },
  { type: "image", src: "/hero/hero_3.webp", alt: "Town Planning" },
  { type: "image", src: "/hero/hero_4.webp", alt: "Town Planning" },
];