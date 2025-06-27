import React from 'react';
import GridCell from './GridCell';
import { Position, PlayerState } from '../types';
import { isSamePosition } from '../utils';

interface GameGridProps {
  player: PlayerState;
  startPosition: Position;
  goalPosition: Position;
  obstacles: Position[];
  gridSize: number;
  isCompleted: boolean;
  isGameOver: boolean;
  path: Position[];
}

const GameGrid: React.FC<GameGridProps> = ({
  player,
  startPosition,
  goalPosition,
  obstacles,
  gridSize,
  isCompleted,
  isGameOver,
  path,
}) => {
  const renderGrid = () => {
    const grid = [];

    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        const currentPos: Position = { x, y };
        const isStart = isSamePosition(currentPos, startPosition);
        const isGoal = isSamePosition(currentPos, goalPosition);
        const hasPlayer = isSamePosition(currentPos, player.position);
        const hasObstacle = obstacles.some(obs => isSamePosition(obs, currentPos));
        const isPath = path.some(pos => isSamePosition(pos, currentPos)) && !hasPlayer && !isStart;

        row.push(
          <div key={`cell-${x}-${y}`} className="w-full h-full">
            <GridCell
              isStart={isStart}
              isGoal={isGoal}
              hasPlayer={hasPlayer}
              hasObstacle={hasObstacle}
              playerDirection={player.direction}
              animal={player.animal}
              isGameOver={isGameOver && hasPlayer}
              isPath={isPath}
            />
          </div>
        );
      }
      grid.push(
        <div key={`row-${y}`} className="grid-row flex-1 flex">
          {row}
        </div>
      );
    }

    return grid;
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="w-full aspect-square grid grid-rows-8 border border-gray-200 rounded-lg overflow-hidden">
        {renderGrid()}
      </div>
      
      {isCompleted && (
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center animate-bounce-slow">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Hooray!</h2>
            <p className="text-gray-700 mb-4">You reached the goal!</p>
            <div className="text-4xl mb-2">🎉 🎊 🎈</div>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
            <p className="text-gray-700 mb-4">Watch out for obstacles!</p>
            <div className="text-4xl mb-2 animate-spin">💫</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameGrid;