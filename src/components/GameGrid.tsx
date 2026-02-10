import { CELL_INFO, type LevelData, type TrainState, type Position, type TrainType } from '../game/types';
import { directionToAngle } from '../game/engine';
import TrainSVG from './TrainSVG';
import TrackGrid from './TrackGrid';

interface GameGridProps {
  level: LevelData;
  trainState: TrainState;
  goalPosition: Position;
  isExecuting: boolean;
  trainType: TrainType;
}

export default function GameGrid({ level, trainState, goalPosition, isExecuting, trainType }: GameGridProps) {
  const { grid, gridSize } = level;
  const angle = directionToAngle(trainState.direction);

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="relative w-full max-w-[90vmin] aspect-square"
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '4px solid #8B7355',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 0 0 2px #a0906c',
        }}
      >
        {/* Track background layer */}
        <TrackGrid gridSize={gridSize} />

        {/* Grid overlay for content positioning */}
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
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
                  className="relative flex items-center justify-center"
                  style={{ aspectRatio: '1' }}
                >
                  {/* Cell content (destination emoji with platform) */}
                  {cellType !== 'empty' && !isTrain && (
                    <div className="relative flex items-center justify-center w-full h-full">
                      {/* Station platform background */}
                      <div
                        className="absolute rounded-lg"
                        style={{
                          width: '70%',
                          height: '70%',
                          backgroundColor: '#e8d5b0',
                          border: '2px solid #c4a87a',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                        }}
                      />
                      <span
                        className="relative select-none leading-none z-[1]"
                        style={{ fontSize: 'clamp(1.2rem, 6vmin, 3rem)' }}
                        aria-label={info.label}
                      >
                        {info.emoji}
                      </span>
                    </div>
                  )}

                  {/* Goal highlight - circular pulsing animation */}
                  {isGoal && (
                    <div
                      className="absolute inset-[8%] rounded-full pointer-events-none"
                      style={{
                        animation: 'goal-pulse 1.5s ease-in-out infinite',
                        border: '3px solid #facc15',
                        boxShadow: '0 0 12px 2px rgba(250, 204, 21, 0.5)',
                      }}
                    />
                  )}

                  {/* Train */}
                  {isTrain && (
                    <div
                      className="absolute flex items-center justify-center"
                      style={{
                        zIndex: 10,
                        width: '85%',
                        height: '85%',
                        transform: `rotate(${angle}deg)`,
                        transition: isExecuting ? 'transform 0.4s ease' : 'none',
                      }}
                      aria-label="でんしゃ"
                    >
                      <TrainSVG trainType={trainType} lightOn={trainState.lightOn} compact />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
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
