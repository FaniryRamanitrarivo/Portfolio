import { MdDone } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import SectionTitle from "../ui/section-title";
import { Card } from "../ui/card";
import { ICON_OPTIONS } from "@/src/lib/shared/icon-registry";
import { serviceServiceServer } from "@/src/server/services/service.service";

export default async function Services() {
    let services;
    try {
        services = await serviceServiceServer.getAllServices();
    } catch (error) {
        console.error("Error loading services:", error);
        return (
            <section id="services" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-neutral-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-neutral-600 text-center">
                        Failed to load services
                    </p>
                </div>
            </section>
        );
    }

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
                    {services.length === 0 ? (
                        <p className="text-neutral-600 text-center">No services found</p>
                    ) : (
                        services.map((service) => {
                            const Icon = ICON_OPTIONS[service.icon];

                            return (
                                <Card.Container key={service.id} className="border-neutral-200 hover:border-accent-300">
                                    <Card.Icon>
                                        <Icon />
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
                                        {service.link && (
                                            <div className="mt-6 flex items-center text-accent-600 font-medium group-hover:translate-x-2 transition-transform">
                                                <Link href={service.link}>
                                                    Learn more <FaArrowRight className="inline-block ml-2" />
                                                </Link>
                                            </div>
                                        )}
                                    </Card.ListContainer>


                                </Card.Container>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
