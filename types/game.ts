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
  scoredBlocks: Set<string>;
  jumpStartTime: number;
  isJumpHeld: boolean;
  gems: number;
  unlockedThemes: ThemeName[];
  currentTheme: ThemeName;
  collectibles: {
    id: string;
    type: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
  }[];
  specialItems: {
    [key in ThemeName]?: {
      collected: boolean;
      type: string;
    }[];
  };
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
  color: string;
}

export interface GameStore extends GameState {
  themes: any;
  obstacles: Obstacle[];
  blocks: Block[];
  scoredBlocks: Set<string>;
  jumpStartTime: number;
  isJumpHeld: boolean;
  changeTheme: (theme: ThemeName) => void;
  collectGem: () => void;
  collectSpecialItem: (theme: ThemeName, itemType: string) => void;
  unlockTheme: (theme: ThemeName) => void;
  initializeProgress: () => void;
  startGame: () => void;
  endJump: () => void;
  startJump: () => void;
  updateGameState: (delta: number) => void;
  endGame: () => void;
}

export type ThemeName = 'prehistoric' | 'underwater' | 'candy' | 'space' | 'jungle';

export type BlockType = 'normal' | 'moving' | 'disappearing';