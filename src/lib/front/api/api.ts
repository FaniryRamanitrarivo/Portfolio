// src/lib/api/api.ts
import { Project } from "@/src/types/projects";
import { apiFetch } from "./fetcher";
import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import normalizeProjectForm from "../forms/normalizeProjectFrom";

export const api = {
  projects: {
    // ---------- READ ----------
    list: (view: "summary" | "full" = "full") =>
      apiFetch<Project[]>(`/projects?view=${view}`, {
        revalidate: 60,
        tags: ["projects"],
      }),

    latest: (limit = 10) =>
      apiFetch<Project[]>(`/projects?limit=${limit}&order=desc`, {
        revalidate: 60,
        tags: ["projects"],
      }),

    mostPopular: (limit = 10) =>
      apiFetch<Project[]>(`/projects?limit=${limit}&popular=true`, {
        revalidate: 60,
        tags: ["projects"],
      }),

    get: (id: number) =>
      apiFetch<Project>(`/projects/${id}`, {
        revalidate: 60,
        tags: ["projects"],
      }),

    // ---------- WRITE ----------
    create: (data: ProjectFormSchema, options?: { tags?: string[] }) => {
      const normalized = normalizeProjectForm(data);
      return apiFetch<Project>(`/projects`, {
        method: "POST",
        body: JSON.stringify(normalized),
        ...(options?.tags ? { tags: options.tags } : {}),
      });
    },

    update: (id: number, data: ProjectFormSchema, options?: { tags?: string[] }) => {
      const normalized = normalizeProjectForm(data);
      return apiFetch<Project>(`/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(normalized),
        ...(options?.tags ? { tags: options.tags } : {}),
      });
    },

    delete: (id: number, options?: { tags?: string[] }) =>
      apiFetch<void>(`/projects/${id}`, {
        method: "DELETE",
        ...(options?.tags ? { tags: options.tags } : {}),
      }),
  },
};