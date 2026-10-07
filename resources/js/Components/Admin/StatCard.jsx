import { Link } from "@inertiajs/react";

export default function StatCard({
    title,
    value,
    icon: Icon,
    href,
}) {
    return (
        <Link
            href={href}
            className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-800">
                        {value}
                    </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon size={24} />
                </div>

            </div>
        </Link>
    );
}