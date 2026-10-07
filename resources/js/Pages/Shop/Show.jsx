import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    FiArrowLeft,
    FiHeart,
    FiMinus,
    FiPlus,
    FiShoppingCart,
    FiTruck,
} from "react-icons/fi";
import HomeLayout from "@/Layouts/HomeLayout";

export default function Show({
    product,
    relatedProducts = [],
}) {
    const images = getProductImages(product);

    const [selectedImage, setSelectedImage] = useState(
        images[0] ?? null
    );

    const [quantity, setQuantity] = useState(1);

    const originalPrice = Number(product.price ?? 0);
    const finalPrice = Number(
        product.after_discount ?? product.price ?? 0
    );
    const discount = Number(product.discount ?? 0);

    const availableStock = getAvailableStock(product);
    const hasStock = availableStock === null || availableStock > 0;

    const increaseQuantity = () => {
        if (
            availableStock !== null &&
            quantity >= availableStock
        ) {
            return;
        }

        setQuantity((current) => current + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };

    const addToCart = () => {
        console.log("Add to cart:", {
            product_id: product.id,
            quantity,
        });
    };

    const buyNow = () => {
        console.log("Buy now:", {
            product_id: product.id,
            quantity,
        });
    };

    const addToWishlist = () => {
        console.log("Add to wishlist:", product.id);
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gray-50">
                {/* Breadcrumb */}
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <Link
                                href={route("home")}
                                className="hover:text-indigo-600"
                            >
                                Home
                            </Link>

                            <span>/</span>

                            <Link
                                href={route("shop.index")}
                                className="hover:text-indigo-600"
                            >
                                Shop
                            </Link>

                            {product.category && (
                                <>
                                    <span>/</span>

                                    <Link
                                        href={route(
                                            "shop.index",
                                            {
                                                category:
                                                    product
                                                        .category
                                                        .slug ??
                                                    product
                                                        .category
                                                        .id,
                                            }
                                        )}
                                        className="hover:text-indigo-600"
                                    >
                                        {product.category.name}
                                    </Link>
                                </>
                            )}

                            <span>/</span>

                            <span className="font-medium text-gray-900">
                                {product.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Product */}
                <section className="py-10 sm:py-14">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Link
                            href={route("shop.index")}
                            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600"
                        >
                            <FiArrowLeft />
                            Back to Shop
                        </Link>

                        <div className="grid gap-10 lg:grid-cols-2">
                            {/* Gallery */}
                            <div>
                                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm">
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt={product.name}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-8xl text-gray-300">
                                            🛍️
                                        </div>
                                    )}

                                    {discount > 0 && (
                                        <span className="absolute left-5 top-5 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                                            -{discount}%
                                        </span>
                                    )}
                                </div>

                                {images.length > 1 && (
                                    <div className="mt-4 grid grid-cols-5 gap-3">
                                        {images.map(
                                            (image, index) => (
                                                <button
                                                    key={`${image}-${index}`}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedImage(
                                                            image
                                                        )
                                                    }
                                                    className={`aspect-square overflow-hidden rounded-lg border-2 bg-white ${
                                                        selectedImage ===
                                                        image
                                                            ? "border-indigo-600"
                                                            : "border-transparent hover:border-gray-300"
                                                    }`}
                                                >
                                                    <img
                                                        src={
                                                            image
                                                        }
                                                        alt={`${product.name} ${
                                                            index + 1
                                                        }`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </button>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Information */}
                            <div>
                                {product.category && (
                                    <Link
                                        href={route(
                                            "shop.index",
                                            {
                                                category:
                                                    product
                                                        .category
                                                        .slug ??
                                                    product
                                                        .category
                                                        .id,
                                            }
                                        )}
                                        className="text-sm font-semibold uppercase tracking-wider text-indigo-600"
                                    >
                                        {
                                            product.category
                                                .name
                                        }
                                    </Link>
                                )}

                                <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                                    {product.name}
                                </h1>

                                {product.brand && (
                                    <p className="mt-3 text-sm text-gray-500">
                                        Brand:{" "}
                                        <span className="font-semibold text-gray-700">
                                            {product.brand}
                                        </span>
                                    </p>
                                )}

                                {/* Price */}
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <span className="text-3xl font-bold text-indigo-600">
                                        ৳{finalPrice.toFixed(2)}
                                    </span>

                                    {discount > 0 &&
                                        finalPrice <
                                            originalPrice && (
                                            <span className="text-lg text-gray-400 line-through">
                                                ৳
                                                {originalPrice.toFixed(
                                                    2
                                                )}
                                            </span>
                                        )}

                                    {discount > 0 && (
                                        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                                            Save {discount}%
                                        </span>
                                    )}
                                </div>

                                {/* Short Description */}
                                {product.short_desp && (
                                    <div className="mt-6">
                                        <p className="leading-7 text-gray-600">
                                            {
                                                product.short_desp
                                            }
                                        </p>
                                    </div>
                                )}

                                <div className="my-7 border-t border-gray-200" />

                                {/* Availability */}
                                <div className="mb-6 flex items-center gap-3">
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${
                                            hasStock
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    />

                                    <span
                                        className={`text-sm font-semibold ${
                                            hasStock
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {hasStock
                                            ? availableStock !==
                                              null
                                                ? `${availableStock} in stock`
                                                : "In stock"
                                            : "Out of stock"}
                                    </span>
                                </div>

                                {/* Quantity */}
                                {hasStock && (
                                    <div className="mb-6">
                                        <label className="mb-2 block text-sm font-semibold text-gray-800">
                                            Quantity
                                        </label>

                                        <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                                            <button
                                                type="button"
                                                onClick={
                                                    decreaseQuantity
                                                }
                                                disabled={
                                                    quantity <= 1
                                                }
                                                className="p-3 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <FiMinus />
                                            </button>

                                            <span className="min-w-12 px-3 text-center font-semibold text-gray-900">
                                                {quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={
                                                    increaseQuantity
                                                }
                                                disabled={
                                                    availableStock !==
                                                        null &&
                                                    quantity >=
                                                        availableStock
                                                }
                                                className="p-3 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <FiPlus />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        disabled={!hasStock}
                                        onClick={addToCart}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                                    >
                                        <FiShoppingCart />
                                        Add to Cart
                                    </button>

                                    <button
                                        type="button"
                                        disabled={!hasStock}
                                        onClick={buyNow}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-indigo-600 px-6 py-3.5 font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                                    >
                                        Buy Now
                                    </button>

                                    <button
                                        type="button"
                                        onClick={addToWishlist}
                                        className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3.5 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                                        aria-label="Add to wishlist"
                                    >
                                        <FiHeart size={20} />
                                    </button>
                                </div>

                                {/* Benefits */}
                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                                            <FiTruck />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Fast Delivery
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Quick and reliable
                                                delivery
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                                            ✓
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Quality Products
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Trusted products
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Long Description */}
                        {product.long_desp && (
                            <div className="mt-14 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Product Description
                                </h2>

                                <div className="mt-5 whitespace-pre-line leading-8 text-gray-600">
                                    {product.long_desp}
                                </div>
                            </div>
                        )}

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <section className="mt-14">
                                <div className="mb-7 flex items-end justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                            You May Also Like
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                            Related Products
                                        </h2>
                                    </div>

                                    <Link
                                        href={route(
                                            "shop.index"
                                        )}
                                        className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:block"
                                    >
                                        View All →
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {relatedProducts.map(
                                        (relatedProduct) => (
                                            <ProductCard
                                                key={
                                                    relatedProduct.id
                                                }
                                                product={
                                                    relatedProduct
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </section>
            </div>
        </HomeLayout>
    );
}

function ProductCard({ product }) {
    const image = getProductImage(product);

    const originalPrice = Number(product.price ?? 0);
    const finalPrice = Number(
        product.after_discount ?? product.price ?? 0
    );
    const discount = Number(product.discount ?? 0);

    return (
        <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Link href={route("shop.show", product.slug)}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {image ? (
                        <img
                            src={image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-5xl text-gray-300">
                            🛍️
                        </div>
                    )}

                    {discount > 0 && (
                        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                            -{discount}%
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-4">
                {product.category && (
                    <p className="text-xs font-semibold uppercase text-indigo-600">
                        {product.category.name}
                    </p>
                )}

                <Link
                    href={route("shop.show", product.slug)}
                >
                    <h3 className="mt-2 line-clamp-2 font-semibold text-gray-900 hover:text-indigo-600">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-3 flex items-center gap-2">
                    <span className="font-bold text-indigo-600">
                        ৳{finalPrice.toFixed(2)}
                    </span>

                    {discount > 0 &&
                        finalPrice < originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                ৳{originalPrice.toFixed(2)}
                            </span>
                        )}
                </div>
            </div>
        </div>
    );
}

function getProductImages(product) {
    const images = [];

    if (product.preview) {
        images.push(formatImageUrl(product.preview));
    }

    if (product.thumbnails?.length) {
        product.thumbnails.forEach((thumbnail) => {
            const image =
                thumbnail.image ??
                thumbnail.thumbnail ??
                thumbnail.path ??
                thumbnail.preview ??
                null;

            if (image) {
                const formatted = formatImageUrl(image);

                if (!images.includes(formatted)) {
                    images.push(formatted);
                }
            }
        });
    }

    return images;
}

function getProductImage(product) {
    const images = getProductImages(product);

    return images[0] ?? null;
}

function formatImageUrl(image) {
    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("/")
    ) {
        return image;
    }

    return `/storage/${image}`;
}

function getAvailableStock(product) {
    if (!product.inventories?.length) {
        return null;
    }

    let total = 0;
    let hasQuantity = false;

    product.inventories.forEach((inventory) => {
        if (inventory.quantity !== undefined) {
            total += Number(inventory.quantity ?? 0);
            hasQuantity = true;
        } else if (inventory.stock !== undefined) {
            total += Number(inventory.stock ?? 0);
            hasQuantity = true;
        } else if (inventory.qty !== undefined) {
            total += Number(inventory.qty ?? 0);
            hasQuantity = true;
        }
    });

    return hasQuantity ? total : null;
}