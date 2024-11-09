import { create } from 'zustand';
import { GameStore, Block } from '../types/game';
import { themes } from '@/config/themes';
import { ThemeName } from '@/types/theme';

const GRAVITY = -0.012;
const JUMP_FORCE = 0.3;
const FORWARD_SPEED = 0.06;
const BLOCK_SPACING = 4;
const VISIBLE_BLOCKS = 15;
const PLAYER_SIZE = { width: 0.8, height: 0.8 };
const BLOCK_SIZE = { width: 2, height: 0.5 };
const MAX_FALL_SPEED = -0.5;
const INITIAL_PLATFORM_Y = 0;
const COLLISION_TOLERANCE = 0.3;

const INITIAL_JUMP_FORCE = 0.3;
const MAX_JUMP_FORCE = 0.45;
const MIN_JUMP_TIME = 100; // milliseconds
const MAX_JUMP_TIME = 400; // milliseconds
const JUMP_FORCE_INCREMENT = 0.001;

type BlockType = 'normal' | 'moving' | 'disappearing';

const generateNewBlock = (index: number, lastBlockY: number): Block => ({
  id: `block-${index}`,
  position: { 
    x: index * BLOCK_SPACING,
    y: index === 0 ? INITIAL_PLATFORM_Y : 
       Math.max(-0.5, Math.min(0.8, lastBlockY + (Math.random() * 0.5 - 0.25))),
    z: 0 
  },
  type: (index === 0 ? 'normal' : 
         Math.random() > 0.85 ? 'moving' : 
         'normal') as BlockType,
  color: (index === 0 ? 'normal' : 
         Math.random() > 0.85 ? 'moving' : 
         'normal') as string,
});

const generateObstacle = (blockX: number, blockY: number) => ({
  id: `obstacle-${blockX}`,
  position: { x: blockX + 1, y: blockY + 0.5, z: 0 },
  type: 'cactus' as const,
});

const generateInitialBlocks = () => {
  const blocks = [];
  let lastY = INITIAL_PLATFORM_Y;
  for (let i = 0; i < VISIBLE_BLOCKS; i++) {
    blocks.push(generateNewBlock(i, lastY));
    lastY = blocks[blocks.length - 1].position.y;
  }
  return blocks;
};

const checkCollision = (playerPos: { x: number; y: number }, blockPos: { x: number; y: number }) => {
  const horizontalCollision = Math.abs(playerPos.x - blockPos.x) < (PLAYER_SIZE.width + BLOCK_SIZE.width) / 1.8;
  const verticalCollision = Math.abs(playerPos.y - blockPos.y) < (PLAYER_SIZE.height + BLOCK_SIZE.height) / 1.8;
  return horizontalCollision && verticalCollision;
};

interface BlockScore {
  blockId: string;
  scored: boolean;
}

interface GameState {
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
  gems: number;
  unlockedThemes: ThemeName[];
  specialItems: {
    [key in ThemeName]?: {
      collected: boolean;
      type: string;
    }[];
  };
}

interface GameStore extends GameState {
  score: number;
  highScore: number;
  isPlaying: boolean;
  playerPosition: { x: number; y: number; z: number };
  worldPosition: number;
  velocity: { x: number; y: number; z: number };
  isJumping: boolean;
  obstacles: {
    id: string;
    position: { x: number; y: number; z: number };
    type: string;
  }[];
  blocks: Block[];
  scoredBlocks: Set<string>;
  jumpStartTime: number;
  isJumpHeld: boolean;
  changeTheme: (theme: ThemeName) => void;
  collectGem: () => void;
  collectSpecialItem: (theme: ThemeName, itemType: string) => void;
  unlockTheme: (theme: ThemeName) => void;
  initializeProgress: () => void;
}

const THEME_PRICES = {
  candy: 0,
  prehistoric: 100,
  underwater: 150,
  space: 200,
  jungle: 250,
};

