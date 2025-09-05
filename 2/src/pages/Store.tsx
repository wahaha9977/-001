import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeItems } from '@/mocks/storeData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { petData } from '@/mocks/petData';
import { addToInventory } from '@/mocks/storeData';

export default function Store() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(0); // 默认初始金币
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  // 从本地存储加载金币数量
  useEffect(() => {
    const savedCoins = localStorage.getItem('storeCoins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
  }, []);
  
  // 保存金币数量到本地存储
  useEffect(() => {
    localStorage.setItem('storeCoins', coins.toString());
  }, [coins]);
  
    // 处理兑换
  const handleRedeem = (itemId: string) => {
    const item = storeItems.find(item => item.id === itemId);
    if (!item) return;
    
    // 检查是否是进化石或属性强化剂，如果是则禁止兑换
    if (itemId === 'evolution_stone') {
      toast.error('进化石暂时无法兑换，请等待后续开放');
      return;
    }
    
    // 检查是否是属性强化剂，如果是则禁止兑换
    if (itemId === 'attribute_boost') {
      toast.error('属性强化剂暂时无法兑换，请等待后续开放');
      return;
    }
    
    if (coins >= item.price) {
      setCoins(prevCoins => prevCoins - item.price);
      toast.success(`成功兑换: ${item.name}`);
      
     // 如果是抽卡券，增加抽卡次数
     if (item.type === 'gacha_ticket') {
       const currentDraws = localStorage.getItem('remainingDraws');
       const newDraws = currentDraws ? parseInt(currentDraws, 10) + item.quantity : 3 + item.quantity;
       localStorage.setItem('remainingDraws', newDraws.toString());
     }
      // 如果是宠兽粮，添加到库存
      else if (item.id === 'pet_food') {
        // 添加到库存
        addToInventory(item.id, item.quantity);
        toast.success(`成功购买: ${item.name} x${item.quantity}，已添加到您的库存`);
      }
      // 如果是特殊宠兽Saber
      else if (item.id === 'special_pet_saber') {
        // 获取已收集的宠兽
        const savedCollected = localStorage.getItem('collectedPets');
        const collectedIds = savedCollected ? JSON.parse(savedCollected) : [];
        
        // 检查是否已拥有Saber
        if (!collectedIds.includes('122')) {
          collectedIds.push('122');
          localStorage.setItem('collectedPets', JSON.stringify(collectedIds));
          toast.success(`成功购买: ${item.name}，已添加到您的收藏！`);
        } else {
          toast.info(`您已经拥有了${item.name}`);
        }
      }
    } else {
      toast.error('金币不足，无法兑换');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            <span>返回</span>
          </button>
          
          <h1 className="text-xl font-bold text-gray-900">宠兽商店</h1>
          
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <i className="fa-solid fa-coins mr-1"></i>
            <span>{coins}</span>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {/* 商店分类 */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {['全部商品', '抽卡券', '稀有宠兽', '进化道具', '特殊物品'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: category === '全部商品' ? '#3b82f6' : '#f3f4f6',
                  color: category === '全部商品' ? 'white' : '#4b5563'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* 商品列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {storeItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                  
                  <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-sm font-medium flex items-center">
                    <i className="fa-solid fa-coins mr-1"></i>
                    <span>{item.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center text-sm text-gray-500">
                    <i className={cn("fa-solid mr-1", 
                      item.type === "gacha_ticket" ? "fa-ticket" : 
                      item.type === "pet" ? "fa-paw" : "fa-box")}></i>
                    <span>
                      {item.type === "gacha_ticket" ? "抽卡券" : 
                       item.type === "pet" ? "稀有宠兽" : "道具"}
                    </span>
                    {item.quantity > 1 && (
                      <span className="ml-2 bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full text-xs">
                        x{item.quantity}
                      </span>
                    )}
                  </div>
                  
                    <button
                    onClick={() => handleRedeem(item.id)}
                    disabled={coins < item.price || item.id === 'evolution_stone' || item.id === 'attribute_boost'}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      coins >= item.price && item.id !== 'evolution_stone' && item.id !== 'attribute_boost'
                        ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.id === 'evolution_stone' || item.id === 'attribute_boost' ? '暂不可用' : '兑换'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>宠兽商店 &copy; {new Date().getFullYear()} - 所有商品每日刷新</p>
        </div>
      </footer>
    </div>
  );
}