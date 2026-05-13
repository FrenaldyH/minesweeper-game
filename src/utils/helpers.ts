import type { DifficultyMap } from '../types';

// Konfigurasi difficulty
export const DIFFICULTIES: DifficultyMap = {
  easy: { size: 8, mines: 10, cls: '', label: 'EASY · 8x8' },
  medium: { size: 14, mines: 30, cls: 'med', label: 'MEDIUM · 14X14' },
  hard: { size: 20, mines: 70, cls: 'hard', label: 'HARD · 20X20' },
};

// Format angka menjadi 2 digit
export const pad2 = (n: number): string => String(n).padStart(2, '0');

// Format detik jadi "MM:SS"
export const formatTime = (seconds: number): string => {
  const min = pad2(Math.floor(seconds / 60));
  const sec = pad2(seconds % 60);
  return `${min}:${sec}`;
};

// Generate seed decorative: "A1F-44B"
export const makeSeed = (): string => {
  const chars = 'ABCDEF0123456789';
  let temp = '';
  for (let i = 0; i < 3; i++) {
    temp += chars[Math.floor(Math.random() * chars.length)];
  }
  for (let i = 0; i < 3; i++) {
    temp += chars[Math.floor(Math.random() * chars.length)];
  }

  return temp;
};

// Init matrix 2D
export const create2DArray = <T>(rows: number, cols: number, initial: T): T[][] => {
  return Array.from({ length: rows }, () => Array(cols).fill(initial));
};

// Cek koordinat valid
export const isInBounds = (r: number, c: number, size: number): boolean => {
  return r >= 0 && r < size && c >= 0 && c < size;
};
