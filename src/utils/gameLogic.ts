import type { GameState, Difficulty } from '../types';
import { DIFFICULTIES, create2DArray, isInBounds, makeSeed } from './helpers';

export const initGame = (diff: Difficulty): GameState => {
  const cfg = DIFFICULTIES[diff];
  return {
    diff,
    size: cfg.size,
    mineCount: cfg.mines,
    grid: create2DArray(cfg.size, cfg.size, 0),
    revealed: create2DArray(cfg.size, cfg.size, false),
    flagged: create2DArray(cfg.size, cfg.size, false),
    firstClick: true,
    status: 'idle',
    lastHit: null,
    seed: makeSeed(),
  };
};

export const placeMines = (
  grid: number[][],
  size: number,
  mineCount: number,
  safeR: number,
  safeC: number
): number[][] => {
  // Clone grid biar tidak mutate state
  const newGrid = grid.map((row) => [...row]);

  // Set forbidden cells (klik pertama + 8 tetangga)
  const forbidden = new Set<number>();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const r = safeR + dr;
      const c = safeC + dc;
      if (isInBounds(r, c, size)) {
        forbidden.add(r * size + c);
      }
    }
  }

  const minePositions: [number, number][] = [];

  // Generate mines secara random
  for (let placed = 0; placed < mineCount; ) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);

    if (newGrid[r][c] === -1) continue;
    if (forbidden.has(r * size + c)) continue;
    newGrid[r][c] = -1;
    minePositions.push([r, c]);
    placed++;
  }

  for (const [r, c] of minePositions) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const rr = r + dr;
        const cc = c + dc;

        if (!isInBounds(rr, cc, size)) continue;
        if (newGrid[rr][cc] === -1) continue;
        newGrid[rr][cc] += 1;
      }
    }
  }

  return newGrid;
};

// Basic BFS
export const floodReveal = (
  revealed: boolean[][],
  grid: number[][],
  size: number,
  startR: number,
  startC: number
): boolean[][] => {
  const newRevealed = revealed.map((row) => [...row]);

  const queue: [number, number][] = [[startR, startC]];

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;

    if (!isInBounds(r, c, size)) continue;
    if (newRevealed[r][c]) continue;

    newRevealed[r][c] = true;

    if (grid[r][c] !== 0) continue;

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;

        const rr = r + dr;
        const cc = c + dc;
        if (isInBounds(rr, cc, size) && !newRevealed[rr][cc] && grid[rr][cc] !== -1) {
          queue.push([rr, cc]);
        }
      }
    }
  }

  return newRevealed;
};

// Reveal semua mines saat kalah
export const revealAllMines = (
  revealed: boolean[][],
  grid: number[][],
  size: number
): boolean[][] => {
  const newRevealed = revealed.map((row) => [...row]);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === -1) {
        newRevealed[r][c] = true;
      }
    }
  }

  return newRevealed;
};

// Check win
export const checkWin = (revealed: boolean[][], grid: number[][], size: number): boolean => {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] !== -1 && !revealed[r][c]) {
        return false;
      }
    }
  }
  return true;
};

// Count flag
export const countFlags = (flagged: boolean[][], size: number): number => {
  let count = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (flagged[r][c]) count++;
    }
  }
  return count;
};

// Hitung safe cell + sudah di reveal
export const countRevealedSafe = (
  revealed: boolean[][],
  grid: number[][],
  size: number
): number => {
  let count = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (revealed[r][c] && grid[r][c] !== -1) count++;
    }
  }
  return count;
};
