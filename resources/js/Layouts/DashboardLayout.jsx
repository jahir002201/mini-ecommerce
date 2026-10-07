import { useState } from "react";
import { Head } from "@inertiajs/react";

import AdminSidebar from "@/Components/Admin/AdminSidebar";
import AdminNavbar from "@/Components/Admin/AdminNavbar";

export default function DashboardLayout({
    children,
    admin,
    title = "Admin Dashboard",
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Head title={title} />

            <div className="min-h-screen bg-gray-100">
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <AdminSidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Area */}
                <div className="lg:pl-64">
                    {/* Navbar */}
                    <AdminNavbar
                        admin={admin}
                        onMenuClick={() => setSidebarOpen(true)}
                    />

                    {/* Page Content */}
                    <main className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}