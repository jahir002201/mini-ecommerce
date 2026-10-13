import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

const imageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `/storage/${path}`;
};

export default function Edit({ admin, thumbnail, products }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: String(thumbnail.product_id),
        thumbnail: null,
        _method: "put",
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setData("thumbnail", file ?? null);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.thumbnails.update", thumbnail.id), {
            forceFormData: true,
        });
    };

    return (
        <DashboardLayout admin={admin} title="Edit Thumbnail">
            <Head title="Edit Thumbnail" />

            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Edit Thumbnail
                    </h1>

                    <Link
                        href={route("admin.thumbnails.index")}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                    >
                        Back
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-5 rounded-xl bg-white p-6 shadow"
                >
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Product
                        </label>

                        <select
                            value={data.product_id}
                            onChange={(e) => setData("product_id", e.target.value)}
                            className="w-full rounded-lg border-gray-300"
                        >
                            <option value="">Select product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>

                        {errors.product_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.product_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Current Thumbnail
                        </label>

                        <img
                            src={imageUrl(thumbnail.thumbnail)}
                            alt="Current thumbnail"
                            className="mb-4 h-40 w-48 rounded-lg border object-cover"
                        />

                        <label className="mb-2 block font-medium text-gray-700">
                            Replace Image (optional)
                        </label>

                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            className="w-full rounded-lg border p-2"
                        />

                        {errors.thumbnail && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.thumbnail}
                            </p>
                        )}

                        {preview && (
                            <img
                                src={preview}
                                alt="New thumbnail preview"
                                className="mt-4 h-40 w-48 rounded-lg border object-cover"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {processing ? "Updating..." : "Update Thumbnail"}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}