import { createPieces } from "@/libs/helper";
import { PuzzlePiece } from "@/types/type";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type PuzzleBoardProps = {
  size?: number;
  imageSrc?: string;
};

const PuzzleBoard = ({
  size = 3,
  imageSrc = "/48.jpg",
}: PuzzleBoardProps) => {
  const [storedPieces, setStoredPieces] = useState<PuzzlePiece[]>(() =>
    createPieces(size),
  );
  const [prevSize, setPrevSize] = useState(size);
  const [prevImageSrc, setPrevImageSrc] = useState(imageSrc);
  const dragIndex = useRef<number | null>(null);
  const [previewTime, setPreviewTime] = useState(5);

  // tách biến pieces riêng để có thể gán ngay trong render này
  let pieces = storedPieces;

  if (prevSize !== size || prevImageSrc !== imageSrc) {
    setPrevSize(size);
    setPrevImageSrc(imageSrc);
    const newPieces = createPieces(size);
    setStoredPieces(newPieces);
    pieces = newPieces; // ← dùng ngay, không chờ re-render
  }

  // ô đúng vị trí khi: index hiện tại trên bảng === id gốc của piece
  const isCorrect = (slotIndex: number, pieceId: number) =>
    slotIndex === pieceId;

  // thắng khi tất cả ô đều đúng vị trí
  const isWin = pieces.every((piece, slotIndex) =>
    isCorrect(slotIndex, piece.id),
  );

  const handlePointerDown = (index: number) => {
    dragIndex.current = index;
  };

  const handlePointerUp = (index: number) => {
    const from = dragIndex.current;
    if (from === null || from === index) {
      dragIndex.current = null;
      return;
    }
    setStoredPieces((prev) => {
      const next = [...prev];
      [next[from], next[index]] = [next[index], next[from]];
      return next;
    });
    dragIndex.current = null;
  };

  useEffect(() => {
    if (previewTime <= 0) return;

    const interval = setInterval(() => {
      setPreviewTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [previewTime]);

  return (
    <div className="relative flex flex-col items-center gap-4 p-4">
      {/* Win */}
      {isWin && (
        <p className="text-lg font-semibold text-green-500">🎉 Hoàn thành!</p>
      )}

      {/* Ảnh mẫu */}
      <div
        className="mb-4 flex flex-col items-center rounded-2xl bg-white/30 p-3 
        shadow-lg backdrop-blur-md lg:absolute lg:right-24 lg:top-1/2 lg:-translate-y-1/2"
      >
        <p className="mb-2 font-semibold text-white">🖼 Ảnh mẫu</p>

        <div className="relative">
          <Image
            width={140}
            height={140}
            alt="Ảnh mẫu"
            src={imageSrc}
            className={`rounded-xl shadow-md transition duration-700
              ${previewTime <= 0 ? "blur-sm" : ""}`}
          />

          {/* overlay blur text */}
        </div>

        {/* countdown */}
        <div
          className="mt-3 rounded-full bg-linear-to-r from-pink-500 to-orange-400
          px-4 py-1 text-sm font-bold text-white shadow-md"
        >
          {previewTime > 0 ? `⏳ Làm mờ sau ${previewTime}s` : "👀 Đã làm mờ"}
        </div>
      </div>

      {/* Puzzle luôn ở giữa */}
      <div
        className="grid w-full max-w-125 overflow-hidden rounded-xl border shadow-xl"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
        }}
      >
        {pieces.map((piece, slotIndex) => (
          <div
            key={slotIndex}
            onPointerDown={() => handlePointerDown(slotIndex)}
            onPointerUp={() => handlePointerUp(slotIndex)}
            className={[
              "aspect-square cursor-pointer select-none border border-black/10 transition",
              isCorrect(slotIndex, piece.id)
                ? "ring-2 ring-inset ring-green-400/70"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              backgroundImage: `url('${imageSrc}')`,
              backgroundSize: `${size * 100}% ${size * 100}%`,
              backgroundPosition: `${
                size === 1 ? 0 : (piece.col / (size - 1)) * 100
              }% ${size === 1 ? 0 : (piece.row / (size - 1)) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleBoard;
