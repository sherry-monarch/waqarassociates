import Link from "next/link";
import Image from "next/image";
import { FOUNDED, nav, site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-10 pt-14 md:pt-24 text-paper">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-none tracking-tight">Let's build<br />something lasting.</p>
        <div className="mt-10 md:mt-16 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-3">
          <div><div className="flex items-center gap-3"><Image src="/logo.png" alt="" width={44} height={33} className="h-9 w-auto" /><div className="leading-none"><p className="font-display text-xl">{site.name}</p><p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-gold">Since {FOUNDED}</p></div></div><p className="mt-3 max-w-xs text-sm text-paper/60">{site.address}</p></div>
          <ul className="space-y-2 text-sm">{nav.map((n) => <li key={n.href}><Link className="hover:text-gold" href={n.href}>{n.label}</Link></li>)}</ul>
          <div className="space-y-2 text-sm"><p>{site.email}</p>{site.phone.split(" / ").map((n) => <p key={n}>{n}</p>)}</div>
        </div>
        <p className="mt-10 md:mt-16 text-xs text-paper/50">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}