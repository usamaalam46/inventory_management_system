import {
  useEffect,
  useState,
} from "react";

import {
  getStats,
  getSales,
  getLowStock,
  getTransactions,
} from "../../services/reportsService";

import Pagination
  from "../../components/Pagination";

export default function ReportsPage() {

  const [stats, setStats] =
    useState(null);

  const [sales, setSales] =
    useState([]);

  const [lowStock, setLowStock] =
    useState([]);

  const [transactions,
    setTransactions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [salesPage,
    setSalesPage] =
    useState(1);

  const [lowStockPage,
    setLowStockPage] =
    useState(1);

  const [transactionPage,
    setTransactionPage] =
    useState(1);

  const [salesMeta,
    setSalesMeta] =
    useState(null);

  const [lowStockMeta,
    setLowStockMeta] =
    useState(null);

  const [transactionMeta,
    setTransactionMeta] =
    useState(null);

  useEffect(() => {

    const loadReports =
      async () => {

        try {

          const statsData =
            await getStats();

          setStats(statsData);

          const salesData =
            await getSales({

              page: salesPage,

              search,
            });

          setSales(
            salesData.data
          );

          setSalesMeta(
            salesData.meta
          );

          const lowStockData =
            await getLowStock({

              page: lowStockPage,

              search,
            });

          setLowStock(
            lowStockData.data
          );

          setLowStockMeta(
            lowStockData.meta
          );

          const transactionData =
            await getTransactions({

              page: transactionPage,

              search,
            });

          setTransactions(
            transactionData.data
          );

          setTransactionMeta(
            transactionData.meta
          );

        } catch (error) {

          console.log(error);
        }
      };

    loadReports();

  }, [

    salesPage,

    lowStockPage,

    transactionPage,

    search,
  ]);

  if (!stats) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Reports Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Inventory reports & analytics
          </p>

        </div>

        <input
          type="text"

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          placeholder="Search reports..."

          className="border border-gray-200 rounded-2xl px-4 py-3 w-80 outline-none focus:border-black"
        />

      </div>

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-black text-white rounded-3xl p-6">

          <p className="text-sm text-gray-300">
            Total Products
          </p>

          <h2 className="text-4xl font-bold mt-4">

            {stats.totalProducts}

          </h2>

        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6">

          <p className="text-sm text-gray-500">
            Total Sales
          </p>

          <h2 className="text-4xl font-bold mt-4">

            {stats.totalSales}

          </h2>

        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6">

          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <h2 className="text-4xl font-bold mt-4">

            Rs {stats.revenue}

          </h2>

        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6">

          <p className="text-sm text-gray-500">
            Low Stock
          </p>

          <h2 className="text-4xl font-bold mt-4">

            {stats.lowStock}

          </h2>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white border border-gray-100 rounded-3xl p-6">

          <h2 className="text-xl font-bold mb-6">
            Recent Sales
          </h2>

          <div className="space-y-4">

            {sales.map((sale) => (

              <div
                key={sale.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >

                <div>

                  <h3 className="font-medium">
                    {sale.invoice_no}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">

                    {new Date(
                      sale.created_at
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="font-bold">

                  Rs {sale.total_amount}

                </div>

              </div>

            ))}

          </div>

          <Pagination

            page={salesPage}

            totalPages={
              salesMeta?.totalPages || 1
            }

            onPageChange={
              setSalesPage
            }

          />

        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6">

          <h2 className="text-xl font-bold mb-6">
            Low Stock Products
          </h2>

          <div className="space-y-4">

            {lowStock.map((product) => (

              <div
                key={product.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >

                <div>

                  <h3 className="font-medium">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">

                    Alert:
                    {" "}
                    {product.alert_quantity}

                  </p>

                </div>

                <div className="text-red-500 font-bold">

                  {product.quantity}

                </div>

              </div>

            ))}

          </div>

          <Pagination

            page={lowStockPage}

            totalPages={
              lowStockMeta?.totalPages || 1
            }

            onPageChange={
              setLowStockPage
            }

          />

        </div>

      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6">

        <h2 className="text-xl font-bold mb-6">

          Recent Transactions

        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left text-xs uppercase text-gray-400">

              <th className="pb-4">
                Product
              </th>

              <th className="pb-4">
                Type
              </th>

              <th className="pb-4">
                Quantity
              </th>

              <th className="pb-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((item) => (

              <tr
                key={item.id}
                className="border-t border-gray-100"
              >

                <td className="py-4">

                  {item.product?.name}

                </td>

                <td className="capitalize">

                  {item.type}

                </td>

                <td>

                  {item.quantity}

                </td>

                <td>

                  {new Date(
                    item.created_at
                  ).toLocaleString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <Pagination

          page={transactionPage}

          totalPages={
            transactionMeta?.totalPages || 1
          }

          onPageChange={
            setTransactionPage
          }

        />

      </div>

    </div>
  );
}