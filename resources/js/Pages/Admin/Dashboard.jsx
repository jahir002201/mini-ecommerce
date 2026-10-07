import DashboardLayout from "@/Layouts/DashboardLayout";

import StatCard from "@/Components/Admin/StatCard";
import QuickActions from "@/Components/Admin/QuickActions";
import RecentOrders from "@/Components/Admin/RecentOrders";

import {
    FiBox,
    FiGrid,
    FiUsers,
    FiShoppingCart,
} from "react-icons/fi";

export default function Dashboard({
    admin,
    stats = {},
    recentOrders = [],
}) {
    const cards = [
        {
            title: "Total Products",
            value: stats.products ?? 0,
            icon: FiBox,
            href: route("admin.products.index"),
        },
        {
            title: "Categories",
            value: stats.categories ?? 0,
            icon: FiGrid,
            href: route("admin.categories.index"),
        },
        {
            title: "Customers",
            value: stats.customers ?? 0,
            icon: FiUsers,
            href: route("admin.customers.index"),
        },
        {
            title: "Orders",
            value: stats.orders ?? 0,
            icon: FiShoppingCart,
            href: route("admin.orders.index"),
        },
    ];

    return (
        <DashboardLayout
            admin={admin}
            title="Admin Dashboard"
        >
            {/* Welcome */}
            <div className="mb-8 rounded-2xl bg-indigo-600 p-6 text-white shadow-lg sm:p-8">
                <p className="text-sm font-medium text-indigo-200">
                    Welcome back
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                    Hello, {admin?.name}!
                </h2>

                <p className="mt-2 max-w-2xl text-sm text-indigo-100 sm:text-base">
                    Manage your products, categories,
                    customers and orders from your
                    admin dashboard.
                </p>
            </div>


            {/* Statistics */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <StatCard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        href={card.href}
                    />
                ))}
            </div>


            {/* Quick Actions */}
            <QuickActions />


            {/* Recent Orders */}
            <RecentOrders
                orders={recentOrders}
            />
        </DashboardLayout>
    );
}