import { GameItemProps } from "@/types/propType";
import Image from "next/image";

const GameItem = ({ game }: GameItemProps) => {
  return (
    <div>
      <button
        className="cursor-pointer group rounded-3xl bg-white/10 backdrop-blur-lg
        border border-white/10 hover:border-cyan-400/50 hover:scale-105 transition-all 
        duration-300 flex flex-col items-center justify-center shadow-xl p-4 aspect-square" 
      >
        <Image width={140} height={140} alt={game.name} src={game.image} />

        <p className="text-amber-400 font-semibold text-lg">{game.name}</p>
      </button>
    </div>
  );
};

export default GameItem;
