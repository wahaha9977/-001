export interface PetAttribute {
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
  defense: number;
}

export interface PetAbility {
  name: string;
  description: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string[];
  description: string;
  imageUrl: string;
  attributes: PetAttribute;
  abilities: PetAbility[];
  habitat: string;
   rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'special';
  isCollected: boolean;
  height: string;
  weight: string;
  evolutionStage: number;
  evolutionFrom?: string;
  evolutionTo?: string;
  favorability?: number; // 好感度，范围0-100
}