import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { SECTIONS } from "../../lib/front/constant";
import { scrollToSection } from "../../lib/front/animation/scroll";

const socialsMediaLinks = {
    'email': 'faniryram0@gmail.com',
    'linkedin': '#',
    'github': '#',
}

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-12 text-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div className="sm:col-span-2">
                        <p className="text-neutral-400 leading-relaxed max-w-md">Faniry — Web Data Scraping &amp; Full-Stack Developer delivering reliable data collection solutions and production-grade web applications.</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-display text-xl mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {SECTIONS.map(({ id, label }) =>
                            (
                                <li key={id}>
                                    <Link
                                        href={`#${id}`}
                                        className="text-neutral-400 hover:text-accent-400 transition-colors cursor-pointer"
                                        onClick={scrollToSection}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold font-display text-xl mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <Link href={socialsMediaLinks.github} target="_blank" className="w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-accent-600 rounded-lg transition-colors cursor-pointer">
                                <FaGithub />
                            </Link>
                            <Link href={socialsMediaLinks.linkedin} target="_blank" className="w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-accent-600 rounded-lg transition-colors cursor-pointer">
                                <FaLinkedinIn />
                            </Link>
                            <Link href={socialsMediaLinks.email} target="_blank" className="w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-accent-600 rounded-lg transition-colors cursor-pointer">
                                <MdOutlineEmail />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}