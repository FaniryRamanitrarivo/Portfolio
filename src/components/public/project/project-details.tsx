// components/project/project-detail.tsx
import type { Project } from "@/src/types/projects";
import Link from "next/link";
import { FaRegLightbulb } from "react-icons/fa6";
import { MdDone, MdErrorOutline } from "react-icons/md";

export default function ProjectDetail({ project }: { project: Project }) {

  return (
    <article className="p-6 sm:p-8 lg:p-12">
      <header className="mb-6 sm:mb-8">
        <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-wider rounded-full">{project.category}</span>
        <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-neutral-900">{project.title}</h2>
      </header>
      <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-6 sm:mb-8">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-xs sm:text-sm text-neutral-500 mb-1">Role</p>
          <p className="text-sm sm:text-base font-medium text-neutral-900">{project.role}</p>
        </div>
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-xs sm:text-sm text-neutral-500 mb-1">Client</p>
          <p className="text-sm sm:text-base font-medium text-neutral-900">{project.client}</p>
        </div>
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-xs sm:text-sm text-neutral-500 mb-1">Duration</p>
          <p className="text-sm sm:text-base font-medium text-neutral-900">{project.duration}</p>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 mb-3 sm:mb-4">Overview</h3>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {project.overview}
          </p>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 mb-3 sm:mb-4">My Role</h3>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">{project.role}</p>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 mb-3 sm:mb-4">Key Results</h3>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">

            {project.keyResults.map((value, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-accent-50 rounded-xl">
                <MdDone className="text-accent-600 text-lg sm:text-xl mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-neutral-700">{value}</p>
              </div>
            ))}

          </div>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 mb-3 sm:mb-4">Challenges</h3>
          <ul className="space-y-2 sm:space-y-3">
            {project.challenges.map((value, index) => (
              <li key={index} className="flex items-start space-x-3">
                <MdErrorOutline className="text-orange-500 text-lg sm:text-xl mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-neutral-600">{value}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 mb-3 sm:mb-4">Solutions</h3>
          <ul className="space-y-2 sm:space-y-3">

            {project.solutions.map((value, index) => (
              <li key={index} className="flex items-start space-x-3">
                <FaRegLightbulb className="text-accent-600 text-lg sm:text-xl mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-neutral-600">{value}</p>
              </li>
            ))}

          </ul>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 mb-3 sm:mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((value, index) => (
              <span key={index} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-xs sm:text-sm font-medium">{value}</span>

            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-neutral-200">
          {project.github && (
            <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-github-fill"></i>
              <span className="text-sm sm:text-base">View Code</span>
            </Link>
          )}
          {project.link && (
            <Link href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-6 py-3 bg-accent-600 text-white rounded-full hover:bg-accent-700 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-external-link-line"></i>
              <span className="text-sm sm:text-base">Live Demo</span>
            </Link>
          )}
        </div>
      </div>

    </article>
  );
}
