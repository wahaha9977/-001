import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PetFilterProps {
  types: string[];
  selectedTypes: string[];
  selectedRarities: string[];
  showCollectedOnly: boolean;
  onTypeChange: (type: string) => void;
  onRarityChange: (rarity: string) => void;
  onCollectedChange: (value: boolean) => void;
  onResetFilters: () => void;
}

export default function PetFilter({
  types,
  selectedTypes,
  selectedRarities,
  showCollectedOnly,
  onTypeChange,
  onRarityChange,
  onCollectedChange,
  onResetFilters
}: PetFilterProps) {
  const [expandedSections, setExpandedSections] = useState({
    types: true,
    rarities: true,
    other: true
  });
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
   // 稀有度选项
  const rarityOptions = [
    { value: 'common', label: '普通' },
    { value: 'uncommon', label: '高级' },
    { value: 'rare', label: '稀有' },
    { value: 'epic', label: '史诗' },
    { value: 'legendary', label: '传说' },
    { value: 'special', label: '特殊' }
  ];
  
   // 根据稀有度返回对应的颜色类
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'bg-gray-200 text-gray-800';
      case 'uncommon': return 'bg-green-100 text-green-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-amber-100 text-amber-800';
      case 'special': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 标题栏 */}
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">筛选条件</h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          重置筛选
        </button>
      </div>
      
      {/* 类型筛选 */}
      <div className="border-b border-gray-100">
        <button
          className="w-full px-4 py-3 text-left flex justify-between items-center"
          onClick={() => toggleSection('types')}
        >
          <span className="font-medium text-gray-900">属性类型</span>
          <i className={cn(
            "fa-solid transition-transform duration-300",
            expandedSections.types ? "fa-chevron-up" : "fa-chevron-down"
          )}></i>
        </button>
        
        {expandedSections.types && (
          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    selectedTypes.includes(type)
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 稀有度筛选 */}
      <div className="border-b border-gray-100">
        <button
          className="w-full px-4 py-3 text-left flex justify-between items-center"
          onClick={() => toggleSection('rarities')}
        >
          <span className="font-medium text-gray-900">稀有度</span>
          <i className={cn(
            "fa-solid transition-transform duration-300",
            expandedSections.rarities ? "fa-chevron-up" : "fa-chevron-down"
          )}></i>
        </button>
        
        {expandedSections.rarities && (
          <div className="px-4 pb-3">
            <div className="space-y-2">
              {rarityOptions.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRarities.includes(option.value)}
                    onChange={() => onRarityChange(option.value)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`ml-2 text-sm ${getRarityColor(option.value)} px-2 py-0.5 rounded`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 其他筛选选项 */}
      <div>
        <button
          className="w-full px-4 py-3 text-left flex justify-between items-center"
          onClick={() => toggleSection('other')}
        >
          <span className="font-medium text-gray-900">其他选项</span>
          <i className={cn(
           "fa-solid transition-transform duration-300",
           expandedSections.other ? "fa-chevron-up" : "fa-chevron-down"
         )}></i>
       </button>
       
        {expandedSections.other && (
         <div className="px-4 pb-3">
           <label className="flex items-center">
             <input
               type="checkbox"
               checked={showCollectedOnly}
               onChange={(e) => onCollectedChange(e.target.checked)}
               className="rounded text-blue-600 focus:ring-blue-500"
             />
             <span className="ml-2 text-sm text-gray-700">只显示已收集</span>
           </label>
         </div>
       )}
      </div>
      
      {/* 应用筛选按钮 - 在移动视图中显示 */}
      <div className="md:hidden px-4 py-3 border-t border-gray-100">
        <button
          onClick={onResetFilters}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          重置筛选条件
        </button>
      </div>
    </div>
  );
}