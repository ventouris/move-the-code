import { Direction, Position, Difficulty, Command } from '../types';
import { DIRECTION_VECTORS, GRID_SIZE, DIFFICULTY_SETTINGS, OBSTACLE_COUNT, STARTING_POSITIONS } from '../constants';

// Calculate Manhattan distance between two positions
export const getManhattanDistance = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};

// Check if two positions are the same
export const isSamePosition = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

// Check if position is within grid bounds
export const isWithinGrid = (pos: Position): boolean => {
  return pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE;
};

// Check if position has obstacle
export const hasObstacle = (pos: Position, obstacles: Position[]): boolean => {
  return obstacles.some((obstacle) => isSamePosition(obstacle, pos));
};

// Get new position after moving in a direction
export const getNewPosition = (position: Position, direction: Direction): Position => {
  const vector = DIRECTION_VECTORS[direction];
  return {
    x: position.x + vector.x,
    y: position.y + vector.y,
  };
};

// Generate a random position within the grid
export const getRandomPosition = (): Position => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
};

// Generate a random starting position (one of the corners)
export const getRandomStartingPosition = (): Position => {
  const randomIndex = Math.floor(Math.random() * STARTING_POSITIONS.length);
  return STARTING_POSITIONS[randomIndex];
};

// Generate a valid goal position based on difficulty
export const generateGoalPosition = (
  startPos: Position,
  difficulty: Difficulty,
  obstacles: Position[]
): Position => {
  const { min, max } = DIFFICULTY_SETTINGS[difficulty];
  let goalPos: Position;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    goalPos = getRandomPosition();
    attempts++;
  } while (
    (isSamePosition(startPos, goalPos) ||
    hasObstacle(goalPos, obstacles) ||
    getManhattanDistance(startPos, goalPos) < min ||
    getManhattanDistance(startPos, goalPos) > max) &&
    attempts < maxAttempts
  );

  return goalPos;
};

// Generate obstacles
export const generateObstacles = (
  startPos: Position,
  difficulty: Difficulty
): Position[] => {
  const { min, max } = OBSTACLE_COUNT[difficulty];
  const obstacleCount = Math.floor(Math.random() * (max - min + 1)) + min;
  const obstacles: Position[] = [];

  for (let i = 0; i < obstacleCount; i++) {
    let obstaclePos: Position;
    let validPosition = false;
    let attempts = 0;
    const maxAttempts = 50;

    while (!validPosition && attempts < maxAttempts) {
      obstaclePos = getRandomPosition();
      
      // Don't place obstacles on the start position or existing obstacles
      if (!isSamePosition(obstaclePos, startPos) && 
          !obstacles.some(obs => isSamePosition(obs, obstaclePos))) {
        obstacles.push(obstaclePos);
        validPosition = true;
      }
      
      attempts++;
    }
  }

  return obstacles;
};

// Check if there's a valid path from start to goal
export const hasValidPath = (
  startPos: Position,
  goalPos: Position,
  obstacles: Position[]
): boolean => {
  // Simple BFS to check if there's a path
  const queue: Position[] = [startPos];
  const visited: boolean[][] = Array(GRID_SIZE)
    .fill(false)
    .map(() => Array(GRID_SIZE).fill(false));
  visited[startPos.y][startPos.x] = true;

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (isSamePosition(current, goalPos)) {
      return true;
    }

    // Check all four directions
    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    for (const direction of directions) {
      const next = getNewPosition(current, direction);
      
      if (
        isWithinGrid(next) &&
        !hasObstacle(next, obstacles) &&
        !visited[next.y][next.x]
      ) {
        visited[next.y][next.x] = true;
        queue.push(next);
      }
    }
  }

  return false;
};

// Process a command and return the new position and direction
export const processCommand = (
  position: Position,
  direction: Direction,
  command: Command
): { position: Position; direction: Direction } => {
  if (!(command in DIRECTION_VECTORS)) {
    return { position, direction };
  }
  const newPosition = getNewPosition(position, command);
  return { position: newPosition, direction: command };
};