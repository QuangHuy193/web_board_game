import { api } from "./axios";

// lấy danh sách game
export const getGamesAPI = async () => {
  const res = await api.get("/api/games");

  return res.data;
};

// lấy ảnh ngẫu nhiên cho game puzzle
export const getImageInPuzzleAPI = async () => {
  const res = await api.get("/api/games/puzzle/random");

  return res.data;
};
