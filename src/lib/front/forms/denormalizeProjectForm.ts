import { Project } from "@/src/types/projects";
import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";

type Item = { value: string };

function denormalizeArray(arr?: string[]): Item[] {
  if (!arr || !Array.isArray(arr)) return [];

  return arr
    .map((item) => item?.trim())
    .filter((v): v is string => Boolean(v && v.length > 0))
    .map((value) => ({ value }));
}

export default function denormalizeProjectToForm(
  project: Project
): ProjectFormSchema {
  return {
    title: project.title ?? "",
    role: project.role ?? "",
    duration: project.duration ?? "",
    overview: project.overview ?? "",
    category: project.category ?? "",
    description: project.description ?? "",
    image: project.image ?? "",

    github: project.github ?? "",
    link: project.link ?? "",

    responsibilities: denormalizeArray(project.responsibilities),
    keyResults: denormalizeArray(project.keyResults),
    challenges: denormalizeArray(project.challenges),
    solutions: denormalizeArray(project.solutions),
    technologies: denormalizeArray(project.technologies),

    popular: project.popular ?? false,
  };
}