import React from 'react';
import data from '../data.json';

interface ActionButtonsProps {
  onPlay: () => void;
  onReset: () => void;
  isExecuting: boolean;
  isCompleted: boolean;
  isGameOver: boolean;
  hasCommands: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPlay,
  onReset,
  isExecuting,
  isCompleted,
  isGameOver,
  hasCommands,
}) => {
  const showPlayAgain = isCompleted || isGameOver;
  
  return (
    <div className="relative w-full flex gap-4 justify-center mt-2">
      <button
        className={`
          px-6 py-3 rounded-full font-bold text-white
          transition-all duration-200
          ${showPlayAgain ? 'bg-purple-500 hover:bg-purple-600' : 'bg-green-500 hover:bg-green-600'}
          ${(!hasCommands || isExecuting) && !showPlayAgain ? 'opacity-70 cursor-not-allowed' : 'transform hover:scale-105 active:scale-95'}
          flex items-center gap-2
        `}
        onClick={onPlay}
        disabled={(!hasCommands || isExecuting) && !showPlayAgain}
        aria-label={showPlayAgain ? data.controls.playAgainButton : data.controls.startButton}
        title={showPlayAgain ? data.controls.playAgainButton : data.controls.startButton}
      >
        <span className="text-xl">{showPlayAgain ? "🔄" : "▶"}</span>
        <span>{showPlayAgain ? data.controls.playAgainButton : data.controls.startButton}</span>
      </button>
      
      <button
        className={`
          absolute right-0 px-2 py-1 rounded-full bg-gray-300 text-gray-700 font-bold text-xs
          transition-all duration-200
          ${isExecuting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-400 transform hover:scale-105 active:scale-95'}
          flex items-center gap-1
        `}
        onClick={onReset}
        disabled={isExecuting}
        aria-label={data.controls.resetButton}
        title={data.controls.resetButton}
      >
        <span className="text-sm">🔄</span>
        <span>{data.controls.resetButton}</span>
      </button>
    </div>
  );
};

export default ActionButtons;