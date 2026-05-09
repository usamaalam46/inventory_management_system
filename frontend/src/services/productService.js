// services/productService.js

import api from "../api/axios";


// ✅ GET PRODUCTS WITH SEARCH + PAGINATION
export const getProducts = async ({
    search = "",
    page = 1,
    limit = 10,
    category_id = "",
    brand_id = "",
    supplier_id = "",
    status = "",
}) => {

    const res = await api.get("/product", {
        params: {
            search,
            page,
            limit,
            category_id,
            brand_id,
            supplier_id,
            status,
        }
    });

    return res.data;
};


// ✅ GET SINGLE PRODUCT
export const getProduct = async (id) => {

    const res =
        await api.get(`/product/${id}`);

    return res.data;
};


// ✅ CREATE PRODUCT
export const createProduct = async (data) => {

    const res =
        await api.post("/product", data);

    return res.data;
};


// ✅ UPDATE PRODUCT
export const updateProduct = async (
    id,
    data
) => {

    const res =
        await api.put(
            `/product/${id}`,
            data
        );

    return res.data;
};


// ✅ DELETE PRODUCT
export const deleteProduct = async (
    id
) => {

    const res =
        await api.delete(
            `/product/${id}`
        );

    return res.data;
};


// ✅ TOGGLE STATUS
export const toggleProductStatus =
    async (id) => {

        const res =
            await api.put(
                `/product/${id}/status`
            );

        return res.data;
    };