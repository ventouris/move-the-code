import React from 'react';
import { Command } from '../types';
import { COMMAND_ICONS } from '../constants';

interface CommandButtonProps {
  command: Command;
  onClick: () => void;
  disabled: boolean;
}

const CommandButton: React.FC<CommandButtonProps> = ({ command, onClick, disabled }) => {
  // Map commands to display properties
  const commandProps: Record<Command, { label: string }> = {
    up: { label: 'Move Up' },
    down: { label: 'Move Down' },
    left: { label: 'Move Left' },
    right: { label: 'Move Right' },
  };

  const { label } = commandProps[command];

  return (
    <button
      className={`
        w-16 h-16 rounded-full bg-blue-500 text-white text-2xl font-bold
        flex items-center justify-center shadow-md
        transition-all duration-200 transform
        ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600 hover:scale-105 active:scale-95'}
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      {COMMAND_ICONS[command]}
    </button>
  );
};

export default CommandButton