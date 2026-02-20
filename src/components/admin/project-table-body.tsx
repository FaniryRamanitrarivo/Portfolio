"use client";

import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table } from "../ui/table";
import { api } from "@/src/lib/front/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Project } from "@/src/types/projects";
import { useState, useEffect } from "react";
import Image from "next/image"; // Improved performance

export function ProjectTableBody({ projects }: { projects: Project[] }) {
    const [projectsDatas, setProjectsDatas] = useState<Project[]>(projects);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const router = useRouter();

    // Sync state if server data changes
    useEffect(() => {
        setProjectsDatas(projects);
    }, [projects]);

    async function handleDelete(id: number) {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        setIsDeleting(id);
        try {
            await api.projects.delete(id);

            // Optimistic update
            setProjectsDatas(prev => prev.filter(p => p.id !== id));
            toast.success("Project deleted successfully");

            router.refresh();
        } catch (error) {
            toast.error("An error occurred during deletion");
        } finally {
            setIsDeleting(null);
        }
    }

    if (projects.length === 0) {
        return (
            <Table.Body>
                <Table.Row>
                    <Table.Col colSpan={6} className="py-10 text-center text-neutral-500">
                        No projects found.
                    </Table.Col>
                </Table.Row>
            </Table.Body>
        );
    }

    return (
        <Table.Body>
            {projectsDatas.map((project) => (
                <Table.Row key={project.id} className={isDeleting === project.id ? "opacity-50 pointer-events-none" : ""}>
                    <Table.Col>
                        <div className="flex items-center space-x-3">
                            <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                    alt={project.title}
                                    fill
                                    className="rounded-lg object-cover bg-neutral-100"
                                    src={project.image || '/placeholder-image.png'}
                                />
                            </div>
                            <div className="max-w-xs">
                                <div className="font-medium text-neutral-900 truncate">
                                    {project.title}
                                </div>
                                <div className="text-sm text-neutral-500 line-clamp-1">
                                    {project.overview}
                                </div>
                            </div>
                        </div>
                    </Table.Col>
                    <Table.Col className="text-sm text-neutral-700">{project.client}</Table.Col>
                    <Table.Col className="text-sm text-neutral-700">{project.role}</Table.Col>
                    <Table.Col className="text-sm text-neutral-700">{project.duration}</Table.Col>
                    <Table.Col className="text-center">
                        <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium">
                            {project.category}
                        </span>
                    </Table.Col>
                    <Table.Col className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                            <button
                                onClick={() => router.push(`/dashboard/projects/${project.id}/edit`)}
                                className="p-2 text-neutral-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Edit Project"
                            >
                                <BiEditAlt size={18} />
                            </button>
                            <button
                                disabled={isDeleting === project.id}
                                className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                                onClick={() => handleDelete(project.id)}
                                title="Delete Project"
                            >
                                <RiDeleteBin6Line size={18} />
                            </button>
                        </div>
                    </Table.Col>
                </Table.Row>
            ))}
        </Table.Body>
    );
}