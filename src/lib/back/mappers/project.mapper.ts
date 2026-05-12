import { Project } from "@prisma/client";

export type ProjectDTO = {
  id: number;
  title: string;
  role: string;
  client?: string;
  duration: string;
  overview: string;
  category?: string;
  description?: string;
  image?: string;
  github?: string;
  link?: string;
  responsibilities?: any;
  keyResults?: any;
  challenges?: any;
  solutions?: any;
  technologies?: any;
  popular: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function toProjectDTO(p: Project): ProjectDTO {
  return {
    ...p,
    client: p.client ?? undefined,
    category: p.category ?? undefined,
    description: p.description ?? undefined,
    image: p.image ?? undefined,
    github: p.github ?? undefined,
    link: p.link ?? undefined,
  };
}