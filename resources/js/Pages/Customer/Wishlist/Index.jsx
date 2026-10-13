import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import HomeLayout from "@/Layouts/HomeLayout";

export default function WishlistIndex({ wishlists = [] }) {
    const removeItem = (item) => {
        if (!confirm("Remove this product from your wishlist?")) return;

        router.delete(route("customer.wishlist.destroy", item.id), {
            preserveScroll: true,
        });
    };

    const addToCart = (item) => {
        if (!item.product) return;

        router.post(
            route("customer.cart.store"),
            {
                product_id: item.product.id,
                quantity: 1,
            },
            { preserveScroll: true }
        );
    };

    return (
        <HomeLayout>
            <Head title="My Wishlist" />

            <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 flex items-center gap-3">
                        <FiHeart className="text-3xl text-pink-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                My Wishlist
                            </h1>
                            <p className="mt-1 text-gray-500">
                                {wishlists.length} saved product(s)
                            </p>
                        </div>
                    </div>

                    {wishlists.length === 0 ? (
                        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                            <FiHeart className="mx-auto mb-4 text-5xl text-gray-300" />
                            <h2 className="text-xl font-semibold text-gray-800">
                                Your wishlist is empty
                            </h2>
                            <p className="mt-2 text-gray-500">
                                Save products here to find them easily later.
                            </p>
                            <Link
                                href={route("shop.index")}
                                className="mt-6 inline-block rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
                            >
                                Explore Products
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {wishlists.map((item) => {
                                const product = item.product;
                                if (!product) return null;

                                const price = Number(
                                    product.after_discount ?? product.price ?? 0
                                );

                                return (
                                    <div
                                        key={item.id}
                                        className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                                    >
                                        <Link
                                            href={route("shop.show", product.slug)}
                                        >
                                            <img
                                                src={
                                                    product.preview
                                                        ? `/storage/${product.preview}`
                                                        : "/images/placeholder.png"
                                                }
                                                alt={product.name}
                                                className="h-56 w-full object-cover"
                                            />
                                        </Link>

                                        <div className="p-5">
                                            <Link
                                                href={route("shop.show", product.slug)}
                                                className="text-lg font-semibold text-gray-900 hover:text-pink-600"
                                            >
                                                {product.name}
                                            </Link>

                                            <p className="mt-2 text-xl font-bold text-pink-600">
                                                ৳{price.toFixed(2)}
                                            </p>

                                            <div className="mt-5 flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(item)}
                                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-pink-600 px-3 py-3 text-sm font-semibold text-white hover:bg-pink-700"
                                                >
                                                    <FiShoppingCart />
                                                    Add to Cart
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item)}
                                                    aria-label={`Remove ${product.name} from wishlist`}
                                                    title="Remove from wishlist"
                                                    className="rounded-lg border border-gray-200 px-4 text-red-500 hover:bg-red-50"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}