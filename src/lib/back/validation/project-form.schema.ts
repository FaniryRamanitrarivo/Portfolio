import * as z from "zod";

const itemSchema = z.object({
    value: z.string().min(1),
});

export const projectFormSchema = z.object({
    title: z.string().min(1),

    client: z.string().optional(),

    role: z.string().min(1),

    duration: z.string().min(1),

    overview: z.string().min(1),

    category: z.string().min(1),

    description: z.string().min(1),

    image: z.string().min(1),

    github: z.string().optional(),

    link: z.string().optional(),

    popular: z.boolean(),

    responsibilities: z.array(itemSchema),

    keyResults: z.array(itemSchema),

    challenges: z.array(itemSchema),

    solutions: z.array(itemSchema),

    technologies: z.array(itemSchema),
});

export type ProjectFormSchema = z.input<typeof projectFormSchema>;