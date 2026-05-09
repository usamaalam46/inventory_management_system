// pages/suppliers/Edit.jsx

import { useEffect, useState } from "react";

import {
    getSupplier,
    updateSupplier,
} from "../../services/supplierService";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

export default function EditSupplier() {

    const { id } = useParams();

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

    useEffect(() => {

        let ignore = false;

        const loadSupplier = async () => {

            try {

                const data =
                    await getSupplier(id);

                if (!ignore) {

                    setForm({
                        name: data.name || "",
                        company_name:
                            data.company_name || "",

                        email:
                            data.email || "",

                        phone:
                            data.phone || "",

                        address:
                            data.address || "",

                        city:
                            data.city || "",

                        country:
                            data.country || "",

                        tax_number:
                            data.tax_number || "",

                        status:
                            data.status || "active",
                    });
                }

            } catch (error) {

                console.log(error);
            }
        };

        loadSupplier();

        return () => {
            ignore = true;
        };

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

            await updateSupplier(id, form);

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
                    Edit Supplier
                </h1>

                <p className="text-gray-500 text-sm">
                    Update supplier details
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
                            ? "Updating..."
                            : "Update Supplier"}
                    </button>

                </div>

            </form>

        </div>
    );
}