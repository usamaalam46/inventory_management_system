import api from "../api/axios";

export const getStocks = async () => {
    const res = await api.get("/stocks");
    return res.data;
};

export const scanProduct = async (data) => {
    const res = await api.post("/stocks/scan", data);
    return res.data;
};

export const updateStock = async (data) => {
    const res = await api.post("/stocks/update", data);
    return res.data;
};

export const getStockHistory = async (id) => {
    const res = await api.get(`/stocks/history/${id}`);
    return res.data;
};