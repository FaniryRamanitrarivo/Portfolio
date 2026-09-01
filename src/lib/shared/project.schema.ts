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
const optionalUrl = z.string().trim().url().nullable().optional();

export const projectSchema = z.object({
  title: nonEmptyString,
  role: nonEmptyString,
  client: z.string().trim().min(1).nullable().optional(),
  duration: nonEmptyString,
  overview: nonEmptyString,
  category: z.string().trim().min(1).nullable().optional(),
  description: z.string().trim().min(1).nullable().optional(),
  image: z.string().trim().min(1).nullable().optional(),
  github: optionalUrl,
  link: optionalUrl,
  responsibilities: z.array(nonEmptyString).default([]),
  keyResults: z.array(nonEmptyString).default([]),
  challenges: z.array(nonEmptyString).default([]),
  solutions: z.array(nonEmptyString).default([]),
  technologies: z.array(nonEmptyString).default([]),
  popular: z.boolean().default(false),
  order: z.number().int().default(0),
  comingSoon: z.boolean().default(false),
});

export const projectUpdateSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
