import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FiMenu,
    FiX,
    FiLogIn,
    FiUserPlus,
    FiLogOut,
    FiShoppingCart,
    FiHeart,
} from "react-icons/fi";

export default function HomeNavbar() {
    const [open, setOpen] = useState(false);

    const { url, props } = usePage();

    const customer = props.auth?.customer;
    const cartCount = Number(props.cartCount ?? 0);
    const wishlistCount = Number(props.wishlistCount ?? 0);

    const isActive = (path) => url === path;

    const closeMenu = () => {
        setOpen(false);
    };

    // Reusable cart icon with count badge
    const CartIcon = () => (
        <span className="relative inline-flex">
            <FiShoppingCart className="text-xl" />

            {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {cartCount > 99 ? "99+" : cartCount}
                </span>
            )}
        </span>
    );

    // Reusable wishlist icon with count badge
    const WishlistIcon = () => (
        <span className="relative inline-flex">
            <FiHeart className="text-xl" />

            {wishlistCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
            )}
        </span>
    );

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
                <div className="hidden items-center gap-4 md:flex">
                    {customer ? (
                        <>
                            {/* Cart */}
                            <Link
                                href="/customer/cart"
                                aria-label={`Cart, ${cartCount} items`}
                                className={`flex items-center gap-2 font-medium transition ${
                                    url.startsWith("/customer/cart")
                                        ? "text-indigo-600"
                                        : "text-gray-700 hover:text-indigo-600"
                                }`}
                            >
                                <CartIcon />
                            </Link>

                            {/* Wishlist */}
                            <Link
                                href="/customer/wishlist"
                                aria-label={`Wishlist, ${wishlistCount} products`}
                                className={`flex items-center gap-2 font-medium transition ${
                                    url.startsWith("/customer/wishlist")
                                        ? "text-pink-600"
                                        : "text-gray-700 hover:text-pink-600"
                                }`}
                            >
                                <WishlistIcon />
                            </Link>

                            <span className="text-sm font-medium text-gray-700">
                                Hi, {customer.name}
                            </span>

                            {/* Logout */}
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
                    ) : (
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
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={open}
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

                        {/* Customer Cart and Wishlist */}
                        {customer && (
                            <>
                                <Link
                                    href="/customer/cart"
                                    onClick={closeMenu}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium ${
                                        url.startsWith("/customer/cart")
                                            ? "bg-indigo-50 text-indigo-600"
                                            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                                >
                                    <CartIcon />
                                    <span>Cart</span>
                                    <span className="ml-auto text-sm text-gray-500">
                                        {cartCount} items
                                    </span>
                                </Link>

                                <Link
                                    href="/customer/wishlist"
                                    onClick={closeMenu}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium ${
                                        url.startsWith("/customer/wishlist")
                                            ? "bg-pink-50 text-pink-600"
                                            : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                    }`}
                                >
                                    <WishlistIcon />
                                    <span>Wishlist</span>
                                    <span className="ml-auto text-sm text-gray-500">
                                        {wishlistCount} saved
                                    </span>
                                </Link>
                            </>
                        )}

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