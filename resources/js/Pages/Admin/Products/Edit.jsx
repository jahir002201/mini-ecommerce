import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import {
    FiArrowLeft,
    FiPackage,
    FiSave,
} from 'react-icons/fi';

export default function Edit({
    product,
    categories = [],
    subcategories = [],
    admin
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: product.name ?? '',
        brand: product.brand ?? '',
        price: product.price ?? '',
        discount: product.discount ?? '0',
        after_discount: product.after_discount ?? '',
        short_desp: product.short_desp ?? '',
        long_desp: product.long_desp ?? '',
        preview: null,
        slug: product.slug ?? '',
        category_id: product.category_id ?? '',
        subcategory_id: product.subcategory_id ?? '',
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.products.update', product.id), {
            forceFormData: true,
        });
    };

    return (
        <DashboardLayout admin={admin} title={`Edit Product - ${product.name}`}>
            <Head title={`Edit Product - ${product.name}`} />

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
                                Edit Product
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
                                    />
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
                                </div>

                                <div className="md:col-span-2">
                                    {product.preview && (
                                        <div className="mb-4">
                                            <p className="mb-2 text-sm font-semibold">
                                                Current Image
                                            </p>

                                            <img
                                                src={`/storage/${product.preview}`}
                                                alt={product.name}
                                                className="h-28 w-28 rounded-lg object-cover"
                                            />
                                        </div>
                                    )}

                                    <label className="mb-2 block text-sm font-semibold">
                                        Change Image
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
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-6">
                                <Link
                                    href={route('admin.products.index')}
                                    className="rounded-lg border px-5 py-3 font-semibold"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
                                >
                                    <FiSave />

                                    {processing
                                        ? 'Updating...'
                                        : 'Update Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}