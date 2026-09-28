import { Head, Link, useForm } from '@inertiajs/react';

export default function Dashboard({ admin }) {
    const { post, processing } = useForm();

    const logout = (e) => {
        e.preventDefault();

        post(route('admin.logout'));
    };

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gray-100">
                <header className="border-b bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">
                                Mini E-Commerce
                            </h1>

                            <p className="text-sm text-gray-500">
                                Admin Dashboard
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                {admin.name}
                            </span>

                            <form onSubmit={logout}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                    {processing ? 'Logging out...' : 'Logout'}
                                </button>
                            </form>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    <div className="rounded-xl bg-white p-8 shadow">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Welcome, {admin.name}!
                        </h2>

                        <p className="mt-2 text-gray-600">
                            You are successfully logged in as an administrator.
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}