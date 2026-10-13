import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

const imageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `/storage/${path}`;
};

export default function Index({ admin, thumbnails, flash }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this thumbnail?")) {
            router.delete(route("admin.thumbnails.destroy", id));
        }
    };

    return (
        <DashboardLayout admin={admin} title="Thumbnails">
            <Head title="Thumbnails" />

            <div className="p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Thumbnails
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage product thumbnail images.
                        </p>
                    </div>

                    <Link
                        href={route("admin.thumbnails.create")}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    >
                        + Add Thumbnail
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                        {flash.error}
                    </div>
                )}

                <div className="overflow-x-auto rounded-xl bg-white shadow">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Thumbnail</th>
                                <th className="p-4">Product</th>
                                <th className="p-4">Product ID</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {thumbnails.data.length > 0 ? (
                                thumbnails.data.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="p-4">{item.id}</td>

                                        <td className="p-4">
                                            <img
                                                src={imageUrl(item.thumbnail)}
                                                alt="Thumbnail"
                                                className="h-16 w-20 rounded-lg border object-cover"
                                            />
                                        </td>

                                        <td className="p-4">
                                            {item.product?.name ?? "Product deleted"}
                                        </td>

                                        <td className="p-4">{item.product_id}</td>

                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    href={route("admin.thumbnails.show", item.id)}
                                                    className="rounded bg-blue-500 px-3 py-1.5 text-white hover:bg-blue-600"
                                                >
                                                    View
                                                </Link>

                                                <Link
                                                    href={route("admin.thumbnails.edit", item.id)}
                                                    className="rounded bg-amber-500 px-3 py-1.5 text-white hover:bg-amber-600"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="rounded bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No thumbnails found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    {thumbnails.links.map((link, index) => (
                        <button
                            key={index}
                            type="button"
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`rounded border px-3 py-2 text-sm ${
                                link.active
                                    ? "border-indigo-600 bg-indigo-600 text-white"
                                    : "bg-white text-gray-700"
                            } ${!link.url ? "cursor-not-allowed opacity-50" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}