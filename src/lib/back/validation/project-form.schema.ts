import * as z from "zod";
import { projectSchema } from "@/src/lib/shared/project.schema";

// No `.min(1)` here: the form auto-inserts one empty placeholder row into
// every empty array field on mount (see project-form.tsx), and blank rows
// are filtered out by normalizeProjectForm before submission — requiring
// non-empty values here would block saving projects with empty arrays
// (e.g. the seed project), which the shared schema explicitly allows.
const itemSchema = z.object({
    value: z.string(),
});

const itemArray = z.array(itemSchema);

// Extends the shared Project schema, only overriding what the admin form
// UI needs differently: array fields as { value }[] for useFieldArray, and
// client/github/link left as plain optional strings (no URL format check).
// `order` is not user-editable (drag-and-drop in the featured list only).
export const projectFormSchema = projectSchema.omit({ order: true }).extend({
    client: z.string().optional(),

    category: z.string().optional(),

    description: z.string().optional(),

    image: z.string().optional(),

    github: z.string().optional(),

    link: z.string().optional(),

    responsibilities: itemArray,

    keyResults: itemArray,

    challenges: itemArray,

    solutions: itemArray,

    technologies: itemArray,
});

export type ProjectFormSchema = z.input<typeof projectFormSchema>;