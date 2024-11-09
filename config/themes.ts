import { ThemeConfig } from '@/types/theme';

export const themes: Record<string, ThemeConfig> = {
  prehistoric: {
    name: 'prehistoric',
    displayName: 'Prehistoric',
    backgroundColor: '#87CEEB',
    groundColor: '#8B4513',
    platformColors: {
      normal: '#8B4513',
      moving: '#A0522D',
    },
    playerModel: 'dinosaur',
    obstacles: [
      { type: 'raptor', model: 'raptor', color: '#4A5568' },
      { type: 'pterodactyl', model: 'pterodactyl', color: '#696969' }
    ],
    collectibles: [
      { type: 'egg', model: 'egg', color: '#FFF5E1', points: 10 },
      { type: 'bone', model: 'bone', color: '#F5F5DC', points: 5 }
    ],
    environmentObjects: [
      { type: 'palm', model: 'palm', color: '#228B22', frequency: 0.3 },
      { type: 'rock', model: 'rock', color: '#808080', frequency: 0.4 }
    ],
    particleEffects: {
      jump: 'dust',
      collect: 'sparkle',
      death: 'explosion'
    },
    music: '/audio/prehistoric.mp3',
    soundEffects: {
      jump: '/audio/dino-roar.mp3',
      collect: '/audio/collect.mp3',
      death: '/audio/death.mp3'
    }
  },
  underwater: {
    name: 'underwater',
    displayName: 'Underwater',
    backgroundColor: '#00CED1',
    groundColor: '#00868B',
    platformColors: {
      normal: '#4682B4',
      moving: '#1E90FF',
    },
    playerModel: 'fish',
    obstacles: [
      { type: 'shark', model: 'shark', color: '#4A5568' },
      { type: 'jellyfish', model: 'jellyfish', color: '#FF69B4' }
    ],
    collectibles: [
      { type: 'pearl', model: 'pearl', color: '#FFF5EE', points: 10 },
      { type: 'seashell', model: 'seashell', color: '#FFE4E1', points: 5 }
    ],
    environmentObjects: [
      { type: 'coral', model: 'coral', color: '#FF7F50', frequency: 0.4 },
      { type: 'seaweed', model: 'seaweed', color: '#20B2AA', frequency: 0.6 }
    ],
    particleEffects: {
      jump: 'bubbles',
      collect: 'sparkle',
      death: 'bubbleExplosion'
    },
    music: '/audio/underwater.mp3',
    soundEffects: {
      jump: '/audio/bubble.mp3',
      collect: '/audio/collect.mp3',
      death: '/audio/death.mp3'
    }
  },
  candy: {
    name: 'candy',
    displayName: 'Candy Land',
    backgroundColor: '#FFB6C1',
    groundColor: '#FFE4E1',
    platformColors: {
      normal: '#FF69B4',
      moving: '#FF1493',
    },
    playerModel: 'candyPerson',
    obstacles: [
      { type: 'lollipop', model: 'lollipop', color: '#FF69B4' },
      { type: 'gummyBear', model: 'gummyBear', color: '#FF1493' }
    ],
    collectibles: [
      { type: 'candy', model: 'candy', color: '#FF69B4', points: 10 },
      { type: 'chocolate', model: 'chocolate', color: '#8B4513', points: 5 }
    ],
    environmentObjects: [
      { type: 'candyCane', model: 'candyCane', color: '#FF0000', frequency: 0.4 },
      { type: 'cottonCandy', model: 'cottonCandy', color: '#FFB6C1', frequency: 0.3 }
    ],
    particleEffects: {
      jump: 'sparkles',
      collect: 'candyBurst',
      death: 'sugarExplosion'
    },
    music: '/audio/candyland.mp3',
    soundEffects: {
      jump: '/audio/pop.mp3',
      collect: '/audio/sweet.mp3',
      death: '/audio/crunch.mp3'
    }
  },
  space: {
    name: 'space',
    displayName: 'Space',
    backgroundColor: '#000000',
    groundColor: '#1A1A1A',
    platformColors: {
      normal: '#4A4A4A',
      moving: '#6A6A6A',
    },
    playerModel: 'astronaut',
    obstacles: [
      { type: 'asteroid', model: 'asteroid', color: '#808080' },
      { type: 'satellite', model: 'satellite', color: '#C0C0C0' }
    ],
    collectibles: [
      { type: 'star', model: 'star', color: '#FFD700', points: 10 },
      { type: 'crystal', model: 'crystal', color: '#00FFFF', points: 5 }
    ],
    environmentObjects: [
      { type: 'planet', model: 'planet', color: '#4169E1', frequency: 0.2 },
      { type: 'meteor', model: 'meteor', color: '#FF4500', frequency: 0.3 }
    ],
    particleEffects: {
      jump: 'stardust',
      collect: 'cosmic',
      death: 'blackhole'
    },
    music: '/audio/space.mp3',
    soundEffects: {
      jump: '/audio/boost.mp3',
      collect: '/audio/collect.mp3',
      death: '/audio/void.mp3'
    }
  },
  jungle: {
    name: 'jungle',
    displayName: 'Jungle',
    backgroundColor: '#228B22',
    groundColor: '#556B2F',
    platformColors: {
      normal: '#8B4513',
      moving: '#A0522D',
    },
    playerModel: 'monkey',
    obstacles: [
      { type: 'snake', model: 'snake', color: '#32CD32' },
      { type: 'piranha', model: 'piranha', color: '#FF4500' }
    ],
    collectibles: [
      { type: 'banana', model: 'banana', color: '#FFD700', points: 10 },
      { type: 'coconut', model: 'coconut', color: '#8B4513', points: 5 }
    ],
    environmentObjects: [
      { type: 'vine', model: 'vine', color: '#228B22', frequency: 0.5 },
      { type: 'flower', model: 'flower', color: '#FF69B4', frequency: 0.3 }
    ],
    particleEffects: {
      jump: 'leaves',
      collect: 'sparkle',
      death: 'leafExplosion'
    },
    music: '/audio/jungle.mp3',
    soundEffects: {
      jump: '/audio/monkey.mp3',
      collect: '/audio/collect.mp3',
      death: '/audio/fall.mp3'
    }
  }
}; 