import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { projectServiceServer } from "@/src/server/services/project.service";
import { ProjectManager } from "./project-manager";

export default async function AdminProject() {
  let featured, rest;
  try {
    [featured, rest] = await Promise.all([
      projectServiceServer.getFeaturedProjects(6),
      projectServiceServer.getNonFeaturedProjects(),
    ]);
  } catch (error) {
    console.error("Error loading admin projects:", error);
    return (
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-neutral-600">Failed to load projects</p>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Projects</h2>
          <p className="text-neutral-600 mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-6 py-3 bg-neutral-900 text-white rounded-lg flex items-center space-x-2"
        >
          <MdAdd className="mr-1" />
          Add New Project
        </Link>
      </div>

      <ProjectManager featured={featured} rest={rest} />
    </div>
  );
}