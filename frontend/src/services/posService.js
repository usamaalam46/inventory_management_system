import api from "../api/axios";

export const getPosProducts =
    async () => {

        const res =
            await api.get("/pos/products");

        return res.data;
    };

export const checkoutSale =
    async (data) => {

        const res =
            await api.post(
                "/pos/checkout",
                data
            );

        return res.data;
    };