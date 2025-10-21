import { Position, TileState } from './types';

export class Tile {
  x: number;
  y: number;
  value: number;
  previousPosition: Position | null;
  mergedFrom: [Tile, Tile] | null;

  constructor(position: Position, value: number) {
    this.x = position.x;
    this.y = position.y;
    this.value = value;
    this.previousPosition = null;
    this.mergedFrom = null;
  }

  savePosition(): void {
    this.previousPosition = { x: this.x, y: this.y };
  }

  updatePosition(position: Position): void {
    this.x = position.x;
    this.y = position.y;
  }

  serialize(): TileState {
    return {
      position: {
        x: this.x,
        y: this.y,
      },
      value: this.value,
    };
  }
}
