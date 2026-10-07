import { Link, usePage, useForm } from "@inertiajs/react";

import {
    FiBox,
    FiShoppingCart,
    FiUsers,
    FiTag,
    FiGrid,
    FiLayers,
    FiPackage,
    FiLogOut,
    FiX,
    FiHome,
} from "react-icons/fi";

export default function AdminSidebar({ open, onClose }) {
    const { url } = usePage();

    const { post, processing } = useForm();

    const logout = (e) => {
        e.preventDefault();

        post(route("admin.logout"));
    };

    const navigation = [
        {
            name: "Dashboard",
            href: route("admin.dashboard"),
            icon: FiHome,
        },
        {
            name: "Categories",
            href: route("admin.categories.index"),
            icon: FiGrid,
        },
        {
            name: "Subcategories",
            href: route("admin.subcategories.index"),
            icon: FiLayers,
        },
        {
            name: "Products",
            href: route("admin.products.index"),
            icon: FiBox,
        },
        {
            name: "Inventory",
            href: route("admin.inventories.index"),
            icon: FiPackage,
        },
        {
            name: "Customers",
            href: route("admin.customers.index"),
            icon: FiUsers,
        },
        {
            name: "Orders",
            href: route("admin.orders.index"),
            icon: FiShoppingCart,
        },
        {
            name: "Coupons",
            href: route("admin.coupons.index"),
            icon: FiTag,
        },
    ];

    const isActive = (href) => {
        try {
            const pathname = new URL(href).pathname;

            return url === pathname || url.startsWith(`${pathname}/`);
        } catch {
            return false;
        }
    };

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-50
                w-64 transform
                bg-gray-900 text-white
                transition-transform duration-300
                lg:translate-x-0
                ${
                    open
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
            `}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-gray-800 px-5">
                <Link
                    href={route("admin.dashboard")}
                    className="text-lg font-bold"
                >
                    Mini E-Commerce
                </Link>

                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-2 hover:bg-gray-800 lg:hidden"
                >
                    <FiX size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 p-4">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className={`
                                flex items-center gap-3
                                rounded-lg px-4 py-3
                                text-sm font-medium
                                transition
                                ${
                                    active
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }
                            `}
                        >
                            <Icon size={19} />

                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4">
                <form onSubmit={logout}>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-gray-800 hover:text-red-300 disabled:opacity-50"
                    >
                        <FiLogOut size={19} />

                        {processing
                            ? "Logging out..."
                            : "Logout"}
                    </button>
                </form>
            </div>
        </aside>
    );
}