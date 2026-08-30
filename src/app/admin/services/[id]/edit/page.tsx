"use client";

import { useParams, useRouter } from "next/navigation";
import { ServiceForm } from "@/src/components/admin/service-form";
import type { ServiceFormSchema } from "@/src/lib/back/validation/service-form.schema";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import Button from "@/src/components/ui/button";
import { getServiceById, updateService } from "@/src/lib/actions/services";
import { useEffect, useState } from "react";
import denormalizeServiceToForm from "@/src/lib/front/forms/denormalizeServiceForm";
import normalizeServiceForm from "@/src/lib/front/forms/normalizeServiceForm";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = Number(params.id as string);

  const [service, setService] = useState<ServiceFormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!Number.isInteger(serviceId) || serviceId <= 0) {
          toast.error("Invalid service ID");
          router.push("/admin/services");
          return;
        }

        const data = await getServiceById(serviceId);

        if (!data) {
          toast.error(`Service with ID ${serviceId} not found`);
          router.push("/admin/services");
          return;
        }

        const denormalizedService = denormalizeServiceToForm(data);
        if (mounted) {
          setService(denormalizedService);
        }
      } catch (error) {
        console.error("Error loading service:", error);
        toast.error("Failed to load service");
        router.push("/admin/services");
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
  }, [serviceId, router]);

  async function handleEdit(data: ServiceFormSchema) {
    try {
      const normalizedData = normalizeServiceForm(data);
      await updateService(serviceId, normalizedData);
      toast.success("Service updated successfully");
      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      console.error("Error updating service:", error);
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

  if (!service) {
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
              Update Service
            </span>
          </Button>
        </div>
        <ServiceForm onSubmit={handleEdit} defaultValues={service} />
      </div>
    </>
  );
}
