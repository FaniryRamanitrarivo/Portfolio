"use server";

import { skillServiceServer } from "@/src/server/services/skill.service";
import type { SkillDTO } from "@/src/types/skills";
import { revalidatePublicPages } from "@/src/lib/back/revalidate";
import { AppError } from "@/src/lib/back/errors";
import { skillSchema, skillUpdateSchema } from "@/src/lib/shared/skill.schema";

/**
 * Server Action pour créer un skill
 */
export async function createSkill(
  data: Omit<SkillDTO, "id" | "createdAt" | "updatedAt" | "order">
) {
  const parsed = skillSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await skillServiceServer.createSkill(parsed.data);
    revalidatePublicPages();
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create skill");
  }
}

/**
 * Server Action pour mettre à jour un skill
 */
export async function updateSkill(
  id: number,
  data: Partial<Omit<SkillDTO, "id" | "createdAt" | "updatedAt" | "order">>
) {
  const parsed = skillUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await skillServiceServer.updateSkill(id, parsed.data);
    revalidatePublicPages();
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update skill");
  }
}

/**
 * Server Action pour supprimer un skill
 */
export async function deleteSkill(id: number) {
  try {
    await skillServiceServer.deleteSkill(id);
    revalidatePublicPages();
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to delete skill");
  }
}

/**
 * Server Action pour récupérer un skill par ID
 */
export async function getSkillById(id: number) {
  try {
    return await skillServiceServer.getSkillById(id);
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch skill");
  }
}

/**
 * Server Action pour réordonner les skills (drag and drop admin)
 */
export async function reorderSkills(ids: number[]) {
  try {
    await skillServiceServer.reorderSkills(ids);
    revalidatePublicPages();
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to reorder skills");
  }
}
