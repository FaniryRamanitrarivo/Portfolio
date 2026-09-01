"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { TbLogout2 } from "react-icons/tb";
import { IoClose, IoMenu } from "react-icons/io5";

const NAV_LINKS = [
    { href: "/admin", label: "Projects" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/skills", label: "Skills" },
    { href: "/admin/education", label: "Education" },
    { href: "/admin/experience", label: "Experience" },
];

export default function AdminNavbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);

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
            <nav className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <h1 className="text-xl font-bold font-display text-neutral-900">
                                Admin <span className="text-accent-600">Dashboard</span>
                            </h1>

                            <div className="hidden sm:flex items-center space-x-1">
                                {NAV_LINKS.map(({ href, label }) => {
                                    const isActive = pathname === href;
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                                ? "bg-accent-50 text-accent-700"
                                                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button
                                className="hidden sm:flex px-4 py-2 text-sm text-neutral-700 items-center hover:text-neutral-900 transition-colors cursor-pointer whitespace-nowrap"
                                onClick={() => signOut({ callbackUrl: "/login" })}>
                                <TbLogout2 className="ri-logout-box-line mr-2" />Logout
                            </button>

                            {/* Hamburger */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="sm:hidden text-neutral-600"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={`sm:hidden transition-all duration-300 overflow-hidden ${
                        isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-4 pb-4 pt-2 space-y-1 bg-white border-t border-neutral-200">
                        {NAV_LINKS.map(({ href, label }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "bg-accent-50 text-accent-700"
                                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                                        }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                        <button
                            className="w-full px-3 py-2 text-sm text-neutral-700 flex items-center hover:text-neutral-900 transition-colors cursor-pointer"
                            onClick={() => {
                                setIsOpen(false);
                                signOut({ callbackUrl: "/login" });
                            }}>
                            <TbLogout2 className="ri-logout-box-line mr-2" />Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}