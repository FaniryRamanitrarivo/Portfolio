import { EducationDTO } from "@/src/types/education";
import { EducationFormSchema } from "@/src/lib/back/validation/education-form.schema";

type Item = { value: string };

function denormalizeArray(arr?: string[]): Item[] {
  if (!arr || !Array.isArray(arr)) return [];

  return arr
    .map((item) => item?.trim())
    .filter((v): v is string => Boolean(v && v.length > 0))
    .map((value) => ({ value }));
}

export default function denormalizeEducationToForm(
  entry: EducationDTO
): EducationFormSchema {
  return {
    degree: entry.degree ?? "",
    school: entry.school ?? "",
    location: entry.location ?? "",
    startDate: entry.startDate,
    endDate: entry.endDate,
    ongoing: entry.endDate === null,
    description: entry.description ?? "",

    highlights: denormalizeArray(entry.highlights),
  };
}
