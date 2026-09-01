/**
 * Service couche - Logique métier côté serveur
 * À utiliser UNIQUEMENT dans les Server Components et API Routes
 * Pas de fetch HTTP - utilise le repository Prisma directement
 */

import { Prisma } from "@prisma/client";
import { AppError } from "@/src/lib/back/errors";
import type { ProjectDTO } from "@/src/types/projects";
import {
  ProjectFilters,
  ProjectRepository,
} from "../repositories/project.repository";

export class ProjectServiceServer {
  /**
   * Récupère un projet par ID avec gestion d'erreurs
   */
  async getProjectById(id: number): Promise<ProjectDTO> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid project ID", 400);
    }

    try {
      const project = await ProjectRepository.findById(id);

      if (!project) {
        throw new AppError(`Project with ID ${id} not found`, 404);
      }

      return this.mapToDTO(project);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch project", 500);
    }
  }

  /**
   * Récupère les projets mis en avant (admin: gestion du set featured),
   * triés par ordre d'affichage (drag-and-drop), au plus `limit`.
   */
  async getFeaturedProjects(limit: number = 6): Promise<ProjectDTO[]> {
    try {
      const projects = await ProjectRepository.findFeatured(limit);
      return this.mapToDTO(projects);
    } catch {
      throw new AppError("Failed to fetch featured projects", 500);
    }
  }

  /**
   * Récupère les projets non mis en avant (admin: reste de la liste),
   * triés par date de création décroissante.
   */
  async getNonFeaturedProjects(): Promise<ProjectDTO[]> {
    try {
      const projects = await ProjectRepository.findNonFeatured();
      return this.mapToDTO(projects);
    } catch {
      throw new AppError("Failed to fetch projects", 500);
    }
  }

  /**
   * Récupère les projets pour la homepage : le set mis en avant (dans
   * l'ordre choisi en admin), complété si besoin par les projets les plus
   * récents pour toujours afficher jusqu'à `limit` projets.
   */
  async getHomepageProjects(limit: number = 6): Promise<ProjectDTO[]> {
    try {
      const featured = await ProjectRepository.findFeatured(limit);
      if (featured.length >= limit) {
        return this.mapToDTO(featured);
      }

      const featuredIds = new Set(featured.map((p) => p.id));
      const recent = await ProjectRepository.findMany({
        limit,
        order: "desc",
      });
      const padding = recent
        .filter((p) => !featuredIds.has(p.id))
        .slice(0, limit - featured.length);

      return this.mapToDTO([...featured, ...padding]);
    } catch {
      throw new AppError("Failed to fetch homepage projects", 500);
    }
  }

  /**
   * Remplace le set de projets mis en avant par la liste d'IDs fournie
   * (drag-and-drop dans l'admin) : réordonne, et retire du set tout ID
   * précédemment mis en avant absent de la liste. Plafonné à 6.
   */
  async reorderFeaturedProjects(ids: number[]): Promise<void> {
    if (ids.length > 6) {
      throw new AppError("Maximum of 6 featured projects", 400);
    }

    try {
      await ProjectRepository.replaceFeatured(ids);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to reorder featured projects", 500);
    }
  }

  /**
   * Ajoute ou retire un projet du set mis en avant (bouton "star" ou
   * drag hors de la zone featured). Plafonné à 6.
   */
  async setProjectFeatured(id: number, featured: boolean): Promise<ProjectDTO> {
    await this.getProjectById(id);

    if (featured) {
      const current = await ProjectRepository.findFeatured();
      const alreadyFeatured = current.some((p) => p.id === id);
      if (!alreadyFeatured && current.length >= 6) {
        throw new AppError("Maximum of 6 featured projects", 400);
      }
    }

    try {
      const project = await ProjectRepository.setFeatured(id, featured);
      return this.mapToDTO(project);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update featured status", 500);
    }
  }

  /**
   * Récupère les projets avec filtres
   */
  async getProjects(filters?: ProjectFilters): Promise<ProjectDTO[]> {
    try {
      const projects = await ProjectRepository.findMany(filters);
      return this.mapToDTO(projects);
    } catch {
      throw new AppError("Failed to fetch projects", 500);
    }
  }

  /**
   * Récupère tous les projets (admin)
   */
  async getAllProjects(): Promise<ProjectDTO[]> {
    try {
      const projects = await ProjectRepository.findAll();
      return this.mapToDTO(projects);
    } catch {
      throw new AppError("Failed to fetch projects", 500);
    }
  }

  /**
   * Crée un nouveau projet
   */
  async createProject(
    data: Prisma.ProjectCreateInput
  ): Promise<ProjectDTO> {
    try {
      // Normalisation des données
      const normalizedData: Prisma.ProjectCreateInput = {
        title: data.title,
        role: data.role,
        duration: data.duration || "",
        overview: data.overview || "",
        client: data.client || null,
        category: data.category || null,
        description: data.description || null,
        image: data.image || null,
        github: data.github || null,
        link: data.link || null,
        responsibilities: data.responsibilities || Prisma.JsonNull,
        keyResults: data.keyResults || Prisma.JsonNull,
        challenges: data.challenges || Prisma.JsonNull,
        solutions: data.solutions || Prisma.JsonNull,
        technologies: data.technologies || Prisma.JsonNull,
        popular: data.popular || false,
        comingSoon: data.comingSoon || false,
      };

      const project = await ProjectRepository.create(normalizedData);
      return this.mapToDTO(project);
    } catch {
      throw new AppError("Failed to create project", 500);
    }
  }

  /**
   * Met à jour un projet
   */
  async updateProject(
    id: number,
    data: Prisma.ProjectUpdateInput
  ): Promise<ProjectDTO> {
    // Vérifier que le projet existe
    await this.getProjectById(id);

    try {
      const project = await ProjectRepository.update(id, data);
      return this.mapToDTO(project);
    } catch {
      throw new AppError("Failed to update project", 500);
    }
  }

  /**
   * Supprime un projet
   */
  async deleteProject(id: number): Promise<void> {
    // Vérifier que le projet existe
    await this.getProjectById(id);

    try {
      await ProjectRepository.delete(id);
    } catch {
      throw new AppError("Failed to delete project", 500);
    }
  }

  /**
   * Mappe les projets Prisma vers les DTOs (Data Transfer Objects)
   * Utile pour contrôler exactement ce qu'on expose
   */
  private mapToDTO(projects: Prisma.ProjectGetPayload<Record<string, never>>[]): ProjectDTO[];
  private mapToDTO(project: Prisma.ProjectGetPayload<Record<string, never>>): ProjectDTO;
  private mapToDTO(
    projectsOrProject: Prisma.ProjectGetPayload<Record<string, never>> | Prisma.ProjectGetPayload<Record<string, never>>[]
  ): ProjectDTO | ProjectDTO[] {
    if (Array.isArray(projectsOrProject)) {
      return projectsOrProject.map((project) => this.mapToDTO(project));
    }

    const project = projectsOrProject;

    return {
      id: project.id,
      title: project.title,
      role: project.role,
      client: project.client,
      duration: project.duration,
      overview: project.overview,
      category: project.category,
      description: project.description,
      image: project.image,
      github: project.github,
      link: project.link,
      responsibilities: Array.isArray(project.responsibilities)
        ? project.responsibilities
        : [],
      keyResults: Array.isArray(project.keyResults)
        ? project.keyResults
        : [],
      challenges: Array.isArray(project.challenges)
        ? project.challenges
        : [],
      solutions: Array.isArray(project.solutions) ? project.solutions : [],
      technologies: Array.isArray(project.technologies)
        ? project.technologies
        : [],
      popular: project.popular,
      order: project.order,
      comingSoon: project.comingSoon,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    } as ProjectDTO;
  }
}

// Export d'une instance unique pour faciliter l'usage
export const projectServiceServer = new ProjectServiceServer();
