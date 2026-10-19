"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Leadership() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-28">
      <h2 className="font-display text-4xl font-semibold md:text-6xl">Leadership</h2>
      <div className="mt-8 grid gap-10 md:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {site.leadership.map((p, i) => (
          <article key={p.role} className="group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, delay: i * 0.08, ease }}
              className="relative aspect-[4/5] overflow-hidden bg-ink"
            >
              {p.photo ? (
                <Image
                  src={p.photo}
                  alt={`${p.name}, ${p.role}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center" role="img" aria-label={`Photo placeholder for ${p.role}`}>
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(90deg,#EAC22E33 1px,transparent 1px),linear-gradient(0deg,#EAC22E33 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                  <UserRound className="relative size-24 text-gold/80" strokeWidth={1.2} />
                </div>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease }}
            >
              <p className="mt-6 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-navy">
                <span className="h-px w-8 bg-gold" />{p.role}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">{p.name}</h3>
              <p className="mt-4 leading-relaxed text-ink/75">
                {p.bio || <span className="text-ink/40">Description to be added.</span>}
              </p>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  );
}