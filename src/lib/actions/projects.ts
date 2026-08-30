"use server";

import { projectServiceServer } from "@/src/server/services/project.service";
import type { ProjectDTO } from "@/src/types/projects";
import { revalidateTag } from "next/cache";
import { AppError } from "@/src/lib/back/errors";
import { projectSchema, projectUpdateSchema } from "@/src/lib/shared/project.schema";

/**
 * Server Action pour créer un projet
 * Appelle directement le service serveur (sans fetch HTTP)
 */
export async function createProject(
  data: Omit<ProjectDTO, "id" | "createdAt" | "updatedAt" | "order">
) {
  // Server Actions are network-callable regardless of client-side (RHF)
  // validation, so re-validate here — this is the one place both the admin
  // form and any other caller of this action go through.
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await projectServiceServer.createProject(parsed.data);
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
  data: Partial<Omit<ProjectDTO, "id" | "createdAt" | "updatedAt" | "order">>
) {
  const parsed = projectUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await projectServiceServer.updateProject(id, parsed.data);
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

/**
 * Server Action pour réordonner le set de projets mis en avant
 * (drag and drop dans la zone "Featured" de l'admin)
 */
export async function reorderFeaturedProjects(ids: number[]) {
  try {
    await projectServiceServer.reorderFeaturedProjects(ids);
    revalidateTag("projects", "max");
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to reorder featured projects");
  }
}

/**
 * Server Action pour ajouter/retirer un projet du set mis en avant
 */
export async function setProjectFeatured(id: number, featured: boolean) {
  try {
    const result = await projectServiceServer.setProjectFeatured(id, featured);
    revalidateTag("projects", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update featured status");
  }
}