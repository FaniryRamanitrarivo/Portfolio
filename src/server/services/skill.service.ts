/**
 * Service couche - Logique métier côté serveur
 * À utiliser UNIQUEMENT dans les Server Components et API Routes
 * Pas de fetch HTTP - utilise le repository Prisma directement
 */

import { Prisma, type Skill } from "@prisma/client";
import { AppError } from "@/src/lib/back/errors";
import type { SkillDTO } from "@/src/types/skills";
import type { IconKey } from "@/src/lib/shared/icon-registry";
import { SkillRepository } from "../repositories/skill.repository";

export class SkillServiceServer {
  /**
   * Récupère tous les skills, triés par ordre d'affichage
   */
  async getAllSkills(): Promise<SkillDTO[]> {
    try {
      const skills = await SkillRepository.findAll();
      return this.mapToDTO(skills);
    } catch {
      throw new AppError("Failed to fetch skills", 500);
    }
  }

  /**
   * Récupère un skill par ID avec gestion d'erreurs
   */
  async getSkillById(id: number): Promise<SkillDTO> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid skill ID", 400);
    }

    try {
      const skill = await SkillRepository.findById(id);

      if (!skill) {
        throw new AppError(`Skill with ID ${id} not found`, 404);
      }

      return this.mapToDTO(skill);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch skill", 500);
    }
  }

  /**
   * Crée un nouveau skill (placé en fin de liste d'affichage)
   */
  async createSkill(
    data: Omit<Prisma.SkillCreateInput, "order">
  ): Promise<SkillDTO> {
    try {
      const maxOrder = await SkillRepository.findMaxOrder();

      const skill = await SkillRepository.create({
        title: data.title,
        icon: data.icon,
        description: data.description,
        lists: data.lists ?? Prisma.JsonNull,
        isSpeciality: data.isSpeciality ?? false,
        order: maxOrder + 1,
      });

      return this.mapToDTO(skill);
    } catch {
      throw new AppError("Failed to create skill", 500);
    }
  }

  /**
   * Met à jour un skill
   */
  async updateSkill(
    id: number,
    data: Prisma.SkillUpdateInput
  ): Promise<SkillDTO> {
    // Vérifier que le skill existe
    await this.getSkillById(id);

    try {
      const skill = await SkillRepository.update(id, data);
      return this.mapToDTO(skill);
    } catch {
      throw new AppError("Failed to update skill", 500);
    }
  }

  /**
   * Supprime un skill
   */
  async deleteSkill(id: number): Promise<void> {
    // Vérifier que le skill existe
    await this.getSkillById(id);

    try {
      await SkillRepository.delete(id);
    } catch {
      throw new AppError("Failed to delete skill", 500);
    }
  }

  /**
   * Réordonne les skills selon l'ordre des IDs fournis
   */
  async reorderSkills(ids: number[]): Promise<void> {
    try {
      await SkillRepository.reorder(ids);
    } catch {
      throw new AppError("Failed to reorder skills", 500);
    }
  }

  /**
   * Mappe les skills Prisma vers les DTOs (Data Transfer Objects)
   */
  private mapToDTO(skills: Skill[]): SkillDTO[];
  private mapToDTO(skill: Skill): SkillDTO;
  private mapToDTO(skillsOrSkill: Skill | Skill[]): SkillDTO | SkillDTO[] {
    if (Array.isArray(skillsOrSkill)) {
      return skillsOrSkill.map((skill) => this.mapToDTO(skill));
    }

    const skill = skillsOrSkill;

    return {
      id: skill.id,
      title: skill.title,
      icon: skill.icon as IconKey,
      description: skill.description,
      lists: Array.isArray(skill.lists) ? skill.lists : [],
      isSpeciality: skill.isSpeciality,
      order: skill.order,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    } as SkillDTO;
  }
}

// Export d'une instance unique pour faciliter l'usage
export const skillServiceServer = new SkillServiceServer();
