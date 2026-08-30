/**
 * Repository couche - Accès direct aux données Prisma
 * À utiliser UNIQUEMENT côté serveur
 * Pas de fetch, pas de requêtes HTTP - juste Prisma directement
 */

import { Prisma, Skill } from "@prisma/client";
import { prisma } from "@/src/lib/back/db";

export class SkillRepository {
  /**
   * Récupère tous les skills, triés par ordre d'affichage
   */
  static async findAll(): Promise<Skill[]> {
    return prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
  }

  /**
   * Récupère un skill par ID
   */
  static async findById(id: number): Promise<Skill | null> {
    return prisma.skill.findUnique({
      where: { id },
    });
  }

  /**
   * Récupère l'ordre maximum actuel (pour placer un nouveau skill en fin de liste)
   */
  static async findMaxOrder(): Promise<number> {
    const result = await prisma.skill.aggregate({
      _max: { order: true },
    });
    return result._max.order ?? -1;
  }

  /**
   * Crée un nouveau skill
   */
  static async create(data: Prisma.SkillCreateInput): Promise<Skill> {
    return prisma.skill.create({
      data,
    });
  }

  /**
   * Met à jour un skill
   */
  static async update(
    id: number,
    data: Prisma.SkillUpdateInput
  ): Promise<Skill> {
    return prisma.skill.update({
      where: { id },
      data,
    });
  }

  /**
   * Supprime un skill
   */
  static async delete(id: number): Promise<void> {
    await prisma.skill.delete({
      where: { id },
    });
  }

  /**
   * Réordonne les skills selon l'ordre des IDs fournis
   */
  static async reorder(ids: number[]): Promise<void> {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.skill.update({
          where: { id },
          data: { order: index },
        })
      )
    );
  }
}
