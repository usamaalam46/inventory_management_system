import { FaBell } from "react-icons/fa";

export default function Header() {
  return (
    <div className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between">

      <div>
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-black"
        />

        <button className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center">
          <FaBell />
        </button>

        <div className="bg-black text-white px-4 py-2 rounded-full text-sm">
          May 2026
        </div>

      </div>

    </div>
  );
}