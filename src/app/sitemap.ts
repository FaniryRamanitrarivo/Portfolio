import type { MetadataRoute } from "next";
import { env } from "@/src/lib/env";
import { projectServiceServer } from "@/src/server/services/project.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: env.SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${env.SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let projects: Awaited<ReturnType<typeof projectServiceServer.getAllProjects>> = [];
  try {
    projects = await projectServiceServer.getAllProjects();
  } catch {
    // DB unreachable at build/request time — fall back to the static routes.
    return staticRoutes;
  }

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${env.SITE_URL}/projects/${project.id}`,
    lastModified: project.updatedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
