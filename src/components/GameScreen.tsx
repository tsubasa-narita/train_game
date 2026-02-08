import { useEffect, useRef, useCallback } from 'react';
import GameGrid from './GameGrid';
import CommandPanel from './CommandPanel';
import { CELL_INFO, type LevelData, type TrainState, type Command, type PlayPhase } from '../game/types';
import type { ExecutionStep } from '../game/engine';

interface GameScreenProps {
  level: LevelData;
  trainState: TrainState;
  commands: Command[];
  playPhase: PlayPhase;
  executionSteps: ExecutionStep[];
  currentStepIndex: number;
  onAddCommand: (cmd: Command) => void;
  onRemoveCommand: (index: number) => void;
  onClear: () => void;
  onExecute: () => void;
  onNextStep: () => void;
  onExecutionDone: () => void;
  onLevelSelect: () => void;
}

export default function GameScreen({
  level,
  trainState,
  commands,
  playPhase,
  executionSteps,
  currentStepIndex,
  onAddCommand,
  onRemoveCommand,
  onClear,
  onExecute,
  onNextStep,
  onExecutionDone,
  onLevelSelect,
}: GameScreenProps) {
  const isExecuting = playPhase === 'executing';
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runNextStep = useCallback(() => {
    onNextStep();
  }, [onNextStep]);

  // Execute animation step by step
  useEffect(() => {
    if (!isExecuting) return;

    if (currentStepIndex < executionSteps.length - 1) {
      timerRef.current = setTimeout(() => {
        runNextStep();
      }, currentStepIndex === -1 ? 300 : 800);
    } else if (currentStepIndex === executionSteps.length - 1) {
      // All steps done, wait a moment then trigger done
      timerRef.current = setTimeout(() => {
        onExecutionDone();
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isExecuting, currentStepIndex, executionSteps.length, runNextStep, onExecutionDone]);

  const goalInfo = CELL_INFO[level.grid[level.goal.y]?.[level.goal.x] ?? 'empty'];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-200 to-green-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-white/80 shadow-sm">
        <button
          onClick={onLevelSelect}
          className="px-3 py-2 text-sm font-bold text-gray-500 rounded-lg bg-gray-100 active:scale-95 transition-transform"
        >
          もどる
        </button>
        <div className="text-center">
          <p className="text-sm font-bold text-blue-600">
            レベル {level.id}: {level.name}
          </p>
          <p className="text-xs text-gray-500">
            {goalInfo.emoji} {goalInfo.label} を めざそう！
          </p>
        </div>
        <div className="w-14" />
      </div>

      {/* Map Area */}
      <div className="flex-1 flex items-center justify-center p-3 min-h-0">
        <GameGrid
          level={level}
          trainState={trainState}
          goalPosition={level.goal}
          isExecuting={isExecuting}
        />
      </div>

      {/* Command Panel */}
      <CommandPanel
        commands={commands}
        availableCommands={level.availableCommands}
        isExecuting={isExecuting}
        onAddCommand={onAddCommand}
        onRemoveCommand={onRemoveCommand}
        onClear={onClear}
        onExecute={onExecute}
        hint={level.hint}
      />
    </div>
  );
}
