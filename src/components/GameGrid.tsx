import { CELL_INFO, type LevelData, type TrainState, type Position } from '../game/types';
import { directionToAngle } from '../game/engine';

interface GameGridProps {
  level: LevelData;
  trainState: TrainState;
  goalPosition: Position;
  isExecuting: boolean;
}

export default function GameGrid({ level, trainState, goalPosition, isExecuting }: GameGridProps) {
  const { grid, gridSize } = level;
  const angle = directionToAngle(trainState.direction);

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="grid w-full max-w-[90vmin] aspect-square"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          backgroundColor: 'var(--color-grass)',
          borderRadius: '12px',
          border: '3px solid var(--color-grass-dark)',
        }}
      >
        {Array.from({ length: gridSize }, (_, y) =>
          Array.from({ length: gridSize }, (_, x) => {
            const cellType = grid[y]?.[x] ?? 'empty';
            const info = CELL_INFO[cellType];
            const isTrain = trainState.position.x === x && trainState.position.y === y;
            const isGoal = goalPosition.x === x && goalPosition.y === y;

            return (
              <div
                key={`${x}-${y}`}
                className="relative flex items-center justify-center border border-green-400/60"
                style={{ aspectRatio: '1' }}
              >
                {/* Cell content (destination emoji) */}
                {cellType !== 'empty' && (
                  <span
                    className="select-none leading-none"
                    style={{ fontSize: 'clamp(1.2rem, 6vmin, 3rem)' }}
                    aria-label={info.label}
                  >
                    {info.emoji}
                  </span>
                )}

                {/* Goal highlight - pulsing animation */}
                {isGoal && (
                  <div
                    className="absolute inset-0 rounded-sm pointer-events-none"
                    style={{
                      animation: 'goal-pulse 1.5s ease-in-out infinite',
                      border: '3px solid #facc15',
                      boxShadow: '0 0 12px 2px rgba(250, 204, 21, 0.5)',
                    }}
                  />
                )}

                {/* Train */}
                {isTrain && (
                  <span
                    className="absolute select-none leading-none drop-shadow-md"
                    style={{
                      fontSize: 'clamp(1.4rem, 7vmin, 3.5rem)',
                      transform: `rotate(${angle}deg)`,
                      transition: isExecuting ? 'transform 0.4s ease' : 'none',
                      zIndex: 10,
                    }}
                    aria-label="でんしゃ"
                  >
                    🚃
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Keyframes for the goal pulse animation */}
      <style>{`
        @keyframes goal-pulse {
          0%, 100% {
            box-shadow: 0 0 8px 2px rgba(250, 204, 21, 0.4);
            border-color: #facc15;
          }
          50% {
            box-shadow: 0 0 20px 6px rgba(250, 204, 21, 0.7);
            border-color: #fde047;
          }
        }
      `}</style>
    </div>
  );
}
