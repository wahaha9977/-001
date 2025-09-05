import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BattleModeSelection() {
  const navigate = useNavigate();
  
  // 直接导航到练习对战
  const handleModeSelect = () => {
    navigate('/battle/practice');
  };
   const [climbingTowerRecord, setClimbingTowerRecord] = useState<number>(0);
   const [savedClimbingProgress, setSavedClimbingProgress] = useState<number | null>(null);
  
  // 初始化时加载爬塔记录和保存的进度
  useEffect(() => {
    // 加载最高记录
    const savedRecord = localStorage.getItem('climbingTowerRecord');
    if (savedRecord) {
      setClimbingTowerRecord(parseInt(savedRecord, 10));
    }
    
    // 加载保存的临时进度
    const tempProgress = localStorage.getItem('tempClimbingProgress');
    if (tempProgress) {
      setSavedClimbingProgress(parseInt(tempProgress, 10));
    }
  }, []);
  
  // 导航到爬塔对战
  const handleClimbTowerSelect = () => {
    navigate('/battle/tower');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-cover bg-center" style={{ 
      backgroundImage: `url('https://lf-code-agent.coze.cn/obj/x-ai-cn/272890065666/attachment/image_20250904170104.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* 添加半透明遮罩层，确保文字清晰可读 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
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
          
          <h1 className="text-xl font-bold text-gray-900">对战模式</h1>
          
          <div className="w-10"></div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* 练习对战卡片 */}
          <motion.div
            onClick={handleModeSelect}
            className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 shadow-lg hover:shadow-xl mb-6"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* 渐变背景 */}
            <div className="absolute inset-0 from-blue-500 to-indigo-500 opacity-90"></div>
            
            {/* 卡片内容 */}
            <div className="relative p-8 h-full flex flex-col">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                <i className="fa-solid fa-shield text-white text-2xl"></i>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">练习对战</h2>
              <p className="text-white/90 mb-6 flex-grow">与随机敌人进行练习对战，提升您的战斗技巧和宠兽实力</p>
              
              <button
                onClick={handleModeSelect}
                className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors transform group-hover:scale-105 cursor-pointer"
              >
                开始练习对战
              </button>
            </div>
          </motion.div>
          
          {/* 爬塔对战卡片 */}
          <motion.div
            onClick={handleClimbTowerSelect}
            className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 shadow-lg hover:shadow-xl"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* 渐变背景 */}
            <div className="absolute inset-0 from-purple-500 to-pink-500 opacity-90"></div>
            
            {/* 卡片内容 */}
            <div className="relative p-8 h-full flex flex-col">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                <i className="fa-solid fa-tower-broadcast text-white text-2xl"></i>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h2 className="text-2xl font-bold text-white">爬塔对战</h2>
                <div className="flex flex-wrap gap-2">
                  {climbingTowerRecord > 0 && (
                    <div className="bg-amber-400 text-white text-sm px-3 py-1 rounded-full font-medium flex items-center">
                      <i className="fa-solid fa-flag-checkered mr-1"></i>
                      最高记录: {climbingTowerRecord}层
                    </div>
                  )}
                  {savedClimbingProgress && (
                    <div className="bg-blue-400 text-white text-sm px-3 py-1 rounded-full font-medium flex items-center">
                      <i className="fa-solid fa-bookmark mr-1"></i>
                      继续: {savedClimbingProgress}层
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-white/90 mb-6 flex-grow">挑战多层对战，每层随机遇到不同的电脑对手，考验你的持久作战能力！</p>
              
              <button
                onClick={handleClimbTowerSelect}
                className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors transform group-hover:scale-105 cursor-pointer"
              >
                开始爬塔挑战
              </button>
            </div>
          </motion.div>
          
          {/* 模式说明 */}
          <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">对战模式说明</h3>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1">
                  <i className="fa-solid fa-shield text-blue-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">练习对战</h4>
                  <p className="text-sm">与随机选择的电脑对手进行对战，用于测试队伍搭配和提升战斗技巧。</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-purple-100 p-2 rounded-lg mr-4 mt-1">
                  <i className="fa-solid fa-tower-broadcast text-purple-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">爬塔对战</h4>
        <p className="text-sm">挑战多层对战，每层随机遇到不同的电脑对手。胜利后进入下一层，失败则结束挑战。前10层敌方宠兽属性降低20%，之后每层敌方属性增加1%，考验你的持久作战能力！</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}