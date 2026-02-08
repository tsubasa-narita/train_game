import './App.css';
import { useGameState } from './game/useGameState';
import TitleScreen from './components/TitleScreen';
import LevelSelectScreen from './components/LevelSelectScreen';
import GameScreen from './components/GameScreen';
import CelebrationEffect from './components/CelebrationEffect';
import FailureScreen from './components/FailureScreen';

function App() {
  const game = useGameState();

  return (
    <div className="w-full h-full">
      {game.phase === 'title' && (
        <TitleScreen onStart={game.goLevelSelect} />
      )}

      {game.phase === 'levelSelect' && (
        <LevelSelectScreen
          clearedLevels={game.clearedLevels}
          onSelectLevel={game.startLevel}
          onBack={game.goTitle}
        />
      )}

      {(game.phase === 'playing' || game.phase === 'success' || game.phase === 'failure') && (
        <GameScreen
          level={game.currentLevel}
          trainState={game.trainState}
          commands={game.commands}
          playPhase={game.playPhase}
          executionSteps={game.executionSteps}
          currentStepIndex={game.currentStepIndex}
          onAddCommand={game.addCommand}
          onRemoveCommand={game.removeCommand}
          onClear={game.clearCommands}
          onExecute={game.execute}
          onNextStep={game.nextStep}
          onExecutionDone={game.executionDone}
          onLevelSelect={game.goLevelSelect}
        />
      )}

      {game.phase === 'success' && (
        <CelebrationEffect
          onNextLevel={game.nextLevel}
          onLevelSelect={game.goLevelSelect}
          hasNextLevel={game.currentLevelIndex < game.totalLevels - 1}
        />
      )}

      {game.phase === 'failure' && (
        <FailureScreen
          onRetry={game.retry}
          onLevelSelect={game.goLevelSelect}
        />
      )}
    </div>
  );
}

export default App;
