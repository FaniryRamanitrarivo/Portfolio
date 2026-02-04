import { FiDatabase, FiLayout, FiServer } from "react-icons/fi";
import SectionTitle from "./ui/section-title";
import { Card } from "./ui/card";
import { GrDatabase } from "react-icons/gr";
import { RiGlobalLine } from "react-icons/ri";

const skills = [
    {
        isSpeciality: true,
        title: "Primary Expertise — Data Extraction",
        icon: <FiDatabase />,
        description: "Building reliable, scalable data extraction systems that handle complex websites and deliver clean, structured data.",
        lists: [
            "Advanced JavaScript Scraping",
            "Large-scale Pipelines",
            "Data Parsing & Cleaning",
            "Performance Optimization"
        ],
    },
    {
        title: "Frontend Development",
        icon: <FiLayout />,
        description: "Creating modern, responsive user interfaces with component-based architecture and utility-first styling.",
        lists: [
            "React",
            "Tailwind CSS",
            "SCSS",
            "Component Architecture",
        ],
    },
    {
        title: "Backend Development",
        icon: <FiServer />,
        description: "Developing robust server-side applications with clean architecture and RESTful API design.",
        lists: [
            "Laravel",
            "Symfony",
            "REST API Design",
            "Authentication",
        ],
    },
    {
        title: "Databases",
        icon: <GrDatabase />,
        description: "Designing efficient database schemas and optimizing queries for performance and scalability.",
        lists: [
            "PostgreSQL",
            "MySQL",
            "SQLite",
            "Query Optimization",
        ],
    },
    {
        title: "Languages",
        icon: <RiGlobalLine />,
        description: "Communicating effectively with international clients and teams in professional settings.",
        lists: [
            "English (Professional)",
            "French (Native)",
        ],
    },
]

export default function Skills() {

    return(
        <section id="skills" className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <SectionTitle name="Expertise" title="Skills & Technologies"/>
                    <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                        Practical expertise across the full development stack
                    </p>
                </div>  
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, index) => 
                            (
                                <Card.Container key={index} className={`${skill.isSpeciality ? 'bg-gradient-to-br from-accent-50 to-accent-100/50 border-2 border-accent-300': 'border-neutral-200 hover:border-accent-300'}`}>
                                    {skill.isSpeciality && (
                                        <div className="absolute -top-3 left-6 px-3 py-1 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                                            Specialty
                                        </div>
                                    )}
                                    
                                    <Card.Icon parentClassName={`${skill.isSpeciality && 'bg-accent-600'}`} className={`${skill.isSpeciality && 'text-white'}`}>
                                        {skill.icon}
                                    </Card.Icon>
                                    <Card.Title>
                                        {skill.title}
                                    </Card.Title>
                                    <Card.Description>
                                        {skill.description}
                                    </Card.Description>
                                    <Card.ListContainer className="space-y-2 flex flex-wrap gap-2 ">
                                        {skill.lists.map((item, id) => (
                                                <Card.ListItem key={id} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${skill.isSpeciality ? 'bg-white text-accent-700 border border-accent-200': 'bg-neutral-100 text-neutral-700'}`}>
                                                    {item}
                                                </Card.ListItem>
                                            )
                                        )}
                                    </Card.ListContainer>
                                    
                                </Card.Container>
                            )
                        )}
                    </div>
            </div>
        </section>
    )

}