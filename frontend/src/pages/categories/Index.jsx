import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCategories,
  deleteCategory,
} from "../../services/categoryService";

export default function Categories() {

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // refresh categories
  const refreshCategories = async () => {

    try {

      const data =
        await getCategories();

      setCategories(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    let ignore = false;

    const loadCategories = async () => {

      try {

        const data =
          await getCategories();

        // prevent state update after unmount
        if (!ignore) {
          setCategories(data);
        }

      } catch (error) {

        console.log(error);

      } finally {

        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      ignore = true;
    };

  }, []);

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this category?"
      );

    if (!confirmDelete) return;

    try {

      await deleteCategory(id);

      refreshCategories();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500 text-sm">
            Manage product categories
          </p>

        </div>

        <Link
          to="/categories/create"
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Add Category
        </Link>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">

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
                  Parent Category
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

              {categories.map((cat) => (

                <tr
                  key={cat.id}
                  className="border-t border-gray-100"
                >

                  <td className="py-4 font-medium">
                    {cat.name}
                  </td>

                  <td className="py-4">

                    {cat.parent
                      ? cat.parent.name
                      : "None"}

                  </td>

                  <td className="py-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full
                      ${cat.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {cat.status}
                    </span>

                  </td>

                  <td className="py-4">

                    <div className="flex gap-4">

                      <Link
                        to={`/categories/edit/${cat.id}`}
                        className="text-sm text-black"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(cat.id)
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