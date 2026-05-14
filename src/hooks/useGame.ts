import { useState, useCallback } from 'react';
import type { GameState, Difficulty } from '../types';
import { initGame, placeMines, floodReveal, revealAllMines, checkWin } from '../utils/gameLogic';
import { sounds } from '../utils/sound';

interface UseGameReturn {
  state: GameState;
  startNewGame: (diff?: Difficulty) => void;
  revealCell: (r: number, c: number) => void;
  toggleFlag: (r: number, c: number) => void;
}

export const useGame = (
  initialDiff: Difficulty = 'easy',
  soundOn: boolean = true,
  onFirstMove?: () => void
): UseGameReturn => {
  const [state, setState] = useState<GameState>(() => initGame(initialDiff));

  // Start new game or change difficulty
  const startNewGame = useCallback(
    (diff?: Difficulty) => {
      setState(initGame(diff || state.diff));
    },
    [state.diff]
  );

  // Reveal a cell (left click)
  const revealCell = useCallback(
    (r: number, c: number) => {
      setState((prev) => {
        if (prev.status === 'won' || prev.status === 'lost') return prev;
        if (prev.revealed[r][c] || prev.flagged[r][c]) return prev;

        let newGrid = prev.grid;
        let newStatus: GameState['status'] = prev.status;
        let firstClick = prev.firstClick;

        // First click: place mines
        if (prev.firstClick) {
          newGrid = placeMines(prev.grid, prev.size, prev.mineCount, r, c);
          firstClick = false;
          newStatus = 'playing';
          if (onFirstMove) onFirstMove();
        }

        // Klik mine? Game over
        if (newGrid[r][c] === -1) {
          if (soundOn) sounds.explode();
          const revealedWithMines = revealAllMines(prev.revealed, newGrid, prev.size);
          revealedWithMines[r][c] = true;
          return {
            ...prev,
            grid: newGrid,
            revealed: revealedWithMines,
            status: 'lost' as GameState['status'],
            lastHit: { r, c },
            firstClick,
          };
        }

        // Klik safe cell -> flood reveal
        if (soundOn) sounds.reveal();
        const newRevealed = floodReveal(prev.revealed, newGrid, prev.size, r, c);

        // Cek win
        const won = checkWin(newRevealed, newGrid, prev.size);
        if (won) {
          if (soundOn) sounds.win();
          newStatus = 'won';
        }

        return {
          ...prev,
          grid: newGrid,
          revealed: newRevealed,
          status: newStatus,
          firstClick,
        };
      });
    },
    [soundOn, onFirstMove]
  );

  // Toggle flag (right click)
  const toggleFlag = useCallback(
    (r: number, c: number) => {
      setState((prev) => {
        if (prev.status === 'won' || prev.status === 'lost') return prev;
        if (prev.revealed[r][c]) return prev;

        const newFlagged = prev.flagged.map((row) => [...row]);
        newFlagged[r][c] = !newFlagged[r][c];

        if (soundOn) {
          newFlagged[r][c] ? sounds.flag() : sounds.unflag();
        }

        return { ...prev, flagged: newFlagged };
      });
    },
    [soundOn]
  );

  return { state, startNewGame, revealCell, toggleFlag };
};
