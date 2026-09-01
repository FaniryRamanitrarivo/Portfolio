"use client";

import { useParams, useRouter } from "next/navigation";
import { ExperienceForm } from "@/src/components/admin/experience-form";
import type { ExperienceFormSchema } from "@/src/lib/back/validation/experience-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import { getExperienceById, updateExperience } from "@/src/lib/actions/experience";
import { useEffect, useState } from "react";
import denormalizeExperienceToForm from "@/src/lib/front/forms/denormalizeExperienceForm";
import normalizeExperienceForm from "@/src/lib/front/forms/normalizeExperienceForm";

export default function EditExperiencePage() {
  const params = useParams();
  const router = useRouter();
  const experienceId = Number(params.id as string);

  const [entry, setEntry] = useState<ExperienceFormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!Number.isInteger(experienceId) || experienceId <= 0) {
          toast.error("Invalid experience entry ID");
          router.push("/admin/experience");
          return;
        }

        const data = await getExperienceById(experienceId);

        if (!data) {
          toast.error(`Experience entry with ID ${experienceId} not found`);
          router.push("/admin/experience");
          return;
        }

        const denormalizedEntry = denormalizeExperienceToForm(data);
        if (mounted) {
          setEntry(denormalizedEntry);
        }
      } catch (error) {
        console.error("Error loading experience entry:", error);
        toast.error("Failed to load experience entry");
        router.push("/admin/experience");
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
  }, [experienceId, router]);

  async function handleEdit(data: ExperienceFormSchema) {
    try {
      const normalizedData = normalizeExperienceForm(data);
      await updateExperience(experienceId, normalizedData);
      toast.success("Experience entry updated successfully");
      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      console.error("Error updating experience entry:", error);
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
              Update Experience Entry
            </span>
          </Button>
        </div>
        <ExperienceForm onSubmit={handleEdit} defaultValues={entry} />
      </div>
    </>
  );
}
