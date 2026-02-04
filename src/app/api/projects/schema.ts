import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),
  role: z.string().min(1),
  client: z.string().min(1),
  duration: z.string().min(1),
  overview: z.string().min(1),
  category: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  github: z.string().url().optional(),
  link: z.string().url().optional(),
  responsibilities: z.array(z.string()).min(1),
  keyResults: z.array(z.string()).min(1),
  challenges: z.array(z.string()).min(1),
  solutions: z.array(z.string()).min(1),
  technologies: z.array(z.string()).min(1),
  popular: z.boolean().optional(), 
});

export const projectUpdateSchema = projectSchema.partial(); // pour PUT
export type CreateProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = z.infer<typeof projectUpdateSchema>;
