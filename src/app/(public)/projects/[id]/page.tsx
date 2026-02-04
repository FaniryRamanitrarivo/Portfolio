// app/(public)/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import ProjectDetail from "@/src/components/public/project/project-details";
import { api } from "@/src/lib/front/api/api";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    notFound();
  }

  const project = await api.projects.get(projectId);

  return <ProjectDetail project={project} />;
}
