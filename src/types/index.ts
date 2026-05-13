// Tipe data
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';
export type Theme = 'light' | 'dark';

// Konfigurasi difficulty
export interface DifficultyConfig {
  size: number;
  mines: number;
  cls: string;
  label: string;
}

// Map difficulty ke konfigurasi
export type DifficultyMap = Record<Difficulty, DifficultyConfig>

// State game utama
export interface GameState {
  diff: Difficulty;
  size: number;
  mineCount: number;
  grid: number[][];
  revealed: boolean[][];
  flagged: boolean[][];
  firstClick: boolean;
  status: GameStatus;
  lastHit: { r: number; c: number } | null;
  seed: string;
}

// Props cell component
export interface CellData {
  r: number;
  c: number;
  value: number;
  revealed: boolean;
  flagged: boolean;
  exploded: boolean;
}