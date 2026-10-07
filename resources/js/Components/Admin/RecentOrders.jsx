import { Link } from "@inertiajs/react";
import { FiShoppingCart } from "react-icons/fi";

export default function RecentOrders({
    orders = [],
}) {
    return (
        <section className="rounded-xl bg-white shadow-sm">

            {/* Header */}
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
                    href={route("admin.orders.index")}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                    View All
                </Link>
            </div>


            {/* Orders */}
            {orders.length > 0 ? (
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

                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                        {order.order_id}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {order.customer?.name ?? "-"}
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
                            ))}

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
    );
}