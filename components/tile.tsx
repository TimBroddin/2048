'use client';

import { Tile as TileClass } from '@/lib/tile';

interface TileProps {
  tile: TileClass;
}

const tileColors: Record<number, string> = {
  2: 'bg-tile-2 text-text-primary',
  4: 'bg-tile-4 text-text-primary',
  8: 'bg-tile-8 text-text-light',
  16: 'bg-tile-16 text-text-light',
  32: 'bg-tile-32 text-text-light',
  64: 'bg-tile-64 text-text-light',
  128: 'bg-tile-128 text-text-light text-[45px]',
  256: 'bg-tile-256 text-text-light text-[45px]',
  512: 'bg-tile-512 text-text-light text-[45px]',
  1024: 'bg-tile-1024 text-text-light text-[35px]',
  2048: 'bg-tile-2048 text-text-light text-[35px]',
};

export function Tile({ tile }: TileProps) {
  const position = tile.previousPosition || { x: tile.x, y: tile.y };
  const colorClass = tileColors[tile.value] || 'bg-tile-super text-text-light text-[30px]';

  // Calculate position in pixels
  const xPos = position.y * 121; // y is actually the column
  const yPos = position.x * 121; // x is actually the row

  const isNew = !tile.previousPosition;
  const isMerged = !!tile.mergedFrom;

  return (
    <div
      className={`absolute w-[107px] h-[107px] rounded-[3px] flex items-center justify-center font-bold text-[55px] transition-all duration-100 ease-in-out ${colorClass} ${isNew ? 'animate-appear' : ''} ${isMerged ? 'animate-pop' : ''}`}
      style={{
        transform: `translate(${tile.y * 121}px, ${tile.x * 121}px)`,
      }}
    >
      {tile.value}
    </div>
  );
}
