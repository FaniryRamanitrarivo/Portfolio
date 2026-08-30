import { z } from "zod";
import { ICON_KEYS } from "./icon-registry";

/**
 * Single source of truth for Skill field-level validation.
 * - The service layer / server actions use this directly.
 * - The admin form schema extends it for the { value: string }[] shape
 *   react-hook-form's useFieldArray needs.
 */
const nonEmptyString = z.string().trim().min(1);

export const skillSchema = z.object({
  title: nonEmptyString,
  icon: z.enum(ICON_KEYS),
  description: nonEmptyString,
  lists: z.array(nonEmptyString).min(1),
  isSpeciality: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const skillUpdateSchema = skillSchema.partial();

export type SkillInput = z.infer<typeof skillSchema>;
export type SkillUpdateInput = z.infer<typeof skillUpdateSchema>;
