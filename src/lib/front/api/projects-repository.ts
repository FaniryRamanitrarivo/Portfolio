import { apiFetch } from "./fetcher";
import { CACHE_CONFIG } from "./cache-config";
import type { Project } from "@/src/types/projects";
import type {
  CreateProjectInput,
  UpdateProjectInput,
  MutationOptions,
} from "./types";
import normalizeProjectForm from "../forms/normalizeProjectFrom";

/**
 * Énumération des vues disponibles pour la liste des projets
 */
type ProjectListView = "summary" | "full";

/**
 * Repository pour gérer l'accès aux données des projets
 * Encapsule tout la logique de communication avec l'API
 * Respecte le Single Responsibility Principle
 */
export class ProjectsRepository {
  /**
   * Récupère la liste des projets
   */
  static list(
    view: ProjectListView = "full",
    options?: MutationOptions
  ): Promise<Project[]> {
    return apiFetch<Project[]>(`/projects?view=${view}`, {
      ...CACHE_CONFIG.STANDARD,
      ...(options?.tags ? { tags: options.tags } : {}),
    });
  }

  /**
   * Récupère les projets les plus récents
   */
  static latest(limit: number = 10, options?: MutationOptions): Promise<Project[]> {
    return apiFetch<Project[]>(`/projects?limit=${limit}&order=desc`, {
      ...CACHE_CONFIG.STANDARD,
      ...(options?.tags ? { tags: options.tags } : {}),
    });
  }

  /**
   * Récupère les projets les plus populaires
   */
  static mostPopular(
    limit: number = 10,
    options?: MutationOptions
  ): Promise<Project[]> {
    return apiFetch<Project[]>(`/projects?limit=${limit}&popular=true`, {
      ...CACHE_CONFIG.STANDARD,
      ...(options?.tags ? { tags: options.tags } : {}),
    });
  }

  /**
   * Récupère un projet par son identifiant
   */
  static getById(id: number, options?: MutationOptions): Promise<Project> {
    return apiFetch<Project>(`/projects/${id}`, {
      ...CACHE_CONFIG.STANDARD,
      ...(options?.tags ? { tags: options.tags } : {}),
    });
  }

  /**
   * Crée un nouveau projet
   */
  static create(
    data: CreateProjectInput,
    options?: MutationOptions
  ): Promise<Project> {
    return apiFetch<Project>(`/projects`, {
      method: "POST",
      body: JSON.stringify(data),
      ...(options?.tags ? { tags: options.tags } : {}),
    });
  }

  /**
   * Met à jour un projet existant
   */
  static update(
    id: number,
    data: UpdateProjectInput,
    options?: MutationOptions
  ): Promise<Project> {
    const normalized = normalizeProjectForm(data);
    return apiFetch<Project>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(normalized),
      ...(options?.tags ? { tags: options.tags } : {}),
    });
  }

  /**
   * Supprime un projet
   */
  static delete(id: number, options?: MutationOptions): Promise<void> {
    return apiFetch<void>(`/projects/${id}`, {
      method: "DELETE",
      ...(options?.tags ? { tags: options.tags } : {}),
    });
  }
}
