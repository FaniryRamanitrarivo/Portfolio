"use server";

import { serviceServiceServer } from "@/src/server/services/service.service";
import type { ServiceDTO } from "@/src/types/services";
import { revalidateTag } from "next/cache";
import { AppError } from "@/src/lib/back/errors";
import { serviceSchema, serviceUpdateSchema } from "@/src/lib/shared/service.schema";

/**
 * Server Action pour créer un service
 */
export async function createService(
  data: Omit<ServiceDTO, "id" | "createdAt" | "updatedAt" | "order">
) {
  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await serviceServiceServer.createService(parsed.data);
    revalidateTag("services", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create service");
  }
}

/**
 * Server Action pour mettre à jour un service
 */
export async function updateService(
  id: number,
  data: Partial<Omit<ServiceDTO, "id" | "createdAt" | "updatedAt" | "order">>
) {
  const parsed = serviceUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  try {
    const result = await serviceServiceServer.updateService(id, parsed.data);
    revalidateTag("services", "max");
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update service");
  }
}

/**
 * Server Action pour supprimer un service
 */
export async function deleteService(id: number) {
  try {
    await serviceServiceServer.deleteService(id);
    revalidateTag("services", "max");
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to delete service");
  }
}

/**
 * Server Action pour récupérer un service par ID
 */
export async function getServiceById(id: number) {
  try {
    return await serviceServiceServer.getServiceById(id);
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch service");
  }
}

/**
 * Server Action pour réordonner les services (drag and drop admin)
 */
export async function reorderServices(ids: number[]) {
  try {
    await serviceServiceServer.reorderServices(ids);
    revalidateTag("services", "max");
  } catch (error) {
    if (error instanceof AppError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to reorder services");
  }
}
