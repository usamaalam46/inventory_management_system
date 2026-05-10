import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
} from "../../services/authService";

import useAuthStore
  from "../../store/authStore";

export default function Login() {

  const navigate =
    useNavigate();

  const login =
    useAuthStore(
      (state) => state.login
    );

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          await loginUser(form);

        // save in zustand
        login(
          data.token,
          data.user
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-3xl border border-gray-100 p-8 space-y-6"
      >

        <div>

          <h1 className="text-3xl font-bold">
            Login
          </h1>

          <p className="text-gray-500 mt-1">
            Inventory Management System
          </p>

        </div>

        {/* EMAIL */}
        <div>

          <label className="text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
          />

        </div>

        {/* PASSWORD */}
        <div>

          <label className="text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-2xl"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

    </div>
  );
}