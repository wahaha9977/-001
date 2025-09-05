import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { petData } from '@/mocks/petData';
import { Pet } from '@/types/pet';
import { cn } from '@/lib/utils';
import { getInventoryItemCount, removeFromInventory } from '@/mocks/storeData';
import { toast } from 'sonner';

export default function Favorability() {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [petFoodCount, setPetFoodCount] = useState(0);
  
  // 更新兽粮数量
  const updatePetFoodCount = () => {
    setPetFoodCount(getInventoryItemCount('pet_food'));
  };
  // 加载宠兽好感度数据
  useEffect(() => {
    setIsLoading(true);
    
    // 模拟加载延迟
    setTimeout(() => {
      // 从本地存储获取好感度数据
      const savedFavorability = localStorage.getItem('petFavorability');
      const favorabilityData = savedFavorability ? JSON.parse(savedFavorability) : {};
      
      // 获取已收集的宠兽
      const savedCollected = localStorage.getItem('collectedPets');
      const collectedIds = savedCollected ? JSON.parse(savedCollected) : [];
      
      // 筛选已收集的宠兽并添加好感度数据
      const collectedPets = petData
        .filter(pet => collectedIds.includes(pet.id))
        .map(pet => ({
          ...pet,
          favorability: favorabilityData[pet.id] || 0 // 默认好感度为0
        }));
      
      setPets(collectedPets);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // 组件挂载时获取兽粮数量
  useEffect(() => {
    updatePetFoodCount();
  }, []);
  
  // 使用兽粮提升好感度
  const feedPet = (petId: string) => {
    // 检查是否有足够的兽粮
    if (petFoodCount <= 0) {
      toast.error('兽粮数量不足，请前往商店购买');
      return;
    }
    
    // 从库存中移除一个兽粮
    const removed = removeFromInventory('pet_food', 1);
    if (!removed) {
      toast.error('兽粮数量不足，请前往商店购买');
      return;
    }
    
    // 提升好感度
    const savedFavorability = localStorage.getItem('petFavorability');
    const favorabilityData = savedFavorability ? JSON.parse(savedFavorability) : {};
    
    const currentFavor = favorabilityData[petId] || 0;
    const newFavor = Math.min(currentFavor + 10, 100); // 每次使用增加10点好感度，最高100
    favorabilityData[petId] = newFavor;
    localStorage.setItem('petFavorability', JSON.stringify(favorabilityData));
    
    // 更新状态
    setPets(prev => 
      prev.map(pet => 
        pet.id === petId ? { ...pet, favorability: newFavor } : pet
      )
    );
    
    // 更新兽粮数量显示
    updatePetFoodCount();
    
    // 显示成功消息
    const petName = pets.find(p => p.id === petId)?.name || '该宠兽';
    toast.success(`${petName}的好感度提升了！`);
  };
  
  // 保存好感度数据到本地存储
  const saveFavorability = (id: string, value: number) => {
    const savedFavorability = localStorage.getItem('petFavorability');
    const favorabilityData = savedFavorability ? JSON.parse(savedFavorability) : {};
    
    favorabilityData[id] = value;
    localStorage.setItem('petFavorability', JSON.stringify(favorabilityData));
    
    // 更新本地状态
    setPets(prev => 
      prev.map(pet => 
        pet.id === id ? { ...pet, favorability: value } : pet
      )
    );
  };
  
  // 获取好感度等级文本
  const getFavorabilityLevel = (value: number): string => {
    if (value >= 80) return "亲密";
    if (value >= 60) return "友好";
    if (value >= 40) return "熟悉";
    if (value >= 20) return "认识";
    return "陌生";
  };
  
  // 获取好感度颜色
  const getFavorabilityColor = (value: number): string => {
    if (value >= 80) return "from-red-500 to-pink-500";
    if (value >= 60) return "from-orange-500 to-red-500";
    if (value >= 40) return "from-yellow-500 to-orange-500";
    if (value >= 20) return "from-blue-500 to-cyan-500";
    return "from-gray-300 to-gray-400";
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              <span>返回</span>
            </button>
           <h1 className="text-xl font-bold text-gray-900 mx-auto">宠兽好感度</h1>
           <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
             <i className="fa-solid fa-bone mr-1"></i>
             <span>兽粮: {petFoodCount}</span>
           </div>
         </div>
       </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            <span>返回</span>
          </button>
          
          <h1 className="text-xl font-bold text-gray-900 mx-auto">宠兽好感度</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {pets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-heart text-pink-400 text-3xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">暂无好感度数据</h2>
            <p className="text-gray-500 max-w-md mx-auto">
  收集宠兽后，它们将出现在这里。前往商店购买兽粮可以提升好感度，当好感度达到100时将解锁特殊奖励和属性加成。
            </p>
            <button
              onClick={() => navigate('/gacha')}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              <i className="fa-solid fa-gift mr-2"></i> 去抽卡获取宠兽
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map(pet => (
              <div 
                key={pet.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex">
                  {/* 宠兽图片 */}
                  <div className="w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-3">
                    <img 
                      src={pet.imageUrl} 
                      alt={pet.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* 宠兽信息 */}
                  <div className="w-2/3 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {getFavorabilityLevel(pet.favorability)}
                      </span>
                    </div>
                    
                    {/* 好感度进度条 */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>好感度</span>
                        <span>{pet.favorability}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${getFavorabilityColor(pet.favorability)} transition-all duration-500`}
                          style={{ width: `${pet.favorability}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* 互动按钮 */}
                   <div className="flex space-x-2">
                     <button
                        onClick={() => feedPet(pet.id)}
                       disabled={pet.favorability >= 100 || petFoodCount <= 0}
                       className={cn(
                         "flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center",
                         (pet.favorability >= 100 || petFoodCount <= 0)
                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                           : "bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                       )}
                     >
                       <i className="fa-solid fa-bone mr-1"></i>
                       {pet.favorability >= 100 ? "已达最高" : `使用兽粮`}
                     </button>
                     
                     <button
                       onClick={() => navigate('/store')}
                       className="flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                     >
                       <i className="fa-solid fa-store mr-1"></i>
                       购买
                     </button>
                   </div>
                   </div>
                 </div>
                
                 {/* 好感度等级奖励提示 */}
                {pet.favorability >= 100 && (
                  <div className="bg-blue-50 px-3 py-2 text-xs text-blue-700 flex items-center">
                    <i className="fa-solid fa-lightbulb mr-1"></i>
                    好感度已满！解锁专属技能和特殊互动，所有属性增加10%！
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}