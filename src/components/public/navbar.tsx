"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "../ui/logo";
import { CustomLink, NavigationLink } from "../ui/link";
import { FaArrowRight } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import { scrollToSection } from "../../lib/front/animation/scroll";
import { SECTIONS } from "../../lib/front/constant";
import { useScrollSpy } from "../../hooks/useScrollSpy";

export default function Navbar() {
    const activeId = useScrollSpy(SECTIONS.map(s => s.id));
    const [isOpen, setIsOpen] = useState(false);

    const navRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (e: any) => {
        scrollToSection(e);
        setIsOpen(false);
    };

    // 👇 Click outside handler
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <header ref={navRef}>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        <Logo />

                        {/* Desktop */}
                        <ul className="hidden md:flex items-center space-x-1">
                            {SECTIONS.map(({ label, id }) => (
                                <NavigationLink
                                    key={id}
                                    href={`#${id}`}
                                    label={label}
                                    onClick={scrollToSection}
                                    isActive={activeId === id}
                                />
                            ))}
                        </ul>

                        <CustomLink
                            href="#contact"
                            label="Hire Me"
                            icon={<FaArrowRight />}
                            onClick={scrollToSection}
                            className="hidden md:flex space-x-1 px-4 lg:px-6 py-2 bg-neutral-900 text-white text-sm font-medium rounded-full"
                        />

                        {/* Hamburger */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-neutral-600"
                        >
                            {isOpen ? <IoClose size={32} /> : <IoMenu size={32} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${
                        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-4 pb-4 pt-2 space-y-2 bg-white shadow-md">
                        {SECTIONS.map(({ label, id }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                onClick={handleClick}
                                className={`block py-2 text-base font-medium ${
                                    activeId === id
                                        ? "text-black"
                                        : "text-neutral-500"
                                }`}
                            >
                                {label}
                            </a>
                        ))}

                        <CustomLink
                            href="#contact"
                            label="Hire Me"
                            icon={<FaArrowRight />}
                            onClick={handleClick}
                            className="flex justify-center space-x-1 mt-3 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-full"
                        />
                    </div>
                </div>
            </nav>
        </header>
    );
}