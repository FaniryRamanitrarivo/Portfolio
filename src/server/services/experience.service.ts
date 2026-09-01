/**
 * Service couche - Logique métier côté serveur
 * À utiliser UNIQUEMENT dans les Server Components et API Routes
 * Pas de fetch HTTP - utilise le repository Prisma directement
 */

import { Prisma, type Experience } from "@prisma/client";
import { AppError } from "@/src/lib/back/errors";
import type { ExperienceDTO } from "@/src/types/experience";
import { ExperienceRepository } from "../repositories/experience.repository";

export class ExperienceServiceServer {
  /**
   * Récupère toutes les entrées, triées par ordre d'affichage
   */
  async getAllExperience(): Promise<ExperienceDTO[]> {
    try {
      const entries = await ExperienceRepository.findAll();
      return this.mapToDTO(entries);
    } catch {
      throw new AppError("Failed to fetch experience entries", 500);
    }
  }

  /**
   * Récupère une entrée par ID avec gestion d'erreurs
   */
  async getExperienceById(id: number): Promise<ExperienceDTO> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid experience ID", 400);
    }

    try {
      const entry = await ExperienceRepository.findById(id);

      if (!entry) {
        throw new AppError(`Experience entry with ID ${id} not found`, 404);
      }

      return this.mapToDTO(entry);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch experience entry", 500);
    }
  }

  /**
   * Crée une nouvelle entrée (placée en fin de liste d'affichage)
   */
  async createExperience(
    data: Omit<Prisma.ExperienceCreateInput, "order">
  ): Promise<ExperienceDTO> {
    try {
      const maxOrder = await ExperienceRepository.findMaxOrder();

      const entry = await ExperienceRepository.create({
        role: data.role,
        company: data.company,
        location: data.location ?? null,
        startDate: data.startDate,
        endDate: data.endDate ?? null,
        description: data.description ?? null,
        highlights: data.highlights ?? Prisma.JsonNull,
        order: maxOrder + 1,
      });

      return this.mapToDTO(entry);
    } catch {
      throw new AppError("Failed to create experience entry", 500);
    }
  }

  /**
   * Met à jour une entrée
   */
  async updateExperience(
    id: number,
    data: Prisma.ExperienceUpdateInput
  ): Promise<ExperienceDTO> {
    // Vérifier que l'entrée existe
    await this.getExperienceById(id);

    try {
      const entry = await ExperienceRepository.update(id, data);
      return this.mapToDTO(entry);
    } catch {
      throw new AppError("Failed to update experience entry", 500);
    }
  }

  /**
   * Supprime une entrée
   */
  async deleteExperience(id: number): Promise<void> {
    // Vérifier que l'entrée existe
    await this.getExperienceById(id);

    try {
      await ExperienceRepository.delete(id);
    } catch {
      throw new AppError("Failed to delete experience entry", 500);
    }
  }

  /**
   * Réordonne les entrées selon l'ordre des IDs fournis
   */
  async reorderExperience(ids: number[]): Promise<void> {
    try {
      await ExperienceRepository.reorder(ids);
    } catch {
      throw new AppError("Failed to reorder experience entries", 500);
    }
  }

  /**
   * Mappe les entrées Prisma vers les DTOs (Data Transfer Objects)
   */
  private mapToDTO(entries: Experience[]): ExperienceDTO[];
  private mapToDTO(entry: Experience): ExperienceDTO;
  private mapToDTO(entriesOrEntry: Experience | Experience[]): ExperienceDTO | ExperienceDTO[] {
    if (Array.isArray(entriesOrEntry)) {
      return entriesOrEntry.map((entry) => this.mapToDTO(entry));
    }

    const entry = entriesOrEntry;

    return {
      id: entry.id,
      role: entry.role,
      company: entry.company,
      location: entry.location,
      startDate: entry.startDate,
      endDate: entry.endDate,
      description: entry.description,
      highlights: Array.isArray(entry.highlights) ? entry.highlights : [],
      order: entry.order,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    } as ExperienceDTO;
  }
}

// Export d'une instance unique pour faciliter l'usage
export const experienceServiceServer = new ExperienceServiceServer();
