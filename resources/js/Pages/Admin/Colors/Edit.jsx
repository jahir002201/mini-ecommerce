
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Edit({ admin, color }) {
    const { data, setData, put, processing, errors } = useForm({
        name: color.name ?? "",
        color_code: color.color_code ?? "#000000",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("admin.colors.update", color.id), {
            preserveScroll: true,
        });
    };

    const validHex = /^#[0-9A-Fa-f]{6}$/.test(data.color_code);

    return (
        <DashboardLayout admin={admin} title="Edit Color">
            <Head title={`Edit ${color.name}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                <div>
                    <Link
                        href={route("admin.colors.index")}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        ← Back to Colors
                    </Link>

                    <h1 className="mt-3 text-2xl font-bold text-gray-800">
                        Edit Color
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Update color #{color.id}.
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
                            Color Name *
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="color_code"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            HEX Color Code *
                        </label>

                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                aria-label="Choose color"
                                value={validHex ? data.color_code : "#000000"}
                                onChange={(e) =>
                                    setData("color_code", e.target.value)
                                }
                                className="h-14 w-20 cursor-pointer rounded-lg border border-gray-300 bg-white p-1"
                            />

                            <div
                                className="h-12 w-12 rounded-full border border-gray-300 shadow-sm"
                                style={{
                                    backgroundColor: validHex
                                        ? data.color_code
                                        : "#000000",
                                }}
                            />

                            <span className="font-mono text-sm font-semibold uppercase text-gray-700">
                                {data.color_code}
                            </span>
                        </div>

                        <input
                            id="color_code"
                            type="text"
                            value={data.color_code}
                            onChange={(e) =>
                                setData("color_code", e.target.value)
                            }
                            maxLength={7}
                            placeholder="#FF0000"
                            className={`mt-3 w-full rounded-lg border px-4 py-3 font-mono text-sm uppercase outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.color_code
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />

                        {errors.color_code && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.color_code}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Enter a six-digit HEX code, such as #000000.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route("admin.colors.index")}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                        >
                            {processing ? "Updating..." : "Update Color"}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
