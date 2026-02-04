import { Project } from "@/src/types/projects";
import Link from "next/link";

type ProjectViewProps = {
  project: Project;
};

export default function ProjectView({ project }: ProjectViewProps ) {

    const stacks = project.technologies.length > 3 ? 
        [
            ...project.technologies.slice(0,3),
            "+3"
        ]: 
        project.technologies;

    return(
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-48 sm:h-64 overflow-hidden">
                <img 
                    alt={ project.title } 
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" 
                    src={ project.image }
                     />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 rounded-full text-sm font-medium">{ project.category }</span>
                </div>
            </div>
            <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 group-hover:text-accent-600 transition-colors">{ project.title }</h3>
                <p className="text-sm sm:text-base text-neutral-600 mb-4 leading-relaxed">{ project.overview }</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {stacks.map((value, key ) => (
                        <span key={key} className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium">{ value }</span>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`/projects/${project.id}`} className="px-4 sm:px-6 py-2 bg-white text-neutral-900 rounded-full font-medium text-sm hover:bg-accent-600 hover:text-white transition-colors whitespace-nowrap cursor-pointer border border-neutral-200">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}