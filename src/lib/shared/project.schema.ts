import { z } from "zod";

/**
 * Single source of truth for Project field-level validation.
 * - The API route schema (src/app/api/projects/schema.ts) uses this directly.
 * - The admin form schema (src/lib/back/validation/project-form.schema.ts)
 *   extends it, swapping the array fields for the { value: string }[] shape
 *   react-hook-form's useFieldArray needs.
 * Adding/renaming a scalar field only needs to happen here.
 */
const nonEmptyString = z.string().trim().min(1);

export const projectSchema = z.object({
  title: nonEmptyString,
  role: nonEmptyString,
  client: z.string().trim().min(1).nullable().optional(),
  duration: nonEmptyString,
  overview: nonEmptyString,
  category: nonEmptyString,
  description: nonEmptyString,
  image: nonEmptyString,
  github: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  responsibilities: z.array(nonEmptyString).min(1),
  keyResults: z.array(nonEmptyString).min(1),
  challenges: z.array(nonEmptyString).min(1),
  solutions: z.array(nonEmptyString).min(1),
  technologies: z.array(nonEmptyString).min(1),
  popular: z.boolean().default(false),
});

export const projectUpdateSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
