import { api } from "./axios";

export const loginAPI = async (
  data: {
    email: string;
    password: string;
  }
) => {
  const res = await api.post(
    "/api/auth/login",
    data
  );

  return res.data;
};

export const registerAPI = async (
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const res = await api.post(
    "/api/auth/register",
    data
  );

  return res.data;
};