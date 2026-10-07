import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from '@inertiajs/react';
import {
    FiEdit,
    FiLayers,
    FiPlus,
    FiTrash2,
} from 'react-icons/fi';

export default function Index({ inventories, flash, admin }) {
    const deleteInventory = (id) => {
        if (confirm('Are you sure you want to delete this inventory?')) {
            router.delete(route('admin.inventories.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <DashboardLayout admin={admin} title="Inventory">
            <Head title="Inventory" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8">

                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <FiLayers className="text-2xl text-indigo-600" />

                                <h1 className="text-2xl font-bold text-gray-800">
                                    Inventory
                                </h1>
                            </div>

                            <p className="text-sm text-gray-500">
                                Manage product stock.
                            </p>
                        </div>

                        <Link
                            href={route('admin.inventories.create')}
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                        >
                            <FiPlus />
                            Add Inventory
                        </Link>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-green-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Product
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Size
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Color
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                                            Quantity
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs uppercase text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {inventories.data?.length > 0 ? (
                                        inventories.data.map(
                                            (inventory, index) => (
                                                <tr key={inventory.id}>
                                                    <td className="px-6 py-4 text-sm">
                                                        {(inventories.current_page -
                                                            1) *
                                                            inventories.per_page +
                                                            index +
                                                            1}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm font-semibold">
                                                        {inventory.product?.name ??
                                                            'N/A'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm">
                                                        {inventory.size?.name ??
                                                            'N/A'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm">
                                                        {inventory.color?.name ??
                                                            'N/A'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm font-semibold">
                                                        {inventory.quantity}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                href={route(
                                                                    'admin.inventories.edit',
                                                                    inventory.id
                                                                )}
                                                                className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600"
                                                            >
                                                                <FiEdit />
                                                            </Link>

                                                            <button
                                                                onClick={() =>
                                                                    deleteInventory(
                                                                        inventory.id
                                                                    )
                                                                }
                                                                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
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
                                                No inventory records found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {inventories.links?.length > 3 && (
                            <div className="flex flex-wrap justify-center gap-2 border-t px-6 py-4">
                                {inventories.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        className={`rounded-lg px-3 py-2 text-sm ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}