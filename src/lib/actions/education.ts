"use server";

import { educationServiceServer } from "@/src/server/services/education.service";
import type { EducationDTO } from "@/src/types/education";
import { revalidateTag } from "next/cache";
import { AppError } from "@/src/lib/back/errors";
import { educationSchema, educationUpdateSchema } from "@/src/lib/shared/education.schema";

/**
 * Server Action pour créer une entrée de parcours académique
 */
export async function createEducation(
  data: Omit<EducationDTO, "id" | "createdAt" | "updatedAt" | "order">
) {
  const parsed = educationSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await educationServiceServer.createEducation(parsed.data);
    revalidateTag("education", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create education entry");
  }
}

/**
 * Server Action pour mettre à jour une entrée de parcours académique
 */
export async function updateEducation(
  id: number,
  data: Partial<Omit<EducationDTO, "id" | "createdAt" | "updatedAt" | "order">>
) {
  const parsed = educationUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await educationServiceServer.updateEducation(id, parsed.data);
    revalidateTag("education", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update education entry");
  }
}

/**
 * Server Action pour supprimer une entrée de parcours académique
 */
export async function deleteEducation(id: number) {
  try {
    await educationServiceServer.deleteEducation(id);
    revalidateTag("education", "max");
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to delete education entry");
  }
}

/**
 * Server Action pour récupérer une entrée par ID
 */
export async function getEducationById(id: number) {
  try {
    return await educationServiceServer.getEducationById(id);
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch education entry");
  }
}

/**
 * Server Action pour réordonner les entrées (drag and drop admin)
 */
export async function reorderEducation(ids: number[]) {
  try {
    await educationServiceServer.reorderEducation(ids);
    revalidateTag("education", "max");
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to reorder education entries");
  }
}
