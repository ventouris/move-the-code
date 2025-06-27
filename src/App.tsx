import React from 'react';
import GameGrid from './components/GameGrid';
import ControlPanel from './components/ControlPanel';
import GameHeader from './components/GameHeader';
import GameFooter from './components/GameFooter';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const {
    gameState,
    queueCommand,
    changeAnimal,
    changeDifficulty,
    resetGame,
    executeCommands,
    isMuted,
    toggleMute,
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-blue-50 font-game p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <GameHeader isMuted={isMuted} onToggleMute={toggleMute} />
        
        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center">
            <GameGrid
              player={gameState.player}
              startPosition={gameState.startPosition}
              goalPosition={gameState.goalPosition}
              obstacles={gameState.obstacles}
              gridSize={gameState.gridSize}
              isCompleted={gameState.isCompleted}
              isGameOver={gameState.isGameOver}
              path={gameState.path}
            />
          </div>
          
          <div>
            <ControlPanel
              animal={gameState.player.animal}
              difficulty={gameState.difficulty}
              commandQueue={gameState.commandQueue}
              isExecuting={gameState.isExecuting}
              isCompleted={gameState.isCompleted}
              isGameOver={gameState.isGameOver}
              onAnimalChange={changeAnimal}
              onDifficultyChange={changeDifficulty}
              onCommandClick={queueCommand}
              onPlay={gameState.isCompleted || gameState.isGameOver
                ? () => resetGame(gameState.difficulty, gameState.player.animal)
                : executeCommands
              }
              onReset={() => resetGame(gameState.difficulty, gameState.player.animal)}
            />
          </div>
        </div>
        
        <GameFooter />
      </div>
    </div>
  );
}

export default App;