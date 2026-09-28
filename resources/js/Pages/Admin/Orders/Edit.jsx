import { Head, Link, useForm } from '@inertiajs/react';
import {
    FiArrowLeft,
    FiSave,
    FiShoppingCart,
} from 'react-icons/fi';

export default function Edit({ order, customers = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        order_id: order.order_id ?? '',
        customer_id: order.customer_id ?? '',
        sub_total: order.sub_total ?? '',
        total: order.total ?? '',
        discount: order.discount ?? '0',
        charge: order.charge ?? '0',
        paymentmethod: order.paymentmethod ?? 'cash_on_delivery',
        status: order.status ?? 'pending',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('admin.orders.update', order.id));
    };

    return (
        <>
            <Head title={`Edit Order - ${order.order_id}`} />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-4xl px-4 py-8">

                    <div className="mb-6">
                        <Link
                            href={route('admin.orders.index')}
                            className="inline-flex items-center gap-2 text-sm text-gray-600"
                        >
                            <FiArrowLeft />
                            Back to Orders
                        </Link>

                        <div className="mt-4 flex items-center gap-2">
                            <FiShoppingCart className="text-xl text-indigo-600" />

                            <h1 className="text-2xl font-bold">
                                Edit Order
                            </h1>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <form onSubmit={submit} className="space-y-6">

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Order ID
                                    </label>

                                    <input
                                        type="text"
                                        value={data.order_id}
                                        onChange={(e) =>
                                            setData(
                                                'order_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    {errors.order_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.order_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Customer
                                    </label>

                                    <select
                                        value={data.customer_id}
                                        onChange={(e) =>
                                            setData(
                                                'customer_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border bg-white px-4 py-3"
                                    >
                                        <option value="">
                                            Select Customer
                                        </option>

                                        {customers.map((customer) => (
                                            <option
                                                key={customer.id}
                                                value={customer.id}
                                            >
                                                {customer.name} -{' '}
                                                {customer.email}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Sub Total
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.sub_total}
                                        onChange={(e) =>
                                            setData(
                                                'sub_total',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Discount
                                    </label>

                                    <input
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
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Charge
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.charge}
                                        onChange={(e) =>
                                            setData(
                                                'charge',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Total
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.total}
                                        onChange={(e) =>
                                            setData(
                                                'total',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Payment Method
                                    </label>

                                    <select
                                        value={data.paymentmethod}
                                        onChange={(e) =>
                                            setData(
                                                'paymentmethod',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border bg-white px-4 py-3"
                                    >
                                        <option value="cash_on_delivery">
                                            Cash on Delivery
                                        </option>

                                        <option value="card">
                                            Card
                                        </option>

                                        <option value="online">
                                            Online Payment
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Status
                                    </label>

                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData(
                                                'status',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border bg-white px-4 py-3"
                                    >
                                        <option value="pending">
                                            Pending
                                        </option>

                                        <option value="processing">
                                            Processing
                                        </option>

                                        <option value="shipped">
                                            Shipped
                                        </option>

                                        <option value="delivered">
                                            Delivered
                                        </option>

                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-6">
                                <Link
                                    href={route('admin.orders.index')}
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
                                        : 'Update Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}