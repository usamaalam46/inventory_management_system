// pages/brands/Edit.jsx

import { useEffect, useState } from "react";

import {
    getBrand,
    updateBrand,
} from "../../services/brandService";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

export default function EditBrand() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] = useState({
        name: "",
        slug: "",
        logo: "",
        status: "active",
    });

    useEffect(() => {

        let ignore = false;

        const loadBrand = async () => {

            try {

                const data =
                    await getBrand(id);

                if (!ignore) {

                    setForm({
                        name: data.name || "",
                        slug: data.slug || "",
                        logo: data.logo || "",
                        status:
                            data.status || "active",
                    });
                }

            } catch (error) {

                console.log(error);
            }
        };

        loadBrand();

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

            await updateBrand(id, form);

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
                    Edit Brand
                </h1>

                <p className="text-gray-500 text-sm">
                    Update brand details
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
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Slug
                    </label>

                    <input
                        type="text"
                        value={form.slug}
                        disabled
                        className="w-full mt-2 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 outline-none"
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
                        ? "Updating..."
                        : "Update Brand"}
                </button>

            </form>

        </div>
    );
}