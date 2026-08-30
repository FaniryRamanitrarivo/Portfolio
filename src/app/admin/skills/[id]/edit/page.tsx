"use client";

import { useParams, useRouter } from "next/navigation";
import { SkillForm } from "@/src/components/admin/skill-form";
import type { SkillFormSchema } from "@/src/lib/back/validation/skill-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import { getSkillById, updateSkill } from "@/src/lib/actions/skills";
import { useEffect, useState } from "react";
import denormalizeSkillToForm from "@/src/lib/front/forms/denormalizeSkillForm";
import normalizeSkillForm from "@/src/lib/front/forms/normalizeSkillForm";

export default function EditSkillPage() {
  const params = useParams();
  const router = useRouter();
  const skillId = Number(params.id as string);

  const [skill, setSkill] = useState<SkillFormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!Number.isInteger(skillId) || skillId <= 0) {
          toast.error("Invalid skill ID");
          router.push("/admin/skills");
          return;
        }

        const data = await getSkillById(skillId);

        if (!data) {
          toast.error(`Skill with ID ${skillId} not found`);
          router.push("/admin/skills");
          return;
        }

        const denormalizedSkill = denormalizeSkillToForm(data);
        if (mounted) {
          setSkill(denormalizedSkill);
        }
      } catch (error) {
        console.error("Error loading skill:", error);
        toast.error("Failed to load skill");
        router.push("/admin/skills");
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
  }, [skillId, router]);

  async function handleEdit(data: SkillFormSchema) {
    try {
      const normalizedData = normalizeSkillForm(data);
      await updateSkill(skillId, normalizedData);
      toast.success("Skill updated successfully");
      router.push("/admin/skills");
      router.refresh();
    } catch (error) {
      console.error("Error updating skill:", error);
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

  if (!skill) {
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
              Update Skill
            </span>
          </Button>
        </div>
        <SkillForm onSubmit={handleEdit} defaultValues={skill} />
      </div>
    </>
  );
}
