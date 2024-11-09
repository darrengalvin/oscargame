export interface GameStore {
  isPlaying: boolean;
  initializeProgress: () => void;
  startGame: () => void;
  startJump: () => void;
  endJump: () => void;
  isJumping: boolean;
  updateGameState: (delta: number) => void;
  // ... other existing properties ...
} 