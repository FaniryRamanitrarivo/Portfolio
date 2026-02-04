export default function AdminNavbar() {
    return(
        <nav class="bg-white border-b border-neutral-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center space-x-3">
                        <img alt="Logo" class="h-8 w-8" src="https://public.readdy.ai/ai/img_res/fcc204b5-30c6-45b7-887a-2079d0941c5c.png">
                        <h1 class="text-xl font-bold font-display text-neutral-900">Admin Dashboard</h1>
                    </div>
                    <button class="px-4 py-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer whitespace-nowrap">
            <i class="ri-logout-box-line mr-2"></i>Logout
            </button>
            </div>
            </div>
            </nav>
    )
}