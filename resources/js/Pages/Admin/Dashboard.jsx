import { Head, Link, useForm } from '@inertiajs/react';
import {
    FiBox,
    FiShoppingCart,
    FiUsers,
    FiTag,
    FiGrid,
    FiLayers,
    FiPackage,
    FiLogOut,
    FiMenu,
    FiX,
    FiHome,
    FiDollarSign,
    FiPlus,
    FiList,
} from 'react-icons/fi';
import { useState } from 'react';

export default function Dashboard({
    admin,
    stats = {},
    recentOrders = [],
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { post, processing } = useForm();

    const logout = (e) => {
        e.preventDefault();

        post(route('admin.logout'));
    };

    const navigation = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            icon: FiHome,
        },
        {
            name: 'Categories',
            href: route('admin.categories.index'),
            icon: FiGrid,
        },
        {
            name: 'Subcategories',
            href: route('admin.subcategories.index'),
            icon: FiLayers,
        },
        {
            name: 'Products',
            href: route('admin.products.index'),
            icon: FiBox,
        },
        {
            name: 'Inventory',
            href: route('admin.inventories.index'),
            icon: FiPackage,
        },
        {
            name: 'Customers',
            href: route('admin.customers.index'),
            icon: FiUsers,
        },
        {
            name: 'Orders',
            href: route('admin.orders.index'),
            icon: FiShoppingCart,
        },
        {
            name: 'Coupons',
            href: route('admin.coupons.index'),
            icon: FiTag,
        },
    ];

    const cards = [
        {
            title: 'Total Products',
            value: stats.products ?? 0,
            icon: FiBox,
            href: route('admin.products.index'),
        },
        {
            title: 'Categories',
            value: stats.categories ?? 0,
            icon: FiGrid,
            href: route('admin.categories.index'),
        },
        {
            title: 'Customers',
            value: stats.customers ?? 0,
            icon: FiUsers,
            href: route('admin.customers.index'),
        },
        {
            title: 'Orders',
            value: stats.orders ?? 0,
            icon: FiShoppingCart,
            href: route('admin.orders.index'),
        },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gray-100">

                {/* =========================================
                    Mobile Overlay
                ========================================== */}

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* =========================================
                    Sidebar
                ========================================== */}

                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 text-white transition-transform duration-300 lg:translate-x-0 ${
                        sidebarOpen
                            ? 'translate-x-0'
                            : '-translate-x-full'
                    }`}
                >
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-between border-b border-gray-800 px-5">
                        <Link
                            href={route('admin.dashboard')}
                            className="text-lg font-bold"
                        >
                            Mini E-Commerce
                        </Link>

                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-lg p-2 hover:bg-gray-800 lg:hidden"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1 p-4">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() =>
                                        setSidebarOpen(false)
                                    }
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                                >
                                    <Icon size={19} />

                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Logout */}
                    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4">
                        <form onSubmit={logout}>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-gray-800 hover:text-red-300 disabled:opacity-50"
                            >
                                <FiLogOut size={19} />

                                {processing
                                    ? 'Logging out...'
                                    : 'Logout'}
                            </button>
                        </form>
                    </div>
                </aside>

                {/* =========================================
                    Main Area
                ========================================== */}

                <div className="lg:pl-64">

                    {/* =====================================
                        Top Navbar
                    ====================================== */}

                    <header className="sticky top-0 z-30 border-b bg-white">
                        <div className="flex h-16 items-center justify-between px-4 sm:px-6">

                            {/* Mobile Menu */}
                            <button
                                type="button"
                                onClick={() =>
                                    setSidebarOpen(true)
                                }
                                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                            >
                                <FiMenu size={23} />
                            </button>

                            {/* Page Title */}
                            <div className="hidden sm:block">
                                <h1 className="font-semibold text-gray-800">
                                    Admin Dashboard
                                </h1>

                                <p className="text-xs text-gray-500">
                                    Manage your store
                                </p>
                            </div>

                            {/* Admin */}
                            <div className="ml-auto flex items-center gap-3">
                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {admin.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Administrator
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                                    {admin.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* =====================================
                        Dashboard Content
                    ====================================== */}

                    <main className="p-4 sm:p-6 lg:p-8">

                        {/* Welcome */}
                        <div className="mb-8 rounded-2xl bg-indigo-600 p-6 text-white shadow-lg sm:p-8">
                            <p className="text-sm font-medium text-indigo-200">
                                Welcome back
                            </p>

                            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                                Hello, {admin.name}!
                            </h2>

                            <p className="mt-2 max-w-2xl text-sm text-indigo-100 sm:text-base">
                                Manage your products, categories,
                                customers and orders from your
                                admin dashboard.
                            </p>
                        </div>

                        {/* =================================
                            Statistics
                        ================================== */}

                        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {cards.map((card) => {
                                const Icon = card.icon;

                                return (
                                    <Link
                                        key={card.title}
                                        href={card.href}
                                        className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    {card.title}
                                                </p>

                                                <p className="mt-2 text-3xl font-bold text-gray-800">
                                                    {card.value}
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                                                <Icon size={24} />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* =================================
                            Quick Actions
                        ================================== */}

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

                                <Link
                                    href={route(
                                        'admin.categories.create'
                                    )}
                                    className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
                                        <FiPlus size={22} />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            Add Category
                                        </h4>

                                        <p className="text-xs text-gray-500">
                                            Create new category
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href={route(
                                        'admin.products.create'
                                    )}
                                    className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="rounded-lg bg-green-50 p-3 text-green-600">
                                        <FiPlus size={22} />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            Add Product
                                        </h4>

                                        <p className="text-xs text-gray-500">
                                            Create new product
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href={route(
                                        'admin.products.index'
                                    )}
                                    className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                                        <FiList size={22} />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            Products
                                        </h4>

                                        <p className="text-xs text-gray-500">
                                            Manage products
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href={route(
                                        'admin.orders.index'
                                    )}
                                    className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                                        <FiShoppingCart size={22} />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            Orders
                                        </h4>

                                        <p className="text-xs text-gray-500">
                                            Manage customer orders
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </section>

                        {/* =================================
                            Recent Orders
                        ================================== */}

                        <section className="rounded-xl bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b px-5 py-5 sm:px-6">
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Recent Orders
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Latest customer orders
                                    </p>
                                </div>

                                <Link
                                    href={route(
                                        'admin.orders.index'
                                    )}
                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    View All
                                </Link>
                            </div>

                            {recentOrders.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                                    Order ID
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                                    Customer
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                                    Total
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {recentOrders.map(
                                                (order) => (
                                                    <tr
                                                        key={
                                                            order.id
                                                        }
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                            {order.order_id}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                            {order.customer
                                                                ?.name ??
                                                                '-'}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                                            ${order.total}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <FiShoppingCart
                                        size={40}
                                        className="mx-auto text-gray-300"
                                    />

                                    <h4 className="mt-4 font-semibold text-gray-700">
                                        No orders yet
                                    </h4>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Customer orders will appear here.
                                    </p>
                                </div>
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}