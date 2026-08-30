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
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator, MdAdd } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";

import type { ServiceDTO } from "@/src/types/services";
import { ICON_OPTIONS } from "@/src/lib/shared/icon-registry";
import { deleteService, reorderServices } from "@/src/lib/actions/services";

type OptimisticAction =
    | { type: "reorder"; ids: number[] }
    | { type: "delete"; id: number };

function reducer(state: ServiceDTO[], action: OptimisticAction): ServiceDTO[] {
    if (action.type === "delete") {
        return state.filter((s) => s.id !== action.id);
    }

    const byId = new Map(state.map((s) => [s.id, s]));
    return action.ids.map((id) => byId.get(id)).filter((s): s is ServiceDTO => Boolean(s));
}

function SortableRow({
    service,
    onDelete,
    isDeleting,
}: {
    service: ServiceDTO;
    onDelete: (id: number) => void;
    isDeleting: boolean;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: service.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const Icon = ICON_OPTIONS[service.icon];

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 bg-white border border-neutral-200 rounded-xl p-4 ${isDragging ? "opacity-50 shadow-lg" : ""
                } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
        >
            <button
                type="button"
                className="text-neutral-400 hover:text-neutral-600 cursor-grab active:cursor-grabbing touch-none"
                {...attributes}
                {...listeners}
            >
                <MdDragIndicator size={22} />
            </button>

            <div className="w-10 h-10 flex items-center justify-center bg-accent-100 rounded-lg text-accent-600 flex-shrink-0">
                {Icon && <Icon />}
            </div>

            <div className="flex-1 min-w-0">
                <div className="font-medium text-neutral-900 truncate">{service.title}</div>
                <div className="text-sm text-neutral-500 line-clamp-1">{service.description}</div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="p-2 text-neutral-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit Service"
                >
                    <BiEditAlt size={18} />
                </Link>
                <button
                    disabled={isDeleting}
                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                    onClick={() => onDelete(service.id)}
                    title="Delete Service"
                >
                    <RiDeleteBin6Line size={18} />
                </button>
            </div>
        </div>
    );
}

export function ServiceList({ services }: { services: ServiceDTO[] }) {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [optimisticServices, applyOptimistic] = useOptimistic(services, reducer);
    const router = useRouter();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = optimisticServices.findIndex((s) => s.id === active.id);
        const newIndex = optimisticServices.findIndex((s) => s.id === over.id);
        const nextIds = arrayMove(optimisticServices, oldIndex, newIndex).map((s) => s.id);

        startTransition(async () => {
            applyOptimistic({ type: "reorder", ids: nextIds });
            try {
                await reorderServices(nextIds);
                router.refresh();
            } catch {
                toast.error("Failed to save the new order");
            }
        });
    }

    function handleDelete(id: number) {
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        setIsDeleting(id);
        startTransition(async () => {
            applyOptimistic({ type: "delete", id });
            try {
                await deleteService(id);
                toast.success("Service deleted successfully");
                router.refresh();
            } catch {
                toast.error("An error occurred during deletion");
            } finally {
                setIsDeleting(null);
            }
        });
    }

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900">Services</h2>
                    <p className="text-neutral-600 mt-1">
                        Manage the &quot;Services I Offer&quot; homepage section — drag to reorder
                    </p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="px-6 py-3 bg-neutral-900 text-white rounded-lg flex items-center space-x-2"
                >
                    <MdAdd className="mr-1" />
                    Add New Service
                </Link>
            </div>

            <div className="mt-8 space-y-3">
                {optimisticServices.length === 0 ? (
                    <p className="text-neutral-500 text-center py-10">No services found.</p>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={optimisticServices.map((s) => s.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {optimisticServices.map((service) => (
                                <SortableRow
                                    key={service.id}
                                    service={service}
                                    onDelete={handleDelete}
                                    isDeleting={isDeleting === service.id}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
}
