import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        progress,
    } = useForm({
        name: '',
        image: null,
        icon: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.categories.store'), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Create Category" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('admin.categories.index')}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            ← Back to Categories
                        </Link>

                        <h1 className="mt-4 text-2xl font-bold text-gray-800">
                            Create Category
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a new product category.
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
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Category Name
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
                                    placeholder="Enter category name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Icon */}
                            <div>
                                <label
                                    htmlFor="icon"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Icon
                                </label>

                                <input
                                    id="icon"
                                    type="text"
                                    value={data.icon}
                                    onChange={(e) =>
                                        setData(
                                            'icon',
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. fa-solid fa-shirt"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />

                                {errors.icon && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.icon}
                                    </p>
                                )}
                            </div>

                            {/* Image */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Category Image
                                </label>

                                <input
                                    id="image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files[0]
                                        )
                                    }
                                    className="block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-indigo-50 file:px-4 file:py-3 file:font-medium file:text-indigo-700"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    JPG, JPEG, PNG or WEBP. Maximum 2MB.
                                </p>

                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            {/* Upload Progress */}
                            {progress && (
                                <div>
                                    <div className="mb-1 text-sm text-gray-600">
                                        Uploading {progress.percentage}%
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                        <div
                                            className="h-full bg-indigo-600"
                                            style={{
                                                width: `${progress.percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Creating...'
                                        : 'Create Category'}
                                </button>

                                <Link
                                    href={route(
                                        'admin.categories.index'
                                    )}
                                    className="rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}