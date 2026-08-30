import { z } from "zod";
import { ICON_KEYS } from "./icon-registry";

/**
 * Single source of truth for Service field-level validation.
 * - The service layer / server actions use this directly.
 * - The admin form schema extends it for the { value: string }[] shape
 *   react-hook-form's useFieldArray needs.
 */
const nonEmptyString = z.string().trim().min(1);

export const serviceSchema = z.object({
  title: nonEmptyString,
  icon: z.enum(ICON_KEYS),
  description: nonEmptyString,
  lists: z.array(nonEmptyString).min(1),
  link: z.string().trim().nullable().optional(),
  order: z.number().int().default(0),
});

export const serviceUpdateSchema = serviceSchema.partial();

export type ServiceInput = z.infer<typeof serviceSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
