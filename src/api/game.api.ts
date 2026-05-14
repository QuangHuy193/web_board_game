import { api } from "./axios";

// lấy danh sách game
export const getGamesAPI = async () => {
  const res = await api.get("/api/games");

  return res.data;
};
