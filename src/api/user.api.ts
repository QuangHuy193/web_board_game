import { api } from "./axios";

// tăng coin
export const addCoinAPI = async (data: { coin: number }) => {
  const res = await api.post("/api/user/coins/add", data);

  return res.data;
};

// giảm coin
export const minusCoinAPI = async (data: { coin: number }) => {
  const res = await api.post("/api/user/coins/minus", data);

  return res.data;
};
