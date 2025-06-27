import React from 'react';
import CommandButton from './CommandButton';
import { Command } from '../types';
import data from '../data.json';

interface CommandPanelProps {
  onCommandClick: (command: Command) => void;
  disabled: boolean;
}

export default function CommandPanel({ onCommandClick, disabled }: CommandPanelProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-2 text-purple-700">{data.controls.commandsTitle}</h2>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 justify-items-center">
        <div className="col-start-2 row-start-1">
          <CommandButton
            command="up"
            onClick={() => onCommandClick('up')}
            disabled={disabled}
          />
        </div>
        <div className="col-start-1 row-start-2">
          <CommandButton
            command="left"
            onClick={() => onCommandClick('left')}
            disabled={disabled}
          />
        </div>
        <div className="col-start-3 row-start-2">
          <CommandButton
            command="right"
            onClick={() => onCommandClick('right')}
            disabled={disabled}
          />
        </div>
        <div className="col-start-2 row-start-3">
          <CommandButton
            command="down"
            onClick={() => onCommandClick('down')}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}