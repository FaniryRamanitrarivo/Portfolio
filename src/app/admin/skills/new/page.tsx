"use client";

import { useRouter } from "next/navigation";
import { SkillForm } from "@/src/components/admin/skill-form";
import { SkillFormSchema } from "@/src/lib/back/validation/skill-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import normalizeSkillForm from "@/src/lib/front/forms/normalizeSkillForm";
import { createSkill } from "@/src/lib/actions/skills";

export default function NewSkillPage() {
    const router = useRouter();

    async function handleCreate(data: SkillFormSchema) {
        try {
            const normalized = normalizeSkillForm(data);
            await createSkill(normalized);
            toast.success("Skill created successfully");

            router.push("/admin/skills");
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
                        <span className="text-xl font-bold font-display text-neutral-600">New Skill</span>
                    </Button>
                </div>
                <SkillForm onSubmit={handleCreate} />
            </div>
        </>
    );
}