export const useGameStore = create<GameStore>((set, get) => ({
  score: 0,
  highScore: 0,
  isPlaying: false,
  playerPosition: { x: 0, y: INITIAL_PLATFORM_Y + BLOCK_SIZE.height + PLAYER_SIZE.height / 2, z: 0 },
  worldPosition: 0,
  velocity: { x: 0, y: 0, z: 0 },
  isJumping: false,
  obstacles: [],
  blocks: generateInitialBlocks(),
  scoredBlocks: new Set<string>(),
  jumpStartTime: 0,
  isJumpHeld: false,
  currentTheme: 'prehistoric',
  collectibles: [],
  gems: 0,
  unlockedThemes: ['candy'], // Candy theme is free
  specialItems: {},

  startGame: () => set({ 
    isPlaying: true, 
    score: 0,
    playerPosition: { 
      x: 0, 
      y: INITIAL_PLATFORM_Y + BLOCK_SIZE.height + PLAYER_SIZE.height / 2, 
      z: 0 
    },
    worldPosition: 0,
    velocity: { x: 0, y: 0, z: 0 },
    isJumping: false,
    blocks: generateInitialBlocks(),
    obstacles: [],
    scoredBlocks: new Set<string>(),
  }),
  
  endGame: () => set((state) => ({ 
    isPlaying: false,
    highScore: Math.max(state.score, state.highScore) 
  })),
  
  startJump: () => {
    const state = get();
    if (!state.isJumping && state.isPlaying) {
      set({
        velocity: { ...state.velocity, y: INITIAL_JUMP_FORCE },
        isJumping: true,
        jumpStartTime: Date.now(),
        isJumpHeld: true
      });
    }
  },

  endJump: () => {
    const state = get();
    const jumpDuration = Date.now() - state.jumpStartTime;
    
    if (state.isJumpHeld) {
      const clampedDuration = Math.min(Math.max(jumpDuration, MIN_JUMP_TIME), MAX_JUMP_TIME);
      const jumpForce = INITIAL_JUMP_FORCE + 
        ((clampedDuration - MIN_JUMP_TIME) / (MAX_JUMP_TIME - MIN_JUMP_TIME)) * 
        (MAX_JUMP_FORCE - INITIAL_JUMP_FORCE);

      set(state => ({
        velocity: { ...state.velocity, y: jumpForce },
        isJumpHeld: false
      }));
    }
  },

  updateGameState: (delta: number) => {
    const state = get();
    if (!state.isPlaying) return;

    const cappedDelta = Math.min(delta, 1/30);
    const newWorldPosition = state.worldPosition + FORWARD_SPEED;

    const newVelocity = {
      x: 0,
      y: Math.max(
        MAX_FALL_SPEED,
        state.velocity.y + (GRAVITY * cappedDelta * 60)
      ),
      z: 0
    };

    const steps = 3;
    let finalPosition = { ...state.playerPosition };
    let isOnPlatform = false;
    let currentBlockId: string | null = null;

    for (let i = 0; i < steps; i++) {
      const stepVelocity = {
        x: 0,
        y: newVelocity.y / steps,
        z: 0
      };

      const stepPosition = {
        x: finalPosition.x,
        y: finalPosition.y + stepVelocity.y,
        z: finalPosition.z
      };

      const stepWorldPos = { x: newWorldPosition, y: stepPosition.y };

      state.blocks.forEach(block => {
        const adjustedBlockPos = { ...block.position };
        if (block.type === 'moving') {
          adjustedBlockPos.y += Math.sin(Date.now() * 0.002) * 0.3;
        }

        if (checkCollision(stepWorldPos, adjustedBlockPos)) {
          if (stepVelocity.y < 0) {
            const playerBottom = stepPosition.y - PLAYER_SIZE.height / 2;
            const blockTop = adjustedBlockPos.y + BLOCK_SIZE.height / 2;
            
            if (Math.abs(playerBottom - blockTop) < COLLISION_TOLERANCE) {
              stepPosition.y = blockTop + PLAYER_SIZE.height / 2;
              newVelocity.y = 0;
              isOnPlatform = true;
              currentBlockId = block.id;
            }
          }
        }
      });

      finalPosition = stepPosition;
    }

    if (finalPosition.y < -3) {
      get().endGame();
      return;
    }

    // Update blocks
    const lastBlockIndex = Math.floor(newWorldPosition / BLOCK_SPACING) + VISIBLE_BLOCKS;
    const firstVisibleBlock = Math.floor(newWorldPosition / BLOCK_SPACING) - 2;
    
    const updatedBlocks = state.blocks.filter(block => {
      const blockIndex = Math.floor(block.position.x / BLOCK_SPACING);
      return blockIndex >= firstVisibleBlock && blockIndex <= lastBlockIndex;
    });

    while (updatedBlocks.length < VISIBLE_BLOCKS) {
      const lastBlock = updatedBlocks[updatedBlocks.length - 1];
      const lastY = lastBlock ? lastBlock.position.y : 0;
      const newIndex = Math.floor(lastBlock ? lastBlock.position.x / BLOCK_SPACING : 0) + 1;
      updatedBlocks.push(generateNewBlock(newIndex, lastY));
    }

    // Update score when landing on a new block
    if (isOnPlatform && currentBlockId && !state.scoredBlocks.has(currentBlockId)) {
      set(state => ({
        score: state.score + 1,
        scoredBlocks: new Set([...state.scoredBlocks, currentBlockId as string])
      }));
    }

    // Add extra force while jump is held
    if (state.isJumpHeld && state.velocity.y > 0) {
      newVelocity.y += JUMP_FORCE_INCREMENT;
    }

    set({
      playerPosition: finalPosition,
      worldPosition: newWorldPosition,
      velocity: newVelocity,
      blocks: updatedBlocks,
      isJumping: !isOnPlatform,
    });
  },
  
  updateScore: (newScore) => set({ score: newScore }),

  changeTheme: (theme: ThemeName) => {
    set({ currentTheme: theme });
    // Regenerate environment with new theme
    const state = get();
    if (state.isPlaying) {
      state.startGame(); // Reset game with new theme
    }
  },

  generateCollectibles: (blockX: number, blockY: number) => {
    const state = get();
    const theme = themes[state.currentTheme];
    if (Math.random() < 0.3) { // 30% chance to spawn collectible
      const collectible = theme.collectibles[Math.floor(Math.random() * theme.collectibles.length)];
      return {
        id: `collectible-${blockX}`,
        type: collectible.type,
        position: { x: blockX, y: blockY + 1, z: 0 }
      };
    }
    return null;
  },

  collectGem: () => {
    set(state => ({ gems: state.gems + 1 }));
  },

  collectSpecialItem: (theme: ThemeName, itemType: string) => {
    set(state => {
      const newSpecialItems = { ...state.specialItems };
      if (!newSpecialItems[theme]) {
        newSpecialItems[theme] = [];
      }
      newSpecialItems[theme]?.push({ collected: true, type: itemType });
      // Special items give 10 gems
      return {
        specialItems: newSpecialItems,
        gems: state.gems + 10
      };
    });
  },

  unlockTheme: (theme: ThemeName) => {
    const state = get();
    const price = THEME_PRICES[theme];
    if (state.gems >= price && !state.unlockedThemes.includes(theme)) {
      set(state => ({
        gems: state.gems - price,
        unlockedThemes: [...state.unlockedThemes, theme]
      }));
      // Save to localStorage
      localStorage.setItem('unlockedThemes', JSON.stringify([...state.unlockedThemes, theme]));
      localStorage.setItem('gems', (state.gems - price).toString());
    }
  },

  // Initialize from localStorage
  initializeProgress: () => {
    const savedThemes = localStorage.getItem('unlockedThemes');
    const savedGems = localStorage.getItem('gems');
    if (savedThemes) {
      set({ unlockedThemes: JSON.parse(savedThemes) });
    }
    if (savedGems) {
      set({ gems: parseInt(savedGems, 10) });
    }
  },
})); 