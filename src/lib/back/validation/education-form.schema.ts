import * as z from "zod";
import { educationSchema } from "@/src/lib/shared/education.schema";

// No `.min(1)` here: the form auto-inserts one empty placeholder row into
// every empty array field on mount (see education-form.tsx), and blank
// rows are filtered out by normalizeEducationForm before submission.
const itemSchema = z.object({
    value: z.string(),
});

const itemArray = z.array(itemSchema);

// Extends the shared Education schema, only overriding what the admin form
// UI needs differently: dates as "YYYY-MM" strings for <input type="month">,
// an `ongoing` checkbox to toggle endDate on/off, and `highlights` as
// { value }[] for useFieldArray. `order` is not user-editable (drag-and-drop
// in the list only).
export const educationFormSchema = educationSchema.omit({ order: true }).extend({
    location: z.string().optional(),

    description: z.string().optional(),

    startDate: z.string().min(1, "Start date is required"),

    endDate: z.string().optional(),

    ongoing: z.boolean().optional(),

    highlights: itemArray,
});

export type EducationFormSchema = z.input<typeof educationFormSchema>;
