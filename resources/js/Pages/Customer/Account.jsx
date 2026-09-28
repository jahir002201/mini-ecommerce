import FlashMessage from '@/Components/FlashMessage';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Account({ customer, flash }) {
    const { post, processing } = useForm();

    const logout = (e) => {
        e.preventDefault();

        post(route('customer.logout'));
    };

    return (
        <>
            <Head title="My Account" />

            <div className="min-h-screen bg-gray-100">
                <header className="border-b bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                        <div>
                            <Link
                                href="/"
                                className="text-xl font-bold text-gray-800"
                            >
                                Mini E-Commerce
                            </Link>
                        </div>

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
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    <div className="rounded-xl bg-white p-8 shadow">
                        <h1 className="text-2xl font-bold text-gray-800">
                            My Account
                        </h1>

                        {/* Success Error Message */}
                        <FlashMessage flash={flash} />

                        <div className="mt-6 space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Name
                                </p>

                                <p className="font-medium text-gray-800">
                                    {customer.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="font-medium text-gray-800">
                                    {customer.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Phone
                                </p>

                                <p className="font-medium text-gray-800">
                                    {customer.phone || 'Not added'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Address
                                </p>

                                <p className="font-medium text-gray-800">
                                    {customer.address || 'Not added'}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route('customer.profile.edit')}
                            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Edit Profile
                        </Link>

                        <Link
                            href={route('customer.password.edit')}
                            className="rounded-lg border border-indigo-600 px-5 py-3 text-center font-semibold text-indigo-600 hover:bg-indigo-50"
                        >
                            Change Password
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}