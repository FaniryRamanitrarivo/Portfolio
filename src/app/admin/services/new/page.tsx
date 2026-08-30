"use client";

import { useRouter } from "next/navigation";
import { ServiceForm } from "@/src/components/admin/service-form";
import { ServiceFormSchema } from "@/src/lib/back/validation/service-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import normalizeServiceForm from "@/src/lib/front/forms/normalizeServiceForm";
import { createService } from "@/src/lib/actions/services";

export default function NewServicePage() {
    const router = useRouter();

    async function handleCreate(data: ServiceFormSchema) {
        try {
            const normalized = normalizeServiceForm(data);
            await createService(normalized);
            toast.success("Service created successfully");

            router.push("/admin/services");
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
                        <span className="text-xl font-bold font-display text-neutral-600">New Service</span>
                    </Button>
                </div>
                <ServiceForm onSubmit={handleCreate} />
            </div>
        </>
    );
}
