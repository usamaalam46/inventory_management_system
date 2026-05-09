import { Route } from "react-router-dom";

import Report from "../pages/reports/Index";


const posRoutes = (
  <>
    <Route
      path="/reports"
      element={<Report />}
    />

  </>
);

export default posRoutes;