/**
 * Service couche - Logique métier côté serveur
 * À utiliser UNIQUEMENT dans les Server Components et API Routes
 * Pas de fetch HTTP - utilise le repository Prisma directement
 */

import { Prisma, type Service } from "@prisma/client";
import { AppError } from "@/src/lib/back/errors";
import type { ServiceDTO } from "@/src/types/services";
import type { IconKey } from "@/src/lib/shared/icon-registry";
import { ServiceRepository } from "../repositories/service.repository";

export class ServiceServiceServer {
  /**
   * Récupère tous les services, triés par ordre d'affichage
   */
  async getAllServices(): Promise<ServiceDTO[]> {
    try {
      const services = await ServiceRepository.findAll();
      return this.mapToDTO(services);
    } catch (error) {
      throw new AppError("Failed to fetch services", 500);
    }
  }

  /**
   * Récupère un service par ID avec gestion d'erreurs
   */
  async getServiceById(id: number): Promise<ServiceDTO> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid service ID", 400);
    }

    try {
      const service = await ServiceRepository.findById(id);

      if (!service) {
        throw new AppError(`Service with ID ${id} not found`, 404);
      }

      return this.mapToDTO(service);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch service", 500);
    }
  }

  /**
   * Crée un nouveau service (placé en fin de liste d'affichage)
   */
  async createService(
    data: Omit<Prisma.ServiceCreateInput, "order">
  ): Promise<ServiceDTO> {
    try {
      const maxOrder = await ServiceRepository.findMaxOrder();

      const service = await ServiceRepository.create({
        title: data.title,
        icon: data.icon,
        description: data.description,
        lists: data.lists ?? Prisma.JsonNull,
        link: data.link ?? null,
        order: maxOrder + 1,
      });

      return this.mapToDTO(service);
    } catch (error) {
      throw new AppError("Failed to create service", 500);
    }
  }

  /**
   * Met à jour un service
   */
  async updateService(
    id: number,
    data: Prisma.ServiceUpdateInput
  ): Promise<ServiceDTO> {
    // Vérifier que le service existe
    await this.getServiceById(id);

    try {
      const service = await ServiceRepository.update(id, data);
      return this.mapToDTO(service);
    } catch (error) {
      throw new AppError("Failed to update service", 500);
    }
  }

  /**
   * Supprime un service
   */
  async deleteService(id: number): Promise<void> {
    // Vérifier que le service existe
    await this.getServiceById(id);

    try {
      await ServiceRepository.delete(id);
    } catch (error) {
      throw new AppError("Failed to delete service", 500);
    }
  }

  /**
   * Réordonne les services selon l'ordre des IDs fournis
   */
  async reorderServices(ids: number[]): Promise<void> {
    try {
      await ServiceRepository.reorder(ids);
    } catch (error) {
      throw new AppError("Failed to reorder services", 500);
    }
  }

  /**
   * Mappe les services Prisma vers les DTOs (Data Transfer Objects)
   */
  private mapToDTO(services: Service[]): ServiceDTO[];
  private mapToDTO(service: Service): ServiceDTO;
  private mapToDTO(servicesOrService: Service | Service[]): ServiceDTO | ServiceDTO[] {
    if (Array.isArray(servicesOrService)) {
      return servicesOrService.map((service) => this.mapToDTO(service));
    }

    const service = servicesOrService;

    return {
      id: service.id,
      title: service.title,
      icon: service.icon as IconKey,
      description: service.description,
      lists: Array.isArray(service.lists) ? service.lists : [],
      link: service.link,
      order: service.order,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    } as ServiceDTO;
  }
}

// Export d'une instance unique pour faciliter l'usage
export const serviceServiceServer = new ServiceServiceServer();
