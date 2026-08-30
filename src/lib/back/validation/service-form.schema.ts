import * as z from "zod";
import { serviceSchema } from "@/src/lib/shared/service.schema";

const itemSchema = z.object({
    value: z.string().min(1),
});

const itemArray = z.array(itemSchema);

// Extends the shared Service schema, only overriding what the admin form
// UI needs differently: `lists` as { value }[] for useFieldArray, and
// `order` is not user-editable (server-computed / drag-and-drop only).
export const serviceFormSchema = serviceSchema
    .omit({ order: true })
    .extend({
        link: z.string().optional(),
        lists: itemArray,
    });

export type ServiceFormSchema = z.input<typeof serviceFormSchema>;
