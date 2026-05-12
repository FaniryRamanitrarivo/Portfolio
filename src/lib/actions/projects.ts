"use server";

import { projectServiceServer } from "@/src/server/services/project.service";
import type { ProjectDTO } from "@/src/types/projects";
import { revalidateTag } from "next/cache";
import { AppError } from "@/src/lib/back/errors";

/**
 * Server Action pour créer un projet
 * Appelle directement le service serveur (sans fetch HTTP)
 */
export async function createProject(
  data: Omit<ProjectDTO, "id" | "createdAt" | "updatedAt">
) {
  try {
    const result = await projectServiceServer.createProject(data);
    // Invalide le cache ISR pour les projets
    revalidateTag("projects", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create project");
  }
}

/**
 * Server Action pour mettre à jour un projet
 */
export async function updateProject(
  id: number,
  data: Partial<Omit<ProjectDTO, "id" | "createdAt" | "updatedAt">>
) {
  try {
    const result = await projectServiceServer.updateProject(id, data);
    // Invalide le cache ISR
    revalidateTag("projects", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update project");
  }
}

/**
 * Server Action pour supprimer un projet
 */
export async function deleteProject(id: number) {
  try {
    await projectServiceServer.deleteProject(id);
    // Invalide le cache ISR
    revalidateTag("projects", "max");
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to delete project");
  }
}

/**
 * Server Action pour récupérer un projet par ID
 * (Utile pour les Client Components qui ne peuvent pas importer les services serveur)
 */
export async function getProjectById(id: number) {
  try {
    return await projectServiceServer.getProjectById(id);
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch project");
  }
}