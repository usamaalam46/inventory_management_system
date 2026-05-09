import { useEffect, useState } from "react";

import {
  getStocks,
  updateStock,
  getStockHistory,
} from "../../services/stocksService";

export default function StockPage() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [type, setType] = useState("IN");

  const [quantity, setQuantity] = useState("");

  const [note, setNote] = useState("");

  const [history, setHistory] = useState([]);

  const [showHistory, setShowHistory] =
    useState(false);

  const fetchStocks = async () => {

    try {

      const data = await getStocks();

      setProducts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    const loadStocks = async () => {

      try {

        const data = await getStocks();

        setProducts(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    loadStocks();

  }, []);

  const openModal = (product) => {

    setSelectedProduct(product);
  };

  const closeModal = () => {

    setSelectedProduct(null);

    setQuantity("");

    setNote("");

    setType("IN");
  };

  const handleSubmit = async () => {

    try {

      await updateStock({

        qr_code: selectedProduct.qr_code,

        type,

        quantity,

        note,
      });

      fetchStocks();

      closeModal();

    } catch (error) {

      alert(error.response?.data?.message);
    }
  };

  const openHistory = async (product) => {

    try {

      const data =
        await getStockHistory(product.id);

      setHistory(data);

      setShowHistory(true);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Stock Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage inventory stock levels
        </p>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

        {loading ? (

          <div className="p-10 text-center">
            Loading...
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-xs uppercase text-gray-400">

                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Brand
                </th>

                <th className="px-6 py-4">
                  Stock
                </th>

                <th className="px-6 py-4">
                  Alert Qty
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => {

                const qty =
                  Number(product.quantity);

                const alertQty =
                  Number(product.alert_quantity);

                return (
                  <tr
                    key={product.id}
                    className="border-t border-gray-100"
                  >

                    <td className="px-6 py-5">

                      <div>

                        <h3 className="font-semibold">
                          {product.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          SKU: {product.sku}
                        </p>

                      </div>

                    </td>

                    <td className="px-6 py-5 text-sm">
                      {product.category?.name}
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {product.brand?.name || "-"}
                    </td>

                    <td className="px-6 py-5 font-medium">
                      {product.quantity}{" "}
                      {product.unit}
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {product.alert_quantity}
                    </td>

                    <td className="px-6 py-5">

                      {qty <= 0 ? (

                        <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                          Out of Stock
                        </span>

                      ) : qty <= alertQty ? (

                        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                          Low Stock
                        </span>

                      ) : (

                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                          In Stock
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            openModal(product)
                          }
                          className="bg-black text-white px-4 py-2 rounded-xl text-sm"
                        >
                          Update
                        </button>

                        <button
                          onClick={() =>
                            openHistory(product)
                          }
                          className="border border-gray-300 px-4 py-2 rounded-xl text-sm"
                        >
                          History
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        )}

      </div>

      {selectedProduct && (

        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-6 w-full max-w-md">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold">
                  Update Stock
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedProduct.name}
                </p>

              </div>

              <button
                onClick={closeModal}
                className="text-gray-400"
              >
                ✕
              </button>

            </div>

            <div className="space-y-5">

              <div>

                <label className="text-sm font-medium">
                  Transaction Type
                </label>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value)
                  }
                  className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
                >

                  <option value="IN">
                    Add Stock
                  </option>

                  <option value="OUT">
                    Reduce Stock
                  </option>

                </select>

              </div>

              <div>

                <label className="text-sm font-medium">
                  Quantity
                </label>

                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  placeholder="Enter quantity"
                  className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
                />

              </div>

              <div>

                <label className="text-sm font-medium">
                  Note
                </label>

                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) =>
                    setNote(e.target.value)
                  }
                  placeholder="Optional note"
                  className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
                />

              </div>

              <div className="flex justify-end gap-3 pt-2">

                <button
                  onClick={closeModal}
                  className="border border-gray-300 px-5 py-3 rounded-2xl"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-black text-white px-5 py-3 rounded-2xl"
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {showHistory && (

        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold">
                  Stock History
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Inventory transaction logs
                </p>

              </div>

              <button
                onClick={() =>
                  setShowHistory(false)
                }
                className="text-gray-400"
              >
                ✕
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr className="text-left text-xs uppercase text-gray-400">

                    <th className="px-6 py-4">
                      Type
                    </th>

                    <th className="px-6 py-4">
                      Quantity
                    </th>

                    <th className="px-6 py-4">
                      Previous
                    </th>

                    <th className="px-6 py-4">
                      New
                    </th>

                    <th className="px-6 py-4">
                      Source
                    </th>

                    <th className="px-6 py-4">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {history.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-gray-100"
                    >

                      <td className="px-6 py-4 capitalize">
                        {item.type}
                      </td>

                      <td className="px-6 py-4">
                        {item.quantity}
                      </td>

                      <td className="px-6 py-4">
                        {item.previous_stock}
                      </td>

                      <td className="px-6 py-4">
                        {item.new_stock}
                      </td>

                      <td className="px-6 py-4">
                        {item.source || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(
                          item.created_at
                        ).toLocaleString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}