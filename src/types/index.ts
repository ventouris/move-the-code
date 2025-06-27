export type Direction = 'up' | 'down' | 'left' | 'right';
export type Animal = 'turtle' | 'unicorn' | 'dog' | 'bird' | 'rabbit' | 'panda' | 'penguin' | 'princess';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type Command = 'up' | 'down' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export interface GridCellProps {
  isStart: boolean;
  isGoal: boolean;
  hasPlayer: boolean;
  hasObstacle: boolean;
  playerDirection: Direction;
  animal: Animal;
  isGameOver?: boolean;
  isPath?: boolean;
}

export interface PlayerState {
  position: Position;
  direction: Direction;
  animal: Animal;
}

export interface GameState {
  player: PlayerState;
  startPosition: Position;
  goalPosition: Position;
  obstacles: Position[];
  commandQueue: Command[];
  difficulty: Difficulty;
  isExecuting: boolean;
  isCompleted: boolean;
  isGameOver: boolean;
  gridSize: number;
  path: Position[];
}