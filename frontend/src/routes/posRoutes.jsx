import { Route } from "react-router-dom";

import POS from "../pages/pos/Index";


const posRoutes = (
  <>
    <Route
      path="/pos"
      element={<POS />}
    />

  </>
);

export default posRoutes;