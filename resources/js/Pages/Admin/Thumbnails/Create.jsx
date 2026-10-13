import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Create({ admin, products }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: "",
        thumbnail: null,
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

        post(route("admin.thumbnails.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreview(null);
            },
        });
    };

    return (
        <DashboardLayout admin={admin} title="Add Thumbnail">
            <Head title="Add Thumbnail" />

            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Add Thumbnail
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
                            Thumbnail Image
                        </label>

                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            className="w-full rounded-lg border p-2"
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            JPG, PNG or WEBP. Maximum size: 2 MB.
                        </p>

                        {errors.thumbnail && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.thumbnail}
                            </p>
                        )}

                        {preview && (
                            <img
                                src={preview}
                                alt="Thumbnail preview"
                                className="mt-4 h-40 w-48 rounded-lg border object-cover"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {processing ? "Uploading..." : "Upload Thumbnail"}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}