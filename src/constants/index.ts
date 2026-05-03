import { Animal, Difficulty, Position } from '../types';
import data from '../data.json';

export const GRID_SIZE = 8;

export const ANIMALS = Object.keys(data.animals) as Animal[];

export const ANIMAL_EMOJIS = data.animals;

export const DIFFICULTY_SETTINGS: Record<Difficulty, { min: number; max: number }> = {
  easy: { min: 2, max: 4 },
  normal: { min: 5, max: 8 },
  hard: { min: 9, max: 12 },
};

export const OBSTACLE_COUNT: Record<Difficulty, { min: number; max: number }> = {
  easy: { min: 4, max: 7 },
  normal: { min: 8, max: 11 },
  hard: { min: 11, max: 14 },
};

export const STARTING_POSITIONS: Position[] = [
  { x: 0, y: 0 },
  { x: 0, y: GRID_SIZE - 1 },
  { x: GRID_SIZE - 1, y: 0 },
  { x: GRID_SIZE - 1, y: GRID_SIZE - 1 },
];

export const COMMAND_ICONS = {
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
};

export const DIRECTION_VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const SOUND_URLS = {
  pop: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
  whoop: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
  bonk: 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3',
  tada: 'https://assets.mixkit.co/active_storage/sfx/1434/1434-preview.mp3',
  swoosh: 'https://assets.mixkit.co/active_storage/sfx/240/240-preview.mp3',
};

export const MAX_COMMAND_QUEUE = 20;
export const MAX_PATHFINDING_ATTEMPTS = 50;
export const MAX_OBSTACLE_PLACEMENT_ATTEMPTS = 100;