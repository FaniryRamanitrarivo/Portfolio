/**
 * DTO (Data Transfer Object) pour les entrées de parcours académique
 * Utilisé pour les réponses API et Server Components
 */
export type EducationDTO = {
  id: number;
  degree: string;
  school: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  highlights: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
};
