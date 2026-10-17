import { PageHead } from "@/components/page-head";
import { Intro, Now } from "@/components/sections";
import { Process } from "@/components/process";
import { Leadership } from "@/components/leadership";
import { Contours } from "@/components/page-visuals";
export const metadata = { title: "Company | Waqar Associates" };
export default function About() {
  return (
    <>
      <PageHead eyebrow="01 / Company" visual={<Contours />} title="Company" sub="Urban developers and town planners, working across Pakistan since 1991." />
      <Intro /><Process /><Leadership /><Now />
    </>
  );
}