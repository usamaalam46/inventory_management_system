import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout
  from "./layouts/DashboardLayout";

// auth
import Login
  from "./pages/auth/Login";

import ProtectedRoute
  from "./routes/ProtectedRoute";

// routes
import dashboardRoutes
  from "./routes/dashboardRoutes";

import categoryRoutes
  from "./routes/categoryRoutes";

import productRoutes
  from "./routes/productRoutes";

import brandRoutes
  from "./routes/brandRoutes";

import supplierRoutes
  from "./routes/supplierRoutes";

import stockRoutes
  from "./routes/stockRoutes";

import posRoutes
  from "./routes/posRoutes";

import reportRoutes
  from "./routes/reportRoutes";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>

              <DashboardLayout />

            </ProtectedRoute>
          }
        >

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