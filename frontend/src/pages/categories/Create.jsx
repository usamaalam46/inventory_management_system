import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createCategory,
  getCategories,
} from "../../services/categoryService";

export default function CreateCategory() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    status: "active",
    parent_id: "",
  });

  useEffect(() => {

    const loadCategories = async () => {

      try {

        const data = await getCategories();

        setCategories(data);

      } catch (error) {

        console.log(error);
      }
    };

    loadCategories();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createCategory({
        ...form,
        parent_id: form.parent_id || null,
      });

      navigate("/categories");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">

      <div className="mb-6">

        <h1 className="text-2xl font-bold">
          Create Category
        </h1>

        <p className="text-gray-500 text-sm">
          Add new category or sub category
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
      >

        <div>

          <label className="text-sm font-medium">
            Category Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter category name"
            className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Parent Category
          </label>

          <select
            name="parent_id"
            value={form.parent_id}
            onChange={handleChange}
            className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
          >

            <option value="">
              Select Parent category
            </option>

            {categories.map((category) => (

              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="text-sm font-medium">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
          >

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save Category"}
        </button>

      </form>

    </div>
  );
}