import { Project } from "@/src/types/projects";
import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";

/**
 * Options de cache NextJS
 */
export type CacheConfig = {
  revalidate: number;
  tags: string[];
};

/**
 * Paramètres d'un endpoint API
 */
export type ApiEndpointOptions = {
  cache?: CacheConfig;
  tags?: string[];
};

/**
 * Paramètres de création de projet
 */
export type CreateProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;

/**
 * Paramètres de mise à jour de projet
 */
export type UpdateProjectInput = ProjectFormSchema;

/**
 * Options personnalisées pour les mutations
 */
export type MutationOptions = {
  tags?: string[];
};
