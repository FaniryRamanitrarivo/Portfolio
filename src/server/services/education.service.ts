/**
 * Service couche - Logique métier côté serveur
 * À utiliser UNIQUEMENT dans les Server Components et API Routes
 * Pas de fetch HTTP - utilise le repository Prisma directement
 */

import { Prisma, type Education } from "@prisma/client";
import { AppError } from "@/src/lib/back/errors";
import type { EducationDTO } from "@/src/types/education";
import { EducationRepository } from "../repositories/education.repository";

export class EducationServiceServer {
  /**
   * Récupère toutes les entrées, triées par ordre d'affichage
   */
  async getAllEducation(): Promise<EducationDTO[]> {
    try {
      const entries = await EducationRepository.findAll();
      return this.mapToDTO(entries);
    } catch {
      throw new AppError("Failed to fetch education entries", 500);
    }
  }

  /**
   * Récupère une entrée par ID avec gestion d'erreurs
   */
  async getEducationById(id: number): Promise<EducationDTO> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid education ID", 400);
    }

    try {
      const entry = await EducationRepository.findById(id);

      if (!entry) {
        throw new AppError(`Education entry with ID ${id} not found`, 404);
      }

      return this.mapToDTO(entry);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch education entry", 500);
    }
  }

  /**
   * Crée une nouvelle entrée (placée en fin de liste d'affichage)
   */
  async createEducation(
    data: Omit<Prisma.EducationCreateInput, "order">
  ): Promise<EducationDTO> {
    try {
      const maxOrder = await EducationRepository.findMaxOrder();

      const entry = await EducationRepository.create({
        degree: data.degree,
        school: data.school,
        location: data.location ?? null,
        startDate: data.startDate,
        endDate: data.endDate ?? null,
        description: data.description ?? null,
        highlights: data.highlights ?? Prisma.JsonNull,
        order: maxOrder + 1,
      });

      return this.mapToDTO(entry);
    } catch {
      throw new AppError("Failed to create education entry", 500);
    }
  }

  /**
   * Met à jour une entrée
   */
  async updateEducation(
    id: number,
    data: Prisma.EducationUpdateInput
  ): Promise<EducationDTO> {
    // Vérifier que l'entrée existe
    await this.getEducationById(id);

    try {
      const entry = await EducationRepository.update(id, data);
      return this.mapToDTO(entry);
    } catch {
      throw new AppError("Failed to update education entry", 500);
    }
  }

  /**
   * Supprime une entrée
   */
  async deleteEducation(id: number): Promise<void> {
    // Vérifier que l'entrée existe
    await this.getEducationById(id);

    try {
      await EducationRepository.delete(id);
    } catch {
      throw new AppError("Failed to delete education entry", 500);
    }
  }

  /**
   * Réordonne les entrées selon l'ordre des IDs fournis
   */
  async reorderEducation(ids: number[]): Promise<void> {
    try {
      await EducationRepository.reorder(ids);
    } catch {
      throw new AppError("Failed to reorder education entries", 500);
    }
  }

  /**
   * Mappe les entrées Prisma vers les DTOs (Data Transfer Objects)
   */
  private mapToDTO(entries: Education[]): EducationDTO[];
  private mapToDTO(entry: Education): EducationDTO;
  private mapToDTO(entriesOrEntry: Education | Education[]): EducationDTO | EducationDTO[] {
    if (Array.isArray(entriesOrEntry)) {
      return entriesOrEntry.map((entry) => this.mapToDTO(entry));
    }

    const entry = entriesOrEntry;

    return {
      id: entry.id,
      degree: entry.degree,
      school: entry.school,
      location: entry.location,
      startDate: entry.startDate,
      endDate: entry.endDate,
      description: entry.description,
      highlights: Array.isArray(entry.highlights) ? entry.highlights : [],
      order: entry.order,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    } as EducationDTO;
  }
}

// Export d'une instance unique pour faciliter l'usage
export const educationServiceServer = new EducationServiceServer();
