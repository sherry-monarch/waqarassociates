import { PageHead } from "@/components/page-head";
import { Expertise, Sectors } from "@/components/sections";
import { Layers } from "@/components/page-visuals";
export const metadata = { title: "Expertise | Waqar Associates" };
export default function Page() {
  return <><PageHead eyebrow="02 / Expertise" visual={<Layers />} title="Expertise" sub="From land to handover, with one accountable team." /><div className="pt-10 md:pt-20"><Expertise /></div><Sectors /></>;
}