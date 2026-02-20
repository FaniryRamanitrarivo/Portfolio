import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";

type Item = { value: string };

function normalizeArray(arr: (Item | string)[]): string[] {
  return arr
    .map((item) =>
      typeof item === "string"
        ? item.trim()
        : item.value.trim()
    )
    .filter((v) => v.length > 0);
}

function normalizeUrl(url?: string) {
  if (!url || url.trim() === "") return undefined;
  return url.trim();
}

export default function normalizeProjectForm(data: ProjectFormSchema) {
  return {
    ...data,

    github: normalizeUrl(data.github),
    link: normalizeUrl(data.link),

    responsibilities: normalizeArray(data.responsibilities),
    keyResults: normalizeArray(data.keyResults),
    challenges: normalizeArray(data.challenges),
    solutions: normalizeArray(data.solutions),
    technologies: normalizeArray(data.technologies),
  };
}