"use client";

import { useRouter } from "next/navigation";
import { ProjectForm } from "@/src/components/admin/project-form";
import { ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { IoArrowBack } from "react-icons/io5";

export default function NewProjectPage() {
    const router = useRouter();

    async function handleCreate(data: ProjectFormSchema) {
        console.log('data => ', data)
        // const res = await fetch("/api/projects", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(data),
        // });

        // if (!res.ok) {
        //     throw new Error("Failed to create project");
        // }

        // router.push("/admin/projects");
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center space-x-3 my-8">
                    <button onClick={() => router.back()} className="flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer">
                        <IoArrowBack className="text-xl mr-2" />
                        <span className="text-xl font-bold font-display text-neutral-600">New Project</span>
                    </button>
                </div>
                <ProjectForm onSubmit={handleCreate} />

            </div>
        </>
    );
}
