import { Link } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

export default function Home({
    categories = [],
    featuredProducts = [],
    latestProducts = [],
}) {
    return (
        <HomeLayout>

            {/* =========================
                Hero Section
            ========================== */}
            <section className="bg-indigo-700 text-white">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">

                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-200">
                            Welcome to Mini E-Commerce
                        </p>

                        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                            Shop Your
                            <span className="block text-indigo-200">
                                Favorite Products
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
                            Discover quality products at great prices.
                            Browse our latest collections and find
                            everything you need in one place.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Link
                                href="/shop"
                                className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-indigo-700 transition hover:bg-indigo-50"
                            >
                                Shop Now
                            </Link>

                            <a
                                href="#categories"
                                className="rounded-lg border border-white/40 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                            >
                                Browse Categories
                            </a>

                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex h-80 items-center justify-center rounded-3xl bg-white/10">
                            <div className="text-center">
                                <div className="text-8xl">
                                    🛍️
                                </div>

                                <p className="mt-4 text-lg font-semibold">
                                    Shop Smart. Shop Easy.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* =========================
                Categories
            ========================== */}
            <section
                id="categories"
                className="py-16"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-10 text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            Explore
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            Shop by Category
                        </h2>

                        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                            Explore our product categories and find
                            exactly what you are looking for.
                        </p>
                    </div>


                    {categories.length > 0 ? (

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">

                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/shop?category=${category.id}`}
                                    className="group rounded-xl bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >

                                    {category.image ? (
                                        <img
                                            src={`/storage/${category.image}`}
                                            alt={category.name}
                                            className="mx-auto h-20 w-20 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-2xl">
                                            🛍️
                                        </div>
                                    )}

                                    <h3 className="mt-3 truncate text-sm font-semibold text-gray-800 group-hover:text-indigo-600">
                                        {category.name}
                                    </h3>

                                </Link>
                            ))}

                        </div>

                    ) : (

                        <div className="rounded-xl bg-white py-12 text-center text-gray-500 shadow-sm">
                            No categories available.
                        </div>

                    )}

                </div>
            </section>


            {/* =========================
                Featured Products
            ========================== */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-10 flex items-end justify-between">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Featured
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                Featured Products
                            </h2>
                        </div>

                        <Link
                            href="/shop"
                            className="hidden font-semibold text-indigo-600 hover:text-indigo-700 sm:block"
                        >
                            View All →
                        </Link>

                    </div>


                    {featuredProducts.length > 0 ? (

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}

                        </div>

                    ) : (

                        <EmptyProducts />

                    )}


                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            href="/shop"
                            className="font-semibold text-indigo-600"
                        >
                            View All Products →
                        </Link>
                    </div>

                </div>
            </section>


            {/* =========================
                Promo Banner
            ========================== */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-3xl bg-gray-900 px-6 py-12 text-white sm:px-12">

                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
                                    Special Offer
                                </p>

                                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                                    Discover Something New
                                </h2>

                                <p className="mt-3 max-w-xl text-gray-300">
                                    Find the latest products and enjoy
                                    great deals from our collection.
                                </p>
                            </div>

                            <Link
                                href="/shop"
                                className="shrink-0 rounded-lg bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-500"
                            >
                                Explore Products
                            </Link>

                        </div>

                    </div>

                </div>
            </section>


            {/* =========================
                Latest Products
            ========================== */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-10">

                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            New Arrivals
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            Latest Products
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Check out the newest products in our store.
                        </p>

                    </div>


                    {latestProducts.length > 0 ? (

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                            {latestProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}

                        </div>

                    ) : (

                        <EmptyProducts />

                    )}

                </div>
            </section>

        </HomeLayout>
    );
}


/*
|--------------------------------------------------------------------------
| Product Card
|--------------------------------------------------------------------------
*/

function ProductCard({ product }) {

    const image =
        product.preview ||
        product.thumbnails?.[0]?.thumbnail ||
        null;

    return (
        <div className="group overflow-hidden rounded-xl bg-gray-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <Link href={`/shop/${product.id}`}>

                <div className="aspect-square overflow-hidden bg-gray-100">

                    {image ? (

                        <img
                            src={
                                image.startsWith("http")
                                    ? image
                                    : `/storage/${image}`
                            }
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                    ) : (

                        <div className="flex h-full items-center justify-center text-5xl text-gray-300">
                            🛍️
                        </div>

                    )}

                </div>

            </Link>


            <div className="p-5">

                {product.category && (
                    <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                        {product.category.name}
                    </p>
                )}


                <Link href={`/shop/${product.id}`}>
                    <h3 className="mt-2 truncate text-lg font-semibold text-gray-800 hover:text-indigo-600">
                        {product.name}
                    </h3>
                </Link>


                {product.brand && (
                    <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                    </p>
                )}


                <div className="mt-4 flex items-center justify-between">

                    <div>

                        {product.discount > 0 ? (

                            <div className="flex items-center gap-2">

                                <span className="font-bold text-indigo-600">
                                    ${product.after_discount}
                                </span>

                                <span className="text-sm text-gray-400 line-through">
                                    ${product.price}
                                </span>

                            </div>

                        ) : (

                            <span className="font-bold text-gray-900">
                                ${product.price}
                            </span>

                        )}

                    </div>


                    <Link
                        href={`/shop/${product.id}`}
                        className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-100"
                    >
                        View
                    </Link>

                </div>

            </div>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Empty Products
|--------------------------------------------------------------------------
*/

function EmptyProducts() {
    return (
        <div className="rounded-xl bg-gray-50 py-16 text-center">

            <div className="text-5xl">
                🛍️
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                No products available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                Products will appear here when they are added.
            </p>

        </div>
    );
}