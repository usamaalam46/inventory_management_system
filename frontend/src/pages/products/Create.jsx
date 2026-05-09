// pages/products/Create.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createProduct,
} from "../../services/productService";

import {
  getCategories,
} from "../../services/categoryService";

import {
  getBrands,
} from "../../services/brandService";

import {
  getSuppliers,
} from "../../services/supplierService";
import { units } from "../../utils/units";
export default function CreateProduct() {

  const navigate = useNavigate();

  // loading
  const [loading, setLoading] =
    useState(false);

  // dropdowns
  const [categories, setCategories] =
    useState([]);

  const [brands, setBrands] =
    useState([]);

  const [suppliers, setSuppliers] =
    useState([]);

  // form
  const [form, setForm] =
    useState({

      name: "",

      category_id: "",

      brand_id: "",

      supplier_id: "",

      barcode: "",

      unit: "",

      description: "",

      image: "",

      price: "",

      cost_price: "",

      quantity: "",

      alert_quantity: "",

      expiry_date: "",

      is_featured: false,

      track_stock: true,

      status: "active",
    });

  // load dropdowns
  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          categoryData,
          brandData,
          supplierData
        ] = await Promise.all([
          getCategories(),
          getBrands(),
          getSuppliers(),
        ]);

        setCategories(categoryData);

        setBrands(brandData);

        setSuppliers(supplierData);

      } catch (error) {

        console.log(error);
      }
    };

    loadData();

  }, []);

  // handle change
  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createProduct(form);

      navigate("/products");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold">
          Create Product
        </h1>

        <p className="text-gray-500">
          Add new inventory product
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-6"
      >

        {/* LEFT SIDE */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-6 space-y-6">

          {/* NAME */}
          <div>

            <label className="text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* CATEGORY + BRAND */}
          <div className="grid grid-cols-2 gap-6">

            {/* CATEGORY */}
            <div>

              <label className="text-sm font-medium">
                Category
              </label>

              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                required
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
              >

                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (

                  <option
                    key={cat.id}
                    value={cat.id}
                  >
                    {cat.name}
                  </option>

                ))}

              </select>

            </div>

            {/* BRAND */}
            <div>

              <label className="text-sm font-medium">
                Brand
              </label>

              <select
                name="brand_id"
                value={form.brand_id}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
              >

                <option value="">
                  Select Brand
                </option>

                {brands.map((brand) => (

                  <option
                    key={brand.id}
                    value={brand.id}
                  >
                    {brand.name}
                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* SUPPLIER + UNIT */}
          <div className="grid grid-cols-2 gap-6">

            {/* SUPPLIER */}
            <div>

              <label className="text-sm font-medium">
                Supplier
              </label>

              <select
                name="supplier_id"
                value={form.supplier_id}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
              >

                <option value="">
                  Select Supplier
                </option>

                {suppliers.map((supplier) => (

                  <option
                    key={supplier.id}
                    value={supplier.id}
                  >
                    {supplier.name}
                  </option>

                ))}

              </select>

            </div>

            {/* UNIT */}
            <div>

              <label className="text-sm font-medium">
                Unit
              </label>

              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black bg-white"
              >

                <option value="">
                  Select Unit
                </option>

                {units.map((unit) => (

                  <option
                    key={unit.value}
                    value={unit.value}
                  >
                    {unit.label}
                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* BARCODE + IMAGE */}
          <div className="grid grid-cols-2 gap-6">

            {/* BARCODE */}
            <div>

              <label className="text-sm font-medium">
                Barcode
              </label>

              <input
                type="text"
                name="barcode"
                value={form.barcode}
                onChange={handleChange}
                placeholder="Enter barcode"
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
              />

            </div>

            {/* IMAGE */}
            <div>

              <label className="text-sm font-medium">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Enter image url"
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
              />

            </div>

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          {/* PRICING */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-5">

            <h3 className="font-semibold text-lg">
              Pricing
            </h3>

            {/* PRICE */}
            <div>

              <label className="text-sm font-medium">
                Sale Price
              </label>

              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3"
              />

            </div>

            {/* COST PRICE */}
            <div>

              <label className="text-sm font-medium">
                Cost Price
              </label>

              <input
                type="number"
                step="0.01"
                name="cost_price"
                value={form.cost_price}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3"
              />

            </div>

            {/* QUANTITY */}
            <div>

              <label className="text-sm font-medium">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3"
              />

            </div>

            {/* ALERT QUANTITY */}
            <div>

              <label className="text-sm font-medium">
                Alert Quantity
              </label>

              <input
                type="number"
                name="alert_quantity"
                value={form.alert_quantity}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3"
              />

            </div>

            {/* EXPIRY */}
            <div>

              <label className="text-sm font-medium">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiry_date"
                value={form.expiry_date}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3"
              />

            </div>

            {/* STATUS */}
            <div>

              <label className="text-sm font-medium">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3"
              >

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>

              </select>

            </div>

            {/* FEATURED */}
            <div className="flex items-center justify-between">

              <label className="text-sm font-medium">
                Featured Product
              </label>

              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
              />

            </div>

            {/* TRACK STOCK */}
            <div className="flex items-center justify-between">

              <label className="text-sm font-medium">
                Track Stock
              </label>

              <input
                type="checkbox"
                name="track_stock"
                checked={form.track_stock}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-medium"
          >
            {loading
              ? "Saving..."
              : "Save Product"}
          </button>

        </div>

      </form>

    </div>
  );
}