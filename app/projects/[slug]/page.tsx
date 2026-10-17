import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/placeholder";
import { PageHead } from "@/components/page-head";
import { PlotGrid } from "@/components/page-visuals";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/site";
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = projects[i], more = projects.filter((x) => x.slug !== slug).slice(0, 3);
  return (
    <>
      <PageHead eyebrow={p.status ? `${p.sector} / ${p.status}` : p.sector} visual={<PlotGrid />} title={p.name} sub={p.location} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        {p.image ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink md:aspect-[16/8]">
            <Image src={p.image} alt={p.name} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          </div>
        ) : (
          <Placeholder i={i} className="aspect-[16/8] w-full" />
        )}
        <div className="mt-8 md:mt-14 grid gap-12 md:grid-cols-[2fr_1fr]">
          <p className="font-display text-2xl leading-snug md:text-3xl">{p.blurb ?? "Project details will be added soon."}</p>
          <dl className="space-y-5 text-sm">
            {([["Category", p.sector], ["Location", p.location], ["Status", p.status], ["Completion", p.year], ["Size", p.area], ["Scope", p.units]] as const).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-ink/15 pb-3"><dt className="text-ink/60">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
        </div>
        <Link href="/contact" className="mt-12 inline-block rounded-full bg-ink px-7 py-3 text-sm text-paper hover:bg-navy">Enquire about this project</Link>
      </section>
      {p.gallery && p.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-20">
          <h2 className="font-display text-3xl font-semibold">Gallery</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {p.gallery.map((src, n) => (
              <div key={src} className="group relative aspect-[4/3] overflow-hidden bg-ink">
                <Image src={src} alt={`${p.name} photo ${n + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-28">
        <h2 className="font-display text-3xl font-semibold">More projects</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">{more.map((m) => <ProjectCard key={m.slug} p={m} i={projects.indexOf(m)} />)}</div>
      </section>
    </>
  );
}