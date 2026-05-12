// app/(public)/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetail from "@/src/components/public/project/project-details";
import { projectServiceServer } from "@/src/server/services/project.service";
// import { projectServiceServer } from "@/src/server/services/project.service";

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * Génère les métadonnées pour la page du projet
 * Crucial pour le SEO et le prerender
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    return {
      title: "Not Found",
    };
  }

  try {
    const project = await projectServiceServer.getProjectById(projectId);
    return {
      title: `${project.title} - Portfolio`,
      description: project.overview,
      openGraph: {
        title: project.title,
        description: project.overview,
        images: project.image ? [project.image] : [],
      },
    };
  } catch {
    return {
      title: "Not Found",
    };
  }
}

/**
 * Génère les paramètres statiques pour les routes dynamiques
 * Permet le prerender statique sans découvrir les routes en runtime
 */
export async function generateStaticParams() {
  try {
    const projects = await projectServiceServer.getAllProjects();
    return projects.map((project) => ({
      id: String(project.id),
    }));
  } catch {
    return [];
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    notFound();
  }

  try {
    const project = await projectServiceServer.getProjectById(projectId);
    return <ProjectDetail project={project} />;
  } catch (error) {
    notFound();
  }
}
