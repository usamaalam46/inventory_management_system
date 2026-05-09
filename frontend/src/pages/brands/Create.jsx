// pages/brands/Create.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createBrand,
} from "../../services/brandService";

export default function CreateBrand() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] = useState({
        name: "",
        logo: "",
        status: "active",
    });

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

            await createBrand(form);

            navigate("/brands");

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
                    Create Brand
                </h1>

                <p className="text-gray-500 text-sm">
                    Add new product brand
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
            >

                <div>

                    <label className="text-sm font-medium">
                        Brand Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter brand name"
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Logo URL
                    </label>

                    <input
                        type="text"
                        name="logo"
                        value={form.logo}
                        onChange={handleChange}
                        placeholder="Enter logo url"
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
                    />

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
                        ? "Saving..."
                        : "Save Brand"}
                </button>

            </form>

        </div>
    );
}