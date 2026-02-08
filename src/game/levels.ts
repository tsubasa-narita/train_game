import type { LevelData } from './types';
import type { CellType } from './types';

function emptyGrid(size: number): CellType[][] {
  return Array.from({ length: size }, () => {
    const row: CellType[] = [];
    for (let i = 0; i < size; i++) row.push('empty');
    return row;
  });
}

function setCell(grid: CellType[][], x: number, y: number, type: CellType) {
  grid[y][x] = type;
  return grid;
}

export const levels: LevelData[] = [
  {
    id: 1,
    name: 'はじめてのうんてん',
    gridSize: 5,
    start: { x: 2, y: 3 },
    startDirection: 'north',
    goal: { x: 2, y: 1 },
    grid: (() => {
      const g = emptyGrid(5);
      setCell(g, 2, 3, 'station');
      setCell(g, 2, 1, 'fruit');
      return g;
    })(),
    hint: '「すすむ」を 2かい おしてみよう！',
    availableCommands: ['forward'],
  },
  {
    id: 2,
    name: 'まがってみよう',
    gridSize: 5,
    start: { x: 1, y: 3 },
    startDirection: 'north',
    goal: { x: 3, y: 2 },
    grid: (() => {
      const g = emptyGrid(5);
      setCell(g, 1, 3, 'station');
      setCell(g, 3, 2, 'park');
      return g;
    })(),
    hint: 'すすんでから みぎに まがろう！',
    availableCommands: ['forward', 'left', 'right'],
  },
  {
    id: 3,
    name: 'とおくの こうえん',
    gridSize: 5,
    start: { x: 0, y: 4 },
    startDirection: 'north',
    goal: { x: 3, y: 0 },
    grid: (() => {
      const g = emptyGrid(5);
      setCell(g, 0, 4, 'station');
      setCell(g, 3, 0, 'firestation');
      setCell(g, 2, 2, 'crossing');
      return g;
    })(),
    hint: 'すすむ と まがる を くみあわせよう！',
    availableCommands: ['forward', 'left', 'right'],
  },
  {
    id: 4,
    name: 'クラクション ならそう',
    gridSize: 5,
    start: { x: 0, y: 2 },
    startDirection: 'east',
    goal: { x: 4, y: 2 },
    grid: (() => {
      const g = emptyGrid(5);
      setCell(g, 0, 2, 'station');
      setCell(g, 2, 2, 'crossing');
      setCell(g, 4, 2, 'police');
      return g;
    })(),
    hint: 'ふみきり で クラクションを ならそう！',
    availableCommands: ['forward', 'left', 'right', 'horn', 'light'],
  },
  {
    id: 5,
    name: 'ライトをつけて しゅっぱつ',
    gridSize: 5,
    start: { x: 2, y: 4 },
    startDirection: 'north',
    goal: { x: 0, y: 0 },
    grid: (() => {
      const g = emptyGrid(5);
      setCell(g, 2, 4, 'station');
      setCell(g, 0, 0, 'park');
      setCell(g, 2, 2, 'crossing');
      setCell(g, 4, 1, 'firestation');
      return g;
    })(),
    hint: 'ライトをつけて ふみきりを とおろう！',
    availableCommands: ['forward', 'left', 'right', 'horn', 'light'],
  },
];
