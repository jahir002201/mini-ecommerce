import HomeLayout from '@/Layouts/HomeLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Checkout({ cartItems = [], subtotal = 0, deliveryCharge = 80 }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        mobile_number: '',
        company: '',
        address: '',
        country_id: '',
        city_id: '',
        zip: '',
        notes: '',
        payment_method: 'sslcommerz',
    });

    const total = Number(subtotal) + Number(deliveryCharge);

    const submit = (e) => {
        e.preventDefault();
        post(route('customer.checkout.store'));
    };

    const field = (name, label, type = 'text', required = false) => (
        <div>
            <label htmlFor={name} className="mb-1 block text-sm font-medium">
                {label}{required && ' *'}
            </label>

            <input
                id={name}
                type={type}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
                required={required}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />

            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <HomeLayout>
            <Head title="Checkout" />

            <div className="mx-auto max-w-6xl px-4 py-10">
                <h1 className="mb-2 text-3xl font-bold">Checkout</h1>

                <p className="mb-8 text-gray-600">
                    Enter your billing details and select a payment method.
                </p>

                <form onSubmit={submit}>
                    <div className="grid gap-8 md:grid-cols-2">
                        <section className="space-y-5 rounded-xl border p-6">
                            <h2 className="text-xl font-semibold">
                                Billing details
                            </h2>

                            {field('name', 'Full name', 'text', true)}
                            {field('email', 'Email address', 'email', true)}
                            {field('mobile_number', 'Mobile number', 'tel', true)}
                            {field('company', 'Company')}
                            {field('address', 'Street address', 'text', true)}
                            {field('country_id', 'Country ID', 'number')}
                            {field('city_id', 'City ID', 'number')}
                            {field('zip', 'Postal code')}

                            <div>
                                <label htmlFor="notes" className="mb-1 block text-sm font-medium">
                                    Order notes
                                </label>

                                <textarea
                                    id="notes"
                                    rows={3}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                />

                                {errors.notes && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.notes}
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="h-fit space-y-5 rounded-xl border p-6">
                            <h2 className="text-xl font-semibold">
                                Your order
                            </h2>

                            {cartItems.map((item) => {
                                const price = Number(
                                    item.product?.after_discount ??
                                    item.product?.price ??
                                    0
                                );

                                return (
                                    <div
                                        key={item.id}
                                        className="flex justify-between gap-4 border-b pb-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {item.product?.name ?? 'Product'}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-medium">
                                            ৳{(price * Number(item.quantity)).toFixed(2)}
                                        </p>
                                    </div>
                                );
                            })}

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>৳{Number(subtotal).toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery charge</span>
                                <span>৳{Number(deliveryCharge).toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between border-t pt-4 text-lg font-bold">
                                <span>Total</span>
                                <span>৳{total.toFixed(2)}</span>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Payment method</p>

                                <label className="flex items-center gap-3 rounded-lg border p-3">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="sslcommerz"
                                        checked={data.payment_method === 'sslcommerz'}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                    />

                                    <span>Online payment (SSLCommerz)</span>
                                </label>

                                <label className="flex items-center gap-3 rounded-lg border p-3">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cod"
                                        checked={data.payment_method === 'cod'}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                    />

                                    <span>Cash on delivery</span>
                                </label>

                                {errors.payment_method && (
                                    <p className="text-sm text-red-600">
                                        {errors.payment_method}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing || cartItems.length === 0}
                                className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? 'Processing...'
                                    : data.payment_method === 'cod'
                                        ? 'Place order'
                                        : 'Proceed to Online Payment'}
                            </button>

                            <Link
                                href={route('customer.cart.index')}
                                className="block text-center text-sm text-indigo-600 hover:underline"
                            >
                                Back to cart
                            </Link>
                        </section>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}