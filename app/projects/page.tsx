import { PageHead } from "@/components/page-head";
import { ProjectsGrid } from "@/components/projects-grid";
import { ProjectCarousel } from "@/components/project-carousel";
import { projects } from "@/lib/site";
export const metadata = { title: "Projects | Waqar Associates" };
export default async function Page({ searchParams }: { searchParams: Promise<{ sector?: string }> }) {
  const { sector } = await searchParams;
  // Original hero first, then up to 4 project photos
  const heroImages = ["/projects-hero.png", ...projects.map((p) => p.image).filter((s): s is string => !!s).slice(0, 4)];
  return (
    <>
      <PageHead
        eyebrow="03 / Portfolio"
        visual={<ProjectCarousel images={heroImages} />}
        title="Projects"
        sub="Ongoing and completed developments across Pakistan."
      />
      <section className="mx-auto max-w-7xl px-6 py-20"><ProjectsGrid initial={sector} /></section>
    </>
  );
}