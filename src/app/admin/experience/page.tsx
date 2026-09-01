import AdminNavbar from "@/src/components/admin/admin-header";
import { ExperienceList } from "@/src/components/admin/experience-list";
import { experienceServiceServer } from "@/src/server/services/experience.service";

export default async function AdminExperiencePage() {
  let entries;
  try {
    entries = await experienceServiceServer.getAllExperience();
  } catch (error) {
    console.error("Error loading admin experience entries:", error);
    return (
      <>
        <AdminNavbar />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-neutral-600">Failed to load experience entries</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <ExperienceList entries={entries} />
    </>
  );
}
