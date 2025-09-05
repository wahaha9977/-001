import { useNavigate } from 'react-router-dom';
import { petData } from '@/mocks/petData';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
   const [collectedPets, setCollectedPets] = useState(0);
  const [totalPets, setTotalPets] = useState(0);
  const [coins, setCoins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [highestTowerFloor, setHighestTowerFloor] = useState(0);
  
   // 清空游戏数据
  const handleClearData = () => {
    if (window.confirm('确定要清空所有游戏数据吗？此操作将重置收集进度、抽卡次数、宠兽好感度和爬塔记录，不可恢复。')) {
      // 清除所有游戏数据
      localStorage.removeItem('collectedPets');
      localStorage.removeItem('remainingDraws');
      localStorage.removeItem('petFavorability');
      localStorage.removeItem('inventory');
      localStorage.removeItem('storeCoins');
      
      // 清空爬塔记录
      localStorage.removeItem('climbingTowerRecord');
      localStorage.removeItem('tempClimbingProgress');
      localStorage.removeItem('savedTowerPets');
      
      // 刷新页面以反映更改
      window.location.reload();
    }
  };
  
   // 获取游戏统计数据
  useEffect(() => {
    // 收集的宠兽数量
    const savedCollected = localStorage.getItem('collectedPets');
    const collectedIds = savedCollected ? JSON.parse(savedCollected) : [];
    setCollectedPets(collectedIds.length);
    
    // 总宠兽数量
    setTotalPets(petData.length);
    
  // 金币数量
    const savedCoins = localStorage.getItem('storeCoins');
    setCoins(savedCoins ? parseInt(savedCoins, 10) : 0);
    
    // 剩余抽卡次数 - 与抽卡页面保持一致的默认值
    const savedDraws = localStorage.getItem('remainingDraws');
     setDraws(savedDraws ? parseInt(savedDraws, 10) : 5);
    
    // 获取爬塔最高纪录
    const savedTowerRecord = localStorage.getItem('climbingTowerRecord');
    setHighestTowerFloor(savedTowerRecord ? parseInt(savedTowerRecord, 10) : 0);
    
    // 延迟显示动画，创造更自然的入场效果
    setTimeout(() => setShowAnimation(true), 100);
  }, []);
  
  // 动画变体
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 overflow-x-hidden">
      {/* 背景装饰元素 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      {/* 顶部英雄区域 */}
      <header className="relative z-10 pt-16 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 opacity-90"></div>
        
        {/* 装饰图形 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/15 rounded-full blur-lg"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="text-white mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">宠兽收集</h1>
              <p className="text-xl text-white/90 max-w-md">探索奇妙的宠兽世界，收集、培养和战斗，成为最强训兽师！</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white font-medium flex items-center">
                <i className="fa-solid fa-coins mr-2 text-yellow-300"></i>
                <span>{coins}</span>
              </div>
              
              <button 
                onClick={() => navigate('/gacha')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-5 py-2 rounded-full shadow-lg hover:shadow-xl transform transition hover:scale-105 active:scale-95 flex items-center"
              >
                <i className="fa-solid fa-gift mr-2"></i>
                <span>开始抽卡</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 -mt-16 relative z-10 pb-16">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={showAnimation ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">已收集宠兽</h3>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <i className="fa-solid fa-paw"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{collectedPets}/{totalPets}</p>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1500 ease-out"
                style={{width: `${(collectedPets/totalPets)*100}%`}}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              完成度: {Math.round((collectedPets/totalPets)*100)}%
            </p>
          </motion.div>
          
           <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={showAnimation ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">剩余抽卡次数</h3>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center text-purple-600">
                <i className="fa-solid fa-gift"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              {draws}
              <span className="ml-2 text-sm font-normal text-gray-500">次</span>
            </p>
            <button 
              onClick={() => navigate('/gacha')}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              <i className="fa-solid fa-dice mr-2"></i>
              <span>去抽卡</span>
            </button>
           </motion.div>
          
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={showAnimation ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">爬塔记录</h3>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <i className="fa-solid fa-tower-broadcast"></i>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{highestTowerFloor}</div>
            <div className="text-sm text-gray-500 mb-4">最高爬塔层数</div>
            <button 
              onClick={() => navigate('/battle/tower')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              <i className="fa-solid fa-trophy mr-2"></i>
              <span>去爬塔</span>
            </button>
          </motion.div>
        </div>
        
        {/* 功能导航 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { name: "战斗", icon: "fa-shield", path: "/battle", color: "from-blue-500 to-indigo-500" },
            { name: "图鉴", icon: "fa-book-open", path: "/encyclopedia", color: "from-green-500 to-teal-500" },
            { name: "商店", icon: "fa-store", path: "/store", color: "from-purple-500 to-pink-500" },
            { name: "好感度", icon: "fa-heart", path: "/favorability", color: "from-red-500 to-orange-500" }
          ].map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => navigate(item.path)}
              variants={cardVariants}
              initial="hidden"
              animate={showAnimation ? "visible" : "hidden"}
              transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative z-10 p-6 flex flex-col items-center justify-center text-white h-full">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <i className={`fa-solid ${item.icon} text-2xl`}></i>
                </div>
                <span className="font-medium text-lg">{item.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
        
        {/* 最近收集的宠兽 */}
        <motion.div 
          variants={fadeInVariants}
          initial="hidden"
          animate={showAnimation ? "visible" : "hidden"}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">最近收集</h2>
            <button 
              onClick={() => navigate('/encyclopedia')}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              <span>查看全部</span>
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </div>
          
          {(() => {
            const savedCollected = localStorage.getItem('collectedPets');
            const collectedIds = savedCollected ? JSON.parse(savedCollected) : [];
             const recentPets = collectedIds.slice(-2).map(id => 
              petData.find(pet => pet.id === id)
            ).filter(Boolean).reverse();
            
            if (recentPets.length === 0) {
              return (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-paw text-purple-500 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">开始你的收集之旅</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    还没有收集任何宠兽，快去抽卡获取你的第一只伙伴吧！
                  </p>
                  <button 
                    onClick={() => navigate('/gacha')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform transition hover:scale-105"
                  >
                    <i className="fa-solid fa-gift mr-2"></i> 去抽卡
                  </button>
                </div>
              );
            }
            
            return (
         <div className="grid grid-cols-2 gap-4">
                {recentPets.map((pet: any) => (
                  <div 
                    key={pet.id}
                    onClick={() => navigate(`/encyclopedia/${pet.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden mb-3 flex items-center justify-center border border-gray-100 group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300">
                      <img 
                        src={pet.imageUrl} 
                        alt={pet.name}
                        className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {pet.name}
                    </h3>
                    <div className="flex justify-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        pet.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                        pet.rarity === 'uncommon' ? 'bg-green-100 text-green-800' :
                        pet.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                        pet.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {pet.rarity === 'common' ? '普通' :
                         pet.rarity === 'uncommon' ? '高级' :
                         pet.rarity === 'rare' ? '稀有' :
                         pet.rarity === 'epic' ? '史诗' : '传说'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </motion.div>
        
         {/* 驯兽师指南 */}
        <motion.div 
          variants={fadeInVariants}
          initial="hidden"
          animate={showAnimation ? "visible" : "hidden"}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>
            驯兽师指南
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex group">
              <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1 group-hover:bg-blue-200 transition-colors">
                <i className="fa-solid fa-magic text-blue-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">收集与进化</h3>
                <p className="text-gray-600 text-sm">探索广阔的宠兽世界，收集不同稀有度的伙伴。通过精心培养和战斗历练，提升它们的能力，解锁强大的进化形态，发现隐藏的潜能！</p>
              </div>
            </div>
            
            <div className="flex group">
              <div className="bg-green-100 p-2 rounded-lg mr-4 mt-1 group-hover:bg-green-200 transition-colors">
                <i className="fa-solid fa-shield-alt text-green-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">战略对战</h3>
                <p className="text-gray-600 text-sm">组建专属于你的宠兽战队，巧妙运用属性相克原理和多样化技能组合。在紧张刺激的对战中，运用智慧和策略击败对手，证明你的驯兽师实力！</p>
              </div>
            </div>
            
            <div className="flex group">
              <div className="bg-purple-100 p-2 rounded-lg mr-4 mt-1 group-hover:bg-purple-200 transition-colors">
                <i className="fa-solid fa-heart text-purple-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">羁绊培养</h3>
                <p className="text-gray-600 text-sm">通过喂食高级宠兽粮提升好感度，当好感度达到100时，宠兽的所有属性将提升10%！建立深厚的羁绊，解锁专属互动和隐藏技能，成为彼此最信赖的伙伴。</p>
              </div>
            </div>
            
            <div className="flex group">
              <div className="bg-amber-100 p-2 rounded-lg mr-4 mt-1 group-hover:bg-amber-200 transition-colors">
                <i className="fa-solid fa-trophy text-amber-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">成就挑战</h3>
                <p className="text-gray-600 text-sm">完成各种富有挑战性的任务和收集目标，不断突破自我。收集传说级宠兽，征服强大对手，赢取丰厚奖励，一步步成长为受人敬仰的传奇驯兽师！</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
       {/* 清空数据按钮 */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={handleClearData}
          className="w-full bg-red-50 text-red-700 hover:bg-red-100 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <i className="fa-solid fa-trash-can mr-2"></i>
          <span>清空所有游戏数据</span>
        </button>
      </div>
      
      {/* 页脚 */}
      <footer className="bg-white/80 backdrop-blur-md py-6 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>宠兽收集 &copy; {new Date().getFullYear()} - 所有权利保留</p>
        </div>
      </footer>
    </div>
  );
}