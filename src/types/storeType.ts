import { Game, GameConfig, User } from "./modelType";

// useGameStore
export type GameStore = {
  games: Game[]; // danh sách game từ db

  isLoadingGames: boolean; // đang tải ds game

  currentGame: Game | null; // game đang được chọn

  selectedGameConfig: GameConfig | null; // chọn độ khó

  fetchGames: () => Promise<void>; // lấy ds game từ db

  setCurrentGame: (game: Game | null) => void;
  setselectedGameConfig: (config: GameConfig | null) => void;
};

export type UserStore = {
  user: User | null;

  accessToken: string | null;

  setUser: (user: User | null) => void;

  setAccessToken: (token: string | null) => void;

  logout: () => void;
};

export type OpenFormStore = {
  openForm: "login" | "register" | "";

  setopenForm: (form: "login" | "register" | "") => void;
};

export type ConfirmDialogState = {
  open: boolean;

  title: string;

  description?: string;

  reward?: number;

  onConfirm?: () => void;

  openDialog: (data: {
    title: string;

    description?: string;

    reward?: number;

    onConfirm?: () => void;
  }) => void;

  closeDialog: () => void;
};
