import { FiMenu } from "react-icons/fi";

export default function AdminNavbar({
    admin,
    onMenuClick,
}) {
    const name = admin?.name ?? "Admin";

    return (
        <header className="sticky top-0 z-30 border-b bg-white">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">

                {/* Mobile Menu */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                >
                    <FiMenu size={23} />
                </button>

                {/* Page Title */}
                <div className="hidden sm:block">
                    <h1 className="font-semibold text-gray-800">
                        Admin Dashboard
                    </h1>

                    <p className="text-xs text-gray-500">
                        Manage your store
                    </p>
                </div>

                {/* Admin Profile */}
                <div className="ml-auto flex items-center gap-3">

                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-gray-800">
                            {name}
                        </p>

                        <p className="text-xs text-gray-500">
                            Administrator
                        </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                        {name.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
}