import { Pet } from '@/types/pet';

// 计算宠兽的最终属性值
export function usePetAttributes(pet: Pet | null) {
  // 提供默认空值情况的处理
  if (!pet) {
    const defaultAttributes = {
      strength: 0,
      agility: 0,
      intelligence: 0,
      vitality: 0,
      defense: 0
    };
    
    return {
      finalAttributes: defaultAttributes,
      getAttributeColor: () => 'from-gray-500 to-gray-600',
      getAttributeIcon: () => 'fa-question'
    };
  }
  
  // 计算单个属性的最终值
  const calculateFinalValue = (baseValue: number) => {
    let finalValue = baseValue;
    
    // 好感度加成
    if (pet.favorability && pet.favorability >= 100) {
      finalValue = Math.floor(finalValue * 1.1);
    }
    
    // 传说宠兽加成
    if (pet.rarity === 'legendary') {
      finalValue = Math.floor(finalValue * 1.1);
    }
    
    // 特殊宠兽加成
    if (pet.rarity === 'special') {
      finalValue = Math.floor(finalValue * 1.3);
    }
    
    return finalValue;
  };

  // 计算所有属性的最终值
  const finalAttributes = {
    strength: calculateFinalValue(pet.attributes.strength),
    agility: calculateFinalValue(pet.attributes.agility),
    intelligence: calculateFinalValue(pet.attributes.intelligence),
    vitality: calculateFinalValue(pet.attributes.vitality),
    defense: calculateFinalValue(pet.attributes.defense)
  };

  // 获取属性对应的颜色
  const getAttributeColor = (attrKey: keyof typeof finalAttributes) => {
    switch(attrKey) {
      case 'strength': return 'from-red-500 to-red-600';
      case 'agility': return 'from-blue-500 to-blue-600';
      case 'intelligence': return 'from-purple-500 to-purple-600';
      case 'vitality': return 'from-green-500 to-green-600';
      case 'defense': return 'from-amber-500 to-amber-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // 获取属性对应的图标
  const getAttributeIcon = (attrKey: keyof typeof finalAttributes) => {
    switch(attrKey) {
      case 'strength': return 'fa-bolt';
      case 'agility': return 'fa-wind';
      case 'intelligence': return 'fa-brain';
      case 'vitality': return 'fa-heart';
      case 'defense': return 'fa-shield';
      default: return 'fa-question';
    }
  };

  return {
    finalAttributes,
    getAttributeColor,
    getAttributeIcon
  };
}