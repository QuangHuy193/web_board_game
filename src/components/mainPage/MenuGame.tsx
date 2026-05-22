"use client";

import { useGameStore } from "@/stores/useGameStore";
import { Game } from "@/types/modelType";
import { useEffect } from "react";
import GameItem from "./GameItem";
import MenuGameDif from "./MenuGameDif";
import Loader from "../ui/Loader";

const MenuGame = () => {
  const { games, isLoadingGames, fetchGames, currentGame } = useGameStore();

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <div className="h-screen">
      {isLoadingGames ? (
        <Loader text="Đang tải trò chơi..." />
      ) : games.length === 0 ? (
        "không có trò chơi"
      ) : (
        <>
          <div
            className="
          grid grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
          >
            {games.map((game: Game) => (
              <div key={game.id} className="flex justify-center">
                <GameItem game={game} />
              </div>
            ))}
          </div>

          {/* render 1 lần duy nhất */}
          {currentGame && <MenuGameDif gameDiffs={currentGame.configs} />}
        </>
      )}
    </div>
  );
};

export default MenuGame;
