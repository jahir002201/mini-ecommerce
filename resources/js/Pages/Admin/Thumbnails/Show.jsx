import React from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

const imageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `/storage/${path}`;
};

export default function Show({ admin, thumbnail }) {
    return (
        <DashboardLayout admin={admin} title="Thumbnail Details">
            <Head title="Thumbnail Details" />

            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Thumbnail Details
                    </h1>

                    <Link
                        href={route("admin.thumbnails.index")}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                    >
                        Back
                    </Link>
                </div>

                <div className="space-y-5 rounded-xl bg-white p-6 shadow">
                    <div>
                        <p className="mb-2 text-sm text-gray-500">Thumbnail ID</p>
                        <p className="font-semibold">{thumbnail.id}</p>
                    </div>

                    <div>
                        <p className="mb-2 text-sm text-gray-500">Product</p>
                        <p className="font-semibold">
                            {thumbnail.product?.name ?? "Product deleted"}
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-sm text-gray-500">Product ID</p>
                        <p className="font-semibold">{thumbnail.product_id}</p>
                    </div>

                    <div>
                        <p className="mb-2 text-sm text-gray-500">Image</p>
                        <img
                            src={imageUrl(thumbnail.thumbnail)}
                            alt="Product thumbnail"
                            className="h-56 w-64 rounded-lg border object-cover"
                        />
                    </div>

                    <Link
                        href={route("admin.thumbnails.edit", thumbnail.id)}
                        className="inline-block rounded-lg bg-amber-500 px-5 py-2.5 text-white hover:bg-amber-600"
                    >
                        Edit Thumbnail
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}