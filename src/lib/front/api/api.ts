import { Project } from "@/src/types/projects";
import { serverFetch } from "./serverFetch";


export const api = {

    // ---------------- Projects ----------------
    projects: {
        list: (view: "summary" | "full" = "full") => serverFetch<Project[]>(`/projects?view=${view}`, { revalidate: 60 }),
        latest: (limit: number = 10) => serverFetch<Project[]>(`/projects?limit=${limit}&order=desc`, { revalidate: 60 }),
        mostPopular: (limit: number = 10) => serverFetch<Project[]>(`/projects?limit=${limit}&popular=true`, { revalidate: 60 }),
        get: (id: number) => serverFetch<Project>(`/projects/${id}`, { revalidate: 60 }),
    },

    
    // ---------------- Autres endpoints ----------------


}