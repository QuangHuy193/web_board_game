"use client";

import { useGameStore } from "@/stores/useGameStore";
import { Game } from "@/types/modelType";
import Image from "next/image";

type GameItemProps = {
  game: Game;
};

const GameItem = ({ game }: GameItemProps) => {
  const { setCurrentGame } = useGameStore();

  const handleSelectGame = () => {
    setCurrentGame(game);
  };
  return (
    <div>
      <button
        onClick={handleSelectGame}
        className="cursor-pointer group rounded-3xl bg-white/10 backdrop-blur-lg
        border border-white/10 hover:border-green-500 hover:scale-105 transition-all 
        duration-300 flex flex-col items-center justify-center shadow-xl p-4 aspect-square"
      >
        <Image
          className="rounded-xl"
          width={140}
          height={140}
          alt={game.name}
          src={game.image}
        />

        <p className="text-amber-300 font-semibold text-lg pt-3">{game.name}</p>
      </button>
    </div>
  );
};

export default GameItem;
