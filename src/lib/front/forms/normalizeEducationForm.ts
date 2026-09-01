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

// Transforme "YYYY-MM" (input type="month") → Date (1er jour du mois, en heure locale)
function parseMonthInput(value: string): Date {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

// Normalise FormSchema → Education (prêt à envoyer à l'API ou DB)
export default function normalizeEducationForm(
  data: EducationFormSchema
): Omit<EducationDTO, "id" | "createdAt" | "updatedAt" | "order"> {
  return {
    degree: data.degree,
    school: data.school,
    location: normalizeOptional(data.location),
    startDate: parseMonthInput(data.startDate),
    endDate: data.ongoing || !data.endDate ? null : parseMonthInput(data.endDate),
    description: normalizeOptional(data.description),
    highlights: normalizeArray(data.highlights),
  };
}
