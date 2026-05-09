// pages/suppliers/Create.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createSupplier,
} from "../../services/supplierService";

export default function CreateSupplier() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] = useState({
        name: "",
        company_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        tax_number: "",
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

            await createSupplier(form);

            navigate("/suppliers");

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">

            <div className="mb-6">

                <h1 className="text-2xl font-bold">
                    Create Supplier
                </h1>

                <p className="text-gray-500 text-sm">
                    Add new supplier
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 p-6 grid grid-cols-2 gap-5"
            >

                <div>

                    <label className="text-sm font-medium">
                        Supplier Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Company Name
                    </label>

                    <input
                        type="text"
                        name="company_name"
                        value={form.company_name}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    />

                </div>

                <div className="col-span-2">

                    <label className="text-sm font-medium">
                        Address
                    </label>

                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Country
                    </label>

                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Tax Number
                    </label>

                    <input
                        type="text"
                        name="tax_number"
                        value={form.tax_number}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
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
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    >

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>

                </div>

                <div className="col-span-2">

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-6 py-3 rounded-xl"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Supplier"}
                    </button>

                </div>

            </form>

        </div>
    );
}