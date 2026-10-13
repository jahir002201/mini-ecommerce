
import { Head, Link, router, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index({ admin, colors }) {
    const { flash = {} } = usePage().props;
    const colorList = colors?.data ?? [];

    const handleDelete = (color) => {
        if (
            !window.confirm(
                `Are you sure you want to delete "${color.name}"?`
            )
        ) {
            return;
        }

        router.delete(route("admin.colors.destroy", color.id), {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout admin={admin} title="Colors">
            <Head title="Colors" />

            <div className="space-y-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Color Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage product colors and their HEX codes.
                        </p>
                    </div>

                    <Link
                        href={route("admin.colors.create")}
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        + Add New Color
                    </Link>
                </div>

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

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                        <h2 className="font-semibold text-gray-800">
                            All Colors
                        </h2>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            {colors?.total ?? colorList.length} total
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Preview</th>
                                    <th className="px-6 py-4">Color Name</th>
                                    <th className="px-6 py-4">HEX Code</th>
                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {colorList.length > 0 ? (
                                    colorList.map((color, index) => (
                                        <tr
                                            key={color.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-gray-500">
                                                {((colors.current_page ?? 1) - 1) *
                                                    (colors.per_page ?? colorList.length) +
                                                    index +
                                                    1}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className="block h-8 w-8 rounded-full border border-gray-300 shadow-sm"
                                                    style={{
                                                        backgroundColor:
                                                            color.color_code,
                                                    }}
                                                    title={color.color_code}
                                                />
                                            </td>

                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                {color.name}
                                            </td>

                                            <td className="px-6 py-4 font-mono text-gray-600">
                                                {color.color_code}
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "admin.colors.show",
                                                            color.id
                                                        )}
                                                        className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        href={route(
                                                            "admin.colors.edit",
                                                            color.id
                                                        )}
                                                        className="rounded-md bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-200"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(color)
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
                                            colSpan="5"
                                            className="px-6 py-12 text-center"
                                        >
                                            <p className="font-medium text-gray-700">
                                                No colors found
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Add your first product color.
                                            </p>
                                            <Link
                                                href={route(
                                                    "admin.colors.create"
                                                )}
                                                className="mt-3 inline-block font-semibold text-indigo-600 hover:text-indigo-800"
                                            >
                                                Create a color
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {colors?.links && colors.links.length > 3 && (
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-5 py-4">
                            <p className="text-sm text-gray-500">
                                Showing {colors.from ?? 0}–{colors.to ?? 0} of{" "}
                                {colors.total ?? 0} colors
                            </p>

                            <div className="flex flex-wrap gap-1">
                                {colors.links.map((link, index) => (
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
