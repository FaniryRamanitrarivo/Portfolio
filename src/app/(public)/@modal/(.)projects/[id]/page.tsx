// app/(public)/@modal/(.)projects/[id]/page.tsx
import { notFound } from "next/navigation";
import ProjectModal from "@/src/components/public/project/project-modal";
import ProjectDetail from "@/src/components/public/project/project-details";
import { projectServiceServer } from "@/src/server/services/project.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectModalPage({ params }: Props) {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    notFound();
  }

  try {
    const project = await projectServiceServer.getProjectById(projectId);

    return (
      <ProjectModal>
        <ProjectDetail project={project} />
      </ProjectModal>
    );
  } catch (error) {
    notFound();
  }
}
