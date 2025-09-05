import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { petData } from '@/mocks/petData';
import { Pet } from '@/types/pet';
import PetCard from '@/components/PetCard';
import PetFilter from '@/components/PetFilter';
import PetSearch from '@/components/PetSearch';
import { Empty } from '@/components/Empty';

export default function Encyclopedia() {
  const navigate = useNavigate();
  
  // 状态管理
  const [allPets, setAllPets] = useState<Pet[]>([]);
  
  // 初始化宠兽数据
  useEffect(() => {
    // 从本地存储加载已收集状态
    const savedCollected = localStorage.getItem('collectedPets');
    const collectedIds = savedCollected ? JSON.parse(savedCollected) : [];
    
    // 更新宠兽数据的收集状态
    const petsWithCollectionStatus = petData.map(pet => ({
      ...pet,
      isCollected: collectedIds.includes(pet.id)
    }));
    
    setAllPets(petsWithCollectionStatus);
  }, []);
  const [filteredPets, setFilteredPets] = useState<Pet[]>(petData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [showCollectedOnly, setShowCollectedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // 获取所有可用类型
  const allTypes = Array.from(
    new Set(allPets.flatMap(pet => pet.type))
  ).sort();
  
  // 处理类型筛选
  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  // 处理稀有度筛选
  const handleRarityChange = (rarity: string) => {
    setSelectedRarities(prev => 
      prev.includes(rarity)
        ? prev.filter(r => r !== rarity)
        : [...prev, rarity]
    );
  };
  
  // 处理已收集筛选
  const handleCollectedChange = (value: boolean) => {
    setShowCollectedOnly(value);
  };
  
   // 重置所有筛选条件
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedRarities([]);
    setShowCollectedOnly(false);
  };
  
   // 应用筛选条件
  useEffect(() => {
    // 模拟加载状态
    setIsLoading(true);
    
    setTimeout(() => {
      let result = [...allPets];
      
      // 应用搜索筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(pet => 
          pet.name.toLowerCase().includes(query) || 
          pet.description.toLowerCase().includes(query)
        );
      }
      
      // 应用类型筛选
      if (selectedTypes.length > 0) {
        result = result.filter(pet => 
          pet.type.some(type => selectedTypes.includes(type))
        );
      }
      
      // 应用稀有度筛选
      if (selectedRarities.length > 0) {
        result = result.filter(pet => 
          selectedRarities.includes(pet.rarity)
        );
      }
      
       // 应用已收集筛选
      if (showCollectedOnly) {
        result = result.filter(pet => pet.isCollected);
      }
      
      setFilteredPets(result);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, selectedTypes, selectedRarities, showCollectedOnly, allPets]);
  
  // 计算统计信息
  const totalPets = allPets.length;
  const collectedPets = allPets.filter(pet => pet.isCollected).length;
  const filteredCount = filteredPets.length;
  
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
          
          <h1 className="text-xl font-bold text-gray-900">宠兽图鉴</h1>
          
          <div className="text-sm text-gray-500">
            已收集: {collectedPets}/{totalPets}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {/* 搜索栏 */}
        <div className="mb-6 max-w-2xl mx-auto">
          <PetSearch 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="搜索宠兽名称或描述..." 
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* 筛选侧边栏 - 桌面视图 */}
          <div className="hidden md:block w-64 flex-shrink-0">
               <PetFilter
                types={allTypes}
                selectedTypes={selectedTypes}
                selectedRarities={selectedRarities}
                showCollectedOnly={showCollectedOnly}
                 onTypeChange={handleTypeChange}
                onRarityChange={handleRarityChange}
                onCollectedChange={handleCollectedChange}
                onResetFilters={resetFilters}
              />
          </div>
          
          {/* 筛选栏 - 移动视图 */}
               <div className="md:hidden mb-4">
                <PetFilter
                  types={allTypes}
                  selectedTypes={selectedTypes}
                  selectedRarities={selectedRarities}
                  showCollectedOnly={showCollectedOnly}
                 onTypeChange={handleTypeChange}
                onRarityChange={handleRarityChange}
                onCollectedChange={handleCollectedChange}
                onResetFilters={resetFilters}
                />
          </div>
          
          {/* 宠兽列表 */}
          <div className="flex-1">
            {/* 结果统计和筛选标签 */}
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="text-sm text-gray-600">
                找到 <span className="font-semibold text-blue-600">{filteredCount}</span> 个结果
              </div>
              
               {/* 活跃筛选标签 - 桌面视图 */}
              <div className="hidden md:flex flex-wrap gap-2">
                {selectedTypes.map(type => (
                  <span 
                    key={`tag-type-${type}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {type}
                    <button 
                      onClick={() => handleTypeChange(type)}
                      className="ml-1 inline-flex items-center text-blue-600 hover:text-blue-900"
                    >
                      <i className="fa-solid fa-times-circle text-xs"></i>
                    </button>
                  </span>
                ))}
                
                {selectedRarities.map(rarity => (
                  <span 
                    key={`tag-rarity-${rarity}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                 {rarity === 'common' && '普通'}
                 {rarity === 'uncommon' && '高级'}
                   {rarity === 'rare' && '稀有'}
                   {rarity === 'epic' && '史诗'}
                   {rarity === 'legendary' && '传说'}
                   {rarity === 'special' && '特殊'}
                 <button 
                      onClick={() => handleRarityChange(rarity)}
                      className="ml-1 inline-flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <i className="fa-solid fa-times-circle text-xs"></i>
                    </button>
                  </span>
                ))}
                
                {showCollectedOnly && (
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    已收集
                    <button 
                      onClick={() => handleCollectedChange(false)}
                      className="ml-1 inline-flex items-center text-green-600 hover:text-green-900"
                    >
                      <i className="fa-solid fa-times-circle text-xs"></i>
                    </button>
                  </span>
                )}
                
                </div>
             </div>
                
                {(selectedTypes.length > 0 || selectedRarities.length > 0 || showCollectedOnly) && (
                  <button 
                    onClick={resetFilters}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    清除全部
                  </button>
                )}
            
            {/* 宠兽网格 */}
            {isLoading ? (
              // 加载状态
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="flex space-x-2">
                        <div className="h-3 bg-gray-200 rounded flex-1"></div>
                        <div className="h-3 bg-gray-200 rounded flex-1"></div>
                        <div className="h-3 bg-gray-200 rounded flex-1"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPets.length > 0 ? (
              // 宠兽卡片网格
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPets.map(pet => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              // 空状态
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Empty />
                <h3 className="mt-4 text-lg font-medium text-gray-900">未找到匹配的宠兽</h3>
                <p className="mt-2 text-gray-500 max-w-md">
                  尝试调整筛选条件或搜索其他关键词
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  重置所有筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>宠兽图鉴 &copy; {new Date().getFullYear()} - 所有数据仅供参考</p>
        </div>
      </footer>
    </div>
  );
}