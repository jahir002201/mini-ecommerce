import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import {
    FiArrowLeft,
    FiFolder,
    FiSave,
} from 'react-icons/fi';

export default function Create({ categories = [], admin }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: '',
        category_id: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.subcategories.store'), {
            forceFormData: true,
        });
    };

    return (
        <DashboardLayout admin={admin} title="Create Subcategory">
            <Head title="Create Subcategory" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route(
                                'admin.subcategories.index'
                            )}
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
                        >
                            <FiArrowLeft />

                            Back to Subcategories
                        </Link>

                        <div className="flex items-center gap-2">
                            <FiFolder className="text-xl text-indigo-600" />

                            <h1 className="text-2xl font-bold text-gray-800">
                                Create Subcategory
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a new product subcategory.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow sm:p-8">
                        <form
                            onSubmit={submit}
                            className="space-y-6"
                        >

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Subcategory Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData(
                                            'name',
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. T-Shirts"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label
                                    htmlFor="category_id"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Category
                                </label>

                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData(
                                            'category_id',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.category_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            {/* Image */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Subcategory Image
                                </label>

                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files[0]
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    JPG, JPEG, PNG or WEBP. Maximum
                                    2MB.
                                </p>

                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
                                <Link
                                    href={route(
                                        'admin.subcategories.index'
                                    )}
                                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <FiSave />

                                    {processing
                                        ? 'Creating...'
                                        : 'Create Subcategory'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}