import { useEffect, useState } from "react";

import {
  getCategory,
  getCategories,
  updateCategory,
} from "../../services/categoryService";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

export default function EditCategory() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: "active",
    parent_id: "",
  });

  useEffect(() => {

    const init = async () => {

      try {

        // fetch categories
        const categoriesData =
          await getCategories();

        // fetch single category
        const categoryData =
          await getCategory(id);

        setCategories(categoriesData);

        setForm({
          name: categoryData.name || "",
          slug: categoryData.slug || "",
          status:
            categoryData.status || "active",

          parent_id:
            categoryData.parent_id || "",
        });

      } catch (error) {

        console.log(error);
      }
    };

    init();

  }, [id]);

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

      await updateCategory(id, {
        ...form,
        parent_id:
          form.parent_id || null,
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
          Edit Category
        </h1>

        <p className="text-gray-500 text-sm">
          Update category details
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5"
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
              Select Parent Category
            </option>

            {categories
              .filter(
                (category) =>
                  category.id !== Number(id)
              )
              .map((category) => (

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
          {loading
            ? "Updating..."
            : "Update Category"}
        </button>

      </form>

    </div>
  );
}