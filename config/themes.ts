import { ThemeName, ThemeConfig } from '@/types/theme';

export const themes: Record<ThemeName, ThemeConfig> = {
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
    },
    price: 100
  },
  underwater: {
    name: 'underwater',
    displayName: 'Underwater',
    backgroundColor: '#006994',
    groundColor: '#00496B',
    platformColors: {
      normal: '#00496B',
      moving: '#003B56',
    },
    playerModel: 'fish',
    obstacles: [
      { type: 'shark', model: 'shark', color: '#4A5568' },
      { type: 'jellyfish', model: 'jellyfish', color: '#FF69B4' }
    ],
    collectibles: [
      { type: 'pearl', model: 'pearl', color: '#FFF5E1', points: 10 },
      { type: 'shell', model: 'shell', color: '#FFE4C4', points: 5 }
    ],
    environmentObjects: [
      { type: 'coral', model: 'coral', color: '#FF7F50', frequency: 0.4 },
      { type: 'seaweed', model: 'seaweed', color: '#20B2AA', frequency: 0.5 }
    ],
    particleEffects: {
      jump: 'bubbles',
      collect: 'sparkle',
      death: 'bubbles'
    },
    music: '/audio/underwater.mp3',
    soundEffects: {
      jump: '/audio/bubble.mp3',
      collect: '/audio/collect.mp3',
      death: '/audio/splash.mp3'
    },
    price: 150
  },
  candy: {
    name: 'candy',
    displayName: 'Candy Land',
    backgroundColor: '#FFB6C1',
    groundColor: '#FF69B4',
    platformColors: {
      normal: '#FF69B4',
      moving: '#FF1493',
    },
    playerModel: 'candyPerson',
    obstacles: [
      { type: 'lollipop', model: 'lollipop', color: '#FF69B4' },
      { type: 'gummybear', model: 'gummybear', color: '#FF1493' }
    ],
    collectibles: [
      { type: 'candy', model: 'candy', color: '#FFB6C1', points: 10 },
      { type: 'chocolate', model: 'chocolate', color: '#8B4513', points: 5 }
    ],
    environmentObjects: [
      { type: 'candycane', model: 'candycane', color: '#FF0000', frequency: 0.3 },
      { type: 'cottoncandy', model: 'cottoncandy', color: '#FFB6C1', frequency: 0.4 }
    ],
    particleEffects: {
      jump: 'sparkle',
      collect: 'sparkle',
      death: 'sparkle'
    },
    music: '/audio/candyland.mp3',
    soundEffects: {
      jump: '/audio/pop.mp3',
      collect: '/audio/collect.mp3',
      death: '/audio/splat.mp3'
    },
    price: 0
  },
  space: {
    name: 'space',
    displayName: 'Space',
    backgroundColor: '#000000',
    groundColor: '#1A1A1A',
    platformColors: {
      normal: '#1A1A1A',
      moving: '#333333',
    },
    playerModel: 'astronaut',
    obstacles: [
      { type: 'asteroid', model: 'asteroid', color: '#808080' },
      { type: 'satellite', model: 'satellite', color: '#C0C0C0' }
    ],
    collectibles: [
      { type: 'star', model: 'star', color: '#FFD700', points: 10 },
      { type: 'meteor', model: 'meteor', color: '#FF4500', points: 5 }
    ],
    environmentObjects: [
      { type: 'planet', model: 'planet', color: '#4169E1', frequency: 0.2 },
      { type: 'comet', model: 'comet', color: '#87CEEB', frequency: 0.3 }
    ],
    particleEffects: {
      jump: 'stardust',
      collect: 'sparkle',
      death: 'explosion'
    },
    music: '/audio/space.mp3',
    soundEffects: {
      jump: '/audio/boost.mp3',
      collect: '/audio/collect.mp3',
      death: '/audio/void.mp3'
    },
    price: 200
  },
  jungle: {
    name: 'jungle',
    displayName: 'Jungle',
    backgroundColor: '#228B22',
    groundColor: '#006400',
    platformColors: {
      normal: '#006400',
      moving: '#004B00',
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
    },
    price: 250
  }
}; 