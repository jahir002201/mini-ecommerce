import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function HomeNavbar() {
    const [open, setOpen] = useState(false);
    const { url } = usePage();

    const isActive = (path) => {
        return url === path;
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-extrabold text-indigo-600"
                >
                    Mini E-Commerce
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className={`font-medium transition ${
                            isActive("/")
                                ? "text-indigo-600"
                                : "text-gray-700 hover:text-indigo-600"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/shop"
                        className={`font-medium transition ${
                            url.startsWith("/shop")
                                ? "text-indigo-600"
                                : "text-gray-700 hover:text-indigo-600"
                        }`}
                    >
                        Shop
                    </Link>

                    <Link
                        href="/about"
                        className="font-medium text-gray-700 transition hover:text-indigo-600"
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className="font-medium text-gray-700 transition hover:text-indigo-600"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right Side */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/customer/login"
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
                    >
                        Login
                    </Link>

                    <Link
                        href="/customer/register"
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="border-t bg-white md:hidden">
                    <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">

                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            Home
                        </Link>

                        <Link
                            href="/shop"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            Shop
                        </Link>

                        <Link
                            href="/about"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            About
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            Contact
                        </Link>

                        <div className="flex gap-3 border-t pt-4">
                            <Link
                                href="/customer/login"
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700"
                            >
                                Login
                            </Link>

                            <Link
                                href="/customer/register"
                                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white"
                            >
                                Register
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}