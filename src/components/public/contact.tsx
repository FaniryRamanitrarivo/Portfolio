import SectionTitle from "../ui/section-title";
import { MdOutlineEmail } from "react-icons/md";
import { SocialLink } from "../ui/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import ContactForm from "./contact-form";

const socialsMediaLinks = {
    'email': 'faniryram0@gmail.com',
    'linkedin': 'https://www.linkedin.com/in/faniriniaina-andry-ramanitrarivo-59b47b249',
    'github': 'https://github.com/FaniryRamanitrarivo',
}

export default function Contact() {
    return (
        <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-accent-50/30 to-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <SectionTitle name="Get In Touch" title="Let's Build Something Amazing" />
                    <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                        Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life
                    </p>
                </div>
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 mb-4">
                            Quick Response Guaranteed
                        </h3>
                        <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life
                        </p>
                        <div className="space-y-4">
                            <SocialLink
                                href={`mailto:${socialsMediaLinks.email}`}
                                label="Email"
                                icon={<MdOutlineEmail />}
                                description={socialsMediaLinks.email}
                            />
                            <SocialLink
                                href={socialsMediaLinks.linkedin}
                                label="LinkedIn"
                                icon={<FaLinkedinIn />}
                                description="Connect with me"
                            />
                            <SocialLink
                                href={socialsMediaLinks.github}
                                label="GitHub"
                                icon={<FaGithub />}
                                description="View my code"
                            />
                        </div>
                        <div className="pt-4">
                            <p className="text-sm text-neutral-500 mb-3">Available for:</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">Freelance Projects</span>
                                <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">Consulting</span>
                                <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">Long-term Contracts</span>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}
