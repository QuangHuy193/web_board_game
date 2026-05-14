import { api } from "./axios";

export const getGamesAPI = async () => {
  const res = await api.get("/api/games");

  return res.data;
};