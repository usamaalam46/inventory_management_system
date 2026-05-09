import { Route } from "react-router-dom";

import ProductsPage from "../pages/products/Index";
import AddProductPage from "../pages/products/Create";
import UpdateProductPage from "../pages/products/Edit";

const productRoutes = (
  <>
    <Route
      path="/products"
      element={<ProductsPage />}
    />

    <Route
      path="/products/create"
      element={<AddProductPage />}
    />

    <Route
      path="/products/edit/:id"
      element={<UpdateProductPage />}
    />
  </>
);

export default productRoutes;