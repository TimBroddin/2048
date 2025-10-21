'use client';

import { GameManager } from '@/lib/game-manager';
import { Tile } from './tile';

interface GridProps {
  game: GameManager | null;
}

export function Grid({ game }: GridProps) {
  if (!game) return null;

  const tiles: JSX.Element[] = [];
  game.grid.eachCell((x, y, tile) => {
    if (tile) {
      tiles.push(<Tile key={`${x}-${y}-${tile.value}`} tile={tile} />);
    }
  });

  return (
    <div className="relative p-[15px] bg-grid-bg rounded-[6px] w-[530px] h-[530px] touch-none select-none">
      {/* Static grid cells */}
      <div className="absolute z-[1]">
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="flex gap-[15px] mb-[15px] last:mb-0">
            {Array.from({ length: 4 }).map((_, col) => (
              <div
                key={col}
                className="w-[106.25px] h-[106.25px] rounded-[3px] bg-cell-bg/35"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tile container */}
      <div className="absolute z-[2]">
        {tiles}
      </div>
    </div>
  );
}
