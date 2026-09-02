import { ExperienceDTO } from "@/src/types/experience";
import { ExperienceFormSchema } from "@/src/lib/back/validation/experience-form.schema";

type Item = { value: string };

function denormalizeArray(arr?: string[]): Item[] {
  if (!arr || !Array.isArray(arr)) return [];

  return arr
    .map((item) => item?.trim())
    .filter((v): v is string => Boolean(v && v.length > 0))
    .map((value) => ({ value }));
}

export default function denormalizeExperienceToForm(
  entry: ExperienceDTO
): ExperienceFormSchema {
  return {
    role: entry.role ?? "",
    company: entry.company ?? "",
    location: entry.location ?? "",
    startDate: entry.startDate,
    endDate: entry.endDate,
    ongoing: entry.endDate === null,
    description: entry.description ?? "",

    highlights: denormalizeArray(entry.highlights),
  };
}
