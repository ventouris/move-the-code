import { useRef, useCallback, useState } from 'react';
import { SOUND_URLS } from '../constants';

export const useSound = () => {
  const audioRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [isMuted, setIsMuted] = useState(false);

  const initSound = useCallback((soundName: string, soundUrl: string) => {
    if (!audioRef.current[soundName]) {
      const audio = new Audio(soundUrl);
      audio.preload = 'auto';
      audioRef.current[soundName] = audio;
    }
  }, []);

  const playSound = useCallback(
    (soundName: string) => {
      if (isMuted) return;

      const audio = audioRef.current[soundName];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.warn(`Error playing sound "${soundName}":`, error);
        });
      }
    },
    [isMuted]
  );

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return { initSound, playSound, isMuted, toggleMute };
};