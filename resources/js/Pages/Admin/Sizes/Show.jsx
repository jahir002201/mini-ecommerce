
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Show({ admin, size }) {
    return (
        <DashboardLayout admin={admin} title="Size Details">
            <Head title={`Size ${size.name}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                <div>
                    <Link
                        href={route("admin.sizes.index")}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        ← Back to Sizes
                    </Link>

                    <h1 className="mt-3 text-2xl font-bold text-gray-800">
                        Size Details
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        View information about this product size.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="font-semibold text-gray-800">
                            Size #{size.id}
                        </h2>
                    </div>

                    <dl className="divide-y divide-gray-100">
                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                ID
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2">
                                {size.id}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                Size Name
                            </dt>
                            <dd className="sm:col-span-2">
                                <span className="inline-flex min-w-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-4 py-2 font-semibold text-gray-800">
                                    {size.name}
                                </span>
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                Created At
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2">
                                {size.created_at
                                    ? new Date(
                                          size.created_at
                                      ).toLocaleString()
                                    : "—"}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3">
                            <dt className="text-sm font-medium text-gray-500">
                                Last Updated
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2">
                                {size.updated_at
                                    ? new Date(
                                          size.updated_at
                                      ).toLocaleString()
                                    : "—"}
                            </dd>
                        </div>
                    </dl>

                    <div className="flex justify-end border-t border-gray-200 px-6 py-4">
                        <Link
                            href={route("admin.sizes.edit", size.id)}
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Edit Size
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
