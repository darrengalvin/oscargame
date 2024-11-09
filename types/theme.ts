export type ThemeName = 'prehistoric' | 'underwater' | 'candy' | 'space' | 'jungle';

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  backgroundColor: string;
  groundColor: string;
  platformColors: {
    normal: string;
    moving: string;
  };
  playerModel: 'dinosaur' | 'monkey' | 'phoenix' | 'fish' | 'astronaut' | 'candyPerson';
  obstacles: {
    type: string;
    model: string;
    color: string;
  }[];
  collectibles: {
    type: string;
    model: string;
    color: string;
    points: number;
  }[];
  environmentObjects: {
    type: string;
    model: string;
    color: string;
    frequency: number;
  }[];
  particleEffects: {
    jump: string;
    collect: string;
    death: string;
  };
  music: string;
  soundEffects: {
    jump: string;
    collect: string;
    death: string;
  };
  price: number;
} 