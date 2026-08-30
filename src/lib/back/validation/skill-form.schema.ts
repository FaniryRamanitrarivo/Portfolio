import * as z from "zod";
import { skillSchema } from "@/src/lib/shared/skill.schema";

const itemSchema = z.object({
    value: z.string().min(1),
});

const itemArray = z.array(itemSchema);

// Extends the shared Skill schema, only overriding what the admin form
// UI needs differently: `lists` as { value }[] for useFieldArray, and
// `order` is not user-editable (server-computed / drag-and-drop only).
export const skillFormSchema = skillSchema
    .omit({ order: true })
    .extend({
        lists: itemArray,
    });

export type SkillFormSchema = z.input<typeof skillFormSchema>;
