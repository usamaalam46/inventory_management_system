// routes/supplierRoutes.jsx

import { Route } from "react-router-dom";

import Suppliers from "../pages/suppliers/Index";
import CreateSupplier from "../pages/suppliers/Create";
import EditSupplier from "../pages/suppliers/Edit";

const supplierRoutes = (
    <>
        <Route
            path="/suppliers"
            element={<Suppliers />}
        />

        <Route
            path="/suppliers/create"
            element={<CreateSupplier />}
        />

        <Route
            path="/suppliers/edit/:id"
            element={<EditSupplier />}
        />
    </>
);

export default supplierRoutes;