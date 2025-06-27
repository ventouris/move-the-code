import { useRef, useCallback, useState } from 'react';

// A simple hook to play sound effects
export const useSound = () => {
  const audioRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [isMuted, setIsMuted] = useState(false);

  // Initialize audio elements
  const initSound = useCallback((soundName: string, soundUrl: string) => {
    if (!audioRef.current[soundName]) {
      const audio = new Audio(soundUrl);
      audio.preload = 'auto';
      audioRef.current[soundName] = audio;
    }
  }, []);

  // Play a sound effect
  const playSound = useCallback((soundName: string) => {
    if (isMuted) return; // Don't play if muted
    
    const audio = audioRef.current[soundName];
    if (audio) {
      // Reset the audio to the beginning if it's already playing
      audio.currentTime = 0;
      audio.play().catch(error => {
        // Handle or log any errors with playing audio
        console.warn(`Error playing sound "${soundName}":`, error);
      });
    }
  }, [isMuted]);

  // Toggle mute state
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return { initSound, playSound, isMuted, toggleMute };
};

// Predefined sound URLs (these are placeholders - in a real app you'd use actual sound files)
export const SOUND_URLS = {
  pop: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
  whoop: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
  bonk: 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3',
  tada: 'https://assets.mixkit.co/active_storage/sfx/1434/1434-preview.mp3',
  swoosh: 'https://assets.mixkit.co/active_storage/sfx/240/240-preview.mp3',
};