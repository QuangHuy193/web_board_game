import { useGameStore } from "@/stores/useGameStore";
import { GameConfig } from "@/types/modelType";
import GameItemDif from "./GameItemDif";
import { X } from "lucide-react";
import CloseButton from "../ui/CloseButton ";

type MenuGameDifProps = {
  gameDiffs: GameConfig[];
};
const MenuGameDif = ({ gameDiffs }: MenuGameDifProps) => {
  const { currentGame, setCurrentGame } = useGameStore();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-pink-500/40 via-purple-500/40 to-blue-500/40 backdrop-blur-md">
      <div className="relative w-[92%] max-w-md rounded-3xl border border-white/30 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
        {/* Nút đóng */}
        <CloseButton onClick={() => setCurrentGame(null)} />

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
