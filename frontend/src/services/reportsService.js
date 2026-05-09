import api from "../api/axios";

export const getStats =
    async () => {

        const res =
            await api.get("/reports/stats");

        return res.data;
    };

export const getSales =
    async ({
        page = 1,
        search = "",
    }) => {

        const res =
            await api.get(
                "/reports/sales",
                {
                    params: {
                        page,
                        search,
                        limit: 5,
                    },
                }
            );

        return res.data;
    };

export const getLowStock =
    async ({
        page = 1,
        search = "",
    }) => {

        const res =
            await api.get(
                "/reports/low-stock",
                {
                    params: {
                        page,
                        search,
                        limit: 5,
                    },
                }
            );

        return res.data;
    };

export const getTransactions =
    async ({
        page = 1,
        search = "",
    }) => {

        const res =
            await api.get(
                "/reports/transactions",
                {
                    params: {
                        page,
                        search,
                        limit: 10,
                    },
                }
            );

        return res.data;
    };