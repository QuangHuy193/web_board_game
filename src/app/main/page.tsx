"use client";
import Header from "@/components/mainPage/Header";
import MenuGame from "@/components/mainPage/MenuGame";
import PuzzleBoard from "@/components/puzzle/PuzzleBoard";
import { useState } from "react";

export default function Main() {
  const [number1, setNumber1] = useState(3);
  return (
    <div>
      <div className="sticky">
        <Header />
      </div>
      <div className="border w-full border-gray-200 my-3 md:my-5"></div>
      <div>
        <MenuGame />
      </div>
      <button onClick={() => setNumber1((prev) => prev + 1)}>+</button>
      {number1}
      <button onClick={() => setNumber1((prev) => prev - 1)}>-</button>
      <PuzzleBoard size={number1} />
    </div>
  );
}
