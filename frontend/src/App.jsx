import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import dashboardRoutes from "./routes/dashboardRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import brandRoutes from "./routes/brandRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import stockRoutes from "./routes/stockRoutes";
import posRoutes from "./routes/posRoutes";
import reportRoutes from "./routes/reportRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashboardLayout />}>

          {dashboardRoutes}

          {categoryRoutes}

          {productRoutes}

          {brandRoutes}

          {supplierRoutes}

           {stockRoutes}

          {posRoutes}

          {reportRoutes}

        </Route>

      </Routes>
    </BrowserRouter>
  );
}