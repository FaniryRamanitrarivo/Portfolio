"use client";

import Link from "next/link";
import Logo from "./logo";
import { CustomLink, NavigationLink } from "../ui/link";
import { FaArrowRight } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { scrollToSection } from "../../lib/front/animation/scroll";
import { SECTIONS } from "../../lib/front/constant";
import { useScrollSpy } from "../../hooks/useScrollSpy";

export default function Navbar() {

    const activeId = useScrollSpy(SECTIONS.map(s => s.id));

    return (
        <header>
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-xl shadow-sm" style={{ transform: "none" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        <Logo />
                        <ul className="hidden md:flex items-center space-x-1">
                            {SECTIONS.map(({ label, id }) =>
                                <NavigationLink
                                    key={id}
                                    href={`#${id}`}
                                    label={label}
                                    onClick={scrollToSection}
                                    isActive={activeId === id}
                                />
                            )}
                        </ul>
                        <CustomLink
                            href="#contact"
                            label="Hire Me"
                            icon={<FaArrowRight className="inline-block" />}
                            onClick={scrollToSection}
                            className="hidden md:flex space-x-1 px-4 lg:px-6 py-2 sm:py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800"
                        />
                        <IoMenu size={35} className="block md:hidden hover:scale-105 text-neutral-500 transition-colors duration-300 cursor-pointer" />
                    </div>
                </div>
            </nav>
        </header>
    )
}