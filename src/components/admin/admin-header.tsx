"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { TbLogout2 } from "react-icons/tb";

const NAV_LINKS = [
    { href: "/admin", label: "Projects" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/skills", label: "Skills" },
];

export default function AdminNavbar() {
    const pathname = usePathname();

    return (
        <header>
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
                        <button
                            className="px-4 py-2 text-sm text-neutral-700 flex items-center hover:text-neutral-900 transition-colors cursor-pointer whitespace-nowrap"
                            onClick={() => signOut({ callbackUrl: "/login" })}>
                            <TbLogout2 className="ri-logout-box-line mr-2" />Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}