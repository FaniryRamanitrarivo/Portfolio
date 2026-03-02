export type Project = {
  id: number;
  title: string;
  role: string;
  client?: string | null;
  duration: string;
  overview: string;
  category?: string;
  description?: string;
  image?: string;
  github?: string;
  link?: string;
  responsibilities: string[];
  keyResults: string[];
  challenges: string[];
  solutions: string[];
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
  popular?:boolean
};
