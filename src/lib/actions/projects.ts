"use server";

import { api } from "@/src/lib/front/api/api";
import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { revalidateTag } from "next/cache";

export async function createProject(data: ProjectFormSchema) {
  const result = await api.projects.create(data, { tags: ["projects"] });

  // ⚡ invalide le tag "projects" avec profile "max"
  revalidateTag("projects", "max");

  return result;
}

export async function deleteProject(id: number) {
  await api.projects.delete(id);
  revalidateTag("projects", "max");
}