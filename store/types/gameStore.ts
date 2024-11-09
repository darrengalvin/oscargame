interface GameStore {
  collectibles: Array<{
    id: string;
    position: { x: number; y: number; z: number };
    type: string;
  }>;
  worldPosition: number;
  currentTheme: string;
  // ... other existing properties ...
} 