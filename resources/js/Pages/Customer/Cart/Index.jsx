import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    FiShoppingCart,
    FiTrash2,
    FiPlus,
    FiMinus,
    FiArrowRight,
    FiShoppingBag,
} from "react-icons/fi";
import HomeLayout from "@/Layouts/HomeLayout";

export default function CartIndex({
    cartItems = [],
    subtotal = 0,
    deliveryCharge = 0,
}) {
    const money = (amount) =>
        `৳${Number(amount ?? 0).toFixed(2)}`;

    const updateQuantity = (item, quantity) => {
        if (quantity < 1 || quantity > 100) return;

        router.patch(
            route("customer.cart.update", item.id),
            { quantity },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const removeItem = (item) => {
        if (!window.confirm("Remove this product from your cart?")) {
            return;
        }

        router.delete(route("customer.cart.destroy", item.id), {
            preserveScroll: true,
        });
    };

    const total = Number(subtotal) + Number(deliveryCharge);

    return (
        <HomeLayout>
            <Head title="Shopping Cart" />

            <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="mb-8 flex items-center gap-3">
                        <FiShoppingCart className="text-3xl text-indigo-600" />

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Shopping Cart
                            </h1>

                            <p className="mt-1 text-gray-500">
                                {cartItems.length} item(s) in your cart
                            </p>
                        </div>
                    </div>

                    {/* Empty Cart */}
                    {cartItems.length === 0 ? (
                        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                            <FiShoppingCart className="mx-auto mb-4 text-5xl text-gray-300" />

                            <h2 className="text-xl font-semibold text-gray-800">
                                Your cart is empty
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Find something you love and add it to your cart.
                            </p>

                            <Link
                                href={route("shop.index")}
                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                            >
                                <FiShoppingBag />
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Cart Items */}
                            <div className="space-y-4 lg:col-span-2">
                                {cartItems.map((item) => {
                                    const product = item.product;

                                    if (!product) return null;

                                    const price = Number(
                                        product.after_discount ??
                                        product.price ??
                                        0
                                    );

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                                        >
                                            {/* Product Image */}
                                            <Link
                                                href={route(
                                                    "shop.show",
                                                    product.slug
                                                )}
                                                className="shrink-0"
                                            >
                                                <img
                                                    src={
                                                        product.preview
                                                            ? `/storage/${product.preview}`
                                                            : "/images/placeholder.png"
                                                    }
                                                    alt={product.name}
                                                    className="h-28 w-full rounded-xl object-cover sm:w-28"
                                                />
                                            </Link>

                                            {/* Product Details */}
                                            <div className="min-w-0 flex-1">
                                                <Link
                                                    href={route(
                                                        "shop.show",
                                                        product.slug
                                                    )}
                                                    className="font-semibold text-gray-900 hover:text-indigo-600"
                                                >
                                                    {product.name}
                                                </Link>

                                                <p className="mt-2 font-bold text-indigo-600">
                                                    {money(price)}
                                                </p>

                                                {(item.size || item.color) && (
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.size?.name &&
                                                            `Size: ${item.size.name}`}

                                                        {item.size &&
                                                            item.color &&
                                                            " · "}

                                                        {item.color?.name &&
                                                            `Color: ${item.color.name}`}
                                                    </p>
                                                )}

                                                {/* Quantity Controls */}
                                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                                    <div className="flex items-center rounded-lg border border-gray-200">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item,
                                                                    Number(item.quantity) - 1
                                                                )
                                                            }
                                                            disabled={
                                                                Number(item.quantity) <= 1
                                                            }
                                                            aria-label="Decrease quantity"
                                                            className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-40"
                                                        >
                                                            <FiMinus />
                                                        </button>

                                                        <span className="min-w-10 text-center text-sm font-semibold">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item,
                                                                    Number(item.quantity) + 1
                                                                )
                                                            }
                                                            disabled={
                                                                Number(item.quantity) >= 100
                                                            }
                                                            aria-label="Increase quantity"
                                                            className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-40"
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item)}
                                                        className="flex items-center gap-1 text-sm text-red-500 transition hover:text-red-700"
                                                    >
                                                        <FiTrash2 />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Total */}
                                            <div className="font-bold text-gray-900 sm:text-right">
                                                {money(
                                                    price * Number(item.quantity)
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Continue Shopping */}
                                <div>
                                    <Link
                                        href={route("shop.index")}
                                        className="inline-flex items-center gap-2 rounded-lg border border-indigo-600 px-5 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                                    >
                                        <FiShoppingBag />
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Order Summary
                                </h2>

                                <div className="mt-5 flex justify-between border-b border-gray-100 pb-4 text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{money(subtotal)}</span>
                                </div>

                                <div className="mt-4 flex justify-between border-b border-gray-100 pb-4 text-gray-600">
                                    <span>Delivery Charge</span>
                                    <span>{money(deliveryCharge)}</span>
                                </div>

                                <div className="mt-4 flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>{money(total)}</span>
                                </div>

                                <p className="mt-3 text-xs leading-5 text-gray-500">
                                    Final price and stock availability will be
                                    checked securely during checkout.
                                </p>

                                {/* Checkout */}
                                <Link
                                    href={route("customer.checkout.index")}
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    Proceed to Checkout
                                    <FiArrowRight />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}