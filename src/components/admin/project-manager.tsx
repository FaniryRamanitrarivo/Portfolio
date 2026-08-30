"use client";

import { startTransition, useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { ProjectDTO } from "@/src/types/projects";
import { ProjectFeaturedList, FEATURED_DROPZONE_ID } from "./project-featured-list";
import { ProjectRestList } from "./project-rest-list";
import {
    deleteProject,
    reorderFeaturedProjects,
    setProjectFeatured,
} from "@/src/lib/actions/projects";

const MAX_FEATURED = 6;

type ManagerState = {
    featured: ProjectDTO[];
    rest: ProjectDTO[];
};

type OptimisticAction =
    | { type: "reorderFeatured"; ids: number[] }
    | { type: "addToFeatured"; id: number; index: number }
    | { type: "removeFromFeatured"; id: number }
    | { type: "deleteProject"; id: number };

function reducer(state: ManagerState, action: OptimisticAction): ManagerState {
    switch (action.type) {
        case "reorderFeatured": {
            const byId = new Map(state.featured.map((p) => [p.id, p]));
            return {
                ...state,
                featured: action.ids
                    .map((id) => byId.get(id))
                    .filter((p): p is ProjectDTO => Boolean(p)),
            };
        }
        case "addToFeatured": {
            const project = state.rest.find((p) => p.id === action.id);
            if (!project) return state;
            const nextFeatured = [...state.featured];
            nextFeatured.splice(action.index, 0, project);
            return {
                featured: nextFeatured,
                rest: state.rest.filter((p) => p.id !== action.id),
            };
        }
        case "removeFromFeatured": {
            const project = state.featured.find((p) => p.id === action.id);
            if (!project) return state;
            return {
                featured: state.featured.filter((p) => p.id !== action.id),
                rest: [project, ...state.rest],
            };
        }
        case "deleteProject":
            return {
                featured: state.featured.filter((p) => p.id !== action.id),
                rest: state.rest.filter((p) => p.id !== action.id),
            };
    }
}

export function ProjectManager({
    featured,
    rest,
}: {
    featured: ProjectDTO[];
    rest: ProjectDTO[];
}) {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [pendingFeaturedId, setPendingFeaturedId] = useState<number | null>(null);
    const [state, applyOptimistic] = useOptimistic({ featured, rest }, reducer);
    const router = useRouter();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeContainer = active.data.current?.container as "featured" | "rest" | undefined;
        const overContainer =
            (over.data.current?.container as "featured" | "rest" | undefined) ??
            (over.id === FEATURED_DROPZONE_ID ? "featured" : undefined);

        if (!activeContainer || !overContainer) return;

        // Reorder within the featured zone
        if (activeContainer === "featured" && overContainer === "featured") {
            if (active.id === over.id) return;

            const oldIndex = state.featured.findIndex((p) => p.id === active.id);
            const newIndex = state.featured.findIndex((p) => p.id === over.id);
            if (oldIndex === -1 || newIndex === -1) return;

            const nextIds = arrayMove(state.featured, oldIndex, newIndex).map((p) => p.id);

            startTransition(async () => {
                applyOptimistic({ type: "reorderFeatured", ids: nextIds });
                try {
                    await reorderFeaturedProjects(nextIds);
                    router.refresh();
                } catch {
                    toast.error("Failed to reorder featured projects");
                }
            });
            return;
        }

        // Drag from the table up into the featured zone
        if (activeContainer === "rest" && overContainer === "featured") {
            if (state.featured.length >= MAX_FEATURED) {
                toast.error(`You can feature at most ${MAX_FEATURED} projects`);
                return;
            }

            const overIndex = state.featured.findIndex((p) => p.id === over.id);
            const index = overIndex === -1 ? state.featured.length : overIndex;
            const nextIds = state.featured.map((p) => p.id);
            nextIds.splice(index, 0, active.id as number);

            startTransition(async () => {
                applyOptimistic({ type: "addToFeatured", id: active.id as number, index });
                try {
                    await reorderFeaturedProjects(nextIds);
                    router.refresh();
                } catch {
                    toast.error("Failed to feature project");
                }
            });
            return;
        }

        // Drag out of the featured zone back onto the table
        if (activeContainer === "featured" && overContainer === "rest") {
            startTransition(async () => {
                applyOptimistic({ type: "removeFromFeatured", id: active.id as number });
                try {
                    await setProjectFeatured(active.id as number, false);
                    router.refresh();
                } catch {
                    toast.error("Failed to unfeature project");
                }
            });
        }
    }

    function handleRemoveFeatured(id: number) {
        setPendingFeaturedId(id);
        startTransition(async () => {
            applyOptimistic({ type: "removeFromFeatured", id });
            try {
                await setProjectFeatured(id, false);
                router.refresh();
            } catch {
                toast.error("Failed to unfeature project");
            } finally {
                setPendingFeaturedId(null);
            }
        });
    }

    function handleDelete(id: number) {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        setIsDeleting(id);
        startTransition(async () => {
            applyOptimistic({ type: "deleteProject", id });
            try {
                await deleteProject(id);
                toast.success("Project deleted successfully");
                router.refresh();
            } catch {
                toast.error("An error occurred during deletion");
            } finally {
                setIsDeleting(null);
            }
        });
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="space-y-8 mt-8">
                <ProjectFeaturedList
                    projects={state.featured}
                    onRemove={handleRemoveFeatured}
                    pendingId={pendingFeaturedId}
                />

                <ProjectRestList
                    projects={state.rest}
                    isDeletingId={isDeleting}
                    onDelete={handleDelete}
                />
            </div>
        </DndContext>
    );
}
