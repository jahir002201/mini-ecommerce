import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FiMenu,
    FiX,
    FiLogIn,
    FiUserPlus,
    FiLogOut,
} from "react-icons/fi";

export default function HomeNavbar() {
    const [open, setOpen] = useState(false);

    const { url, props } = usePage();

    const customer = props.auth?.customer;

    const isActive = (path) => {
        return url === path;
    };

    const closeMenu = () => {
        setOpen(false);
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
                        className={`font-medium transition ${
                            url.startsWith("/about")
                                ? "text-indigo-600"
                                : "text-gray-700 hover:text-indigo-600"
                        }`}
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className={`font-medium transition ${
                            url.startsWith("/contact")
                                ? "text-indigo-600"
                                : "text-gray-700 hover:text-indigo-600"
                        }`}
                    >
                        Contact
                    </Link>
                </nav>

                {/* Desktop Right Side */}
                <div className="hidden items-center gap-3 md:flex">

                    {!customer ? (
                        <>
                            <Link
                                href="/customer/login"
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
                            >
                                <FiLogIn />
                                Login
                            </Link>

                            <Link
                                href="/customer/register"
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >
                                <FiUserPlus />
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-sm font-medium text-gray-700">
                                Hi, {customer.name}
                            </span>

                            <Link
                                href="/customer/logout"
                                method="post"
                                as="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-500 hover:text-red-600"
                            >
                                <FiLogOut />
                                Logout
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {open ? (
                        <FiX className="text-xl" />
                    ) : (
                        <FiMenu className="text-xl" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="border-t border-gray-200 bg-white md:hidden">
                    <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">

                        {/* Home */}
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className={`block rounded-lg px-4 py-3 font-medium ${
                                isActive("/")
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            }`}
                        >
                            Home
                        </Link>

                        {/* Shop */}
                        <Link
                            href="/shop"
                            onClick={closeMenu}
                            className={`block rounded-lg px-4 py-3 font-medium ${
                                url.startsWith("/shop")
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            }`}
                        >
                            Shop
                        </Link>

                        {/* About */}
                        <Link
                            href="/about"
                            onClick={closeMenu}
                            className={`block rounded-lg px-4 py-3 font-medium ${
                                url.startsWith("/about")
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            }`}
                        >
                            About
                        </Link>

                        {/* Contact */}
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className={`block rounded-lg px-4 py-3 font-medium ${
                                url.startsWith("/contact")
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            }`}
                        >
                            Contact
                        </Link>

                        {/* Authentication */}
                        {!customer ? (
                            <div className="flex gap-3 border-t border-gray-200 pt-4">

                                <Link
                                    href="/customer/login"
                                    onClick={closeMenu}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700"
                                >
                                    <FiLogIn />
                                    Login
                                </Link>

                                <Link
                                    href="/customer/register"
                                    onClick={closeMenu}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                                >
                                    <FiUserPlus />
                                    Register
                                </Link>

                            </div>
                        ) : (
                            <div className="border-t border-gray-200 pt-4">

                                <div className="mb-3 rounded-lg bg-gray-50 px-4 py-3">
                                    <p className="text-xs text-gray-500">
                                        Logged in as
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        {customer.name}
                                    </p>
                                </div>

                                <Link
                                    href="/customer/logout"
                                    method="post"
                                    as="button"
                                    onClick={closeMenu}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:border-red-500 hover:text-red-600"
                                >
                                    <FiLogOut />
                                    Logout
                                </Link>

                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}