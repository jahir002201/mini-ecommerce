
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Show({ admin, color }) {
    return (
        <DashboardLayout admin={admin} title="Color Details">
            <Head title={`Color: ${color.name}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                <div>
                    <Link
                        href={route("admin.colors.index")}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        ← Back to Colors
                    </Link>

                    <h1 className="mt-3 text-2xl font-bold text-gray-800">
                        Color Details
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        View the color information used for product variations.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="font-semibold text-gray-800">
                            Color #{color.id}
                        </h2>
                    </div>

                    <div className="flex flex-col items-center gap-4 border-b border-gray-100 px-6 py-8">
                        <div
                            className="h-28 w-28 rounded-full border border-gray-300 shadow-md"
                            style={{
                                backgroundColor: color.color_code,
                            }}
                        />

                        <h3 className="text-xl font-bold text-gray-800">
                            {color.name}
                        </h3>

                        <span className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2 font-mono text-sm uppercase text-gray-700">
                            {color.color_code}
                        </span>
                    </div>

                    <dl className="divide-y divide-gray-100">
                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                ID
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2">
                                {color.id}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                Color Name
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2">
                                {color.name}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                HEX Code
                            </dt>
                            <dd className="font-mono text-sm uppercase text-gray-900 sm:col-span-2">
                                {color.color_code}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                Created At
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2">
                                {color.created_at
                                    ? new Date(color.created_at).toLocaleString()
                                    : "—"}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                Last Updated
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2">
                                {color.updated_at
                                    ? new Date(color.updated_at).toLocaleString()
                                    : "—"}
                            </dd>
                        </div>
                    </dl>

                    <div className="flex justify-end border-t border-gray-200 px-6 py-4">
                        <Link
                            href={route("admin.colors.edit", color.id)}
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Edit Color
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
