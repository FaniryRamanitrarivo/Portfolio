"use client";

import { useParams, useRouter } from "next/navigation";
import { EducationForm } from "@/src/components/admin/education-form";
import type { EducationFormSchema } from "@/src/lib/back/validation/education-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import { getEducationById, updateEducation } from "@/src/lib/actions/education";
import { useEffect, useState } from "react";
import denormalizeEducationToForm from "@/src/lib/front/forms/denormalizeEducationForm";
import normalizeEducationForm from "@/src/lib/front/forms/normalizeEducationForm";

export default function EditEducationPage() {
  const params = useParams();
  const router = useRouter();
  const educationId = Number(params.id as string);

  const [entry, setEntry] = useState<EducationFormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!Number.isInteger(educationId) || educationId <= 0) {
          toast.error("Invalid education entry ID");
          router.push("/admin/education");
          return;
        }

        const data = await getEducationById(educationId);

        if (!data) {
          toast.error(`Education entry with ID ${educationId} not found`);
          router.push("/admin/education");
          return;
        }

        const denormalizedEntry = denormalizeEducationToForm(data);
        if (mounted) {
          setEntry(denormalizedEntry);
        }
      } catch (error) {
        console.error("Error loading education entry:", error);
        toast.error("Failed to load education entry");
        router.push("/admin/education");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [educationId, router]);

  async function handleEdit(data: EducationFormSchema) {
    try {
      const normalizedData = normalizeEducationForm(data);
      await updateEducation(educationId, normalizedData);
      toast.success("Education entry updated successfully");
      router.push("/admin/education");
      router.refresh();
    } catch (error) {
      console.error("Error updating education entry:", error);
      toast.error("An error occurred during the update process");
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-neutral-600">Loading...</p>
      </div>
    );
  }

  if (!entry) {
    return null;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 my-8">
          <Button
            onClick={() => router.back()}
            className="flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <IoArrowBack className="text-xl mr-2" />
            <span className="text-xl font-bold font-display text-neutral-600">
              Update Education Entry
            </span>
          </Button>
        </div>
        <EducationForm onSubmit={handleEdit} defaultValues={entry} />
      </div>
    </>
  );
}
