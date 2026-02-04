// app/(public)/@modal/(.)projects/[id]/page.tsx
import ProjectModal from "@/src/components/public/project/project-modal";
import ProjectDetail from "@/src/components/public/project/project-details";
import { api } from "@/src/lib/front/api/api";

export default async function ProjectModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await api.projects.get(Number(id));

  return (
    <ProjectModal>
      <ProjectDetail project={project} />
    </ProjectModal>
  );
}
