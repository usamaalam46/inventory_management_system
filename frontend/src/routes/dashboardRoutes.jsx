import { Route } from "react-router-dom";

import DashboardPage from "../pages/dashboard/DashboardPage";

const dashboardRoutes = (
  <>
    <Route
      path="/"
      element={<DashboardPage />}
    />
  </>
);

export default dashboardRoutes;