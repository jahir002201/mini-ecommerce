import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.login.store'));
    };

    return (
        <>
            <Head title="Admin Login" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Admin Login
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Login to your admin dashboard
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
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
                                placeholder="admin@example.com"
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

                        {/* Remember */}
                        <div className="flex items-center gap-2">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />

                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-600"
                            >
                                Remember me
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}