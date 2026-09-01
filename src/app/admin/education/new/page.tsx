"use client";

import { useRouter } from "next/navigation";
import { EducationForm } from "@/src/components/admin/education-form";
import { EducationFormSchema } from "@/src/lib/back/validation/education-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import normalizeEducationForm from "@/src/lib/front/forms/normalizeEducationForm";
import { createEducation } from "@/src/lib/actions/education";

export default function NewEducationPage() {
    const router = useRouter();

    async function handleCreate(data: EducationFormSchema) {
        try {
            const normalized = normalizeEducationForm(data);
            await createEducation(normalized);
            toast.success("Education entry created successfully");

            router.push("/admin/education");
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
                        <span className="text-xl font-bold font-display text-neutral-600">New Education Entry</span>
                    </Button>
                </div>
                <EducationForm onSubmit={handleCreate} />
            </div>
        </>
    );
}
