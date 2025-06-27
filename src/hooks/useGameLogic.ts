import { useState, useCallback, useEffect } from 'react';
import { 
  Animal, Command, Difficulty, Direction, GameState, Position, PlayerState 
} from '../types';
import {
  generateGoalPosition,
  generateObstacles,
  getRandomStartingPosition,
  hasObstacle,
  hasValidPath,
  isWithinGrid,
  isSamePosition,
  processCommand
} from '../utils';
import { GRID_SIZE } from '../constants';
import { useSound, SOUND_URLS } from './useSound';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const startPosition = getRandomStartingPosition();
    const initialObstacles: Position[] = [];
    const goalPosition = generateGoalPosition(startPosition, 'normal', initialObstacles);
    
    return {
      player: {
        position: { ...startPosition },
        direction: 'right',
        animal: 'turtle',
      },
      startPosition,
      goalPosition,
      obstacles: initialObstacles,
      commandQueue: [],
      difficulty: 'normal',
      isExecuting: false,
      isCompleted: false,
      isGameOver: false,
      gridSize: GRID_SIZE,
      path: [startPosition],
    };
  });

  const { initSound, playSound, isMuted, toggleMute } = useSound();

  useEffect(() => {
    Object.entries(SOUND_URLS).forEach(([name, url]) => {
      initSound(name, url);
    });
  }, [initSound]);

  useEffect(() => {
    resetGame(gameState.difficulty, gameState.player.animal);
  }, []);

  const queueCommand = useCallback((command: Command | string) => {
    if (gameState.isExecuting || gameState.isCompleted || gameState.isGameOver) return;
    
    setGameState(prev => {
      if (typeof command === 'string' && command.startsWith('removeAt')) {
        const index = parseInt(command.slice(8));
        return {
          ...prev,
          commandQueue: prev.commandQueue.filter((_, i) => i !== index)
        };
      }
      
      return {
        ...prev,
        commandQueue: [...prev.commandQueue, command as Command],
      };
    });
    
    playSound('pop');
  }, [gameState.isExecuting, gameState.isCompleted, gameState.isGameOver, playSound]);

  const changeAnimal = useCallback((animal: Animal) => {
    if (gameState.isExecuting) return;
    
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        animal,
      },
    }));
  }, [gameState.isExecuting]);

  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    if (gameState.isExecuting) return;
    resetGame(difficulty, gameState.player.animal);
  }, [gameState.isExecuting, gameState.player.animal]);

  const resetGame = useCallback((difficulty: Difficulty, animal: Animal) => {
    const startPosition = getRandomStartingPosition();
    let obstacles = generateObstacles(startPosition, difficulty);
    let goalPosition = generateGoalPosition(startPosition, difficulty, obstacles);
    
    let attempts = 0;
    const maxAttempts = 20;
    
    while (!hasValidPath(startPosition, goalPosition, obstacles) && attempts < maxAttempts) {
      obstacles = generateObstacles(startPosition, difficulty);
      goalPosition = generateGoalPosition(startPosition, difficulty, obstacles);
      attempts++;
    }
    
    setGameState({
      player: {
        position: { ...startPosition },
        direction: 'right',
        animal,
      },
      startPosition,
      goalPosition,
      obstacles,
      commandQueue: [],
      difficulty,
      isExecuting: false,
      isCompleted: false,
      isGameOver: false,
      gridSize: GRID_SIZE,
      path: [startPosition],
    });
    
    playSound('swoosh');
  }, [playSound]);

  const executeCommands = useCallback(async () => {
    if (gameState.isExecuting || gameState.commandQueue.length === 0) return;
    
    setGameState(prev => ({ ...prev, isExecuting: true }));
    playSound('whoop');
    
    for (let i = 0; i < gameState.commandQueue.length; i++) {
      if (gameState.isCompleted || gameState.isGameOver) break;
      
      await new Promise<void>(resolve => {
        setTimeout(() => {
          setGameState(prev => {
            if (prev.isCompleted || prev.isGameOver) {
              return prev;
            }

            const command = prev.commandQueue[i];
            const { position: newPos, direction: newDir } = processCommand(
              prev.player.position,
              prev.player.direction,
              command
            );
            
            if (!isWithinGrid(newPos) || hasObstacle(newPos, prev.obstacles)) {
              playSound('bonk');
              return {
                ...prev,
                isGameOver: true,
                isExecuting: false,
                commandQueue: [],
              };
            }
            
            const reachedGoal = isSamePosition(newPos, prev.goalPosition);
            if (reachedGoal) {
              playSound('tada');
              return {
                ...prev,
                player: {
                  ...prev.player,
                  position: newPos,
                  direction: newDir,
                },
                path: [...prev.path, newPos],
                isCompleted: true,
                isExecuting: false,
              };
            }
            
            if (i === prev.commandQueue.length - 1 && !reachedGoal) {
              return {
                ...prev,
                player: {
                  ...prev.player,
                  position: newPos,
                  direction: newDir,
                },
                path: [...prev.path, newPos],
                commandQueue: [],
                isExecuting: false,
              };
            }
            
            return {
              ...prev,
              player: {
                ...prev.player,
                position: newPos,
                direction: newDir,
              },
              path: [...prev.path, newPos],
            };
          });
          
          resolve();
        }, 500);
      });
    }
    
    setGameState(prev => ({ ...prev, isExecuting: false }));
  }, [
    gameState.isExecuting,
    gameState.commandQueue.length,
    gameState.isCompleted,
    gameState.isGameOver,
    playSound
  ]);

  return {
    gameState,
    queueCommand,
    changeAnimal,
    changeDifficulty,
    resetGame,
    executeCommands,
    isMuted,
    toggleMute,
  };
};