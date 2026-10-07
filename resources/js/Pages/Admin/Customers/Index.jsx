import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from '@inertiajs/react';
import {
    FiEdit,
    FiPlus,
    FiTrash2,
    FiUsers,
} from 'react-icons/fi';

export default function Index({ customers, flash, admin }) {
    const deleteCustomer = (id) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            router.delete(route('admin.customers.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <DashboardLayout admin={admin} title="Customers">
            <Head title="Customers" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8">

                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <FiUsers className="text-2xl text-indigo-600" />

                                <h1 className="text-2xl font-bold">
                                    Customers
                                </h1>
                            </div>

                            <p className="text-sm text-gray-500">
                                Manage registered customers.
                            </p>
                        </div>

                        <Link
                            href={route('admin.customers.create')}
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white"
                        >
                            <FiPlus />
                            Add Customer
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
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Email
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Phone
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Country
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs uppercase text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {customers.data?.length > 0 ? (
                                        customers.data.map(
                                            (customer, index) => (
                                                <tr key={customer.id}>
                                                    <td className="px-6 py-4 text-sm">
                                                        {(customers.current_page -
                                                            1) *
                                                            customers.per_page +
                                                            index +
                                                            1}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {customer.photo ? (
                                                                <img
                                                                    src={`/storage/${customer.photo}`}
                                                                    alt={customer.name}
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                                                                    {customer.name
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </div>
                                                            )}

                                                            <span className="font-semibold">
                                                                {customer.name}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 text-sm">
                                                        {customer.email}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm">
                                                        {customer.phone || 'N/A'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm">
                                                        {customer.country || 'N/A'}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                href={route(
                                                                    'admin.customers.edit',
                                                                    customer.id
                                                                )}
                                                                className="rounded-lg bg-blue-50 px-3 py-2 text-blue-600"
                                                            >
                                                                <FiEdit />
                                                            </Link>

                                                            <button
                                                                onClick={() =>
                                                                    deleteCustomer(
                                                                        customer.id
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
                                                colSpan="6"
                                                className="px-6 py-12 text-center text-gray-500"
                                            >
                                                No customers found.
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