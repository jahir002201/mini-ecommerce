import { Head, Link, useForm } from '@inertiajs/react';
import { FiArrowLeft, FiLayers, FiSave } from 'react-icons/fi';

export default function Create({
    products = [],
    sizes = [],
    colors = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        quantity: 0,
        product_id: '',
        size_id: '',
        color_id: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.inventories.store'));
    };

    return (
        <>
            <Head title="Create Inventory" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-3xl px-4 py-8">

                    <div className="mb-6">
                        <Link
                            href={route('admin.inventories.index')}
                            className="inline-flex items-center gap-2 text-sm text-gray-600"
                        >
                            <FiArrowLeft />
                            Back to Inventory
                        </Link>

                        <div className="mt-4 flex items-center gap-2">
                            <FiLayers className="text-xl text-indigo-600" />

                            <h1 className="text-2xl font-bold">
                                Create Inventory
                            </h1>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <form onSubmit={submit} className="space-y-6">

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Product
                                </label>

                                <select
                                    value={data.product_id}
                                    onChange={(e) =>
                                        setData(
                                            'product_id',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border bg-white px-4 py-3"
                                >
                                    <option value="">
                                        Select Product
                                    </option>

                                    {products.map((product) => (
                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
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

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Size
                                    </label>

                                    <select
                                        value={data.size_id}
                                        onChange={(e) =>
                                            setData(
                                                'size_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border bg-white px-4 py-3"
                                    >
                                        <option value="">
                                            Select Size
                                        </option>

                                        {sizes.map((size) => (
                                            <option
                                                key={size.id}
                                                value={size.id}
                                            >
                                                {size.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Color
                                    </label>

                                    <select
                                        value={data.color_id}
                                        onChange={(e) =>
                                            setData(
                                                'color_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border bg-white px-4 py-3"
                                    >
                                        <option value="">
                                            Select Color
                                        </option>

                                        {colors.map((color) => (
                                            <option
                                                key={color.id}
                                                value={color.id}
                                            >
                                                {color.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData(
                                            'quantity',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border px-4 py-3"
                                />

                                {errors.quantity && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.quantity}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-6">
                                <Link
                                    href={route('admin.inventories.index')}
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
                                        ? 'Creating...'
                                        : 'Create Inventory'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}