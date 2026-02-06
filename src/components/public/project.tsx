import SectionTitle from "../ui/section-title";
import type { Project } from "../../types/projects";
import { api } from "../../lib/front/api/api";
import ProjectView from "./project/project-view";

export default async function Project() {

    const projects = await api.projects.latest(6);

    return (
        <section id="projects" className="py-16 sm:py-24 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <SectionTitle name="Portfolio" title="Featured Projects" />
                    <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                        Real-world solutions delivering measurable results for clients worldwide
                    </p>
                </div>
                <div className="flex justify-center mb-12">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {projects.length === 0 ? (
                            <p>No projects found</p>
                        ) : (
                            projects.map((p) => <ProjectView key={p.id} project={p} />)
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
