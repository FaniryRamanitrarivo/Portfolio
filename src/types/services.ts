import type { IconKey } from "@/src/lib/shared/icon-registry";

/**
 * DTO (Data Transfer Object) pour les services
 * Utilisé pour les réponses API et Server Components
 */
export type ServiceDTO = {
  id: number;
  title: string;
  icon: IconKey;
  description: string;
  lists: string[];
  link: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};
