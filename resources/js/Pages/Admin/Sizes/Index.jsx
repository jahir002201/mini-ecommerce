
import { Head, Link, router, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index({ admin, sizes }) {
    const { flash = {} } = usePage().props;

    const sizeList = sizes?.data ?? [];

    const handleDelete = (size) => {
        if (!window.confirm(`Are you sure you want to delete "${size.name}"?`)) {
            return;
        }

        router.delete(route("admin.sizes.destroy", size.id), {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout admin={admin} title="Sizes">
            <Head title="Sizes" />

            <div className="space-y-6">
                {/* Page heading */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Size Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Create, view, update, and manage product sizes.
                        </p>
                    </div>

                    <Link
                        href={route("admin.sizes.create")}
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        + Add New Size
                    </Link>
                </div>

                {/* Flash messages */}
                {flash.success && (
                    <div
                        role="status"
                        className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                    >
                        {flash.success}
                    </div>
                )}

                {flash.error && (
                    <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {flash.error}
                    </div>
                )}

                {/* Sizes table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                        <h2 className="font-semibold text-gray-800">
                            All Sizes
                        </h2>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                            {sizes?.total ?? sizeList.length} total
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Size Name</th>
                                    <th className="px-6 py-4">Created At</th>
                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {sizeList.length > 0 ? (
                                    sizeList.map((size, index) => (
                                        <tr
                                            key={size.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                                {(sizes.current_page - 1) *
                                                    sizes.per_page +
                                                    index +
                                                    1}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex min-w-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 font-semibold text-gray-800">
                                                    {size.name}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                                {size.created_at
                                                    ? new Date(
                                                          size.created_at
                                                      ).toLocaleDateString()
                                                    : "—"}
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "admin.sizes.show",
                                                            size.id
                                                        )}
                                                        className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        href={route(
                                                            "admin.sizes.edit",
                                                            size.id
                                                        )}
                                                        className="rounded-md bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-200"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(size)
                                                        }
                                                        className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-12 text-center"
                                        >
                                            <p className="font-medium text-gray-700">
                                                No sizes found
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Add your first product size to
                                                get started.
                                            </p>
                                            <Link
                                                href={route(
                                                    "admin.sizes.create"
                                                )}
                                                className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                            >
                                                Create a size
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {sizes?.links && sizes.links.length > 3 && (
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-5 py-4">
                            <p className="text-sm text-gray-500">
                                Showing {sizes.from ?? 0}–{sizes.to ?? 0} of{" "}
                                {sizes.total ?? 0} sizes
                            </p>

                            <div className="flex flex-wrap gap-1">
                                {sizes.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? "#"}
                                        preserveScroll
                                        onClick={(event) => {
                                            if (!link.url) {
                                                event.preventDefault();
                                            }
                                        }}
                                        className={`rounded-md border px-3 py-1.5 text-sm ${
                                            link.active
                                                ? "border-indigo-600 bg-indigo-600 text-white"
                                                : link.url
                                                  ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                                                  : "cursor-not-allowed border-gray-100 text-gray-300"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}