import { PuzzlePiece } from "@/types/type";

// hàm đảo ô cho game xếp hình
const shufflePieces = (pieces: PuzzlePiece[]): PuzzlePiece[] => {
  const arr = [...pieces];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// hàm tạo ô cho game xếp hình
export const createPieces = (size: number): PuzzlePiece[] => {
  const temp: PuzzlePiece[] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      temp.push({ id: row * size + col, row, col });
    }
  }
  return shufflePieces(temp);
};