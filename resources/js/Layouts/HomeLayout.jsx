import { Head } from "@inertiajs/react";
import HomeNavbar from "@/Components/HomeNavbar";
import Footer from "@/Components/Footer";

export default function HomeLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Mini E-Commerce" />

            <HomeNavbar />

            <main>{children}</main>

            <Footer />
        </div>
    );
}