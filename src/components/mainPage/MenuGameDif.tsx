import { useGameStore } from "@/stores/useGameStore";
import { GameConfig } from "@/types/modelType";
import GameItemDif from "./GameItemDif";

type MenuGameDifProps = {
  gameDiffs: GameConfig[];
};
const MenuGameDif = ({ gameDiffs }: MenuGameDifProps) => {
  const { currentGame, setCurrentGame } = useGameStore();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-pink-500/40 via-purple-500/40 to-blue-500/40 backdrop-blur-md">
      <div className="relative w-[92%] max-w-md rounded-3xl border border-white/30 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
        {/* Nút đóng */}
        <button
          onClick={() => setCurrentGame(null)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full 
        bg-linear-to-r from-red-400 to-pink-500 text-white shadow-md 
        hover:scale-110 hover:rotate-90 transition cursor-pointer"
        >
          ✕
        </button>

        {/* Title */}
        <h2
          className="text-2xl font-extrabold text-transparent bg-clip-text 
        bg-linear-to-r from-purple-600 to-pink-500"
        >
          🎮 {currentGame?.name}
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Chọn độ khó để bắt đầu cuộc chơi
        </p>

        {/* List */}
        <div className="mt-5 space-y-3">
          {gameDiffs.map((gamediff: GameConfig) => (
            <div key={gamediff.id}>
              <GameItemDif gameDiff={gamediff} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuGameDif;
