import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('customer.register.store'));
    };

    return (
        <>
            <Head title="Customer Registration" />

            <div className="min-h-screen bg-gray-100 px-4 py-12">
                <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Create Account
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Create your Mini E-Commerce account
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium text-gray-700"
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500"
                                placeholder="Your name"
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
                                className="mb-1 block text-sm font-medium text-gray-700"
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500"
                                placeholder="you@example.com"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500"
                                placeholder="••••••••"
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
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500"
                                placeholder="••••••••"
                            />

                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Creating account...' : 'Register'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href={route('customer.login')}
                            className="font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}