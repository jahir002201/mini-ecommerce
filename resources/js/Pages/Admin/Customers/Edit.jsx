import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import { FiArrowLeft, FiSave, FiUsers } from 'react-icons/fi';

export default function Edit({ customer, admin }) {
    const { data, setData, post, processing, errors } = useForm({
        name: customer.name ?? '',
        email: customer.email ?? '',
        password: '',
        country: customer.country ?? '',
        address: customer.address ?? '',
        phone: customer.phone ?? '',
        photo: null,
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.customers.update', customer.id), {
            forceFormData: true,
        });
    };

    return (
        <DashboardLayout admin={admin} title={`Edit Customer - ${customer.name}`}>
            <Head title={`Edit Customer - ${customer.name}`} />

            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-3xl px-4 py-8">

                    <div className="mb-6">
                        <Link
                            href={route('admin.customers.index')}
                            className="inline-flex items-center gap-2 text-sm text-gray-600"
                        >
                            <FiArrowLeft />
                            Back to Customers
                        </Link>

                        <div className="mt-4 flex items-center gap-2">
                            <FiUsers className="text-xl text-indigo-600" />

                            <h1 className="text-2xl font-bold">
                                Edit Customer
                            </h1>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <form onSubmit={submit} className="space-y-6">

                            <div className="grid gap-6 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData(
                                                'password',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        Leave empty to keep current password.
                                    </p>

                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Country
                                    </label>

                                    <input
                                        type="text"
                                        value={data.country}
                                        onChange={(e) =>
                                            setData(
                                                'country',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Change Photo
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                'photo',
                                                e.target.files[0]
                                            )
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                </div>
                            </div>

                            {customer.photo && (
                                <div>
                                    <p className="mb-2 text-sm font-semibold">
                                        Current Photo
                                    </p>

                                    <img
                                        src={`/storage/${customer.photo}`}
                                        alt={customer.name}
                                        className="h-20 w-20 rounded-full object-cover"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Address
                                </label>

                                <textarea
                                    rows="4"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData(
                                            'address',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border px-4 py-3"
                                />
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-6">
                                <Link
                                    href={route('admin.customers.index')}
                                    className="rounded-lg border px-5 py-3 font-semibold"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
                                >
                                    <FiSave />

                                    {processing
                                        ? 'Updating...'
                                        : 'Update Customer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}