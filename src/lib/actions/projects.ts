"use server";

import { api } from "@/src/lib/front/api/api";
import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { revalidateTag } from "next/cache";
import { Project } from "@/src/types/projects";

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">) {
  const result = await api.projects.create(data, { tags: ["projects"] });

  // ⚡ invalide le tag "projects" avec profile "max"
  revalidateTag("projects", "max");

  return result;
}

export async function updateProject(id: number, data: ProjectFormSchema) {
  const result = await api.projects.update(id, data, { tags: ["projects"] });

  // ⚡ invalide le tag "projects" avec profile "max"
  revalidateTag("projects", "max");

  return result;
}

export async function deleteProject(id: number) {
  await api.projects.delete(id);
  revalidateTag("projects", "max");
}

export async function getProjectBy(id: number) {
  return api.projects.get(id);
}