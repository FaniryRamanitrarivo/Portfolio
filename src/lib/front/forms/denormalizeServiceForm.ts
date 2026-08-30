import { ServiceDTO } from "@/src/types/services";
import { ServiceFormSchema } from "@/src/lib/back/validation/service-form.schema";

type Item = { value: string };

function denormalizeArray(arr?: string[]): Item[] {
  if (!arr || !Array.isArray(arr)) return [];

  return arr
    .map((item) => item?.trim())
    .filter((v): v is string => Boolean(v && v.length > 0))
    .map((value) => ({ value }));
}

export default function denormalizeServiceToForm(
  service: ServiceDTO
): ServiceFormSchema {
  return {
    title: service.title ?? "",
    icon: service.icon,
    description: service.description ?? "",
    lists: denormalizeArray(service.lists),
    link: service.link ?? "",
  };
}
