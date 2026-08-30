import { ServiceFormSchema } from "@/src/lib/back/validation/service-form.schema";
import { ServiceDTO } from "@/src/types/services";

type Item = { value: string };

function normalizeArray(arr: Item[] | string[]): string[] {
  return arr.map((i) => (typeof i === "string" ? i.trim() : i.value.trim())).filter(Boolean);
}

function normalizeUrl(url?: string): string | undefined {
  const trimmed = url?.trim();
  return trimmed?.length ? trimmed : undefined;
}

export default function normalizeServiceForm(
  data: ServiceFormSchema
): Omit<ServiceDTO, "id" | "createdAt" | "updatedAt" | "order"> {
  return {
    title: data.title,
    icon: data.icon,
    description: data.description,
    lists: normalizeArray(data.lists),
    link: normalizeUrl(data.link) ?? null,
  };
}
