import AdminNavbar from "@/src/components/admin/admin-header";
import { SkillList } from "@/src/components/admin/skill-list";
import { skillServiceServer } from "@/src/server/services/skill.service";

export default async function AdminSkillsPage() {
  try {
    const skills = await skillServiceServer.getAllSkills();

    return (
      <>
        <AdminNavbar />
        <SkillList skills={skills} />
      </>
    );
  } catch (error) {
    console.error("Error loading admin skills:", error);
    return (
      <>
        <AdminNavbar />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-neutral-600">Failed to load skills</p>
        </div>
      </>
    );
  }
}
