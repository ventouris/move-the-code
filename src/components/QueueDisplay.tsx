import React from 'react';
import { Command } from '../types';
import { COMMAND_ICONS } from '../constants';
import data from '../data.json';

interface QueueDisplayProps {
  commands: Command[];
  currentExecutingIndex: number;
  isExecuting: boolean;
  onRemoveCommand?: (index: number) => void;
}

const QueueDisplay: React.FC<QueueDisplayProps> = ({
  commands,
  currentExecutingIndex,
  isExecuting,
  onRemoveCommand,
}) => {
  if (commands.length === 0) {
    return (
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 text-purple-700">{data.controls.queueTitle}</h2>
        <div className="flex items-center justify-center h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 italic">{data.controls.queueEmpty}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2 text-purple-700">{data.controls.queueTitle}</h2>
      <div className="flex flex-wrap gap-2 py-2 px-3 bg-gray-100 rounded-lg shadow-inner min-h-[3rem]">
        {commands.map((command, index) => (
          <button
            key={`${command}-${index}`}
            className={`
              w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold
              ${isExecuting && index === currentExecutingIndex ? 'bg-green-500 text-white' : 'bg-white text-blue-600'}
              ${isExecuting && index < currentExecutingIndex ? 'bg-gray-300 text-gray-600' : ''}
              ${!isExecuting ? 'hover:bg-red-100 hover:text-red-600' : ''}
              transition-all duration-200 shadow
              ${isExecuting ? 'cursor-default' : 'cursor-pointer'}
            `}
            onClick={() => !isExecuting && onRemoveCommand?.(index)}
            disabled={isExecuting}
            title={isExecuting ? undefined : "Click to remove command"}
          >
            {COMMAND_ICONS[command]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QueueDisplay;