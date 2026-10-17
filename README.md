# Waqar Associates website

Next.js 15 (App Router) + Tailwind 3 + Framer Motion + React Three Fiber + Lenis. UI primitives follow shadcn/ui conventions.

    npm install
    npm run dev

- All placeholder copy and projects: `lib/site.ts`
- 3D hero master-plan scene: `components/plan-scene.tsx`
- Colours: `tailwind.config.ts` (ink, navy, paper, sky, gold)
- Add more shadcn components: `npx shadcn@latest add <name>` (components.json is configured)

## Client logos (marquee)
Put PNG/SVG logos with transparent backgrounds in `public/clients/`, then list them in `lib/clients.ts`.
They render navy blue and switch to full colour on hover; the marquee pauses while the row is hovered.

## Placeholder content to replace
Stats (projects delivered, acres), the six projects, phone, email and address in `lib/site.ts`, and the leadership bios (`bio` field).
