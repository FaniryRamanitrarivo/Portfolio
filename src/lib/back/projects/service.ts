import { Prisma, Project } from "@prisma/client";
import { projectRepository } from "./repository";
import { AppError } from "../errors";

export const projectService = {
  async getAll(): Promise<Project[]> {
    return projectRepository.findAll();
  },

  async getByIdOrThrow(id: number): Promise<Project> {
    const project = await projectRepository.findById(id);
    if (!project) throw new AppError(`Project with ID ${id} not found`, 404);
    return project;
  },

  /**
   * Méthode pour récupérer des projets avec options (pagination, summary/full, popular, order)
   */
  async getProjects(options?: {
    start?: number;
    limit?: number;
    view?: "summary" | "full";
    order?: "asc" | "desc";
    popular?: boolean;
  }): Promise<Project[]> {
    return projectRepository.findProjects(options);
  },

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    const normalizedData: Prisma.ProjectCreateInput = {
      ...data,
      responsibilities: data.responsibilities ?? Prisma.JsonNull,
      keyResults: data.keyResults ?? Prisma.JsonNull,
      challenges: data.challenges ?? Prisma.JsonNull,
      solutions: data.solutions ?? Prisma.JsonNull,
      technologies: data.technologies ?? Prisma.JsonNull,
      client: data.client ?? "",
      duration: data.duration ?? "",
      overview: data.overview ?? "",
      category: data.category ?? "",
      description: data.description ?? "",
      image: data.image ?? "",
      github: data.github ?? "",
      link: data.link ?? "",
      popular: data.popular ?? false,
    };

    return projectRepository.create(normalizedData);
  },

  async update(id: number, data: Prisma.ProjectUpdateInput): Promise<Project> {
    await this.getByIdOrThrow(id);
    return projectRepository.update(id, data);
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    await this.getByIdOrThrow(id);
    await projectRepository.delete(id);
    return { success: true, message: `Project ${id} deleted successfully` };
  },
};
