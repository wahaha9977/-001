import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { petData } from '@/mocks/petData';
import { Pet } from '@/types/pet';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// 抽卡概率配置
const GACHA_PROBABILITIES = {
  common: 40,       // 普通: 40%
  uncommon: 30,     // 罕见: 30%
  rare: 18,         // 稀有: 18%
  epic: 10,         // 史诗: 10%
  legendary: 2      // 传说: 2%
};

// 抽卡结果类型
interface GachaResult {
  pet: Pet;
  isNew: boolean;
}

export default function Gacha() {
  const navigate = useNavigate();
  const [isDrawing, setIsDrawing] = useState(false);
  const [results, setResults] = useState<GachaResult[]>([]);
  const [remainingDraws, setRemainingDraws] = useState(() => {
    // 从localStorage加载剩余抽卡次数
    const savedDraws = localStorage.getItem('remainingDraws');
    return savedDraws ? parseInt(savedDraws, 10) : 5;
  });
  const [coins, setCoins] = useState(() => {
    // 从localStorage加载金币数量
    const savedCoins = localStorage.getItem('storeCoins');
    return savedCoins ? parseInt(savedCoins, 10) : 100;
  });
  const [collectedPets, setCollectedPets] = useState<string[]>([]);
  
  // 从本地存储加载已收集宠兽
  useEffect(() => {
    const savedCollected = localStorage.getItem('collectedPets');
    if (savedCollected) {
      setCollectedPets(JSON.parse(savedCollected));
    }
  }, []);
  
  // 保存已收集宠兽到本地存储
  // 保存已收集宠兽到本地存储
  useEffect(() => {
    localStorage.setItem('collectedPets', JSON.stringify(collectedPets));
  }, [collectedPets]);

  // 保存剩余抽卡次数到本地存储
  useEffect(() => {
    localStorage.setItem('remainingDraws', remainingDraws.toString());
  }, [remainingDraws]);
  
  // 根据稀有度获取随机宠兽
  const getRandomPetByRarity = (rarity: string): Pet => {
    const petsOfRarity = petData.filter(pet => pet.rarity === rarity);
    return petsOfRarity[Math.floor(Math.random() * petsOfRarity.length)];
  };
  
   // 执行单次抽卡
  const drawSinglePet = (): GachaResult => {
    // 新增逻辑：如果玩家已收集宠兽数为0，则必定抽到传说宠兽
    if (collectedPets.length === 0) {
      const legendaryPet = getRandomPetByRarity('legendary');
      const isNew = !collectedPets.includes(legendaryPet.id);
      
      // 添加到已收集列表
      setCollectedPets(prev => [...prev, legendaryPet.id]);
      
      return { pet: legendaryPet, isNew: true };
    }
    
    const randomValue = Math.random() * 100;
    let cumulativeProbability = 0;
    
    // 根据概率随机确定稀有度
    for (const [rarity, probability] of Object.entries(GACHA_PROBABILITIES)) {
      cumulativeProbability += probability;
      if (randomValue < cumulativeProbability) {
        const pet = getRandomPetByRarity(rarity as keyof typeof GACHA_PROBABILITIES);
        const isNew = !collectedPets.includes(pet.id);
        
        // 如果是新宠兽，添加到已收集列表
        if (isNew) {
          setCollectedPets(prev => [...prev, pet.id]);
        } else {
          // 抽到重复宠兽，奖励50金币
          const newCoins = coins + 50;
          setCoins(newCoins);
          localStorage.setItem('storeCoins', newCoins.toString());
        }
        
        return { pet, isNew };
      }
    }
    
    // 默认返回普通宠兽
    const defaultPet = getRandomPetByRarity('common');
    return { 
      pet: defaultPet, 
      isNew: !collectedPets.includes(defaultPet.id) 
    };
  };
  
  // 执行抽卡动画和逻辑
  const performDraw = (isMulti: boolean = false) => {
    if (isDrawing || remainingDraws <= 0) return;
    
    setIsDrawing(true);
    setResults([]);
    
    const draws = isMulti ? 10 : 1;
    const newResults: GachaResult[] = [];
    const newRemaining = Math.max(0, remainingDraws - (isMulti ? 10 : 1));
    
    // 模拟抽卡过程
    const drawInterval = setInterval(() => {
      const result = drawSinglePet();
      newResults.push(result);
      setResults([...newResults]);
      
      if (newResults.length === draws) {
        clearInterval(drawInterval);
        
        // 延迟后结束抽卡状态
        setTimeout(() => {
          setIsDrawing(false);
          setRemainingDraws(newRemaining);
          
          // 提示获得的新宠兽数量和金币奖励
          const newPetsCount = newResults.filter(r => r.isNew).length;
          const duplicateCount = newResults.filter(r => !r.isNew).length;
          
          if (newPetsCount > 0) {
            toast.success(`恭喜获得 ${newPetsCount} 只新宠兽！`);
          }
          
          if (duplicateCount > 0) {
            toast.info(`获得 ${duplicateCount * 50} 金币作为重复宠兽补偿！`);
          }
          
          if (newPetsCount === 0 && duplicateCount === 0) {
            toast.info('没有获得新宠兽，再接再厉！');
          }
        }, 1000);
      }
    }, isMulti ? 300 : 1000);
  };
  
  // 获取稀有度对应的颜色类
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'bg-gray-200 text-gray-800';
      case 'uncommon': return 'bg-green-100 text-green-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
   // 获取稀有度中文名称
   const getRarityName = (rarity: string) => {
    switch(rarity) {
      case 'common': return '普通';
      case 'uncommon': return '高级';
      case 'rare': return '稀有';
      case 'epic': return '史诗';
      case 'legendary': return '传说';
      default: return '未知';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            <span>返回</span>
          </button>
          
          <h1 className="text-xl font-bold text-gray-900">宠兽抽卡</h1>
          
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            剩余抽卡次数: {remainingDraws}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* 抽卡区域 */}
        <div className="max-w-4xl mx-auto">
          {/* 概率说明 */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">抽卡概率</h2>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {Object.entries(GACHA_PROBABILITIES).map(([rarity, probability]) => (
                <div key={rarity} className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${getRarityColor(rarity)} mr-2`}></span>
                  <span className="text-sm text-gray-700">{getRarityName(rarity)}: {probability}%</span>
                </div>
              ))}
            </div>
            
            {/* 首次抽卡提示 */}
            {collectedPets.length === 0 && (
              <div className="mt-4 p-3 bg-amber-50 text-amber-700 rounded-lg text-sm flex items-center">
                <i className="fa-solid fa-lightbulb mr-2"></i>
                <span>首次抽卡必定获得传说级宠兽！</span>
              </div>
            )}
          </div>
          
          {/* 抽卡结果展示 */}
          <div className={`
            bg-white rounded-2xl shadow-md overflow-hidden mb-8 transition-all duration-500
            ${isDrawing || results.length > 0 ? 'p-6' : 'p-12 text-center'}
          `}>
            {!isDrawing && results.length === 0 ? (
              <div className="py-12">
                <div className="w-32 h-32 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-gift text-4xl text-purple-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">准备抽卡</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  点击下方按钮开始抽卡，获得全新宠兽！传说级宠兽正在等着你
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  {isDrawing ? '正在抽卡...' : '抽卡结果'}
                </h2>
                
                {/* 抽卡结果网格 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {results.map((result, index) => (
                    <div 
                      key={index}
                      className={`
                        bg-white rounded-xl overflow-hidden border transition-all duration-300 transform
                        ${isDrawing ? 'animate-pulse opacity-70' : 'hover:scale-105'}
                        ${result.isNew ? 'border-blue-500 shadow-lg' : 'border-gray-200'}
                      `}
                    >
                      <div className="aspect-square bg-gray-50 flex items-center justify-center p-2">
                        <img 
                          src={result.pet.imageUrl} 
                          alt={result.pet.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{result.pet.name}</h3>
                        <div className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${getRarityColor(result.pet.rarity)}`}>
                          {getRarityName(result.pet.rarity)}
                        </div>
                        {result.isNew && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            新!
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
            {/* 抽卡按钮 */}
            <div className="flex flex-row gap-4 justify-center w-full max-w-2xl mx-auto my-8">
              <button
                onClick={() => performDraw(false)}
                disabled={isDrawing || remainingDraws < 1}
                className={cn(
                  "flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform min-w-[140px]",
                  (isDrawing || remainingDraws < 1)
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed scale-100"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg"
                )}
              >
                <i className="fa-solid fa-dice mr-2"></i> 单抽一次
              </button>
              
              <button
                onClick={() => performDraw(true)}
                disabled={isDrawing || remainingDraws < 10}
                className={cn(
                  "flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform min-w-[140px]",
                  (isDrawing || remainingDraws < 10)
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed scale-100"
                    : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95 shadow-md hover:shadow-lg"
                )}
              >
                <i className="fa-solid fa-dice-five mr-2"></i> 十连抽
              </button>
            </div>
          
          {/* 提示信息 */}
          {remainingDraws <= 0 && !isDrawing && (
            <div className="mt-8 text-center">
             </div>
           )}
         </div>
       </main>
       
       {/* 底部导航 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-around">
            <button 
              onClick={() => navigate('/')}
              className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <i className="fa-solid fa-home text-xl mb-1"></i>
              <span className="text-xs">首页</span>
            </button>
            
            <button 
              onClick={() => navigate('/encyclopedia')}
              className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <i className="fa-solid fa-book text-xl mb-1"></i>
              <span className="text-xs">图鉴</span>
            </button>
            
            <button 
              className="flex flex-col items-center text-blue-600"
            >
              <i className="fa-solid fa-gift text-xl mb-1"></i>
              <span className="text-xs">抽卡</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}