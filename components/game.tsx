'use client';

import { useEffect } from 'react';
import { useGame } from '@/lib/use-game';
import { Grid } from './grid';
import { GameHeader } from './game-header';
import { GameMessage } from './game-message';
import { Direction } from '@/lib/types';

export function Game() {
  const { game, bestScore, move, restart, continueGame } = useGame(4);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 0,
        ArrowRight: 1,
        ArrowDown: 2,
        ArrowLeft: 3,
      };

      const direction = keyMap[event.key];
      if (direction !== undefined) {
        event.preventDefault();
        move(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  // Touch support
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      // Minimum swipe distance
      const minSwipe = 30;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (Math.abs(dx) > minSwipe) {
          event.preventDefault();
          move(dx > 0 ? 1 : 3); // Right : Left
        }
      } else {
        // Vertical swipe
        if (Math.abs(dy) > minSwipe) {
          event.preventDefault();
          move(dy > 0 ? 2 : 0); // Down : Up
        }
      }
    };

    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.addEventListener('touchstart', handleTouchStart);
      gameContainer.addEventListener('touchend', handleTouchEnd);

      return () => {
        gameContainer.removeEventListener('touchstart', handleTouchStart);
        gameContainer.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [move]);

  if (!game) {
    return <div className="text-text-primary">Loading...</div>;
  }

  return (
    <div className="w-[530px] mx-auto">
      <GameHeader
        score={game.score}
        bestScore={bestScore}
        onRestart={restart}
      />

      <div id="game-container" className="relative mt-10">
        <Grid game={game} />
        <GameMessage
          won={game.won}
          over={game.over}
          onRestart={restart}
          onKeepPlaying={continueGame}
        />
      </div>

      <p className="mt-[50px] text-text-primary leading-[1.65]">
        <strong className="uppercase">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>
      </p>
    </div>
  );
}
