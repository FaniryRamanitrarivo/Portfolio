import { z } from "zod";

/**
 * Single source of truth for Education field-level validation.
 * - The service layer / server actions use this directly.
 * - The admin form schema extends it, swapping the date fields for the
 *   "YYYY-MM" strings an <input type="month"> produces and `highlights`
 *   for the { value: string }[] shape react-hook-form's useFieldArray needs.
 */
const nonEmptyString = z.string().trim().min(1);

export const educationSchema = z.object({
  degree: nonEmptyString,
  school: nonEmptyString,
  location: z.string().trim().min(1).nullable().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  description: z.string().trim().min(1).nullable().optional(),
  highlights: z.array(nonEmptyString).default([]),
  order: z.number().int().default(0),
});

export const educationUpdateSchema = educationSchema.partial();

export type EducationInput = z.infer<typeof educationSchema>;
export type EducationUpdateInput = z.infer<typeof educationUpdateSchema>;
