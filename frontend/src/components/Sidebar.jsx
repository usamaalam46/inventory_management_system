import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "block px-3 py-2 rounded transition hover:bg-white hover:text-black";

  const activeClass = "bg-white text-black";

  return (
    <div className="w-64 bg-[var(--bg)] border-r p-5 min-h-screen">
      <h2 className="text-xl font-semibold mb-8">Inventory</h2>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={({isActive}) =>
          `${linkClass} ${isActive ? activeClass : ""}`}>
          Dashboard
        </NavLink>

        <NavLink to="/categories" className={({isActive}) =>
          `${linkClass} ${isActive ? activeClass : ""}`}>
          Categories
        </NavLink>

        <NavLink to="/products" className={({isActive}) =>
          `${linkClass} ${isActive ? activeClass : ""}`}>
          Products
        </NavLink>

        <NavLink to="/pos" className={({isActive}) =>
          `${linkClass} ${isActive ? activeClass : ""}`}>
          POS
        </NavLink>

        <NavLink to="/reports" className={({isActive}) =>
          `${linkClass} ${isActive ? activeClass : ""}`}>
          Reports
        </NavLink>
      </nav>
    </div>
  );
}