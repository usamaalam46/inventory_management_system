import { Routes,Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import dashboardRoutes from "./dashboardRoutes";
import categoryRoutes from "./categoryRoutes";
import productRoutes from "./productRoutes";

export default function AppRoutes() {

  return (
    <Routes>

      <Route element={<DashboardLayout />}>

        {dashboardRoutes}

        {categoryRoutes}

        {productRoutes}

      </Route>

    </Routes>
  );
}