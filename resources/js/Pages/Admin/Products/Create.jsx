import { Head, Link, useForm } from '@inertiajs/react';
import {
    FiArrowLeft,
    FiPackage,
    FiSave,
} from 'react-icons/fi';

export default function Create({
    categories = [],
    subcategories = [],
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: '',
        brand: '',
        price: '',
        discount: '0',
        after_discount: '',
        short_desp: '',
        long_desp: '',
        preview: null,
        slug: '',
        category_id: '',
        subcategory_id: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.products.store'), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Create Product" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                    <div className="mb-6">
                        <Link
                            href={route('admin.products.index')}
                            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600"
                        >
                            <FiArrowLeft />
                            Back to Products
                        </Link>

                        <div className="flex items-center gap-2">
                            <FiPackage className="text-xl text-indigo-600" />

                            <h1 className="text-2xl font-bold text-gray-800">
                                Create Product
                            </h1>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow sm:p-8">
                        <form onSubmit={submit} className="space-y-6">

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        placeholder="Product name"
                                    />

                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Brand
                                    </label>

                                    <input
                                        type="text"
                                        value={data.brand}
                                        onChange={(e) =>
                                            setData('brand', e.target.value)
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        placeholder="Brand"
                                    />

                                    {errors.brand && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.brand}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Discount (%)
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={data.discount}
                                        onChange={(e) =>
                                            setData(
                                                'discount',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    {errors.discount && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.discount}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        After Discount
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.after_discount}
                                        onChange={(e) =>
                                            setData(
                                                'after_discount',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Slug
                                    </label>

                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData('slug', e.target.value)
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        placeholder="product-slug"
                                    />

                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Category
                                    </label>

                                    <select
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                'category_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border bg-white px-4 py-3"
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

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Subcategory
                                    </label>

                                    <select
                                        value={data.subcategory_id}
                                        onChange={(e) =>
                                            setData(
                                                'subcategory_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border bg-white px-4 py-3"
                                    >
                                        <option value="">
                                            Select Subcategory
                                        </option>

                                        {subcategories.map((subcategory) => (
                                            <option
                                                key={subcategory.id}
                                                value={subcategory.id}
                                            >
                                                {subcategory.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.subcategory_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.subcategory_id}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold">
                                        Preview Image
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                'preview',
                                                e.target.files[0]
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    {errors.preview && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.preview}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold">
                                        Short Description
                                    </label>

                                    <textarea
                                        rows="3"
                                        value={data.short_desp}
                                        onChange={(e) =>
                                            setData(
                                                'short_desp',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    {errors.short_desp && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.short_desp}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold">
                                        Long Description
                                    </label>

                                    <textarea
                                        rows="6"
                                        value={data.long_desp}
                                        onChange={(e) =>
                                            setData(
                                                'long_desp',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    {errors.long_desp && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.long_desp}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-6">
                                <Link
                                    href={route('admin.products.index')}
                                    className="rounded-lg border px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    <FiSave />

                                    {processing
                                        ? 'Creating...'
                                        : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}