import AdminNavbar from "@/src/components/admin/admin-header";
import { EducationList } from "@/src/components/admin/education-list";
import { educationServiceServer } from "@/src/server/services/education.service";

export default async function AdminEducationPage() {
  let entries;
  try {
    entries = await educationServiceServer.getAllEducation();
  } catch (error) {
    console.error("Error loading admin education entries:", error);
    return (
      <>
        <AdminNavbar />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-neutral-600">Failed to load education entries</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <EducationList entries={entries} />
    </>
  );
}
