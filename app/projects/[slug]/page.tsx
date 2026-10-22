import Link from "next/link";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/placeholder";
import { PageHead } from "@/components/page-head";
import { ProjectCard } from "@/components/project-card";
import { ProjectCarousel } from "@/components/project-carousel";
import { projects } from "@/lib/site";
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = projects[i], more = projects.filter((x) => x.slug !== slug).slice(0, 3);
  // Main image first, then the gallery, without duplicates
  const heroImages = [...new Set([p.image, ...(p.gallery ?? [])].filter((s): s is string => !!s))];
  return (
    <>
      <PageHead eyebrow={p.status ? `${p.sector} / ${p.status}` : p.sector} title={p.name} sub={p.location} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        {heroImages.length > 0 ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink md:aspect-[16/8]">
            <ProjectCarousel images={heroImages} alt={p.name} />
          </div>
        ) : (
          <Placeholder i={i} className="aspect-[16/8] w-full" />
        )}
        <div className="mt-8 md:mt-14 grid gap-12 md:grid-cols-[2fr_1fr]">
          <p className="font-display text-2xl leading-snug md:text-3xl">
            {p.description ?? p.blurb ?? "Project details will be added soon."}
          </p>
          <dl className="space-y-5 text-sm">
            {([["Category", p.sector], ["Location", p.location], ["Status", p.status], ["Completion", p.year], ["Size", p.area], ["Scope", p.units]] as const).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-ink/15 pb-3"><dt className="text-ink/60">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
        </div>
        <Link href="/contact" className="mt-12 inline-block rounded-full bg-ink px-7 py-3 text-sm text-paper hover:bg-navy">Enquire about this project</Link>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-28">
        <h2 className="font-display text-3xl font-semibold">More projects</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">{more.map((m) => <ProjectCard key={m.slug} p={m} i={projects.indexOf(m)} />)}</div>
      </section>
    </>
  );
}