import FlashMessage from '@/Components/FlashMessage';
import { Head, Link, router } from '@inertiajs/react';
import { FiEdit, FiPlus, FiTrash2, FiTag } from 'react-icons/fi';

export default function Index({ coupons, flash }) {
    const deleteCoupon = (id) => {
        if (confirm('Are you sure you want to delete this coupon?')) {
            router.delete(route('admin.coupons.destroy', id));
        }
    };

    return (
        <>
            <Head title="Coupons" />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <FiTag className="text-xl text-indigo-600" />

                                <h1 className="text-2xl font-bold text-gray-800">
                                    Coupons
                                </h1>
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your store discount coupons.
                            </p>
                        </div>

                        <Link
                            href={route('admin.coupons.create')}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            <FiPlus />
                            Add Coupon
                        </Link>
                    </div>

                    
                    {/* Success Error Message */}
                    <FlashMessage flash={flash} />

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Coupon
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Discount
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Type
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Expiry Date
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {coupons.data.length > 0 ? (
                                        coupons.data.map((coupon, index) => (
                                            <tr
                                                key={coupon.id}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {coupons.from + index}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className="font-semibold text-gray-800">
                                                        {coupon.name}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-700">
                                                    {coupon.discount}
                                                    {coupon.type === 'percentage'
                                                        ? '%'
                                                        : ' ৳'}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                            coupon.type === 'percentage'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-purple-100 text-purple-700'
                                                        }`}
                                                    >
                                                        {coupon.type}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {coupon.expre_date}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={route(
                                                                'admin.coupons.edit',
                                                                coupon.id
                                                            )}
                                                            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                                                        >
                                                            <FiEdit />
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteCoupon(
                                                                    coupon.id
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                                                        >
                                                            <FiTrash2 />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-12 text-center text-sm text-gray-500"
                                            >
                                                No coupons found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {coupons.links && coupons.links.length > 3 && (
                            <div className="flex flex-wrap gap-2 border-t border-gray-200 px-6 py-4">
                                {coupons.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        preserveScroll
                                        className={`rounded-lg px-3 py-2 text-sm ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : link.url
                                                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                  : 'cursor-not-allowed bg-gray-50 text-gray-400'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}