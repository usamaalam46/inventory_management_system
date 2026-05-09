// pages/brands/Index.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getBrands,
    deleteBrand,
} from "../../services/brandService";

export default function Brands() {

    const [brands, setBrands] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // refresh brands
    const refreshBrands = async () => {

        try {

            const data =
                await getBrands();

            setBrands(data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        let ignore = false;

        const loadBrands = async () => {

            try {

                const data =
                    await getBrands();

                if (!ignore) {
                    setBrands(data);
                }

            } catch (error) {

                console.log(error);

            } finally {

                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadBrands();

        return () => {
            ignore = true;
        };

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this brand?"
            );

        if (!confirmDelete) return;

        try {

            await deleteBrand(id);

            refreshBrands();

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-bold">
                        Brands
                    </h1>

                    <p className="text-gray-500 text-sm">
                        Manage product brands
                    </p>

                </div>

                <Link
                    to="/brands/create"
                    className="bg-black text-white px-5 py-3 rounded-xl"
                >
                    Add Brand
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
                                    Slug
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

                            {brands.map((brand) => (

                                <tr
                                    key={brand.id}
                                    className="border-t border-gray-100"
                                >

                                    <td className="py-4 font-medium">
                                        {brand.name}
                                    </td>

                                    <td className="py-4">
                                        {brand.slug}
                                    </td>

                                    <td className="py-4">

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full
                      ${brand.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {brand.status}
                                        </span>

                                    </td>

                                    <td className="py-4">

                                        <div className="flex gap-4">

                                            <Link
                                                to={`/brands/edit/${brand.id}`}
                                                className="text-sm text-black"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(brand.id)
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