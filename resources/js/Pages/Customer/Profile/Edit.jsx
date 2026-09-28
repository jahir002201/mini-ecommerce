import FlashMessage from '@/Components/FlashMessage';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ customer, flash }) {
    const { data, setData, put, processing, errors } = useForm({
        name: customer.name ?? '',
        email: customer.email ?? '',
        country: customer.country ?? '',
        address: customer.address ?? '',
        phone: customer.phone ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('customer.profile.update'));
    };

    return (
        <>
            <Head title="Edit Profile" />

            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="border-b bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                        <Link
                            href={route('customer.account')}
                            className="text-xl font-bold text-gray-800"
                        >
                            Mini E-Commerce
                        </Link>

                        <Link
                            href={route('customer.account')}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            Back to Account
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="mx-auto max-w-3xl px-4 py-8">
                    <div className="rounded-xl bg-white p-6 shadow sm:p-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Edit Profile
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Update your account information.
                            </p>
                        </div>

                        {/* Success Error Message */}
                        <FlashMessage flash={flash} />

                        <form onSubmit={submit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Phone
                                </label>

                                <input
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    placeholder="+880..."
                                />

                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Country */}
                            <div>
                                <label
                                    htmlFor="country"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Country
                                </label>

                                <input
                                    id="country"
                                    type="text"
                                    value={data.country}
                                    onChange={(e) =>
                                        setData('country', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Bangladesh"
                                />

                                {errors.country && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.country}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label
                                    htmlFor="address"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Address
                                </label>

                                <textarea
                                    id="address"
                                    rows="4"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData('address', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Your address"
                                />

                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : 'Save Changes'}
                                </button>

                                <Link
                                    href={route('customer.account')}
                                    className="rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}