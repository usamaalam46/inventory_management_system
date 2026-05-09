// pages/suppliers/Index.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getSuppliers,
  deleteSupplier,
} from "../../services/supplierService";

export default function Suppliers() {

  const [suppliers, setSuppliers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const refreshSuppliers = async () => {

    try {

      const data =
        await getSuppliers();

      setSuppliers(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    let ignore = false;

    const loadSuppliers = async () => {

      try {

        const data =
          await getSuppliers();

        if (!ignore) {
          setSuppliers(data);
        }

      } catch (error) {

        console.log(error);

      } finally {

        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadSuppliers();

    return () => {
      ignore = true;
    };

  }, []);

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this supplier?"
      );

    if (!confirmDelete) return;

    try {

      await deleteSupplier(id);

      refreshSuppliers();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Suppliers
          </h1>

          <p className="text-gray-500 text-sm">
            Manage suppliers
          </p>

        </div>

        <Link
          to="/suppliers/create"
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Add Supplier
        </Link>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 overflow-x-auto">

        {loading ? (

          <p>Loading...</p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="text-left text-xs uppercase text-gray-400">

                <th className="pb-4">
                  Name
                </th>

                <th className="pb-4">
                  Company
                </th>

                <th className="pb-4">
                  Email
                </th>

                <th className="pb-4">
                  Phone
                </th>

                <th className="pb-4">
                  Status
                </th>

                <th className="pb-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {suppliers.map((supplier) => (

                <tr
                  key={supplier.id}
                  className="border-t border-gray-100"
                >

                  <td className="py-4 font-medium">
                    {supplier.name}
                  </td>

                  <td className="py-4">
                    {supplier.company_name || "-"}
                  </td>

                  <td className="py-4">
                    {supplier.email || "-"}
                  </td>

                  <td className="py-4">
                    {supplier.phone || "-"}
                  </td>

                  <td className="py-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full
                      ${supplier.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {supplier.status}
                    </span>

                  </td>

                  <td className="py-4">

                    <div className="flex gap-4">

                      <Link
                        to={`/suppliers/edit/${supplier.id}`}
                        className="text-sm text-black"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(supplier.id)
                        }
                        className="text-sm text-red-500"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}