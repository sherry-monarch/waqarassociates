"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHead } from "@/components/page-head";
import { Crosshair } from "@/components/page-visuals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const empty = { name: "", email: "", phone: "", topic: "", message: "", website: "" };
const MAX_MESSAGE = 1500;

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setForm(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

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
          {status === "sent" ? (
            <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <p className="font-display text-3xl">Message sent. We'll be in touch soon.</p>
              <Button type="button" variant="ink" onClick={() => setStatus("idle")}>Send another message</Button>
            </motion.div>
          ) : (
            <motion.form key="f" exit={{ opacity: 0, y: -12 }} onSubmit={submit} className="space-y-6">
              <Input placeholder="Full name" aria-label="Full name" required value={form.name} onChange={set("name")} />
              <Input type="email" placeholder="Email" aria-label="Email" value={form.email} onChange={set("email")} />
              <Input placeholder="Phone" aria-label="Phone" type="tel" value={form.phone} onChange={set("phone")} />
              <Input placeholder="Which project or sector?" aria-label="Project or sector" value={form.topic} onChange={set("topic")} />
              <textarea
                placeholder="Your message"
                aria-label="Your message"
                required
                rows={5}
                maxLength={MAX_MESSAGE}
                value={form.message}
                onChange={set("message")}
                className="w-full resize-y border border-ink/20 bg-transparent px-4 py-3 outline-none transition-colors placeholder:text-ink/50 focus:border-navy"
              />
              {/* Spam trap: hidden from people, bots fill it in */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={set("website")} />
              </div>
              <div className="space-y-3">
                <Button type="submit" variant="ink" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>
                {status === "error" && (
                  <p role="alert" className="text-sm text-red-700">
                    Sorry, your message didn't go through. Please try again, or email us at{" "}
                    <a href={`mailto:${site.email}`} className="break-all underline underline-offset-4">{site.email}</a>.
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}