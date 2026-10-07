import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { props } = usePage();

    const customer = props.auth?.customer;

    return (
        <footer className="bg-gray-900 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className="grid gap-10 md:grid-cols-4">

                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link
                            href="/"
                            className="text-2xl font-bold"
                        >
                            Mini E-Commerce
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
                            Your simple online shopping destination.
                            Discover quality products at great prices
                            and enjoy an easy shopping experience.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Quick Links
                        </h3>

                        <div className="mt-4 space-y-3">
                            <Link
                                href="/"
                                className="block text-sm text-gray-400 hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                href="/shop"
                                className="block text-sm text-gray-400 hover:text-white"
                            >
                                Shop
                            </Link>

                            <Link
                                href="/about"
                                className="block text-sm text-gray-400 hover:text-white"
                            >
                                About
                            </Link>

                            <Link
                                href="/contact"
                                className="block text-sm text-gray-400 hover:text-white"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Account
                        </h3>

                        {/* Customer Authentication */}
                        {customer ? (
                            <div className="mt-4 space-y-3">

                                <Link
                                    href="/customer/logout"
                                    method="post"
                                    as="button"
                                    className="block text-sm text-gray-400 hover:text-white"
                                >
                                    Logout
                                </Link>

                            </div>
                        ) : (
                            <div className="mt-4 space-y-3">

                                <Link
                                    href="/customer/login"
                                    className="block text-sm text-gray-400 hover:text-white"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/customer/register"
                                    className="block text-sm text-gray-400 hover:text-white"
                                >
                                    Register
                                </Link>

                            </div>
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 border-t border-gray-800 pt-6 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Mini E-Commerce.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}