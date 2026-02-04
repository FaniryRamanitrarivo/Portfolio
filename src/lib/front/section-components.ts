import Hero from "@/src/components/public/hero";
import About from "@/src/components/public/about";
import Services from "@/src/components/services";
import Skills from "@/src/components/skills";
import Project from "@/src/components/public/project";
import Contact from "@/src/components/public/contact";
import { SectionId } from "./constant";

export const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  hero: Hero,
  about: About,
  services: Services,
  skills: Skills,
  projects: Project,
  contact: Contact,
}
