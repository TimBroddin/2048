import { Grid } from './grid';
import { Tile } from './tile';
import { Direction, Position, GameState } from './types';

export class GameManager {
  size: number;
  grid: Grid;
  score: number;
  over: boolean;
  won: boolean;
  keepPlaying: boolean;
  startTiles: number;

  constructor(size: number, previousState?: GameState) {
    this.size = size;
    this.startTiles = 2;
    this.score = 0;
    this.over = false;
    this.won = false;
    this.keepPlaying = false;

    if (previousState) {
      this.grid = new Grid(previousState.grid.size, previousState.grid.cells);
      this.score = previousState.score;
      this.over = previousState.over;
      this.won = previousState.won;
      this.keepPlaying = previousState.keepPlaying;
    } else {
      this.grid = new Grid(this.size);
      this.addStartTiles();
    }
  }

  // Restart the game
  restart(): void {
    this.grid = new Grid(this.size);
    this.score = 0;
    this.over = false;
    this.won = false;
    this.keepPlaying = false;
    this.addStartTiles();
  }

  // Keep playing after winning
  continueGame(): void {
    this.keepPlaying = true;
  }

  // Return true if the game is lost, or has won and the user hasn't kept playing
  isGameTerminated(): boolean {
    return this.over || (this.won && !this.keepPlaying);
  }

  // Set up the initial tiles to start the game with
  addStartTiles(): void {
    for (let i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  }

  // Adds a tile in a random position
  addRandomTile(): void {
    if (this.grid.cellsAvailable()) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const cell = this.grid.randomAvailableCell();
      if (cell) {
        const tile = new Tile(cell, value);
        this.grid.insertTile(tile);
      }
    }
  }

  // Represent the current game as an object
  serialize(): GameState {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      over: this.over,
      won: this.won,
      keepPlaying: this.keepPlaying,
    };
  }

  // Save all tile positions and remove merger info
  prepareTiles(): void {
    this.grid.eachCell((x, y, tile) => {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  }

  // Move a tile and its representation
  moveTile(tile: Tile, cell: Position): void {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }

  // Move tiles on the grid in the specified direction
  move(direction: Direction): boolean {
    if (this.isGameTerminated()) return false;

    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    let moved = false;

    this.prepareTiles();

    traversals.x.forEach((x) => {
      traversals.y.forEach((y) => {
        const cell = { x, y };
        const tile = this.grid.cellContent(cell);

        if (tile) {
          const positions = this.findFarthestPosition(cell, vector);
          const next = this.grid.cellContent(positions.next);

          if (next && next.value === tile.value && !next.mergedFrom) {
            const merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            this.grid.insertTile(merged);
            this.grid.removeTile(tile);

            tile.updatePosition(positions.next);
            this.score += merged.value;

            if (merged.value === 2048) this.won = true;
          } else {
            this.moveTile(tile, positions.farthest);
          }

          if (!this.positionsEqual(cell, tile)) {
            moved = true;
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();
      if (!this.movesAvailable()) {
        this.over = true;
      }
    }

    return moved;
  }

  // Get the vector representing the chosen direction
  getVector(direction: Direction): Position {
    const map: Record<Direction, Position> = {
      0: { x: 0, y: -1 }, // Up
      1: { x: 1, y: 0 },  // Right
      2: { x: 0, y: 1 },  // Down
      3: { x: -1, y: 0 }, // Left
    };
    return map[direction];
  }

  // Build a list of positions to traverse in the right order
  buildTraversals(vector: Position): { x: number[]; y: number[] } {
    const traversals = { x: [] as number[], y: [] as number[] };

    for (let pos = 0; pos < this.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  findFarthestPosition(
    cell: Position,
    vector: Position
  ): { farthest: Position; next: Position } {
    let previous: Position;

    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell,
    };
  }

  movesAvailable(): boolean {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  tileMatchesAvailable(): boolean {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const tile = this.grid.cellContent({ x, y });

        if (tile) {
          for (let direction = 0; direction < 4; direction++) {
            const vector = this.getVector(direction as Direction);
            const cell = { x: x + vector.x, y: y + vector.y };
            const other = this.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  positionsEqual(first: Position, second: Position): boolean {
    return first.x === second.x && first.y === second.y;
  }
}
