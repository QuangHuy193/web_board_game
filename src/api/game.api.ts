import { api } from "./axios";

export const getGames = async () => {
  const res = await api.get("/api/games");

  return res.data;
};