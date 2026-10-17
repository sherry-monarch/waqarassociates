import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#0B1533", navy: "#1B2A6B", paper: "#F3F4F8", sky: "#C9D1EC", gold: "#EAC22E" },
    keyframes: { marquee: { to: { transform: "translateX(-50%)" } } },
    animation: { marquee: "marquee 45s linear infinite" },
    fontFamily: { display: ["var(--font-display)"], sans: ["var(--font-body)"] },
  } },
  plugins: [],
} satisfies Config;
