"use client";

import { useGameStore } from "@/stores/useGameStore";
import PuzzleBoard from "../game/puzzle/PuzzleBoard";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
const GamePlay = () => {
  const {
    currentGame,
    selectedGameConfig,
    setCurrentGame,
    setselectedGameConfig,
  } = useGameStore();

  const [time, setTime] = useState(0);

  // timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // format mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleBack = () => {
    setCurrentGame(null);
    setselectedGameConfig(null);
  };

  return (
    <div className="relative">
      <button
        onClick={handleBack}
        className="bg-none absolute left-4 z-50 flex items-center gap-2 rounded-2xl bg-white/30
       px-4 py-2 text-yellow-200 border border-white/20 shadow-lg
       hover:scale-105 hover:bg-white/40 transition cursor-pointer font-semibold"
      >
        <ArrowLeft size={20} />
        Quay lại
      </button>
      <div className="flex justify-center">
        <div
          className="mb-6 flex w-full min-w-100 max-w-175 items-center 
              justify-between rounded-2xl border border-white/30 
              bg-white/30 px-5 py-4 shadow-xl backdrop-blur-md "
        >
          {/* Game name */}
          <div>
            <h1
              className="text-2xl font-extrabold text-transparent 
                  bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text"
            >
              🎮 {currentGame?.name}
            </h1>

            <p className="text-sm text-gray-600">
              Độ khó: {selectedGameConfig?.level}
            </p>
          </div>

          {/* Timer */}
          <div
            className="rounded-2xl bg-linear-to-r 
                from-orange-400 to-pink-500 px-5 py-3 
                text-xl font-bold text-white shadow-lg"
          >
            ⏱ {formatTime(time)}
          </div>
        </div>
      </div>

      {currentGame?.name === "Xếp hình" && (
        <PuzzleBoard
          size={
            (
              selectedGameConfig?.config as {
                size: number;
              }
            )?.size
          }
        />
      )}
    </div>
  );
};

export default GamePlay;
