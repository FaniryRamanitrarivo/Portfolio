"use client";

import { useParams, useRouter } from "next/navigation";
import { ProjectForm } from "@/src/components/admin/project-form";
import type { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import { getProjectById, updateProject } from "@/src/lib/actions/projects";
import { useEffect, useState } from "react";
import type { ProjectDTO } from "@/src/types/projects";
import denormalizeProjectToForm from "@/src/lib/front/forms/denormalizeProjectForm";
import normalizeProjectForm from "@/src/lib/front/forms/normalizeProjectFrom";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = Number(params.id as string);

  const [project, setProject] = useState<ProjectFormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch le projet au chargement du composant
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!Number.isInteger(projectId) || projectId <= 0) {
          toast.error("Invalid project ID");
          router.push("/admin");
          return;
        }

        const data = await getProjectById(projectId);

        if (!data) {
          toast.error(`Project with ID ${projectId} not found`);
          router.push("/admin");
          return;
        }

        const denormalizedProject = denormalizeProjectToForm(data);
        if (mounted) {
          setProject(denormalizedProject);
        }
      } catch (error) {
        console.error("Error loading project:", error);
        toast.error("Failed to load project");
        router.push("/admin");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [projectId, router]);

  async function handleEdit(data: ProjectFormSchema) {
    try {
      const normalizedData = normalizeProjectForm(data);
      await updateProject(projectId, normalizedData);
      toast.success("Project updated successfully");
      router.push("/admin");
      router.refresh(); // Invalide le cache serveur
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("An error occurred during the update process");
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-neutral-600">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 my-8">
          <Button
            onClick={() => router.back()}
            className="flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <IoArrowBack className="text-xl mr-2" />
            <span className="text-xl font-bold font-display text-neutral-600">
              Update Project
            </span>
          </Button>
        </div>
        <ProjectForm onSubmit={handleEdit} defaultValues={project} />
      </div>
    </>
  );
}
