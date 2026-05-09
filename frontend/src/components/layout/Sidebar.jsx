import {
  FaBox,
  FaLayerGroup,
  FaChartBar,
  FaWarehouse,
  FaCashRegister,
  FaHome,
  FaTags,
  FaTruck,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menuSections = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/",
      },
    ],
  },

  {
    title: "INVENTORY",
    items: [
      {
        name: "Categories",
        icon: <FaLayerGroup />,
        path: "/categories",
      },

      {
        name: "Brands",
        icon: <FaTags />,
        path: "/brands",
      },

      {
        name: "Products",
        icon: <FaBox />,
        path: "/products",
      },

      {
        name: "Stock",
        icon: <FaWarehouse />,
        path: "/stocks",
      },
    ],
  },

  {
    title: "PURCHASES",
    items: [
      {
        name: "Suppliers",
        icon: <FaTruck />,
        path: "/suppliers",
      },
    ],
  },

  {
    title: "SALES",
    items: [
      {
        name: "POS",
        icon: <FaCashRegister />,
        path: "/pos",
      },

      {
        name: "Reports",
        icon: <FaChartBar />,
        path: "/reports",
      },
    ],
  },
];

export default function Sidebar() {

  return (
    <div className="w-64 bg-[#0a0a0a] text-white flex flex-col">

      <div className="p-6 border-b border-white/10">

        <h1 className="text-2xl font-bold">
          INVTRACK
        </h1>

        <p className="text-gray-400 text-sm">
          Inventory System
        </p>

      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">

        {menuSections.map((section) => (

          <div key={section.title}>

            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-3 px-2">
              {section.title}
            </p>

            <div className="space-y-2">

              {section.items.map((item) => (

                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-white text-black"
                        : "text-gray-300 hover:bg-white/10"
                    }`
                  }
                >

                  <span className="text-sm">
                    {item.icon}
                  </span>

                  <span className="font-medium text-sm">
                    {item.name}
                  </span>

                </NavLink>

              ))}

            </div>

          </div>

        ))}

      </div>

      <div className="p-4 border-t border-white/10">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
            A
          </div>

          <div>

            <h4 className="font-medium">
              Admin
            </h4>

            <p className="text-xs text-gray-400">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}