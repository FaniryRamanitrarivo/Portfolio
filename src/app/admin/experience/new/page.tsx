"use client";

import { useRouter } from "next/navigation";
import { ExperienceForm } from "@/src/components/admin/experience-form";
import { ExperienceFormSchema } from "@/src/lib/back/validation/experience-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import normalizeExperienceForm from "@/src/lib/front/forms/normalizeExperienceForm";
import { createExperience } from "@/src/lib/actions/experience";

export default function NewExperiencePage() {
    const router = useRouter();

    async function handleCreate(data: ExperienceFormSchema) {
        try {
            const normalized = normalizeExperienceForm(data);
            await createExperience(normalized);
            toast.success("Experience entry created successfully");

            router.push("/admin/experience");
        } catch {
            toast.error("An error occured during the creation process");
        }
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center space-x-3 my-8">
                    <Button onClick={() => router.back()} className="flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer">
                        <IoArrowBack className="text-xl mr-2" />
                        <span className="text-xl font-bold font-display text-neutral-600">New Experience Entry</span>
                    </Button>
                </div>
                <ExperienceForm onSubmit={handleCreate} />
            </div>
        </>
    );
}
