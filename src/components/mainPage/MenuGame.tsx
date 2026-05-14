"use client";

import { useGameStore } from "@/stores/useGameStore";
import { Game } from "@/types/storeType";
import { useEffect } from "react";
import GameItem from "./GameItem";

const MenuGame = () => {
  const { games, isLoadingGames, fetchGames } = useGameStore();

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <div>
      {isLoadingGames ? (
        "đang tải..."
      ) : games.length === 0 ? (
        "không có trò chơi"
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game: Game) => (
            <div key={game.id} className="flex justify-center">
              <GameItem game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuGame;
