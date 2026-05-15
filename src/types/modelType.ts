// game in db
export type Game = {
  id: string;
  name: string;
  image: string;

  configs: GameConfig[];
};

// gameConfig in db
export type GameConfig = {
  id: string;
  gameId: string;
  level: string;
  coin: number;
  config: object | null;
  createdAt?: Date;
};

// user
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  coin: number;
};
