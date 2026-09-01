/**
 * DTO (Data Transfer Object) pour les entrées de parcours professionnel
 * Utilisé pour les réponses API et Server Components
 */
export type ExperienceDTO = {
  id: number;
  role: string;
  company: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  highlights: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
};
