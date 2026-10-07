import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import {
    FiEdit,
    FiFolder,
    FiPlus,
    FiTrash2,
} from "react-icons/fi";

export default function Index({ admin, subcategories, flash }) {
    const deleteSubcategory = (id) => {
        if (
            confirm(
                "Are you sure you want to delete this subcategory?"
            )
        ) {
            router.delete(
                route("admin.subcategories.destroy", id),
                {
                    preserveScroll: true,
                }
            );
        }
    };

    return (
        <DashboardLayout admin={admin} title="Subcategories">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <FiFolder className="text-2xl text-indigo-600" />

                        <h1 className="text-2xl font-bold text-gray-800">
                            Subcategories
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your product subcategories.
                    </p>
                </div>

                <Link
                    href={route("admin.subcategories.create")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    <FiPlus />
                    Add Subcategory
                </Link>
            </div>

            {/* Flash Message */}
            {flash?.success && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {flash.success}
                </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-xl bg-white shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    #
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Image
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white">
                            {subcategories.data?.length > 0 ? (
                                subcategories.data.map(
                                    (subcategory, index) => (
                                        <tr
                                            key={subcategory.id}
                                            className="hover:bg-gray-50"
                                        >
                                            {/* Number */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                {(subcategories.current_page -
                                                    1) *
                                                    subcategories.per_page +
                                                    index +
                                                    1}
                                            </td>

                                            {/* Image */}
                                            <td className="px-6 py-4">
                                                {subcategory.image ? (
                                                    <img
                                                        src={`/storage/${subcategory.image}`}
                                                        alt={
                                                            subcategory.name
                                                        }
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                                                        <FiFolder className="text-xl" />
                                                    </div>
                                                )}
                                            </td>

                                            {/* Name */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-800">
                                                {subcategory.name}
                                            </td>

                                            {/* Category */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                {subcategory.category?.name ??
                                                    "N/A"}
                                            </td>

                                            {/* Actions */}
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "admin.subcategories.edit",
                                                            subcategory.id
                                                        )}
                                                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                                                    >
                                                        <FiEdit />
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteSubcategory(
                                                                subcategory.id
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                                                    >
                                                        <FiTrash2 />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-12 text-center text-sm text-gray-500"
                                    >
                                        No subcategories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {subcategories.links?.length > 3 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 border-t border-gray-200 px-6 py-4">
                        {subcategories.links.map(
                            (link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? "#"}
                                    preserveScroll
                                    className={`rounded-lg px-3 py-2 text-sm ${
                                        link.active
                                            ? "bg-indigo-600 text-white"
                                            : link.url
                                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                              : "cursor-not-allowed bg-gray-50 text-gray-400"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}