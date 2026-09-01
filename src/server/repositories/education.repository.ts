/**
 * Repository couche - Accès direct aux données Prisma
 * À utiliser UNIQUEMENT côté serveur
 * Pas de fetch, pas de requêtes HTTP - juste Prisma directement
 */

import { Prisma, Education } from "@prisma/client";
import { prisma } from "@/src/lib/back/db";

export class EducationRepository {
  /**
   * Récupère toutes les entrées, triées par ordre d'affichage
   */
  static async findAll(): Promise<Education[]> {
    return prisma.education.findMany({
      orderBy: { order: "asc" },
    });
  }

  /**
   * Récupère une entrée par ID
   */
  static async findById(id: number): Promise<Education | null> {
    return prisma.education.findUnique({
      where: { id },
    });
  }

  /**
   * Récupère l'ordre maximum actuel (pour placer une nouvelle entrée en fin de liste)
   */
  static async findMaxOrder(): Promise<number> {
    const result = await prisma.education.aggregate({
      _max: { order: true },
    });
    return result._max.order ?? -1;
  }

  /**
   * Crée une nouvelle entrée
   */
  static async create(data: Prisma.EducationCreateInput): Promise<Education> {
    return prisma.education.create({
      data,
    });
  }

  /**
   * Met à jour une entrée
   */
  static async update(
    id: number,
    data: Prisma.EducationUpdateInput
  ): Promise<Education> {
    return prisma.education.update({
      where: { id },
      data,
    });
  }

  /**
   * Supprime une entrée
   */
  static async delete(id: number): Promise<void> {
    await prisma.education.delete({
      where: { id },
    });
  }

  /**
   * Réordonne les entrées selon l'ordre des IDs fournis
   */
  static async reorder(ids: number[]): Promise<void> {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.education.update({
          where: { id },
          data: { order: index },
        })
      )
    );
  }
}
