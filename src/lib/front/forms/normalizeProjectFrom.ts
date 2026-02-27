import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { Project } from "@/src/types/projects";

type Item = { value: string };

// Transforme FieldArray { value: string }[] → string[]
function normalizeArray(arr: Item[] | string[]): string[] {
  return arr.map((i) => (typeof i === "string" ? i.trim() : i.value.trim())).filter(Boolean);
}

// Transforme url facultative → string (toujours non-null pour ton type Project)
function normalizeUrl(url?: string): string {
  return url?.trim() || "";
}

// Normalise FormSchema → Project (prêt à envoyer à l’API ou DB)
export default function normalizeProjectForm(data: ProjectFormSchema): Omit<Project, "id" | "createdAt" | "updatedAt"> {
  return {
    title: data.title,
    role: data.role,
    duration: data.duration,
    overview: data.overview,
    category: data.category || "",
    description: data.description || "",
    image: data.image || "",
    client: data.client || "",

    github: normalizeUrl(data.github),
    link: normalizeUrl(data.link),

    responsibilities: normalizeArray(data.responsibilities),
    keyResults: normalizeArray(data.keyResults),
    challenges: normalizeArray(data.challenges),
    solutions: normalizeArray(data.solutions),
    technologies: normalizeArray(data.technologies),

    popular: data.popular ?? false,
  };
}