import { Link } from "@inertiajs/react";
import {
    FiCheckCircle,
    FiHeart,
    FiShoppingBag,
    FiTruck,
} from "react-icons/fi";
import HomeLayout from "@/Layouts/HomeLayout";

export default function About() {
    return (
        <HomeLayout>
            {/* Hero */}
            <section className="bg-indigo-700 text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
                            About Us
                        </p>

                        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
                            Making Online Shopping
                            <span className="block text-indigo-200">
                                Simple & Enjoyable
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-indigo-100">
                            Welcome to Mini E-Commerce, your trusted online
                            shopping destination. We make it easy to discover
                            quality products, compare prices, and shop from the
                            comfort of your home.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-white py-16">
                <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            Our Story
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            Built Around Better Shopping
                        </h2>

                        <div className="mt-6 space-y-4 leading-7 text-gray-600">
                            <p>
                                Mini E-Commerce was created with a simple goal:
                                to provide customers with a convenient and
                                enjoyable online shopping experience.
                            </p>

                            <p>
                                We bring different products together in one
                                place so customers can easily browse
                                categories, explore new products, and find
                                something that suits their needs.
                            </p>

                            <p>
                                We believe online shopping should be simple,
                                transparent, and accessible to everyone.
                            </p>
                        </div>

                        <Link
                            href={route("shop.index")}
                            className="mt-7 inline-flex rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Start Shopping
                        </Link>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="w-full rounded-3xl bg-indigo-50 p-8 sm:p-12">
                            <div className="flex h-64 items-center justify-center rounded-2xl bg-indigo-100">
                                <div className="text-center">
                                    <div className="text-7xl">🛍️</div>

                                    <h3 className="mt-5 text-2xl font-bold text-gray-900">
                                        Shop Smart
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        Quality products, simple shopping.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            Why Choose Us
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            Shopping Made Better
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Everything we do is focused on making your
                            shopping experience easier.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={<FiShoppingBag size={24} />}
                            title="Wide Selection"
                            description="Explore a growing collection of products across different categories."
                        />

                        <FeatureCard
                            icon={<FiCheckCircle size={24} />}
                            title="Quality Products"
                            description="We aim to provide reliable products that offer great value."
                        />

                        <FeatureCard
                            icon={<FiTruck size={24} />}
                            title="Easy Delivery"
                            description="Enjoy a simple and convenient ordering and delivery experience."
                        />

                        <FeatureCard
                            icon={<FiHeart size={24} />}
                            title="Customer Focused"
                            description="Our goal is to make every customer's shopping experience better."
                        />
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        Our Mission
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Your Convenience Comes First
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Our mission is to create a trustworthy and
                        user-friendly online shopping platform where customers
                        can discover products, make informed choices, and enjoy
                        a smooth shopping experience.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Ready to Explore?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-300">
                        Browse our latest products and discover something you
                        will love.
                    </p>

                    <Link
                        href={route("shop.index")}
                        className="mt-7 inline-flex rounded-lg bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-500"
                    >
                        Explore Products
                    </Link>
                </div>
            </section>
        </HomeLayout>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                {icon}
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>
        </div>
    );
}