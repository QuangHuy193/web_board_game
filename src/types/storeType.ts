import { Game, GameConfig } from "./modelType";

// useGameStore
export type GameStore = {
  games: Game[]; // danh sách game từ db

  isLoadingGames: boolean; // đang tải ds game

  currentGame: Game | null; // game đang được chọn

  selectedGameConfig: GameConfig | null; // chọn độ khó

  fetchGames: () => Promise<void>; // lấy ds game từ db

  setCurrentGame: (game: Game | null) => void;
};
