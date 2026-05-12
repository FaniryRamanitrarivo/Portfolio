/**
 * DTO (Data Transfer Object) pour les projets
 * Utilisé pour les réponses API et Server Components
 */
export type ProjectDTO = {
  id: number;
  title: string;
  role: string;
  client: string | null;
  duration: string;
  overview: string;
  category: string | null;
  description: string | null;
  image: string | null;
  github: string | null;
  link: string | null;
  responsibilities: string[];
  keyResults: string[];
  challenges: string[];
  solutions: string[];
  technologies: string[];
  popular: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Type alias pour compatibilité avec le code existant
 */
export type Project = ProjectDTO;
