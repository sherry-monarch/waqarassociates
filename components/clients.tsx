import { clients, type Client } from "@/lib/clients";

function Logo({ c }: { c: Client }) {
  return (
    <div className="flex h-20 w-full items-center justify-center px-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 md:h-24 md:w-56 md:px-0" title={c.name}>
      {c.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.logo} alt={c.name} className="h-full w-full object-contain" />
      ) : (
        <div className="flex items-center gap-3 text-navy">
          <span className="grid size-10 place-items-center rounded-xl bg-navy md:size-12 text-paper">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 15l5-5 4 4 3-3 4 4" /></svg>
          </span>
          <span className="font-display text-base font-semibold md:text-xl">{c.name}</span>
        </div>
      )}
    </div>
  );
}

export function Clients() {
  return (
    <section className="overflow-hidden bg-paper py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-navy"><span className="h-px w-10 bg-gold" />Our clients</p>
        <h2 className="mt-5 font-display text-4xl font-semibold md:text-6xl">Who we've built for</h2>
      </div>
      <div className="group/m mt-6 py-4 [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)] md:[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center group-hover/m:[animation-play-state:paused] motion-reduce:animate-none">
          {[...clients, ...clients].map((c, i) => (
            <li key={i} className="w-[50vw] shrink-0 md:mx-10 md:w-auto" aria-hidden={i >= clients.length}><Logo c={c} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}