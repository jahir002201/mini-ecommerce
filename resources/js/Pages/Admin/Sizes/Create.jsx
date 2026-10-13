
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Create({ admin }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.sizes.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <DashboardLayout admin={admin} title="Create Size">
            <Head title="Create Size" />

            <div className="mx-auto max-w-2xl space-y-6">
                <div>
                    <Link
                        href={route("admin.sizes.index")}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        ← Back to Sizes
                    </Link>

                    <h1 className="mt-3 text-2xl font-bold text-gray-800">
                        Create Size
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Add a new size for your products.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Size Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Example: S, M, L, XL, 42"
                            autoFocus
                            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />

                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route("admin.sizes.index")}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? "Saving..." : "Create Size"}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
