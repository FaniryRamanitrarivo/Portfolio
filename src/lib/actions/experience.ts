"use server";

import { experienceServiceServer } from "@/src/server/services/experience.service";
import type { ExperienceDTO } from "@/src/types/experience";
import { revalidateTag } from "next/cache";
import { AppError } from "@/src/lib/back/errors";
import { experienceSchema, experienceUpdateSchema } from "@/src/lib/shared/experience.schema";

/**
 * Server Action pour créer une entrée de parcours professionnel
 */
export async function createExperience(
  data: Omit<ExperienceDTO, "id" | "createdAt" | "updatedAt" | "order">
) {
  const parsed = experienceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await experienceServiceServer.createExperience(parsed.data);
    revalidateTag("experience", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create experience entry");
  }
}

/**
 * Server Action pour mettre à jour une entrée de parcours professionnel
 */
export async function updateExperience(
  id: number,
  data: Partial<Omit<ExperienceDTO, "id" | "createdAt" | "updatedAt" | "order">>
) {
  const parsed = experienceUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await experienceServiceServer.updateExperience(id, parsed.data);
    revalidateTag("experience", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update experience entry");
  }
}

/**
 * Server Action pour supprimer une entrée de parcours professionnel
 */
export async function deleteExperience(id: number) {
  try {
    await experienceServiceServer.deleteExperience(id);
    revalidateTag("experience", "max");
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to delete experience entry");
  }
}

/**
 * Server Action pour récupérer une entrée par ID
 */
export async function getExperienceById(id: number) {
  try {
    return await experienceServiceServer.getExperienceById(id);
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch experience entry");
  }
}

/**
 * Server Action pour réordonner les entrées (drag and drop admin)
 */
export async function reorderExperience(ids: number[]) {
  try {
    await experienceServiceServer.reorderExperience(ids);
    revalidateTag("experience", "max");
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to reorder experience entries");
  }
}
