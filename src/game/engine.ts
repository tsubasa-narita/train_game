import type { Command, Direction, Position, TrainState, LevelData } from './types';

export function turnLeft(dir: Direction): Direction {
  const map: Record<Direction, Direction> = {
    north: 'west',
    west: 'south',
    south: 'east',
    east: 'north',
  };
  return map[dir];
}

export function turnRight(dir: Direction): Direction {
  const map: Record<Direction, Direction> = {
    north: 'east',
    east: 'south',
    south: 'west',
    west: 'north',
  };
  return map[dir];
}

export function moveForward(pos: Position, dir: Direction): Position {
  const delta: Record<Direction, Position> = {
    north: { x: 0, y: -1 },
    south: { x: 0, y: 1 },
    east: { x: 1, y: 0 },
    west: { x: -1, y: 0 },
  };
  return {
    x: pos.x + delta[dir].x,
    y: pos.y + delta[dir].y,
  };
}

export function isInBounds(pos: Position, gridSize: number): boolean {
  return pos.x >= 0 && pos.x < gridSize && pos.y >= 0 && pos.y < gridSize;
}

export function directionToAngle(dir: Direction): number {
  // SVG train is drawn facing LEFT (west), rotate clockwise:
  // west=0, north=90, east=180, south=270
  const map: Record<Direction, number> = {
    west: 0,
    north: 90,
    east: 180,
    south: 270,
  };
  return map[dir];
}

export interface ExecutionStep {
  command: Command;
  trainBefore: TrainState;
  trainAfter: TrainState;
  outOfBounds: boolean;
}

export function executeCommands(
  commands: Command[],
  level: LevelData
): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let current: TrainState = {
    position: { ...level.start },
    direction: level.startDirection,
    lightOn: false,
  };

  for (const command of commands) {
    const before: TrainState = {
      position: { ...current.position },
      direction: current.direction,
      lightOn: current.lightOn,
    };
    let outOfBounds = false;

    switch (command) {
      case 'forward': {
        const next = moveForward(current.position, current.direction);
        if (isInBounds(next, level.gridSize)) {
          current = { ...current, position: next };
        } else {
          outOfBounds = true;
        }
        break;
      }
      case 'left':
        current = { ...current, direction: turnLeft(current.direction) };
        break;
      case 'right':
        current = { ...current, direction: turnRight(current.direction) };
        break;
      case 'horn':
        break;
      case 'light':
        current = { ...current, lightOn: !current.lightOn };
        break;
    }

    steps.push({
      command,
      trainBefore: before,
      trainAfter: {
        position: { ...current.position },
        direction: current.direction,
        lightOn: current.lightOn,
      },
      outOfBounds,
    });
  }

  return steps;
}

export function checkSuccess(steps: ExecutionStep[], level: LevelData): boolean {
  if (steps.length === 0) return false;
  const last = steps[steps.length - 1];
  return (
    last.trainAfter.position.x === level.goal.x &&
    last.trainAfter.position.y === level.goal.y
  );
}
