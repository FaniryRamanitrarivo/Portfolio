import { z } from "zod";

const arrayItem = z.object({
  value: z.string().min(1),
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

  responsibilities: z.array(arrayItem),
  keyResults: z.array(arrayItem),
  challenges: z.array(arrayItem),
  solutions: z.array(arrayItem),
  technologies: z.array(arrayItem),

  popular: z.boolean(),
});

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
