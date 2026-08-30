import { SkillDTO } from "@/src/types/skills";
import { SkillFormSchema } from "@/src/lib/back/validation/skill-form.schema";

type Item = { value: string };

function denormalizeArray(arr?: string[]): Item[] {
  if (!arr || !Array.isArray(arr)) return [];

  return arr
    .map((item) => item?.trim())
    .filter((v): v is string => Boolean(v && v.length > 0))
    .map((value) => ({ value }));
}

export default function denormalizeSkillToForm(
  skill: SkillDTO
): SkillFormSchema {
  return {
    title: skill.title ?? "",
    icon: skill.icon,
    description: skill.description ?? "",
    lists: denormalizeArray(skill.lists),
    isSpeciality: skill.isSpeciality ?? false,
  };
}
