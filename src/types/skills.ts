import type { IconKey } from "@/src/lib/shared/icon-registry";

/**
 * DTO (Data Transfer Object) pour les skills
 * Utilisé pour les réponses API et Server Components
 */
export type SkillDTO = {
  id: number;
  title: string;
  icon: IconKey;
  description: string;
  lists: string[];
  isSpeciality: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};
