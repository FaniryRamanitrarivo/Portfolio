"use client";

import Image from "next/image";
import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import type { ProjectDTO } from "@/src/types/projects";

function DraggableRow({
    project,
    isDeleting,
    onDelete,
}: {
    project: ProjectDTO;
    isDeleting: boolean;
    onDelete: (id: number) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: project.id,
        data: { container: "rest" },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 bg-white border border-neutral-200 rounded-xl p-4 ${isDragging ? "opacity-50 shadow-lg" : ""
                } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
        >
            <button
                type="button"
                title="Drag to feature on homepage"
                className="text-neutral-400 hover:text-neutral-600 cursor-grab active:cursor-grabbing touch-none"
                {...attributes}
                {...listeners}
            >
                <MdDragIndicator size={22} />
            </button>

            <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                    alt={project.title}
                    fill
                    className="rounded-lg object-cover bg-neutral-100"
                    src={project.image || "/placeholder-image.png"}
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <div className="font-medium text-neutral-900 truncate">{project.title}</div>
                    {project.comingSoon && (
                        <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full flex-shrink-0">
                            Coming Soon
                        </span>
                    )}
                    {project.category && (
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-medium rounded-full flex-shrink-0">
                            {project.category}
                        </span>
                    )}
                </div>
                <div className="text-sm text-neutral-500 line-clamp-1">{project.overview}</div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-2 text-neutral-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit Project"
                >
                    <BiEditAlt size={18} />
                </Link>
                <button
                    type="button"
                    disabled={isDeleting}
                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                    onClick={() => onDelete(project.id)}
                    title="Delete Project"
                >
                    <RiDeleteBin6Line size={18} />
                </button>
            </div>
        </div>
    );
}

export function ProjectRestList({
    projects,
    isDeletingId,
    onDelete,
}: {
    projects: ProjectDTO[];
    isDeletingId: number | null;
    onDelete: (id: number) => void;
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-1">All Projects</h2>
            <p className="text-sm text-neutral-600 mb-4">
                Sorted by most recent — drag a project up into the featured section above.
            </p>

            <div className="space-y-3">
                {projects.length === 0 ? (
                    <p className="text-neutral-500 text-center py-10">No projects found.</p>
                ) : (
                    projects.map((project) => (
                        <DraggableRow
                            key={project.id}
                            project={project}
                            isDeleting={isDeletingId === project.id}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
