import { z } from "zod";

const itemSchema = z.object({
  value: z.string().min(1, "Ce champ ne peut pas être vide"),
});

export const projectFormSchema = z.object({
  title: z.string().min(2),
  role: z.string().min(2),
  client: z.string().min(2).optional(),
  duration: z.string(),
  overview: z.string().min(10),
  category: z.string(),
  description: z.string(),
  image: z.string().url(),
  github: z.string().url().optional(),
  link: z.string().url().optional(),

  responsibilities: z.array(itemSchema).min(1),
  keyResults: z.array(itemSchema).min(1),
  challenges: z.array(itemSchema).min(1),
  solutions: z.array(itemSchema).min(1),
  technologies: z.array(itemSchema).min(1),

  popular: z.boolean(),
});

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
