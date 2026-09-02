import { EducationFormSchema } from "@/src/lib/back/validation/education-form.schema";
import { EducationDTO } from "@/src/types/education";

type Item = { value: string };

// Transforme FieldArray { value: string }[] → string[]
function normalizeArray(arr: Item[] | string[]): string[] {
  return arr.map((i) => (typeof i === "string" ? i.trim() : i.value.trim())).filter(Boolean);
}

// Transforme champ optionnel vide → null (toujours non-undefined pour ton type Education)
function normalizeOptional(value?: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed?.length ? trimmed : null;
}

// Normalise FormSchema → Education (prêt à envoyer à l'API ou DB)
export default function normalizeEducationForm(
  data: EducationFormSchema
): Omit<EducationDTO, "id" | "createdAt" | "updatedAt" | "order"> {
  return {
    degree: data.degree,
    school: data.school,
    location: normalizeOptional(data.location),
    startDate: data.startDate,
    endDate: data.ongoing ? null : (data.endDate ?? null),
    description: normalizeOptional(data.description),
    highlights: normalizeArray(data.highlights),
  };
}
