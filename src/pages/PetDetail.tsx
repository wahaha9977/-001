import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { petData } from '@/mocks/petData';
import { Pet } from '@/types/pet';
import { cn } from '@/lib/utils';
import { usePetAttributes } from '@/hooks/usePetAttributes';

export default function PetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // 找到选中的宠兽
  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    // 模拟API请求延迟
    setTimeout(() => {
      const foundPet = petData.find(p => p.id === id);
      setPet(foundPet || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  // 使用宠兽属性钩子，现在可以处理null值
  const { finalAttributes, getAttributeColor, getAttributeIcon } = usePetAttributes(pet);
  
  // 如果宠兽不存在，显示错误信息
  if (!isLoading && !pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <button 
              onClick={() => navigate('/encyclopedia')}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              <span>返回图鉴</span>
            </button>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <i className="fa-solid fa-exclamation-triangle text-red-500 text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">宠兽不存在</h1>
          <p className="text-gray-500 mb-6 max-w-md">
            找不到ID为 {id} 的宠兽。可能它还未被发现，或者已经从图鉴中移除。
          </p>
          <button
            onClick={() => navigate('/encyclopedia')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            返回图鉴列表
          </button>
        </main>
      </div>
    );
  }
  
  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <button 
              onClick={() => navigate('/encyclopedia')}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              <span>返回图鉴</span>
            </button>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* 左侧图片区域 */}
              <div className="md:w-2/5 bg-gray-100 animate-pulse">
                <div className="aspect-square w-full bg-gray-200"></div>
              </div>
              
              {/* 右侧信息区域 */}
              <div className="md:w-3/5 p-6 space-y-6">
                <div className="space-y-3">
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded-full w-20"></div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 属性和能力区域 */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex border-b border-gray-200">
                {['overview', 'abilities', 'evolution'].map(tab => (
                  <div key={tab} className="h-12 w-1/3 bg-gray-200 rounded-t"></div>
                ))}
              </div>
              
              <div className="mt-6 space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // 根据稀有度返回对应的颜色类
  const getRarityColor = () => {
    switch(pet.rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'uncommon': return 'bg-green-100 text-green-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
     case 'epic': return 'bg-purple-100 text-purple-800';
     case 'legendary': return 'bg-amber-100 text-amber-800';
     case 'special': return 'bg-pink-100 text-pink-800';
     default: return 'bg-gray-100 text-gray-800';
   }
  };
  
  // 属性数据用于图表
  const attributeData = pet ? [
    { name: '力量', value: pet.attributes.strength, color: '#ef4444' },
    { name: '敏捷', value: pet.attributes.agility, color: '#3b82f6' },
    { name: '智力', value: pet.attributes.intelligence, color: '#8b5cf6' },
    { name: '活力', value: pet.attributes.vitality, color: '#10b981' },
    { name: '防御', value: pet.attributes.defense, color: '#f59e0b' },
  ] : [];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/encyclopedia')}
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            <span>返回图鉴</span>
          </button>
          
          <div className="flex items-center">
            <button 
              className={`p-2 rounded-full ${pet.isCollected ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'}`}
              title={pet.isCollected ? "取消收藏" : "收藏"}
            >
              <i className="fa-solid fa-star"></i>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {/* 宠兽基本信息卡片 */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* 宠兽图片 */}
            <div className="md:w-2/5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
              <div className="relative w-full max-w-md aspect-square">
                <img 
                  src={pet.imageUrl} 
                  alt={pet.name}
                  className="w-full h-full object-contain drop-shadow-xl transition-transform duration-700 hover:scale-105"
                />
                
                {/* 悬浮效果 */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
            </div>
            
            {/* 宠兽基本信息 */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{pet.name}</h1>
                  <p className="text-gray-600 mt-1">{pet.description}</p>
                </div>
                
                <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRarityColor()}`}>
                   {pet.rarity === 'common' && '普通'}
                   {pet.rarity === 'uncommon' && '高级'}
                   {pet.rarity === 'rare' && '稀有'}
                   {pet.rarity === 'epic' && '史诗'}
                   {pet.rarity === 'legendary' && '传说'}
                   {pet.rarity === 'special' && '特殊'}
                 </span>
                </div>
              </div>
              
              {/* 类型标签 */}
              <div className="flex flex-wrap gap-2 mb-8">
                {pet.type.map(type => (
                  <span 
                    key={type} 
                    className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {type}
                  </span>
                ))}
              </div>
              
              {/* 基本信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-lg mr-4">
                    <i className="fa-solid fa-map-marker-alt text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">栖息地</h3>
                    <p className="text-gray-900">{pet.habitat}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-50 p-2 rounded-lg mr-4">
                    <i className="fa-solid fa-ruler text-green-600"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">高度</h3>
                    <p className="text-gray-900">{pet.height}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-50 p-2 rounded-lg mr-4">
                    <i className="fa-solid fa-balance-scale text-purple-600"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">重量</h3>
                    <p className="text-gray-900">{pet.weight}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-50 p-2 rounded-lg mr-4">
                    <i className="fa-solid fa-sitemap text-amber-600"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">进化阶段</h3>
                    <p className="text-gray-900">第 {pet.evolutionStage} 阶段</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 属性、能力和进化信息 */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* 选项卡导航 */}
          <div className="flex border-b border-gray-100">
            {[
              { id: 'overview', label: '属性总览' },
              { id: 'abilities', label: '能力技能' },
              { id: 'evolution', label: '进化路线' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 py-4 px-6 text-center font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* 选项卡内容 */}
          <div className="p-6 md:p-8">
             {/* 属性总览 */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 属性值列表 */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">属性值</h3>
                  
                   <div className="space-y-5">
                    {pet && finalAttributes && (
                      Object.entries(finalAttributes).map(([key, value]) => {
                        // 属性名称映射
                        const attributeNames: Record<string, string> = {
                          strength: '力量',
                          agility: '敏捷',
                          intelligence: '智力',
                          vitality: '活力',
                          defense: '防御'
                        };
                        
                        const attrKey = key as keyof typeof finalAttributes;
                        return (
                          <div key={key} className="group">
                            <div className="flex justify-between mb-1.5 items-center">
                              <div className="flex items-center gap-2">
                                <i className={`fa-solid ${getAttributeIcon(attrKey)} text-gray-400 group-hover:text-gray-600 transition-colors`}></i>
                                <span className="text-sm font-medium text-gray-700">{attributeNames[key]}</span>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 bg-white px-2 py-1 rounded-lg shadow-sm transform transition-all duration-300 group-hover:scale-105">
                                {value}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
                              <div 
                                className={`h-full rounded-full bg-gradient-to-r ${getAttributeColor(attrKey)} transition-all duration-1000 ease-out`}
                                style={{ width: `${pet.attributes[attrKey]}%` }}
                              ></div>
                              {/* 进度指示器 */}
                              <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:scale-110">
                                <i className="fa-solid fa-circle text-xs" style={{ color: getAttributeColor(attrKey).split(' ')[1] }}></i>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                
                {/* 属性分布图表 */}
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">属性分布</h3>
                   <div className="w-full max-w-xs aspect-square relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attributeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {attributeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
            
            {/* 能力技能 */}
            {activeTab === 'abilities' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">特殊能力</h3>
                
                {pet.abilities.length > 0 ? (
                  <div className="space-y-4">
                    {pet.abilities.map((ability, index) => (
                      <div 
                        key={index}
                        className="bg-gray-50 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:bg-gray-100"
                      >
                        <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-sm">
                            {index + 1}
                          </span>
                          {ability.name}
                        </h4>
                        <p className="text-gray-600">{ability.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <i className="fa-solid fa-info-circle text-2xl mb-2"></i>
                    <p>该宠兽暂无特殊能力记录</p>
                  </div>
                )}
              </div>
            )}
            
            {/* 进化路线 */}
            {activeTab === 'evolution' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">进化路线</h3>
                
                <div className="flex flex-col items-center">
                  {/* 进化链图示 */}
                  <div className="w-full max-w-2xl">
                    <div className="flex items-center justify-between">
                      {/* 前序进化 */}
                      <div className={`flex-1 flex flex-col items-center ${!pet.evolutionFrom ? 'opacity-50' : ''}`}>
                        {pet.evolutionFrom ? (
                          <button 
                            onClick={() => navigate(`/encyclopedia/${pet.evolutionFrom}`)}
                            className="w-full max-w-[120px] cursor-pointer group"
                          >
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                              <img 
                                src={petData.find(p => p.id === pet.evolutionFrom)?.imageUrl || ''} 
                                alt={petData.find(p => p.id === pet.evolutionFrom)?.name || '未知'}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                            <p className="text-sm font-medium text-center text-gray-900 group-hover:text-blue-600 transition-colors">
                              {petData.find(p => p.id === pet.evolutionFrom)?.name || '未知'}
                            </p>
                          </button>
                        ) : (
                          <div className="w-full max-w-[120px]">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                              <i className="fa-solid fa-question text-gray-400 text-xl"></i>
                            </div>
                            <p className="text-sm font-medium text-center text-gray-500">初始形态</p>
                          </div>
                        )}
                      </div>
                      
                      {/* 进化箭头 */}
                      <div className="hidden md:flex items-center">
                        <div className="w-16 h-0.5 bg-gray-200 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-blue-500 animate-pulse"></div>
                        </div>
                        <i className="fa-solid fa-arrow-right text-blue-500 mx-2"></i>
                        <div className="w-16 h-0.5 bg-gray-200 relative">
                          <div className="absolute inset-0 bg-gradient-to-l from-gray-300 to-blue-500 animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* 当前形态 */}
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-full max-w-[150px]">
                          <div className="aspect-square bg-blue-50 rounded-lg overflow-hidden mb-2 ring-2 ring-blue-200">
                            <img 
                              src={pet.imageUrl} 
                              alt={pet.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <p className="text-sm font-medium text-center text-gray-900 font-bold">
                            {pet.name} <span className="text-xs font-normal text-blue-600">(当前)</span>
                          </p>
                        </div>
                      </div>
                      
                      {/* 进化箭头 */}
                      <div className="hidden md:flex items-center">
                        <div className="w-16 h-0.5 bg-gray-200 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-blue-500 animate-pulse"></div>
                        </div>
                        <i className="fa-solid fa-arrow-right text-blue-500 mx-2"></i>
                        <div className="w-16 h-0.5 bg-gray-200 relative">
                          <div className="absolute inset-0 bg-gradient-to-l from-gray-300 to-blue-500 animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* 后续进化 */}
                      <div className={`flex-1 flex flex-col items-center ${!pet.evolutionTo ? 'opacity-50' : ''}`}>
                        {pet.evolutionTo ? (
                          <button 
                            onClick={() => navigate(`/encyclopedia/${pet.evolutionTo}`)}
                            className="w-full max-w-[120px] cursor-pointer group"
                          >
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                              <img 
                                src={petData.find(p => p.id === pet.evolutionTo)?.imageUrl || ''} 
                                alt={petData.find(p => p.id === pet.evolutionTo)?.name || '未知'}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                            <p className="text-sm font-medium text-center text-gray-900 group-hover:text-blue-600 transition-colors">
                              {petData.find(p => p.id === pet.evolutionTo)?.name || '未知'}
                            </p>
                          </button>
                        ) : (
                          <div className="w-full max-w-[120px]">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                              <i className="fa-solid fa-question text-gray-400 text-xl"></i>
                            </div>
                            <p className="text-sm font-medium text-center text-gray-500">最终形态</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 移动端进化箭头 */}
                    <div className="md:hidden flex justify-center my-4">
                      {pet.evolutionFrom && (
                        <div className="flex items-center"><i className="fa-solid fa-arrow-left text-blue-500 mr-2"></i>
                          <span className="text-sm text-gray-500">可进化自</span>
                        </div>
                      )}
                      
                      {pet.evolutionFrom && pet.evolutionTo && (
                        <span className="mx-4 text-gray-300">|</span>
                      )}
                      
                      {pet.evolutionTo && (
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500">可进化为</span>
                          <i className="fa-solid fa-arrow-right text-blue-500 ml-2"></i>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* 进化信息 */}
                  <div className="mt-8 w-full max-w-2xl bg-gray-50 rounded-xl p-5">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">进化信息</h4>
                    
                    {pet.evolutionFrom ? (
                      <div className="mb-4">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">进化前:</span> {petData.find(p => p.id === pet.evolutionFrom)?.name}
                        </p>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">进化前:</span> 该宠兽为初始形态，没有前序进化
                        </p>
                      </div>
                    )}
                    
                    {pet.evolutionTo ? (
                      <div>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">进化后:</span> {petData.find(p => p.id === pet.evolutionTo)?.name}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">进化后:</span> 该宠兽为最终形态，无法进一步进化
                        </p>
                      </div>
                    )}
                  </div>
                </div>
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