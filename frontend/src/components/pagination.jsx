export default function Pagination({

    page,

    totalPages,

    onPageChange,

}) {

    if (totalPages <= 1) return null;

    const pages =
        Array.from(
            { length: totalPages },
            (_, i) => i + 1
        );

    return (

        <div className="flex items-center justify-between mt-8">

            <p className="text-sm text-gray-500">

                Page {page} of {totalPages}

            </p>

            <div className="flex items-center gap-2">

                <button

                    disabled={page === 1}

                    onClick={() =>
                        onPageChange(page - 1)
                    }

                    className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-50"
                >
                    Previous
                </button>

                {pages.map((item) => (

                    <button
                        key={item}

                        onClick={() =>
                            onPageChange(item)
                        }

                        className={`w-10 h-10 rounded-xl text-sm font-medium

            ${page === item

                                ? "bg-black text-white"

                                : "border border-gray-200"
                            }`}
                    >
                        {item}
                    </button>

                ))}

                <button

                    disabled={
                        page === totalPages
                    }

                    onClick={() =>
                        onPageChange(page + 1)
                    }

                    className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    );
}