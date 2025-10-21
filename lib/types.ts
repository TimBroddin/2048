export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  grid: {
    size: number;
    cells: (TileState | null)[][];
  };
  score: number;
  over: boolean;
  won: boolean;
  keepPlaying: boolean;
}

export interface TileState {
  position: Position;
  value: number;
}

export interface Metadata {
  score: number;
  over: boolean;
  won: boolean;
  bestScore: number;
  terminated: boolean;
}

export type Direction = 0 | 1 | 2 | 3; // 0: up, 1: right, 2: down, 3: left
