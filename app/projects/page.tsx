import Image from "next/image";
import { PageHead } from "@/components/page-head";
import { ProjectsGrid } from "@/components/projects-grid";
export const metadata = { title: "Projects | Waqar Associates" };
export default async function Page({ searchParams }: { searchParams: Promise<{ sector?: string }> }) {
  const { sector } = await searchParams;
  return (
    <>
      <PageHead
        eyebrow="03 / Portfolio"
        visual={<Image src="/projects-hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />}
        title="Projects"
        sub="Ongoing and completed developments across Pakistan."
      />
      <section className="mx-auto max-w-7xl px-6 py-20"><ProjectsGrid initial={sector} /></section>
    </>
  );
}
// import { PageHead } from "@/components/page-head";
// import { ProjectsGrid } from "@/components/projects-grid";
// export const metadata = { title: "Projects | Waqar Associates" };
// export default async function Page({ searchParams }: { searchParams: Promise<{ sector?: string }> }) {
//   const { sector } = await searchParams;
//   return <><PageHead eyebrow="03 / Portfolio" title="Projects" sub="Ongoing and completed developments across Pakistan." /><section className="mx-auto max-w-7xl px-6 py-20"><ProjectsGrid initial={sector} /></section></>;
// }