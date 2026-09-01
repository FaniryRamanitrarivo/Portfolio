import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { Project } from "@/src/types/projects";

type Item = { value: string };

// Transforme FieldArray { value: string }[] → string[]
function normalizeArray(arr: Item[] | string[]): string[] {
  return arr.map((i) => (typeof i === "string" ? i.trim() : i.value.trim())).filter(Boolean);
}

// Transforme champ optionnel vide → null (toujours non-undefined pour ton type Project)
function normalizeOptional(value?: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed?.length ? trimmed : null;
}

// Normalise FormSchema → Project (prêt à envoyer à l’API ou DB)
export default function normalizeProjectForm(data: ProjectFormSchema): Omit<Project, "id" | "createdAt" | "updatedAt" | "order"> {
  return {
    title: data.title,
    role: data.role,
    duration: data.duration,
    overview: data.overview,
    category: normalizeOptional(data.category),
    description: normalizeOptional(data.description),
    image: normalizeOptional(data.image),
    client: normalizeOptional(data.client),

    github: normalizeOptional(data.github), // ⚡ null si vide
    link: normalizeOptional(data.link),     // ⚡ null si vide

    responsibilities: normalizeArray(data.responsibilities),
    keyResults: normalizeArray(data.keyResults),
    challenges: normalizeArray(data.challenges),
    solutions: normalizeArray(data.solutions),
    technologies: normalizeArray(data.technologies),

    popular: data.popular ?? false,
    comingSoon: data.comingSoon ?? false,
  };
}