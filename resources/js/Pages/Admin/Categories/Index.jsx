import FlashMessage from '@/Components/FlashMessage';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ categories, flash }) {
    const deleteCategory = (category) => {
        if (
            !window.confirm(
                `Are you sure you want to delete "${category.name}"?`
            )
        ) {
            return;
        }

        router.delete(
            route('admin.categories.destroy', category.id)
        );
    };

    return (
        <>
            <Head title="Categories" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Categories
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your product categories.
                            </p>
                        </div>

                        <Link
                            href={route('admin.categories.create')}
                            className="rounded-lg bg-indigo-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                        >
                            + Add Category
                        </Link>
                    </div>

                    {/* Success Error Message */}
                    <FlashMessage flash={flash} />

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="border-b bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Image
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Name
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Icon
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Subcategories
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Products
                                        </th>

                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {categories.data.length > 0 ? (
                                        categories.data.map(
                                            (category, index) => (
                                                <tr
                                                    key={category.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {categories.from +
                                                            index}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {category.image ? (
                                                            <img
                                                                src={`/storage/${category.image}`}
                                                                alt={category.name}
                                                                className="h-12 w-12 rounded-lg object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                        {category.name}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {category.icon || '-'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {
                                                            category.subcategories_count
                                                        }
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {category.products_count}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                href={route(
                                                                    'admin.categories.edit',
                                                                    category.id
                                                                )}
                                                                className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100"
                                                            >
                                                                Edit
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteCategory(
                                                                        category
                                                                    )
                                                                }
                                                                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                                                            >
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
                                                colSpan="7"
                                                className="px-6 py-12 text-center text-gray-500"
                                            >
                                                No categories found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {categories.links?.length > 3 && (
                            <div className="flex flex-wrap gap-2 border-t px-6 py-4">
                                {categories.links.map(
                                    (link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`rounded-lg px-3 py-2 text-sm ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            } ${
                                                !link.url
                                                    ? 'pointer-events-none opacity-50'
                                                    : ''
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
        </>
    );
}