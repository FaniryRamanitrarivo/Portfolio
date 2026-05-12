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
   * Récupère les projets les plus récents (pour la page d'accueil)
   */
  async getLatestProjects(limit: number = 6): Promise<ProjectDTO[]> {
    try {
      const projects = await ProjectRepository.findMany({
        limit,
        order: "desc",
      });
      return this.mapToDTO(projects);
    } catch (error) {
      throw new AppError(
        "Failed to fetch latest projects",
        500
      );
    }
  }

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
   * Récupère les projets populaires
   */
  async getPopularProjects(limit: number = 10): Promise<ProjectDTO[]> {
    try {
      const projects = await ProjectRepository.findMany({
        limit,
        popular: true,
        order: "desc",
      });
      return this.mapToDTO(projects);
    } catch (error) {
      throw new AppError("Failed to fetch popular projects", 500);
    }
  }

  /**
   * Récupère les projets avec filtres
   */
  async getProjects(filters?: ProjectFilters): Promise<ProjectDTO[]> {
    try {
      const projects = await ProjectRepository.findMany(filters);
      return this.mapToDTO(projects);
    } catch (error) {
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
    } catch (error) {
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
      };

      const project = await ProjectRepository.create(normalizedData);
      return this.mapToDTO(project);
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      throw new AppError("Failed to delete project", 500);
    }
  }

  /**
   * Mappe les projets Prisma vers les DTOs (Data Transfer Objects)
   * Utile pour contrôler exactement ce qu'on expose
   */
  private mapToDTO(projects: any[]): ProjectDTO[];
  private mapToDTO(project: any): ProjectDTO;
  private mapToDTO(projectsOrProject: any | any[]): ProjectDTO | ProjectDTO[] {
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
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    } as ProjectDTO;
  }
}

// Export d'une instance unique pour faciliter l'usage
export const projectServiceServer = new ProjectServiceServer();
