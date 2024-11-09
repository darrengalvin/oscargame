export interface GameState {
  score: number;
  highScore: number;
  isPlaying: boolean;
  playerPosition: {
    x: number;
    y: number;
    z: number;
  };
  worldPosition: number;
  velocity: {
    x: number;
    y: number;
    z: number;
  };
  isJumping: boolean;
  obstacles: Obstacle[];
  blocks: Block[];
  jumpStartTime: number;
  isJumpHeld: boolean;
}

export interface Obstacle {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  type: 'cactus';
}

export interface Block {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  type: 'normal' | 'moving' | 'disappearing';
}

export interface GameStore extends GameState {
  startGame: () => void;
  endGame: () => void;
  jump: () => void;
  updateGameState: (delta: number) => void;
  updateScore: (newScore: number) => void;
  startJump: () => void;
  endJump: () => void;
} 