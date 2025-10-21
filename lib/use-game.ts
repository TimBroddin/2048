'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameManager } from './game-manager';
import { Direction, GameState } from './types';
import { useLocalStorage } from './use-local-storage';

export function useGame(size: number = 4) {
  const [gameState, setGameState, clearGameState, isClient] = useLocalStorage<GameState | null>('gameState', null);
  const [bestScore, setBestScore] = useLocalStorage<number>('bestScore', 0);
  const [game, setGame] = useState<GameManager | null>(null);
  const [, forceUpdate] = useState(0);

  // Initialize game
  useEffect(() => {
    if (!isClient) return;

    const newGame = new GameManager(size, gameState || undefined);
    setGame(newGame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, size]); // Only depend on isClient and size, not gameState

  // Save game state whenever game changes
  useEffect(() => {
    if (!game || !isClient) return;

    const state = game.serialize();
    if (!game.over) {
      setGameState(state);
    } else {
      clearGameState();
    }

    if (game.score > bestScore) {
      setBestScore(game.score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, isClient]); // Dependencies managed carefully

  const move = useCallback((direction: Direction) => {
    if (!game) return;

    const moved = game.move(direction);
    if (moved) {
      forceUpdate(n => n + 1);
    }
  }, [game]);

  const restart = useCallback(() => {
    if (!game) return;

    game.restart();
    clearGameState();
    forceUpdate(n => n + 1);
  }, [game, clearGameState]);

  const continueGame = useCallback(() => {
    if (!game) return;

    game.continueGame();
    forceUpdate(n => n + 1);
  }, [game]);

  return {
    game,
    bestScore,
    move,
    restart,
    continueGame,
  };
}
