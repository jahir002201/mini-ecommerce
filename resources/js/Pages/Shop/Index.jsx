import { Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import {
    FiChevronDown,
    FiFilter,
    FiX,
} from "react-icons/fi";

export default function Index({
    products,
    categories = [],
    subcategories = [],
    brands = [],
    priceRange = { min: 0, max: 0 },
    filters = {},
}) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filteredSubcategories = useMemo(() => {
        if (!filters.category) {
            return subcategories;
        }

        return subcategories.filter((subcategory) => {
            return (
                String(subcategory.category_id) ===
                    String(filters.category) ||
                String(subcategory.category?.slug) ===
                    String(filters.category)
            );
        });
    }, [subcategories, filters.category]);

    const applyFilters = (newFilters) => {
        const query = {
            ...filters,
            ...newFilters,
        };

        Object.keys(query).forEach((key) => {
            if (
                query[key] === "" ||
                query[key] === null ||
                query[key] === undefined
            ) {
                delete query[key];
            }
        });

        router.get(route("shop.index"), query, {
            preserveState: true,
            preserveScroll: true,
        });

        setMobileFiltersOpen(false);
    };

    const clearFilters = () => {
        router.get(
            route("shop.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );

        setMobileFiltersOpen(false);
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <section className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            Our Store
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Shop All Products
                        </h1>

                        <p className="mt-3 max-w-2xl text-gray-500">
                            Browse our collection and find the products
                            you need at great prices.
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex gap-8">
                        {/* Desktop Sidebar */}
                        <aside className="hidden w-64 shrink-0 lg:block">
                            <FilterSidebar
                                categories={categories}
                                subcategories={filteredSubcategories}
                                brands={brands}
                                priceRange={priceRange}
                                filters={filters}
                                applyFilters={applyFilters}
                                clearFilters={clearFilters}
                            />
                        </aside>

                        {/* Main */}
                        <main className="min-w-0 flex-1">
                            {/* Top Toolbar */}
                            <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Showing{" "}
                                        <span className="font-semibold text-gray-800">
                                            {products?.from ?? 0}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-semibold text-gray-800">
                                            {products?.to ?? 0}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-gray-800">
                                            {products?.total ?? 0}
                                        </span>{" "}
                                        products
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    {/* Mobile Filter */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMobileFiltersOpen(true)
                                        }
                                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
                                    >
                                        <FiFilter />
                                        Filters
                                    </button>

                                    {/* Sort */}
                                    <div className="relative">
                                        <select
                                            value={
                                                filters.sort ?? "latest"
                                            }
                                            onChange={(event) =>
                                                applyFilters({
                                                    sort: event.target.value,
                                                })
                                            }
                                            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        >
                                            <option value="latest">
                                                Latest
                                            </option>
                                            <option value="price_low">
                                                Price: Low to High
                                            </option>
                                            <option value="price_high">
                                                Price: High to Low
                                            </option>
                                            <option value="name_asc">
                                                Name: A-Z
                                            </option>
                                            <option value="name_desc">
                                                Name: Z-A
                                            </option>
                                        </select>

                                        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();

                                        const formData = new FormData(
                                            event.currentTarget
                                        );

                                        applyFilters({
                                            search:
                                                formData.get("search"),
                                        });
                                    }}
                                    className="relative justify-between"
                                >
                                    <input
                                        type="text"
                                        name="search"
                                        defaultValue={
                                            filters.search ?? ""
                                        }
                                        placeholder="Search products, brands..."
                                        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    />
                                </form>
                            </div>

                            {/* Active Filters */}
                            <ActiveFilters
                                filters={filters}
                                categories={categories}
                                subcategories={subcategories}
                                onRemove={applyFilters}
                                onClear={clearFilters}
                            />

                            {/* Products */}
                            {products?.data?.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {products.data.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyProducts
                                    clearFilters={clearFilters}
                                />
                            )}

                            {/* Pagination */}
                            {products?.links?.length > 3 && (
                                <Pagination links={products.links} />
                            )}
                        </main>
                    </div>
                </div>
            </div>

            {/* Mobile Filters */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() =>
                            setMobileFiltersOpen(false)
                        }
                    />

                    <div className="absolute inset-y-0 left-0 w-full max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">
                                Filters
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileFiltersOpen(false)
                                }
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <FilterSidebar
                            categories={categories}
                            subcategories={filteredSubcategories}
                            brands={brands}
                            priceRange={priceRange}
                            filters={filters}
                            applyFilters={applyFilters}
                            clearFilters={clearFilters}
                        />
                    </div>
                </div>
            )}
        </HomeLayout>
    );
}

