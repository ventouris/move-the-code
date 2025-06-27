import React from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import data from '../data.json';

interface GameHeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ isMuted, onToggleMute }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-pink-600 p-4 rounded-t-lg shadow-md mb-4 relative">      
      <button
        onClick={onToggleMute}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        title={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      
      <h1 className="text-3xl font-bold text-center text-white">
        {data.header.title}
      </h1>
      <p className="w-4/5 mx-auto text-center text-white opacity-90">
        {data.header.subtitle}
      </p>
    </header>
  );
};

export default GameHeader;