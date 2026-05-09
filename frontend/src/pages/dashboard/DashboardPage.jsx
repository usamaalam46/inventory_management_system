function StatCard({ title, value, dark }) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 p-6
      ${dark ? "bg-[#0a0a0a] text-white" : "bg-white"}`}
    >
      <p className="text-sm text-gray-400 uppercase tracking-wide">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-4 gap-6">

        <StatCard
          title="Total Products"
          value="1,248"
          dark
        />

        <StatCard
          title="Categories"
          value="34"
        />

        <StatCard
          title="Low Stock"
          value="18"
        />

        <StatCard
          title="Today's Sales"
          value="Rs 84k"
        />

      </div>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-8 bg-white rounded-2xl border border-gray-100 p-6">

          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold uppercase tracking-wide">
              Recent Products
            </h3>

            <button className="text-sm text-gray-500">
              View all
            </button>
          </div>

          <table className="w-full">

            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase">
                <th className="pb-4">Product</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm">

              <tr className="border-t border-gray-100">
                <td className="py-4">Wireless Keyboard</td>
                <td>Electronics</td>
                <td>142</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    In Stock
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        <div className="col-span-4 space-y-6">

          <div className="bg-white rounded-2xl border border-gray-100 p-6">

            <div className="flex justify-between mb-6">
              <h3 className="font-semibold uppercase tracking-wide">
                Stock Levels
              </h3>

              <button className="text-sm text-gray-500">
                Details
              </button>
            </div>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Electronics</span>
                  <span>82%</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-black h-2 rounded-full w-[82%]" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}