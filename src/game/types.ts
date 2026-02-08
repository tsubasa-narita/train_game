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

export const COMMAND_INFO: Record<Command, { emoji: string; label: string }> = {
  forward: { emoji: '⬆️', label: 'すすむ' },
  left: { emoji: '↩️', label: 'ひだり' },
  right: { emoji: '↪️', label: 'みぎ' },
  horn: { emoji: '🔊', label: 'クラクション' },
  light: { emoji: '💡', label: 'ライト' },
};
