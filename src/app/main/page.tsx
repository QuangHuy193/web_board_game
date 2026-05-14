"use client";

import GamePlay from "@/components/mainPage/GamePlay";
import Header from "@/components/mainPage/Header";
import MenuGame from "@/components/mainPage/MenuGame";
import { useGameStore } from "@/stores/useGameStore";

export default function Main() {
  const { currentGame, selectedGameConfig } = useGameStore();
  return (
    <div className="h-full bg-[url('/bg_main.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="sticky">
        <Header />
      </div>
      <div className="border w-full border-gray-200 my-3 md:my-5"></div>
      <div>
        {currentGame && selectedGameConfig ? <GamePlay/> : <MenuGame />}
      </div>
    </div>
  );
}
