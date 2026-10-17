"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHead } from "@/components/page-head";
import { Crosshair } from "@/components/page-visuals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHead eyebrow="04 / Contact" visual={<Crosshair />} title="Contact" sub="Tell us what you're looking for and we'll reply within two working days." />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-12 md:py-20 md:grid-cols-2">
        <div className="space-y-8">
          <div><p className="text-sm uppercase tracking-[0.2em] text-navy">Office</p><p className="mt-2 text-lg">{site.address}</p></div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-navy">Phone</p>
            {site.phone.split(" / ").map((n) => (
              <a key={n} href={`tel:${n.replace(/\s/g, "")}`} className="mt-2 block text-lg transition-colors hover:text-navy">{n}</a>
            ))}
          </div>
          <div><p className="text-sm uppercase tracking-[0.2em] text-navy">Email</p><a href={`mailto:${site.email}`} className="mt-2 block break-all text-lg transition-colors hover:text-navy">{site.email}</a></div>
        </div>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.p key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl">Message sent. We'll be in touch soon.</motion.p>
          ) : (
            <motion.div key="f" exit={{ opacity: 0, y: -12 }} className="space-y-6">
              <Input placeholder="Full name" aria-label="Full name" /><Input type="email" placeholder="Email" aria-label="Email" /><Input placeholder="Phone" aria-label="Phone" />
              <Input placeholder="Which project or sector?" aria-label="Project or sector" />
              <Button variant="ink" onClick={() => setSent(true)}>Send message</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}