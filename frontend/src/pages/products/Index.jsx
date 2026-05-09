// pages/products/Index.jsx

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getProducts,
  deleteProduct,
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

export default function Products() {

  // products
  const [products, setProducts] =
    useState([]);

  // dropdown data
  const [categories, setCategories] =
    useState([]);

  const [brands, setBrands] =
    useState([]);

  const [suppliers, setSuppliers] =
    useState([]);

  // loading
  const [loading, setLoading] =
    useState(true);

  // search
  const [search, setSearch] =
    useState("");

  // pagination
  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState({
      total: 0,
      totalPages: 1,
    });

  // filters
  const [filters, setFilters] =
    useState({
      category_id: "",
      brand_id: "",
      supplier_id: "",
      status: "",
    });

  // load dropdown data
  useEffect(() => {

    const loadFilters = async () => {

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

    loadFilters();

  }, []);

  // load products
  useEffect(() => {

    let ignore = false;

    const loadProducts = async () => {

      try {

        setLoading(true);

        const data =
          await getProducts({

            search,

            page,

            limit: 10,

            category_id:
              filters.category_id,

            brand_id:
              filters.brand_id,

            supplier_id:
              filters.supplier_id,

            status:
              filters.status,
          });

        if (!ignore) {

          setProducts(data.data);

          setPagination(
            data.pagination
          );
        }

      } catch (error) {

        console.log(error);

      } finally {

        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };

  }, [
    search,
    page,
    filters
  ]);

  // delete
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      const data =
        await getProducts({

          search,

          page,

          limit: 10,

          category_id:
            filters.category_id,

          brand_id:
            filters.brand_id,

          supplier_id:
            filters.supplier_id,

          status:
            filters.status,
        });

      setProducts(data.data);

      setPagination(
        data.pagination
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage inventory products
          </p>

        </div>

        <Link
          to="/products/create"
          className="bg-black text-white px-6 py-3 rounded-2xl"
        >
          Add Product
        </Link>

      </div>

      {/* CARD */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6">

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {

              setSearch(e.target.value);

              setPage(1);
            }}
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
          />

          {/* CATEGORY */}
          <select
            value={filters.category_id}
            onChange={(e) => {

              setFilters({
                ...filters,
                category_id:
                  e.target.value
              });

              setPage(1);
            }}
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
          >

            <option value="">
              All Categories
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

          {/* BRAND */}
          <select
            value={filters.brand_id}
            onChange={(e) => {

              setFilters({
                ...filters,
                brand_id:
                  e.target.value
              });

              setPage(1);
            }}
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
          >

            <option value="">
              All Brands
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

          {/* SUPPLIER */}
          <select
            value={filters.supplier_id}
            onChange={(e) => {

              setFilters({
                ...filters,
                supplier_id:
                  e.target.value
              });

              setPage(1);
            }}
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
          >

            <option value="">
              All Suppliers
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

          {/* STATUS */}
          <select
            value={filters.status}
            onChange={(e) => {

              setFilters({
                ...filters,
                status:
                  e.target.value
              });

              setPage(1);
            }}
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
          >

            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left text-xs uppercase text-gray-400">

                <th className="pb-4">
                  Product
                </th>

                <th className="pb-4">
                  SKU
                </th>

                <th className="pb-4">
                  Category
                </th>

                <th className="pb-4">
                  Brand
                </th>

                <th className="pb-4">
                  Supplier
                </th>

                <th className="pb-4">
                  Price
                </th>

                <th className="pb-4">
                  Stock
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

              {loading ? (

                <tr>

                  <td
                    colSpan="9"
                    className="py-10 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : products.length > 0 ? (

                products.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t border-gray-100"
                  >

                    {/* PRODUCT */}
                    <td className="py-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            product.image ||
                            "https://placehold.co/60x60"
                          }
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />

                        <div>

                          <h3 className="font-medium">
                            {product.name}
                          </h3>

                          <p className="text-xs text-gray-400">
                            {product.barcode || "-"}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* SKU */}
                    <td className="py-4">
                      {product.sku}
                    </td>

                    {/* CATEGORY */}
                    <td className="py-4">
                      {product.category?.name}
                    </td>

                    {/* BRAND */}
                    <td className="py-4">
                      {product.brand?.name || "-"}
                    </td>

                    {/* SUPPLIER */}
                    <td className="py-4">
                      {product.supplier?.name || "-"}
                    </td>

                    {/* PRICE */}
                    <td className="py-4">
                      Rs {product.price}
                    </td>

                    {/* STOCK */}
                    <td className="py-4">

                      <span
                        className={`text-xs px-3 py-1 rounded-full
                        ${product.quantity > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {product.quantity}
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="py-4">

                      <span
                        className={`text-xs px-3 py-1 rounded-full
                        ${product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {product.status}
                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="py-4">

                      <div className="flex gap-4">

                        <Link
                          to={`/products/edit/${product.id}`}
                          className="text-sm text-black"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              product.id
                            )
                          }
                          className="text-sm text-red-500"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="py-10 text-center text-gray-400"
                  >
                    No products found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-8">

          <p className="text-sm text-gray-500">

            Showing Page
            {" "}
            {page}
            {" "}
            of
            {" "}
            {pagination.totalPages}

          </p>

          <div className="flex gap-3">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage(page - 1)
              }
              className="border border-gray-200 px-4 py-2 rounded-xl disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={
                page ===
                pagination.totalPages
              }
              onClick={() =>
                setPage(page + 1)
              }
              className="border border-gray-200 px-4 py-2 rounded-xl disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}