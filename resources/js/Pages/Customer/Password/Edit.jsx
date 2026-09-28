import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit() {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('customer.password.update'), {
            onSuccess: () => {
                reset(
                    'current_password',
                    'password',
                    'password_confirmation'
                );
            },
        });
    };

    return (
        <>
            <Head title="Change Password" />

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
                <main className="mx-auto max-w-2xl px-4 py-8">
                    <div className="rounded-xl bg-white p-6 shadow sm:p-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Change Password
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Update your password to keep your account
                                secure.
                            </p>
                        </div>

                        <form
                            onSubmit={submit}
                            className="space-y-6"
                        >
                            {/* Current Password */}
                            <div>
                                <label
                                    htmlFor="current_password"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Current Password
                                </label>

                                <input
                                    id="current_password"
                                    type="password"
                                    value={data.current_password}
                                    onChange={(e) =>
                                        setData(
                                            'current_password',
                                            e.target.value
                                        )
                                    }
                                    autoComplete="current-password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />

                                {errors.current_password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.current_password}
                                    </p>
                                )}
                            </div>

                            {/* New Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    New Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />

                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Confirm New Password
                                </label>

                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />

                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password_confirmation}
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
                                        ? 'Changing Password...'
                                        : 'Change Password'}
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