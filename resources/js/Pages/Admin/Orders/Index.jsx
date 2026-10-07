import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from '@inertiajs/react';
import {
    FiEdit,
    FiPlus,
    FiShoppingCart,
    FiTrash2,
} from 'react-icons/fi';

export default function Index({ orders, flash, admin }) {
    const deleteOrder = (id) => {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(route('admin.orders.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <DashboardLayout admin={admin} title="Orders">
            <Head title="Orders" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8">

                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <FiShoppingCart className="text-2xl text-indigo-600" />

                                <h1 className="text-2xl font-bold">
                                    Orders
                                </h1>
                            </div>

                            <p className="text-sm text-gray-500">
                                Manage customer orders.
                            </p>
                        </div>

                        <Link
                            href={route('admin.orders.create')}
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white"
                        >
                            <FiPlus />
                            Create Order
                        </Link>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-green-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Order ID
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Sub Total
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Total
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Payment
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs uppercase text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {orders.data?.length > 0 ? (
                                        orders.data.map(
                                            (order, index) => (
                                                <tr key={order.id}>
                                                    <td className="px-6 py-4 text-sm">
                                                        {(orders.current_page -
                                                            1) *
                                                            orders.per_page +
                                                            index +
                                                            1}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm font-semibold">
                                                        {order.order_id}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm">
                                                        {order.customer?.name ??
                                                            'N/A'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm">
                                                        ৳{order.sub_total}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm font-semibold">
                                                        ৳{order.total}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm">
                                                        {order.paymentmethod}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                                            {order.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                href={route(
                                                                    'admin.orders.edit',
                                                                    order.id
                                                                )}
                                                                className="rounded-lg bg-blue-50 px-3 py-2 text-blue-600"
                                                            >
                                                                <FiEdit />
                                                            </Link>

                                                            <button
                                                                onClick={() =>
                                                                    deleteOrder(
                                                                        order.id
                                                                    )
                                                                }
                                                                className="rounded-lg bg-red-50 px-3 py-2 text-red-600"
                                                            >
                                                                <FiTrash2 />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="px-6 py-12 text-center text-gray-500"
                                            >
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}