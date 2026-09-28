import { Head, Link, router } from '@inertiajs/react';
import {
    FiEdit,
    FiPackage,
    FiPlus,
    FiTrash2,
} from 'react-icons/fi';

export default function Index({ products, flash }) {
    const deleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Products" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

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
                            href={route('admin.products.create')}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            <FiPlus />
                            Add Product
                        </Link>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Product
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Brand
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Price
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Discount
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {products.data?.length > 0 ? (
                                        products.data.map((product, index) => (
                                            <tr
                                                key={product.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {(products.current_page - 1) *
                                                        products.per_page +
                                                        index +
                                                        1}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {product.preview ? (
                                                            <img
                                                                src={`/storage/${product.preview}`}
                                                                alt={product.name}
                                                                className="h-12 w-12 rounded-lg object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                                                                <FiPackage className="text-gray-400" />
                                                            </div>
                                                        )}

                                                        <div>
                                                            <p className="font-semibold text-gray-800">
                                                                {product.name}
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                {product.slug}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.brand || 'N/A'}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.category?.name || 'N/A'}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                                    ৳{product.price}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.discount}%
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={route(
                                                                'admin.products.edit',
                                                                product.id
                                                            )}
                                                            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100"
                                                        >
                                                            <FiEdit />
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteProduct(
                                                                    product.id
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                                                        >
                                                            <FiTrash2 />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-12 text-center text-sm text-gray-500"
                                            >
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {products.links?.length > 3 && (
                            <div className="flex flex-wrap justify-center gap-2 border-t px-6 py-4">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        className={`rounded-lg px-3 py-2 text-sm ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : link.url
                                                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                  : 'cursor-not-allowed bg-gray-50 text-gray-400'
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
        </>
    );
}