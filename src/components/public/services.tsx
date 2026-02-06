import { FiDatabase } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { FaArrowRight, FaCode } from "react-icons/fa6";
import { RiSpeedUpLine } from "react-icons/ri";
import Link from "next/link";
import SectionTitle from "../ui/section-title";
import { Card } from "../ui/card";

const services = [
    {
        title: "Data Extraction & Web Scraping",
        icon: <FiDatabase />,
        description: "Advanced JavaScript scraping solutions for complex websites. Large-scale data pipelines with automated data cleaning and normalization.",
        lists: [
            "Custom scraping scripts",
            "API integration",
            "Data validation",
            "Scheduled automation"
        ],
        link: '#'
    },
    {
        title: "Full-Stack Web Development",
        icon: <FaCode />,
        description: "Production-grade web applications built with modern technologies and best practices.",
        lists: [
            "React & Tailwind CSS",
            "Laravel & Symfony",
            "RESTful APIs",
            "Database design",
        ],
        link: '#'
    },
    {
        title: "Optimization & Maintenance",
        icon: <RiSpeedUpLine />,
        description: "Performance improvements and clean, maintainable architecture for existing systems.",
        lists: [
            "Code refactoring",
            "Performance tuning",
            "Bug fixes",
            "Technical debt reduction",
        ],
        link: '#'
    },
]

export default function Services() {
    return (
        <section id="services" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <SectionTitle name="What I Do" title="Services I Offer" />
                    <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                        Specialized solutions for data extraction, web development, and system optimization
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) =>
                    (
                        <Card.Container key={index} className="border-neutral-200 hover:border-accent-300">
                            <Card.Icon>
                                {service.icon}
                            </Card.Icon>
                            <Card.Title>
                                {service.title}
                            </Card.Title>
                            <Card.Description>
                                {service.description}
                            </Card.Description>
                            <Card.ListContainer className="space-y-2">
                                {service.lists.map((list, id) => (
                                    <Card.ListItem key={id} className="flex items-center text-sm text-neutral-600">
                                        <MdDone size={20} className="font-bold text-accent-600 mr-2" /> {list}
                                    </Card.ListItem>
                                )
                                )}
                                <div className="mt-6 flex items-center text-accent-600 font-medium group-hover:translate-x-2 transition-transform">
                                    <Link href={service.link}>
                                        Learn more <FaArrowRight className="inline-block ml-2" />
                                    </Link>
                                </div>
                            </Card.ListContainer>


                        </Card.Container>
                    )
                    )}
                </div>
            </div>
        </section>
    )
}