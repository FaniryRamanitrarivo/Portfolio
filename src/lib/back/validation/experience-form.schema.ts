import * as z from "zod";
import { experienceSchema } from "@/src/lib/shared/experience.schema";

// No `.min(1)` here: the form auto-inserts one empty placeholder row into
// every empty array field on mount (see experience-form.tsx), and blank
// rows are filtered out by normalizeExperienceForm before submission.
const itemSchema = z.object({
    value: z.string(),
});

const itemArray = z.array(itemSchema);

// Extends the shared Experience schema, only overriding what the admin form
// UI needs differently: dates as real `Date` objects (picked via the
// DatePicker component, never typed manually), an `ongoing` checkbox to
// toggle endDate on/off, and `highlights` as { value }[] for useFieldArray.
// `order` is not user-editable (drag-and-drop in the list only).
export const experienceFormSchema = experienceSchema.omit({ order: true }).extend({
    location: z.string().optional(),

    description: z.string().optional(),

    startDate: z.date({ error: "Start date is required" }),

    endDate: z.date().nullable().optional(),

    ongoing: z.boolean().optional(),

    highlights: itemArray,
});

export type ExperienceFormSchema = z.input<typeof experienceFormSchema>;
