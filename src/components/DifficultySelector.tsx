import React from 'react';
import { Difficulty } from '../types';
import data from '../data.json';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  disabled: boolean;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onChange,
  disabled,
}) => {
  const difficulties: { value: Difficulty; label: string; color: string }[] = [
    { value: 'easy', label: 'Easy', color: 'bg-green-500' },
    { value: 'normal', label: 'Normal', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'bg-red-500' },
  ];

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2 text-purple-700">{data.controls.difficultyTitle}</h2>
      <div className="flex gap-2 justify-center">
        {difficulties.map(({ value, label, color }) => (
          <button
            key={value}
            className={`
              px-4 py-2 rounded-full text-white font-bold
              transition-all duration-200
              ${selectedDifficulty === value ? `${color} ring-4 ring-blue-300` : 'bg-gray-300 hover:bg-gray-400'}
              ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
            `}
            onClick={() => !disabled && onChange(value)}
            disabled={disabled}
            aria-label={`Set ${label} difficulty`}
            title={`Set ${label} difficulty`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector