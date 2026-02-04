import Footer from "@/src/components/public/footer";
import Navbar from "@/src/components/public/navbar";
import { SECTIONS } from "@/src/lib/front/constant";
import { SECTION_COMPONENTS } from "@/src/lib/front/section-components";

export default function Home() {
  return (
    <>
      <Navbar />
      {SECTIONS.map(({ id }) => {
        const SectionComponent = SECTION_COMPONENTS[id]
        return <SectionComponent key={id} />
      })}
      <Footer />
    </>
  );
}
