export default function Receipt({
    sale,
}) {

    return (
        <div className="max-w-md mx-auto bg-white p-6 text-black">

            <div className="text-center border-b border-dashed pb-4 mb-4">

                <h1 className="text-2xl font-bold">
                    INVTRACK
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    POS Receipt
                </p>

            </div>

            <div className="flex justify-between text-sm mb-6">

                <span>
                    Invoice
                </span>

                <span>
                    {sale.invoice_no}
                </span>

            </div>

            <div className="space-y-3">

                {sale.items.map((item) => (

                    <div
                        key={item.id}
                        className="flex justify-between border-b border-dashed pb-3"
                    >

                        <div>

                            <h3 className="font-medium">
                                {item.product.name}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">

                                {item.quantity}
                                {" × Rs "}
                                {item.unit_price}

                            </p>

                        </div>

                        <div className="font-semibold">

                            Rs {item.total_price}

                        </div>

                    </div>

                ))}

            </div>

            <div className="mt-6 border-t pt-4">

                <div className="flex justify-between text-lg font-bold">

                    <span>
                        Total
                    </span>

                    <span>
                        Rs {sale.total_amount}
                    </span>

                </div>

            </div>

            <div className="mt-8 text-center text-xs text-gray-400 border-t border-dashed pt-4">

                Thank you for your purchase

            </div>

            <button
                onClick={() => window.print()}
                className="w-full mt-6 bg-black text-white py-3 rounded-2xl print:hidden"
            >
                Print Receipt
            </button>

        </div>
    );
}