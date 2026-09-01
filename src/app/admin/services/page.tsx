import AdminNavbar from "@/src/components/admin/admin-header";
import { ServiceList } from "@/src/components/admin/service-list";
import { serviceServiceServer } from "@/src/server/services/service.service";

export default async function AdminServicesPage() {
  let services;
  try {
    services = await serviceServiceServer.getAllServices();
  } catch (error) {
    console.error("Error loading admin services:", error);
    return (
      <>
        <AdminNavbar />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-neutral-600">Failed to load services</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <ServiceList services={services} />
    </>
  );
}