function FilterSidebar({
    categories,
    subcategories,
    brands,
    priceRange,
    filters,
    applyFilters,
    clearFilters,
}) {
    return (
        <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                    Filters
                </h2>

                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                    Clear All
                </button>
            </div>

            {/* Category */}
            <div className="border-b border-gray-100 pb-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    Category
                </h3>

                <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                        <input
                            type="radio"
                            name="category"
                            checked={!filters.category}
                            onChange={() =>
                                applyFilters({
                                    category: "",
                                    subcategory: "",
                                })
                            }
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        All Categories
                    </label>

                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className="flex cursor-pointer items-center justify-between gap-2 text-sm text-gray-600"
                        >
                            <span className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={
                                        String(
                                            filters.category
                                        ) ===
                                        String(
                                            category.slug ??
                                                category.id
                                        )
                                    }
                                    onChange={() =>
                                        applyFilters({
                                            category:
                                                category.slug ??
                                                category.id,
                                            subcategory: "",
                                        })
                                    }
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />

                                <span>{category.name}</span>
                            </span>

                            {category.products_count !==
                                undefined && (
                                <span className="text-xs text-gray-400">
                                    {category.products_count}
                                </span>
                            )}
                        </label>
                    ))}
                </div>
            </div>

            {/* Subcategory */}
            {subcategories.length > 0 && (
                <div className="border-b border-gray-100 py-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Subcategory
                    </h3>

                    <div className="space-y-2">
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                            <input
                                type="radio"
                                name="subcategory"
                                checked={!filters.subcategory}
                                onChange={() =>
                                    applyFilters({
                                        subcategory: "",
                                    })
                                }
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            All Subcategories
                        </label>

                        {subcategories.map((subcategory) => (
                            <label
                                key={subcategory.id}
                                className="flex cursor-pointer items-center justify-between gap-2 text-sm text-gray-600"
                            >
                                <span className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="subcategory"
                                        checked={
                                            String(
                                                filters.subcategory
                                            ) ===
                                            String(
                                                subcategory.slug ??
                                                    subcategory.id
                                            )
                                        }
                                        onChange={() =>
                                            applyFilters({
                                                subcategory:
                                                    subcategory.slug ??
                                                    subcategory.id,
                                            })
                                        }
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />

                                    <span>
                                        {subcategory.name}
                                    </span>
                                </span>

                                {subcategory.products_count !==
                                    undefined && (
                                    <span className="text-xs text-gray-400">
                                        {
                                            subcategory.products_count
                                        }
                                    </span>
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Brand */}
            {brands.length > 0 && (
                <div className="border-b border-gray-100 py-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Brand
                    </h3>

                    <select
                        value={filters.brand ?? ""}
                        onChange={(event) =>
                            applyFilters({
                                brand: event.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="">All Brands</option>

                        {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Price */}
            <div className="py-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    Price Range
                </h3>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-1 block text-xs text-gray-500">
                            Minimum
                        </label>

                        <input
                            type="number"
                            min="0"
                            placeholder={priceRange.min}
                            value={filters.min_price ?? ""}
                            onChange={(event) =>
                                applyFilters({
                                    min_price:
                                        event.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-gray-500">
                            Maximum
                        </label>

                        <input
                            type="number"
                            min="0"
                            placeholder={priceRange.max}
                            value={filters.max_price ?? ""}
                            onChange={(event) =>
                                applyFilters({
                                    max_price:
                                        event.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        applyFilters({
                            min_price: filters.min_price ?? "",
                            max_price: filters.max_price ?? "",
                        })
                    }
                    className="mt-3 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    Apply Price
                </button>
            </div>
        </div>
    );
}

function ActiveFilters({
    filters,
    categories,
    subcategories,
    onRemove,
    onClear,
}) {
    const hasFilters =
        filters.search ||
        filters.category ||
        filters.subcategory ||
        filters.brand ||
        filters.min_price ||
        filters.max_price;

    if (!hasFilters) {
        return null;
    }

    const category = categories.find(
        (item) =>
            String(item.slug ?? item.id) ===
            String(filters.category)
    );

    const subcategory = subcategories.find(
        (item) =>
            String(item.slug ?? item.id) ===
            String(filters.subcategory)
    );

    return (
        <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
                Active:
            </span>

            {filters.search && (
                <FilterBadge
                    label={`Search: ${filters.search}`}
                    onRemove={() =>
                        onRemove({ search: "" })
                    }
                />
            )}

            {category && (
                <FilterBadge
                    label={category.name}
                    onRemove={() =>
                        onRemove({
                            category: "",
                            subcategory: "",
                        })
                    }
                />
            )}

            {subcategory && (
                <FilterBadge
                    label={subcategory.name}
                    onRemove={() =>
                        onRemove({
                            subcategory: "",
                        })
                    }
                />
            )}

            {filters.brand && (
                <FilterBadge
                    label={`Brand: ${filters.brand}`}
                    onRemove={() =>
                        onRemove({ brand: "" })
                    }
                />
            )}

            {(filters.min_price || filters.max_price) && (
                <FilterBadge
                    label={`Price: ৳${filters.min_price || 0} - ৳${
                        filters.max_price || "∞"
                    }`}
                    onRemove={() =>
                        onRemove({
                            min_price: "",
                            max_price: "",
                        })
                    }
                />
            )}

            <button
                type="button"
                onClick={onClear}
                className="ml-1 text-xs font-semibold text-red-500 hover:text-red-600"
            >
                Clear all
            </button>
        </div>
    );
}

function FilterBadge({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
            {label}

            <button
                type="button"
                onClick={onRemove}
                className="hover:text-indigo-900"
            >
                <FiX size={13} />
            </button>
        </span>
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
        <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link href={route("shop.show", product.slug)}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {image ? (
                        <img
                            src={image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-6xl text-gray-300">
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

            <div className="p-5">
                {product.category && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                        {product.category.name}
                    </p>
                )}

                <Link
                    href={route("shop.show", product.slug)}
                    className="block"
                >
                    <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900 transition hover:text-indigo-600">
                        {product.name}
                    </h2>
                </Link>

                {product.brand && (
                    <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                    </p>
                )}

                {product.short_desp && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {product.short_desp}
                    </p>
                )}

                <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                        {discount > 0 &&
                        finalPrice < originalPrice ? (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-lg font-bold text-indigo-600">
                                    ৳{finalPrice.toFixed(2)}
                                </span>

                                <span className="text-sm text-gray-400 line-through">
                                    ৳{originalPrice.toFixed(2)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-lg font-bold text-gray-900">
                                ৳{originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <Link
                        href={route("shop.show", product.slug)}
                        className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

function Pagination({ links }) {
    return (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
            {links.map((link, index) => {
                const label = link.label
                    .replace("&laquo;", "«")
                    .replace("&raquo;", "»");

                return link.url ? (
                    <Link
                        key={index}
                        href={link.url}
                        preserveScroll
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            link.active
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        }`}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: label,
                            }}
                        />
                    </Link>
                ) : (
                    <span
                        key={index}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-400"
                        dangerouslySetInnerHTML={{
                            __html: label,
                        }}
                    />
                );
            })}
        </div>
    );
}

function EmptyProducts({ clearFilters }) {
    return (
        <div className="rounded-xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-6xl">🛍️</div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
                No Products Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find any products matching your current
                filters. Try changing your search or filters.
            </p>

            <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
                Clear Filters
            </button>
        </div>
    );
}

function getProductImage(product) {
    let image = product.preview ?? null;

    if (!image && product.thumbnails?.length > 0) {
        const thumbnail = product.thumbnails[0];

        image =
            thumbnail.image ??
            thumbnail.thumbnail ??
            thumbnail.path ??
            thumbnail.preview ??
            null;
    }

    if (!image) {
        return null;
    }

    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("/")
    ) {
        return image;
    }

    return `/storage/${image}`;
}