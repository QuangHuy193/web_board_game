import { getGamesAPI } from "@/api/game.api";
import { GameStore } from "@/types/storeType";
import { create } from "zustand";

export const useGameStore = create<GameStore>((set) => ({
  games: [],

  isLoadingGames: false,

  currentGame: null,

  fetchGames: async () => {
    try {
      set({
        isLoadingGames: true,
      });

      const games = await getGamesAPI();

      set({
        games,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({
        isLoadingGames: false,
      });
    }
  },
}));
