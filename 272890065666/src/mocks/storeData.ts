export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'gacha_ticket' | 'pet' | 'item';
  quantity: number;
}

export interface InventoryItem {
  id: string;
  quantity: number;
}

// 初始商店商品
export const storeItems: StoreItem[] = [
  {
    id: 'gacha10',
    name: '抽卡券x10',
    description: '可进行10次抽卡的券，使用后增加10次抽卡次数',
    price: 900,
    type: 'gacha_ticket',
    quantity: 10
  },
  {
    id: 'gacha1',
    name: '抽卡券x1',
    description: '可进行1次抽卡的券，使用后增加1次抽卡次数',
    price: 100,
    type: 'gacha_ticket',
    quantity: 1
  },
  {
    id: 'rare_pet',
    name: '稀有宠兽蛋',
    description: '可以孵化出一只随机稀有宠兽的蛋',
    price: 800,
    type: 'pet',
    quantity: 1
  },
  {
    id: 'epic_pet',
    name: '史诗宠兽蛋',
    description: '可以孵化出一只随机史诗宠兽的蛋',
    price: 2000,
    type: 'pet',
    quantity: 1
  },
  {
    id: 'legendary_pet',
    name: '传说宠兽蛋',
    description: '可以孵化出一只随机传说宠兽的蛋',
    price: 5000,
    type: 'pet',
    quantity: 1
  },
  {
    id: 'evolution_stone',
    name: '进化石',
    description: '用于宠兽进化的特殊道具（功能尚未开放）',
    price: 300,
    type: 'item',
    quantity: 1
  },
  {
    id: 'attribute_boost',
    name: '属性强化剂',
    description: '随机提升一只宠兽的某项属性（功能尚未开放）',
    price: 200,
    type: 'item',
    quantity: 1
  },
   {
   id: 'pet_food',
   name: '高级宠兽粮',
   description: '大量提升宠兽好感度的特殊食物',
   price: 100,
   type: 'item',
   quantity: 5
 },
 {
   id: 'special_pet_saber',
   name: '特殊宠兽·Saber',
   description: '传说中的剑士宠兽，只能通过商店购买获得',
   price: 5000,
   type: 'pet',
   quantity: 1
 }
];

// 获取物品库存
export const getInventory = (): InventoryItem[] => {
  const savedInventory = localStorage.getItem('inventory');
  return savedInventory ? JSON.parse(savedInventory) : [];
};

// 更新物品库存
export const updateInventory = (inventory: InventoryItem[]): void => {
  localStorage.setItem('inventory', JSON.stringify(inventory));
};

// 添加物品到库存
export const addToInventory = (itemId: string, quantity: number): void => {
  const inventory = getInventory();
  const existingItem = inventory.find(item => item.id === itemId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    inventory.push({ id: itemId, quantity });
  }
  
  updateInventory(inventory);
};

// 从库存移除物品
export const removeFromInventory = (itemId: string, quantity: number): boolean => {
  const inventory = getInventory();
  const existingItemIndex = inventory.findIndex(item => item.id === itemId);
  
  if (existingItemIndex === -1 || inventory[existingItemIndex].quantity < quantity) {
    return false; // 库存不足
  }
  
  inventory[existingItemIndex].quantity -= quantity;
  
  // 如果数量为0，从数组中移除
  if (inventory[existingItemIndex].quantity === 0) {
    inventory.splice(existingItemIndex, 1);
  }
  
  updateInventory(inventory);
  return true;
};

// 获取物品库存数量
export const getInventoryItemCount = (itemId: string): number => {
  const inventory = getInventory();
  const item = inventory.find(item => item.id === itemId);
  return item ? item.quantity : 0;
};