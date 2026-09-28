export default function FlashMessage({ flash }) {
    return (
        <>
            {flash?.success && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {flash.success}
                </div>
            )}

            {flash?.error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {flash.error}
                </div>
            )}
        </>
    );
}