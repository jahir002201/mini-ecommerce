import { Link } from "@inertiajs/react";

import {
    FiPlus,
    FiList,
    FiShoppingCart,
} from "react-icons/fi";

export default function QuickActions() {
    const actions = [
        {
            title: "Add Category",
            description: "Create new category",
            href: route("admin.categories.create"),
            icon: FiPlus,
            iconClass: "bg-indigo-50 text-indigo-600",
        },
        {
            title: "Add Product",
            description: "Create new product",
            href: route("admin.products.create"),
            icon: FiPlus,
            iconClass: "bg-green-50 text-green-600",
        },
        {
            title: "Products",
            description: "Manage products",
            href: route("admin.products.index"),
            icon: FiList,
            iconClass: "bg-blue-50 text-blue-600",
        },
        {
            title: "Orders",
            description: "Manage customer orders",
            href: route("admin.orders.index"),
            icon: FiShoppingCart,
            iconClass: "bg-orange-50 text-orange-600",
        },
    ];

    return (
        <section className="mb-8">
            <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-800">
                    Quick Actions
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Quickly manage your store.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div
                                className={`rounded-lg p-3 ${action.iconClass}`}
                            >
                                <Icon size={22} />
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-800">
                                    {action.title}
                                </h4>

                                <p className="text-xs text-gray-500">
                                    {action.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}