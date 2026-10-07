import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    FiEdit,
    FiPackage,
    FiPlus,
    FiTrash2,
} from "react-icons/fi";

export default function Index({ products, flash, admin }) {
    const deleteProduct = (id) => {
        if (
            confirm(
                "Are you sure you want to delete this product?"
            )
        ) {
            router.delete(
                route("admin.products.destroy", id),
                {
                    preserveScroll: true,
                }
            );
        }
    };

    return (
        <DashboardLayout
            admin={admin}
            title="Products"
        >
            <Head title="Products" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <FiPackage className="text-2xl text-indigo-600" />

                                <h1 className="text-2xl font-bold text-gray-800">
                                    Products
                                </h1>
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your store products.
                            </p>
                        </div>

                        <Link
                            href={route(
                                "admin.products.create"
                            )}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            <FiPlus />
                            Add Product
                        </Link>
                    </div>

                    {/* Success Message */}
                    {flash?.success && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {flash.success}
                        </div>
                    )}

                    {/* Products Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow">

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">

                                {/* Table Header */}
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Product
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Brand
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Price
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Discount
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-200">

                                    {products?.data?.length > 0 ? (
                                        products.data.map(
                                            (product, index) => (
                                                <tr
                                                    key={product.id}
                                                    className="transition hover:bg-gray-50"
                                                >
                                                    {/* Number */}
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {(products.current_page -
                                                            1) *
                                                            products.per_page +
                                                            index +
                                                            1}
                                                    </td>

                                                    {/* Product */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">

                                                            {product.preview ? (
                                                                <img
                                                                    src={`/storage/${product.preview}`}
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    className="h-12 w-12 rounded-lg object-cover"
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        e.currentTarget.style.display =
                                                                            "none";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                                                    <FiPackage className="text-lg text-gray-400" />
                                                                </div>
                                                            )}

                                                            <div className="min-w-0">
                                                                <p className="truncate font-semibold text-gray-800">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </p>

                                                                <p className="truncate text-xs text-gray-500">
                                                                    {
                                                                        product.slug
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Brand */}
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {product.brand ||
                                                            "N/A"}
                                                    </td>

                                                    {/* Category */}
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {product.category
                                                            ?.name ||
                                                            "N/A"}
                                                    </td>

                                                    {/* Price */}
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-700">
                                                        ৳
                                                        {Number(
                                                            product.price
                                                        ).toLocaleString(
                                                            "en-BD"
                                                        )}
                                                    </td>

                                                    {/* Discount */}
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {product.discount ??
                                                            0}
                                                        %
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-2">

                                                            {/* Edit */}
                                                            <Link
                                                                href={route(
                                                                    "admin.products.edit",
                                                                    product.id
                                                                )}
                                                                className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                                                            >
                                                                <FiEdit />
                                                                Edit
                                                            </Link>

                                                            {/* Delete */}
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteProduct(
                                                                        product.id
                                                                    )
                                                                }
                                                                className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
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
                                                colSpan={7}
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center">

                                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                                        <FiPackage className="text-2xl text-gray-400" />
                                                    </div>

                                                    <h3 className="font-semibold text-gray-700">
                                                        No products found
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Start by adding your first product.
                                                    </p>

                                                    <Link
                                                        href={route(
                                                            "admin.products.create"
                                                        )}
                                                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                                    >
                                                        <FiPlus />
                                                        Add Product
                                                    </Link>

                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {products?.links?.length > 3 && (
                            <div className="flex flex-wrap items-center justify-center gap-2 border-t border-gray-200 px-6 py-4">

                                {products.links.map(
                                    (link, index) => (
                                        <Link
                                            key={index}
                                            href={
                                                link.url ?? "#"
                                            }
                                            preserveScroll
                                            preserveState
                                            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
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
                </div>
            </div>
        </DashboardLayout>
    );
}