/**
 * Couche API centralisée - Point d'entrée unique
 * Architecture clean code & clean architecture
 *
 * Avantages de cette refactorisation :
 * - Separation of Concerns : chaque fichier a une responsabilité unique
 * - DRY : pas de duplication des configurations de cache
 * - SOLID : Single Responsibility Principle
 * - Maintenabilité : configuration centralisée et facile à modifier
 * - Testabilité : Repository pattern permet des tests unitaires simples
 * - Extensibilité : ajout facile de nouveaux endpoints
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

// Alias pour compatibilité avec le code existant
import { ProjectsRepository } from "./projects-repository";

export const api = {
  projects: ProjectsRepository,
};