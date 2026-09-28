import { Head, Link, useForm } from '@inertiajs/react';
import { FiArrowLeft, FiSave, FiTag } from 'react-icons/fi';

export default function Edit({ coupon }) {
    const { data, setData, put, processing, errors } = useForm({
        name: coupon.name ?? '',
        discount: coupon.discount ?? '',
        expire_date: coupon.expire_date
            ? coupon.expire_date.substring(0, 10)
            : '',
        type: coupon.type ?? 'percentage',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('admin.coupons.update', coupon.id));
    };

    return (
        <>
            <Head title={`Edit Coupon - ${coupon.name}`} />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route('admin.coupons.index')}
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
                        >
                            <FiArrowLeft />
                            Back to Coupons
                        </Link>

                        <div className="flex items-center gap-2">
                            <FiTag className="text-xl text-indigo-600" />

                            <h1 className="text-2xl font-bold text-gray-800">
                                Edit Coupon
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Update coupon information.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow sm:p-8">
                        <form onSubmit={submit} className="space-y-6">

                            {/* Coupon Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Coupon Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Discount + Type */}
                            <div className="grid gap-6 sm:grid-cols-2">

                                {/* Discount */}
                                <div>
                                    <label
                                        htmlFor="discount"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Discount
                                    </label>

                                    <input
                                        id="discount"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.discount}
                                        onChange={(e) =>
                                            setData(
                                                'discount',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    />

                                    {errors.discount && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.discount}
                                        </p>
                                    )}
                                </div>

                                {/* Type */}
                                <div>
                                    <label
                                        htmlFor="type"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Discount Type
                                    </label>

                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData(
                                                'type',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    >
                                        <option value="percentage">
                                            Percentage (%)
                                        </option>

                                        <option value="fixed">
                                            Fixed Amount (৳)
                                        </option>
                                    </select>

                                    {errors.type && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <label
                                    htmlFor="expire_date"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Expiry Date
                                </label>

                                <input
                                    id="expire_date"
                                    type="date"
                                    value={data.expire_date}
                                    onChange={(e) =>
                                        setData(
                                            'expire_date',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                {errors.expire_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.expire_date}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
                                <Link
                                    href={route('admin.coupons.index')}
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
                                        ? 'Updating...'
                                        : 'Update Coupon'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}