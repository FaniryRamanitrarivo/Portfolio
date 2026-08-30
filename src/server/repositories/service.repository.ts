/**
 * Repository couche - Accès direct aux données Prisma
 * À utiliser UNIQUEMENT côté serveur
 * Pas de fetch, pas de requêtes HTTP - juste Prisma directement
 */

import { Prisma, Service } from "@prisma/client";
import { prisma } from "@/src/lib/back/db";

export class ServiceRepository {
  /**
   * Récupère tous les services, triés par ordre d'affichage
   */
  static async findAll(): Promise<Service[]> {
    return prisma.service.findMany({
      orderBy: { order: "asc" },
    });
  }

  /**
   * Récupère un service par ID
   */
  static async findById(id: number): Promise<Service | null> {
    return prisma.service.findUnique({
      where: { id },
    });
  }

  /**
   * Récupère l'ordre maximum actuel (pour placer un nouveau service en fin de liste)
   */
  static async findMaxOrder(): Promise<number> {
    const result = await prisma.service.aggregate({
      _max: { order: true },
    });
    return result._max.order ?? -1;
  }

  /**
   * Crée un nouveau service
   */
  static async create(data: Prisma.ServiceCreateInput): Promise<Service> {
    return prisma.service.create({
      data,
    });
  }

  /**
   * Met à jour un service
   */
  static async update(
    id: number,
    data: Prisma.ServiceUpdateInput
  ): Promise<Service> {
    return prisma.service.update({
      where: { id },
      data,
    });
  }

  /**
   * Supprime un service
   */
  static async delete(id: number): Promise<void> {
    await prisma.service.delete({
      where: { id },
    });
  }

  /**
   * Réordonne les services selon l'ordre des IDs fournis
   */
  static async reorder(ids: number[]): Promise<void> {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.service.update({
          where: { id },
          data: { order: index },
        })
      )
    );
  }
}
