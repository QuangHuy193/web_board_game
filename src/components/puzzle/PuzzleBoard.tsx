import { createPieces } from "@/libs/function";
import { PuzzlePiece } from "@/types/type";
import { useRef, useState } from "react";

export type PuzzleBoardProps = {
  size?: number;
  imageSrc?: string;
};

const PuzzleBoard = ({
  size = 3,
  imageSrc = "/test1.webp",
}: PuzzleBoardProps) => {
  const [storedPieces, setStoredPieces] = useState<PuzzlePiece[]>(() =>
    createPieces(size),
  );
  const [prevSize, setPrevSize] = useState(size);
  const [prevImageSrc, setPrevImageSrc] = useState(imageSrc);
  const dragIndex = useRef<number | null>(null);

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

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* thông báo thắng */}
      {isWin && (
        <p className="text-lg font-semibold text-green-500">🎉 Hoàn thành!</p>
      )}

      <div
        className="grid w-full max-w-125 overflow-hidden rounded-xl border"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {pieces.map((piece, slotIndex) => (
          <div
            key={slotIndex}
            onPointerDown={() => handlePointerDown(slotIndex)}
            onPointerUp={() => handlePointerUp(slotIndex)}
            className={[
              "aspect-square cursor-pointer select-none border border-black/10",
              // highlight xanh nếu đúng vị trí
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
