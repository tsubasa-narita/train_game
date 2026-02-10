import { useReducer, useCallback } from 'react';
import type { Command, GamePhase, PlayPhase, LevelData, TrainState, TrainType } from './types';
import { executeCommands, checkSuccess } from './engine';
import type { ExecutionStep } from './engine';
import { levels } from './levels';

interface GameState {
  phase: GamePhase;
  playPhase: PlayPhase;
  currentLevelIndex: number;
  commands: Command[];
  executionSteps: ExecutionStep[];
  currentStepIndex: number;
  trainState: TrainState;
  clearedLevels: Set<number>;
  trainType: TrainType;
}

type Action =
  | { type: 'GO_TITLE' }
  | { type: 'GO_LEVEL_SELECT' }
  | { type: 'START_LEVEL'; levelIndex: number }
  | { type: 'ADD_COMMAND'; command: Command }
  | { type: 'REMOVE_COMMAND'; index: number }
  | { type: 'CLEAR_COMMANDS' }
  | { type: 'EXECUTE' }
  | { type: 'NEXT_STEP' }
  | { type: 'EXECUTION_DONE' }
  | { type: 'RETRY' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'SELECT_TRAIN'; trainType: TrainType };

function getLevel(index: number): LevelData {
  return levels[index];
}

function initialTrainState(level: LevelData): TrainState {
  return {
    position: { ...level.start },
    direction: level.startDirection,
    lightOn: false,
  };
}

function createInitialState(): GameState {
  const level = getLevel(0);
  return {
    phase: 'title',
    playPhase: 'programming',
    currentLevelIndex: 0,
    commands: [],
    executionSteps: [],
    currentStepIndex: -1,
    trainState: initialTrainState(level),
    clearedLevels: new Set(),
    trainType: 'kagayaki',
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'GO_TITLE':
      return { ...state, phase: 'title' };

    case 'GO_LEVEL_SELECT':
      return { ...state, phase: 'levelSelect' };

    case 'START_LEVEL': {
      const level = getLevel(action.levelIndex);
      return {
        ...state,
        phase: 'playing',
        playPhase: 'programming',
        currentLevelIndex: action.levelIndex,
        commands: [],
        executionSteps: [],
        currentStepIndex: -1,
        trainState: initialTrainState(level),
      };
    }

    case 'ADD_COMMAND':
      if (state.commands.length >= 12) return state;
      return { ...state, commands: [...state.commands, action.command] };

    case 'REMOVE_COMMAND':
      return {
        ...state,
        commands: state.commands.filter((_, i) => i !== action.index),
      };

    case 'CLEAR_COMMANDS':
      return { ...state, commands: [] };

    case 'EXECUTE': {
      const level = getLevel(state.currentLevelIndex);
      const steps = executeCommands(state.commands, level);
      return {
        ...state,
        playPhase: 'executing',
        executionSteps: steps,
        currentStepIndex: -1,
        trainState: initialTrainState(level),
      };
    }

    case 'NEXT_STEP': {
      const nextIndex = state.currentStepIndex + 1;
      if (nextIndex >= state.executionSteps.length) {
        return state;
      }
      const step = state.executionSteps[nextIndex];
      return {
        ...state,
        currentStepIndex: nextIndex,
        trainState: step.trainAfter,
      };
    }

    case 'EXECUTION_DONE': {
      const level = getLevel(state.currentLevelIndex);
      const success = checkSuccess(state.executionSteps, level);
      const clearedLevels = new Set(state.clearedLevels);
      if (success) {
        clearedLevels.add(level.id);
      }
      return {
        ...state,
        phase: success ? 'success' : 'failure',
        playPhase: 'done',
        clearedLevels,
      };
    }

    case 'RETRY': {
      const level = getLevel(state.currentLevelIndex);
      return {
        ...state,
        phase: 'playing',
        playPhase: 'programming',
        commands: [],
        executionSteps: [],
        currentStepIndex: -1,
        trainState: initialTrainState(level),
      };
    }

    case 'NEXT_LEVEL': {
      const nextIndex = state.currentLevelIndex + 1;
      if (nextIndex >= levels.length) {
        return { ...state, phase: 'levelSelect' };
      }
      const level = getLevel(nextIndex);
      return {
        ...state,
        phase: 'playing',
        playPhase: 'programming',
        currentLevelIndex: nextIndex,
        commands: [],
        executionSteps: [],
        currentStepIndex: -1,
        trainState: initialTrainState(level),
      };
    }

    case 'SELECT_TRAIN':
      return { ...state, trainType: action.trainType };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  const currentLevel = levels[state.currentLevelIndex];

  const goTitle = useCallback(() => dispatch({ type: 'GO_TITLE' }), []);
  const goLevelSelect = useCallback(() => dispatch({ type: 'GO_LEVEL_SELECT' }), []);
  const startLevel = useCallback((i: number) => dispatch({ type: 'START_LEVEL', levelIndex: i }), []);
  const addCommand = useCallback((c: Command) => dispatch({ type: 'ADD_COMMAND', command: c }), []);
  const removeCommand = useCallback((i: number) => dispatch({ type: 'REMOVE_COMMAND', index: i }), []);
  const clearCommands = useCallback(() => dispatch({ type: 'CLEAR_COMMANDS' }), []);
  const execute = useCallback(() => dispatch({ type: 'EXECUTE' }), []);
  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
  const executionDone = useCallback(() => dispatch({ type: 'EXECUTION_DONE' }), []);
  const retry = useCallback(() => dispatch({ type: 'RETRY' }), []);
  const nextLevel = useCallback(() => dispatch({ type: 'NEXT_LEVEL' }), []);
  const selectTrain = useCallback((t: TrainType) => dispatch({ type: 'SELECT_TRAIN', trainType: t }), []);

  return {
    ...state,
    currentLevel,
    totalLevels: levels.length,
    goTitle,
    goLevelSelect,
    startLevel,
    addCommand,
    removeCommand,
    clearCommands,
    execute,
    nextStep,
    executionDone,
    retry,
    nextLevel,
    selectTrain,
  };
}
