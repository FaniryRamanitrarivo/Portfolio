// src/lib/api/api.ts

import { Project } from "@/src/types/projects";
import { apiFetch } from "./fetcher";
import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import normalizeProjectForm from "../forms/normalizeProjectFrom";

export const api = {

  projects: {

    // ---------- READ ----------

    list: (view: "summary" | "full" = "full") =>
      apiFetch<Project[]>(`/projects?view=${view}`, { revalidate: 60 }),

    latest: (limit = 10) =>
      apiFetch<Project[]>(`/projects?limit=${limit}&order=desc`, { revalidate: 60 }),

    mostPopular: (limit = 10) =>
      apiFetch<Project[]>(`/projects?limit=${limit}&popular=true`, { revalidate: 60 }),

    get: (id: number) =>
      apiFetch<Project>(`/projects/${id}`, { revalidate: 60 }),

    // ---------- WRITE ----------

    create: (data: ProjectFormSchema) => {
      const normalized = normalizeProjectForm(data);

      return apiFetch<Project>(`/projects`, {
        method: "POST",
        body: JSON.stringify(normalized),
      });
    },

    update: (id: number, data: ProjectFormSchema) => {
      const normalized = normalizeProjectForm(data);

      return apiFetch<Project>(`/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(normalized),
      });
    },

    remove: (id: number) =>
      apiFetch<void>(`/projects/${id}`, {
        method: "DELETE",
      }),
  },

};