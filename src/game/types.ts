export type Direction = 'north' | 'south' | 'east' | 'west';

export type Command = 'forward' | 'left' | 'right' | 'horn' | 'light';

export interface Position {
  x: number;
  y: number;
}

export type CellType =
  | 'empty'
  | 'station'
  | 'fruit'
  | 'crossing'
  | 'firestation'
  | 'police'
  | 'park';

export interface Cell {
  type: CellType;
  emoji: string;
  label: string;
}

export interface TrainState {
  position: Position;
  direction: Direction;
  lightOn: boolean;
}

export type GamePhase = 'title' | 'levelSelect' | 'playing' | 'success' | 'failure';

export type PlayPhase = 'programming' | 'executing' | 'done';

export interface LevelData {
  id: number;
  name: string;
  gridSize: number;
  start: Position;
  startDirection: Direction;
  goal: Position;
  grid: CellType[][];
  hint?: string;
  availableCommands: Command[];
}

export const CELL_INFO: Record<CellType, { emoji: string; label: string }> = {
  empty: { emoji: '', label: '' },
  station: { emoji: '🚉', label: 'えき' },
  fruit: { emoji: '🍎', label: 'くだものやさん' },
  crossing: { emoji: '🚧', label: 'ふみきり' },
  firestation: { emoji: '🚒', label: 'しょうぼうしょ' },
  police: { emoji: '🚓', label: 'けいさつしょ' },
  park: { emoji: '🌳', label: 'こうえん' },
};

export type TrainType = 'komachi' | 'kagayaki' | 'hayabusa' | 'nozomi';

export interface TrainColorScheme {
  arrowColor: string;
  noseColor: string;
  noseAccentColor: string;
  bodyColor: string;
  stripeColor1: string;
  stripeColor2: string;
  windowColor: string;
  windowBorderColor: string;
  bottomLineColor: string;
}

export const TRAIN_INFO: Record<TrainType, { name: string; colorScheme: TrainColorScheme }> = {
  komachi: {
    name: 'こまち',
    colorScheme: {
      arrowColor: '#dc2626',
      noseColor: '#f5f5f5',
      noseAccentColor: '#dc143c',
      bodyColor: '#dc143c',
      stripeColor1: '#f5f5f5',
      stripeColor2: '#a1a1aa',
      windowColor: '#fecdd3',
      windowBorderColor: '#fda4af',
      bottomLineColor: '#991b1b',
    },
  },
  kagayaki: {
    name: 'かがやき',
    colorScheme: {
      arrowColor: '#ef4444',
      noseColor: '#f5f5f5',
      noseAccentColor: '#b87333',
      bodyColor: '#f5f5f5',
      stripeColor1: '#60a5fa',
      stripeColor2: '#b87333',
      windowColor: '#bfdbfe',
      windowBorderColor: '#93c5fd',
      bottomLineColor: '#2563eb',
    },
  },
  hayabusa: {
    name: 'はやぶさ',
    colorScheme: {
      arrowColor: '#059669',
      noseColor: '#059669',
      noseAccentColor: '#f5f5f5',
      bodyColor: '#059669',
      stripeColor1: '#ec4899',
      stripeColor2: '#f5f5f5',
      windowColor: '#a7f3d0',
      windowBorderColor: '#6ee7b7',
      bottomLineColor: '#064e3b',
    },
  },
  nozomi: {
    name: 'のぞみ',
    colorScheme: {
      arrowColor: '#2563eb',
      noseColor: '#f5f5f5',
      noseAccentColor: '#2563eb',
      bodyColor: '#f5f5f5',
      stripeColor1: '#2563eb',
      stripeColor2: '#60a5fa',
      windowColor: '#bfdbfe',
      windowBorderColor: '#93c5fd',
      bottomLineColor: '#1d4ed8',
    },
  },
};

export const COMMAND_INFO: Record<Command, { emoji: string; label: string }> = {
  forward: { emoji: '⬆️', label: 'すすむ' },
  left: { emoji: '↩️', label: 'ひだり' },
  right: { emoji: '↪️', label: 'みぎ' },
  horn: { emoji: '🔊', label: 'クラクション' },
  light: { emoji: '💡', label: 'ライト' },
};
