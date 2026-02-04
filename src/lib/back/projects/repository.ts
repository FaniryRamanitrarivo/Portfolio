import { prisma } from "../db";
import { Prisma, Project } from "@prisma/client";

export const projectRepository = {

  findProjects: async (options?: {
    start?: number;
    limit?: number;
    view?: "summary" | "full";
    order?: "asc" | "desc";
    popular?: boolean;
  }): Promise<Project[]> => {
    const {
      start = 0,
      limit = 10,
      view = "full",
      order = "asc",
      popular = false
    } = options || {};

    const select = view === "summary" ?
      {
        id: true,
        title: true,
        role: true,
        client: true,
        overview: true,
        category: true,
        image: true,
        technologies: true,
        createdAt: true,
        updatedAt: true,
      } : undefined; //on récupère tous les champs si c'est undefined

      const where: Prisma.ProjectWhereInput | undefined = popular ? { popular: true } : undefined;

      return prisma.project.findMany({
        where,
        orderBy: { createdAt: order },
        skip: start,
        take: limit,
        select,
      })

  },

  findAll: async (): Promise<Project[]> => {
    return prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  },

  findById: async (id: number): Promise<Project | null> => {
    return prisma.project.findUnique({ where: { id } });
  },

  create: async (data: Prisma.ProjectCreateInput): Promise<Project> => {
    return prisma.project.create({ data });
  },

  update: async (id: number, data: Prisma.ProjectUpdateInput): Promise<Project> => {
    return prisma.project.update({ where: { id }, data });
  },

  delete: async (id: number): Promise<Project> => {
    return prisma.project.delete({ where: { id } });
  },

};
