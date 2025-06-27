import React from 'react';
import { GridCellProps, Direction, Animal } from '../types';
import { ANIMAL_EMOJIS } from '../constants';

const getInitialDirection = (position: { x: number; y: number }): string => {
   // if (position.x === 0) return '-scale-x-100'; // Face right
   // if (position.x === 7) return 'rotate-0'; // Face left
   // if (position.y === 0) return '-scale-x-100'; // Face down
  return '-scale-x-100'; // Face up (bottom row)
};

const GridCell: React.FC<GridCellProps> = ({
  isStart,
  isGoal,
  hasPlayer,
  hasObstacle,
  playerDirection,
  animal,
  isGameOver,
  isPath,
}) => {
  return (
    <div
      className={`
        w-full h-full border border-gray-200 flex items-center justify-center
        transition-all duration-300 transform
        ${isStart ? 'bg-blue-100' : ''}
        ${isGoal ? 'bg-yellow-100' : ''}
        ${hasObstacle ? 'bg-gray-300' : ''}
        ${isPath ? 'bg-blue-50' : ''}
        ${!isStart && !isGoal && !hasObstacle && !hasPlayer && !isPath ? 'bg-white hover:bg-gray-50' : ''}
      `}
    >
      {isGoal && !hasPlayer && (
        <div className="text-2xl animate-bounce">⭐</div>
      )}
      
      {hasObstacle && (
        <div className="text-2xl">🪨</div>
      )}
      
      {hasPlayer && (
        <div
          className={`
            text-2xl
            transition-all duration-300 ease-in-out transform
            ${isStart ? getInitialDirection({ x: 0, y: 0 }) : ''}
            ${isGameOver ? 'animate-[spin_1s_ease-in-out_infinite]' : ''}
          `}
          style={{
            transform: `translate(0, 0) ${isStart ? getInitialDirection({ x: 0, y: 0 }) : ''}`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {ANIMAL_EMOJIS[animal]}
        </div>
      )}
    </div>
  );
};

export default GridCell;