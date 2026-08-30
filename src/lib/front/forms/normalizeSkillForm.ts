import { SkillFormSchema } from "@/src/lib/back/validation/skill-form.schema";
import { SkillDTO } from "@/src/types/skills";

type Item = { value: string };

function normalizeArray(arr: Item[] | string[]): string[] {
  return arr.map((i) => (typeof i === "string" ? i.trim() : i.value.trim())).filter(Boolean);
}

export default function normalizeSkillForm(
  data: SkillFormSchema
): Omit<SkillDTO, "id" | "createdAt" | "updatedAt" | "order"> {
  return {
    title: data.title,
    icon: data.icon,
    description: data.description,
    lists: normalizeArray(data.lists),
    isSpeciality: data.isSpeciality ?? false,
  };
}
