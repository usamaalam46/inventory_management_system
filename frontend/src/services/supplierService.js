// services/supplierService.js

import api from "../api/axios";

export const getSuppliers = async () => {
    const res =
        await api.get("/supplier");

    return res.data;
};

export const getSupplier = async (id) => {
    const res =
        await api.get(`/supplier/${id}`);

    return res.data;
};

export const createSupplier = async (data) => {
    const res =
        await api.post("/supplier", data);

    return res.data;
};

export const updateSupplier = async (id, data) => {
    const res =
        await api.put(`/supplier/${id}`, data);

    return res.data;
};

export const deleteSupplier = async (id) => {
    const res =
        await api.delete(`/supplier/${id}`);

    return res.data;
};