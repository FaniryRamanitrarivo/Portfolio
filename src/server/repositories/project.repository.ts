/**
 * Repository couche - Accès direct aux données Prisma
 * À utiliser UNIQUEMENT côté serveur
 * Pas de fetch, pas de requêtes HTTP - juste Prisma directement
 */

import { Prisma, Project } from "@prisma/client";
import { prisma } from "@/src/lib/back/db";
import { AppError } from "@/src/lib/back/errors";

export interface ProjectFilters {
  start?: number;
  limit?: number;
  view?: "summary" | "full";
  order?: "asc" | "desc";
  popular?: boolean;
}

export class ProjectRepository {
  /**
   * Récupère tous les projets avec filtres optionnels
   */
  static async findMany(filters?: ProjectFilters): Promise<Project[]> {
    const { start = 0, limit = 10, view = "full", order = "asc", popular } =
      filters || {};

    const select =
      view === "summary"
        ? {
            id: true,
            title: true,
            role: true,
            client: true,
            overview: true,
            category: true,
            image: true,
            technologies: true,
            createdAt: true,
            updatedAt: true,
          }
        : undefined;

    const where: Prisma.ProjectWhereInput | undefined = popular
      ? { popular: true }
      : undefined;

    return prisma.project.findMany({
      where,
      select,
      orderBy: { createdAt: order === "desc" ? "desc" : "asc" },
      skip: start,
      take: limit,
    });
  }

  /**
   * Récupère un projet par ID
   */
  static async findById(id: number): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { id },
    });
  }

  /**
   * Récupère tous les projets (sans pagination)
   */
  static async findAll(): Promise<Project[]> {
    return prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Crée un nouveau projet
   */
  static async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return prisma.project.create({
      data,
    });
  }

  /**
   * Met à jour un projet
   */
  static async update(
    id: number,
    data: Prisma.ProjectUpdateInput
  ): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  /**
   * Supprime un projet
   */
  static async delete(id: number): Promise<void> {
    await prisma.project.delete({
      where: { id },
    });
  }

  /**
   * Compte le nombre de projets
   */
  static async count(): Promise<number> {
    return prisma.project.count();
  }
}
