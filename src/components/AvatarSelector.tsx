import React from 'react';
import { Animal } from '../types';
import { ANIMALS, ANIMAL_EMOJIS } from '../constants';
import data from '../data.json';

interface AvatarSelectorProps {
  selectedAnimal: Animal;
  onChange: (animal: Animal) => void;
  disabled: boolean;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAnimal,
  onChange,
  disabled,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2 text-purple-700">{data.controls.characterTitle}</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {ANIMALS.map((animal) => (
          <button
            key={animal}
            className={`
              w-16 h-16 rounded-full text-3xl flex items-center justify-center
              transition-all duration-200 transform
              ${selectedAnimal === animal ? 'bg-blue-500 ring-4 ring-blue-300 scale-110' : 'bg-gray-100 hover:bg-gray-200'}
              ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
            `}
            onClick={() => !disabled && onChange(animal)}
            disabled={disabled}
            aria-label={`Select ${animal} character`}
            title={`Select ${animal} character`}
          >
            {ANIMAL_EMOJIS[animal]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector