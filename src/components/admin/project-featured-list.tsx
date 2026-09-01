"use client";

import Image from "next/image";
import Link from "next/link";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import type { ProjectDTO } from "@/src/types/projects";

export const FEATURED_DROPZONE_ID = "featured-dropzone";

function FeaturedCard({
    project,
    onRemove,
    isPending,
}: {
    project: ProjectDTO;
    onRemove: (id: number) => void;
    isPending: boolean;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: project.id, data: { container: "featured" } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-3 bg-white border border-accent-200 rounded-xl p-3 ${isDragging ? "opacity-50 shadow-lg" : ""
                } ${isPending ? "opacity-50 pointer-events-none" : ""}`}
        >
            <button
                type="button"
                className="text-neutral-400 hover:text-neutral-600 cursor-grab active:cursor-grabbing touch-none"
                {...attributes}
                {...listeners}
            >
                <MdDragIndicator size={20} />
            </button>

            <div className="relative w-10 h-10 flex-shrink-0">
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
                </div>
                {project.category && (
                    <div className="text-sm text-neutral-500 line-clamp-1">{project.category}</div>
                )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
                <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-2 text-neutral-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit Project"
                >
                    <BiEditAlt size={16} />
                </Link>
                <button
                    type="button"
                    disabled={isPending}
                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                    onClick={() => onRemove(project.id)}
                    title="Remove from homepage"
                >
                    <IoClose size={16} />
                </button>
            </div>
        </div>
    );
}

export function ProjectFeaturedList({
    projects,
    onRemove,
    pendingId,
}: {
    projects: ProjectDTO[];
    onRemove: (id: number) => void;
    pendingId: number | null;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: FEATURED_DROPZONE_ID,
        data: { container: "featured" },
    });

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold text-neutral-900">Featured on Homepage</h2>
                <span className="text-sm text-neutral-500">{projects.length} / 6</span>
            </div>
            <p className="text-sm text-neutral-600 mb-4">
                Drag a project here to feature it. Drag to reorder — this is the order shown on the homepage.
            </p>

            <div
                ref={setNodeRef}
                className={`space-y-2 min-h-[64px] rounded-lg p-2 -m-2 transition-colors ${isOver ? "bg-accent-50 ring-2 ring-accent-300" : ""
                    }`}
            >
                {projects.length === 0 ? (
                    <p className="text-neutral-400 text-sm text-center py-6 border-2 border-dashed border-neutral-200 rounded-lg">
                        No featured projects — drag one up from the table below.
                    </p>
                ) : (
                    <SortableContext
                        items={projects.map((p) => p.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {projects.map((project) => (
                            <FeaturedCard
                                key={project.id}
                                project={project}
                                onRemove={onRemove}
                                isPending={pendingId === project.id}
                            />
                        ))}
                    </SortableContext>
                )}
            </div>
        </div>
    );
}
