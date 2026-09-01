import SectionTitle from "../ui/section-title";
import { Card } from "../ui/card";
import { ICON_OPTIONS } from "@/src/lib/shared/icon-registry";
import { skillServiceServer } from "@/src/server/services/skill.service";

export default async function Skills() {
    let skills;
    try {
        skills = await skillServiceServer.getAllSkills();
    } catch (error) {
        console.error("Error loading skills:", error);
        return (
            <section id="skills" className="py-16 sm:py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-neutral-600 text-center">
                        Failed to load skills
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <SectionTitle name="Expertise" title="Skills & Technologies" />
                    <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                        Practical expertise across the full development stack
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.length === 0 ? (
                        <p className="text-neutral-600 text-center">No skills found</p>
                    ) : (
                        skills.map((skill) => {
                            const Icon = ICON_OPTIONS[skill.icon];

                            return (
                                <Card.Container key={skill.id} className={`${skill.isSpeciality ? 'bg-gradient-to-br from-accent-50 to-accent-100/50 border-2 border-accent-300' : 'border-neutral-200 hover:border-accent-300'}`}>
                                    {skill.isSpeciality && (
                                        <div className="absolute -top-3 left-6 px-3 py-1 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                                            Specialty
                                        </div>
                                    )}

                                    <Card.Icon parentClassName={`${skill.isSpeciality && 'bg-accent-600'}`} className={`${skill.isSpeciality && 'text-white'}`}>
                                        <Icon />
                                    </Card.Icon>
                                    <Card.Title>
                                        {skill.title}
                                    </Card.Title>
                                    <Card.Description>
                                        {skill.description}
                                    </Card.Description>
                                    <Card.ListContainer className="space-y-2 flex flex-wrap gap-2 ">
                                        {skill.lists.map((item, id) => (
                                            <Card.ListItem key={id} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${skill.isSpeciality ? 'bg-white text-accent-700 border border-accent-200' : 'bg-neutral-100 text-neutral-700'}`}>
                                                {item}
                                            </Card.ListItem>
                                        )
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
