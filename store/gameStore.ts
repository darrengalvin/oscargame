import { create } from 'zustand';
import { GameStore } from '../types/game';

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
         'normal') as BlockType
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

const checkCollision = (playerPos: any, blockPos: any) => {
  const horizontalCollision = Math.abs(playerPos.x - blockPos.x) < (PLAYER_SIZE.width + BLOCK_SIZE.width) / 1.8;
  const verticalCollision = Math.abs(playerPos.y - blockPos.y) < (PLAYER_SIZE.height + BLOCK_SIZE.height) / 1.8;
  return horizontalCollision && verticalCollision;
};

interface BlockScore {
  blockId: string;
  scored: boolean;
}

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
    let currentBlockId = null;

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
        scoredBlocks: new Set([...state.scoredBlocks, currentBlockId])
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
})); 