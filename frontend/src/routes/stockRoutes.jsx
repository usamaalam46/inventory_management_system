import { Route } from "react-router-dom";

import Stocks from "../pages/stocks/Index";


const stockRoutes = (
  <>
    <Route
      path="/stocks"
      element={<Stocks />}
    />

  </>
);

export default stockRoutes;