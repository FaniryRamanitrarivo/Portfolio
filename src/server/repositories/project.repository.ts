/**
 * Repository couche - Accès direct aux données Prisma
 * À utiliser UNIQUEMENT côté serveur
 * Pas de fetch, pas de requêtes HTTP - juste Prisma directement
 */

import { Prisma, Project } from "@prisma/client";
import { prisma } from "@/src/lib/back/db";

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

  /**
   * Récupère les projets mis en avant (popular), triés par ordre d'affichage
   */
  static async findFeatured(limit?: number): Promise<Project[]> {
    return prisma.project.findMany({
      where: { popular: true },
      orderBy: { order: "asc" },
      take: limit,
    });
  }

  /**
   * Récupère les projets non mis en avant, triés par date de création décroissante
   */
  static async findNonFeatured(): Promise<Project[]> {
    return prisma.project.findMany({
      where: { popular: false },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Remplace intégralement le set de projets mis en avant par la liste d'IDs
   * fournie (dans cet ordre) : marque ces IDs popular=true avec un `order`
   * séquentiel, et retire du set tout ID précédemment popular absent de la liste.
   */
  static async replaceFeatured(ids: number[]): Promise<void> {
    const current = await prisma.project.findMany({
      where: { popular: true },
      select: { id: true },
    });
    const toUnfeature = current
      .map((p) => p.id)
      .filter((id) => !ids.includes(id));

    await prisma.$transaction([
      ...toUnfeature.map((id) =>
        prisma.project.update({ where: { id }, data: { popular: false, order: 0 } })
      ),
      ...ids.map((id, index) =>
        prisma.project.update({
          where: { id },
          data: { popular: true, order: index },
        })
      ),
    ]);
  }

  /**
   * Ajoute (en fin de liste) ou retire un projet du set mis en avant.
   * Au retrait, recompacte le `order` du reste du set pour éviter les trous.
   */
  static async setFeatured(id: number, featured: boolean): Promise<Project> {
    if (featured) {
      const count = await prisma.project.count({ where: { popular: true } });
      return prisma.project.update({
        where: { id },
        data: { popular: true, order: count },
      });
    }

    const project = await prisma.project.update({
      where: { id },
      data: { popular: false, order: 0 },
    });

    const remaining = await prisma.project.findMany({
      where: { popular: true },
      orderBy: { order: "asc" },
      select: { id: true },
    });

    await prisma.$transaction(
      remaining.map((p, index) =>
        prisma.project.update({ where: { id: p.id }, data: { order: index } })
      )
    );

    return project;
  }
}
