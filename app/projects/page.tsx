import { PageHead } from "@/components/page-head";
import { ProjectsGrid } from "@/components/projects-grid";
import { PlotGrid } from "@/components/page-visuals";
export const metadata = { title: "Projects | Waqar Associates" };
export default async function Page({ searchParams }: { searchParams: Promise<{ sector?: string }> }) {
  const { sector } = await searchParams;
  return <><PageHead eyebrow="03 / Portfolio" visual={<PlotGrid />} title="Projects" sub="Ongoing and completed developments across Pakistan." /><section className="mx-auto max-w-7xl px-6 py-20"><ProjectsGrid initial={sector} /></section></>;
}
