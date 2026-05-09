import api from "../api/axios";

export const getBrands = async () => {
  const res = await api.get("/brand");
  return res.data;
};

export const getBrand = async (id) => {
  const res = await api.get(`/brand/${id}`);
  return res.data;
};

export const createBrand = async (data) => {
  const res = await api.post("/brand", data);
  return res.data;
};

export const updateBrand = async (id, data) => {
  const res = await api.put(`/brand/${id}`, data);
  return res.data;
};

export const deleteBrand = async (id) => {
  const res = await api.delete(`/brand/${id}`);
  return res.data;
};