/**
 * Couche API centralisée
 * Point d'entrée unique pour tous les appels API côté client
 * Architecture en couches : séparation des responsabilités
 */

export { ProjectsRepository as projects } from "./projects-repository";
export type {
  CreateProjectInput,
  UpdateProjectInput,
  MutationOptions,
  CacheConfig,
  ApiEndpointOptions,
} from "./types";
export { CACHE_CONFIG } from "./cache-config";

/**
 * Exposition de l'API sous forme d'objet namecé pour compatibilité avec le code existant
 * Exemple : api.projects.list() au lieu de new ProjectsRepository().list()
 */
import { ProjectsRepository } from "./projects-repository";

export const api = {
  projects: ProjectsRepository,
};
