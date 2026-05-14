import { useGameStore } from "@/stores/useGameStore";
import { GameConfig } from "@/types/modelType";

type GameItemDifProps = {
  gameDiff: GameConfig;
};

const GameItemDif = ({ gameDiff }: GameItemDifProps) => {
  const { setselectedGameConfig } = useGameStore();
  const handleSelectGamediff = () => {
    setselectedGameConfig(gameDiff);
  };
  return (
    <div
      onClick={handleSelectGamediff}
      className="cursor-pointer rounded-xl border border-white/40 
      bg-linear-to-r from-blue-100 to-purple-100
      p-4 shadow-md backdrop-blur-md 
      hover:scale-[1.03] hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between">
        {/* Level */}
        <div className="font-bold text-gray-800 capitalize">
          🎯 {gameDiff.level}
        </div>

        {/* Coin */}
        <div className="rounded-full bg-yellow-400/90 px-3 py-1 text-sm font-semibold text-white shadow">
          🪙 {gameDiff.coin}
        </div>
      </div>
    </div>
  );
};

export default GameItemDif;
