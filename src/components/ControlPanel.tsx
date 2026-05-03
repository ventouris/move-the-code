import React, { useState } from 'react';
import AvatarSelector from './AvatarSelector';
import DifficultySelector from './DifficultySelector';
import CommandPanel from './CommandPanel';
import QueueDisplay from './QueueDisplay';
import ActionButtons from './ActionButtons';
import { Animal, Command, Difficulty } from '../types';

interface ControlPanelProps {
  animal: Animal;
  difficulty: Difficulty;
  commandQueue: Command[];
  isExecuting: boolean;
  isCompleted: boolean;
  isGameOver: boolean;
  onAnimalChange: (animal: Animal) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onCommandClick: (command: Command) => void;
  onPlay: () => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  animal,
  difficulty,
  commandQueue,
  isExecuting,
  isCompleted,
  isGameOver,
  onAnimalChange,
  onDifficultyChange,
  onCommandClick,
  onPlay,
  onReset,
}) => {
  const [currentExecutingIndex, setCurrentExecutingIndex] = useState(-1);

  React.useEffect(() => {
    if (isExecuting) {
      let index = 0;
      setCurrentExecutingIndex(0);

      const interval = setInterval(() => {
        index++;
        if (index < commandQueue.length) {
          setCurrentExecutingIndex(index);
        } else {
          clearInterval(interval);
          setCurrentExecutingIndex(-1);
        }
      }, 500);

      return () => {
        clearInterval(interval);
        setCurrentExecutingIndex(-1);
      };
    } else {
      setCurrentExecutingIndex(-1);
    }
  }, [isExecuting, commandQueue.length]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <AvatarSelector
        selectedAnimal={animal}
        onChange={onAnimalChange}
        disabled={isExecuting}
      />
      
      <DifficultySelector
        selectedDifficulty={difficulty}
        onChange={onDifficultyChange}
        disabled={isExecuting}
      />
      
      <QueueDisplay
        commands={commandQueue}
        currentExecutingIndex={currentExecutingIndex}
        isExecuting={isExecuting}
        onRemoveCommand={(index) => {
          if (!isExecuting) {
            const newQueue = commandQueue.filter((_, i) => i !== index);
            onCommandClick('removeAt' + index);
          }
        }}
      />
      
      <CommandPanel
        onCommandClick={onCommandClick}
        disabled={isExecuting || isCompleted || isGameOver}
      />
      
      <ActionButtons
        onPlay={onPlay}
        onReset={onReset}
        isExecuting={isExecuting}
        isCompleted={isCompleted}
        isGameOver={isGameOver}
        hasCommands={commandQueue.length > 0}
      />
    </div>
  );
};

export default ControlPanel;