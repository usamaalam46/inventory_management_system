import { Route } from "react-router-dom";

import Brands from "../pages/brands/Index";
import CreateBrand from "../pages/brands/Create";
import EditBrand from "../pages/brands/Edit";

const brandRoutes = (
  <>
    <Route
      path="/brands"
      element={<Brands />}
    />

    <Route
      path="/brands/create"
      element={<CreateBrand />}
    />

    <Route
      path="/brands/edit/:id"
      element={<EditBrand />}
    />
  </>
);

export default brandRoutes;