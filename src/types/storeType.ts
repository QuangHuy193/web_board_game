// useGameStore
// game in db
export type Game = {
  id: string;
  name: string;
  image: string;
};

//
export type GameStore = {
  games: Game[];

  isLoadingGames: boolean;

  currentGame: Game | null;

  fetchGames: () => Promise<void>;
};
