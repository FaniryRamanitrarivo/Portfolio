"use client";

import { useParams, useRouter } from "next/navigation";
import { ProjectForm } from "@/src/components/admin/project-form";
import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import { getProjectBy, updateProject } from "@/src/lib/actions/projects";
import { parseId } from "@/src/lib/back/utils/parse-id";
import { useEffect, useState } from "react";
import { Project } from "@/src/types/projects";
import denormalizeProjectToForm from "@/src/lib/front/forms/denormalizeProjectForm";

export default function EditProjectPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = parseId(params.id as string);

    const [project, setProject] = useState<ProjectFormSchema | null>(null);
    const [loading, setLoading] = useState(true);

    // ✅ fetch client safe
    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const data = await getProjectBy(projectId);
                const denormalizedProject = denormalizeProjectToForm(data);
                if (!data) {
                    toast.error(`Project with ID : ${projectId} not found`);
                    router.push("/admin");
                    return;
                }

                if (mounted) setProject(denormalizedProject);
            } catch {
                toast.error("Failed to load project");
                router.push("/admin");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [projectId, router]);

    async function handleEdit(data: ProjectFormSchema) {
        try {
            await updateProject(projectId, data);
            toast.success("Projet updated successfully");

            router.push("/admin");
            router.refresh(); // 🔥 important pour cache serveur
        } catch {
            toast.error("An error occured during the update process");
        }
    }

    if (loading) return <div className="p-6">Loading...</div>;
    if (!project) return null;

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center space-x-3 my-8">
                    <Button onClick={() => router.back()} className="flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer">
                        <IoArrowBack className="text-xl mr-2" />
                        <span className="text-xl font-bold font-display text-neutral-600">
                            <>{project ? "Update project" : "Create project"}</>
                        </span>
                    </Button>
                </div>
                <ProjectForm onSubmit={handleEdit} defaultValues={project} />
            </div>
        </>
    );
}
