"use client";

import LoginForm from "@/components/form/LoginForm";
import RegisterForm from "@/components/form/RegisterForm";
import GamePlay from "@/components/mainPage/GamePlay";
import Header from "@/components/mainPage/Header";
import MenuGame from "@/components/mainPage/MenuGame";
import { useGameStore } from "@/stores/useGameStore";
import { useOpenForm } from "@/stores/useOpenForm";

export default function Main() {
  const { currentGame, selectedGameConfig } = useGameStore();
  const { openForm } = useOpenForm();
  return (
    <div className="h-full bg-[url('/bg_main.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="sticky">
        <Header />
      </div>
      <div className="border w-full border-gray-200 mb-3 md:mb-5"></div>
      <div>
        {currentGame && selectedGameConfig ? <GamePlay /> : <MenuGame />}
      </div>
      <div>
        {openForm === "login" ? (
          <LoginForm />
        ) : openForm === "register" ? (
          <RegisterForm />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
