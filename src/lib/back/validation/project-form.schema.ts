import * as z from "zod";
import { projectSchema } from "@/src/lib/shared/project.schema";

const itemSchema = z.object({
    value: z.string().min(1),
});

const itemArray = z.array(itemSchema);

// Extends the shared Project schema, only overriding what the admin form
// UI needs differently: array fields as { value }[] for useFieldArray, and
// client/github/link left as plain optional strings (no URL format check).
export const projectFormSchema = projectSchema.extend({
    client: z.string().optional(),

    github: z.string().optional(),

    link: z.string().optional(),

    responsibilities: itemArray,

    keyResults: itemArray,

    challenges: itemArray,

    solutions: itemArray,

    technologies: itemArray,
});

export type ProjectFormSchema = z.input<typeof projectFormSchema>;