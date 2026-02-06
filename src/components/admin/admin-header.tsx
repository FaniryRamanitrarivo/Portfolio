import { TbLogout2 } from "react-icons/tb";

export default function AdminNavbar() {
    return (
        <header>
            <nav className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-xl font-bold font-display text-neutral-900">
                                Admin <span className="text-accent-600">Dashboard</span>
                            </h1>
                        </div>
                        <button className="px-4 py-2 text-sm text-neutral-700 flex items-center hover:text-neutral-900 transition-colors cursor-pointer whitespace-nowrap">
                            <TbLogout2 className="ri-logout-box-line mr-2" />Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}