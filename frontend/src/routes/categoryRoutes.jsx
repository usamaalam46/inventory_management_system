import { Route } from "react-router-dom";

import Categories from "../pages/categories/Index";
import CreateCategory from "../pages/categories/Create";
import EditCategory from "../pages/categories/Edit";

const categoryRoutes = (
  <>
    <Route
      path="/categories"
      element={<Categories />}
    />

    <Route
      path="/categories/create"
      element={<CreateCategory />}
    />

    <Route
      path="/categories/edit/:id"
      element={<EditCategory />}
    />
  </>
);

export default categoryRoutes;