import { useNavigate } from 'react-router-dom';
import { Pet } from '@/types/pet';
import { cn } from '@/lib/utils';
import { usePetAttributes } from '@/hooks/usePetAttributes';

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  const navigate = useNavigate();
  const { finalAttributes, getAttributeIcon } = usePetAttributes(pet);
  
  // 根据稀有度返回对应的颜色类
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'bg-gray-300';
      case 'uncommon': return 'bg-green-400';
      case 'rare': return 'bg-blue-500';
     case 'epic': return 'bg-purple-600';
     case 'legendary': return 'bg-amber-500';
     case 'special': return 'bg-pink-600';
     default: return 'bg-gray-300';
   }
  };
  
  // 根据稀有度返回对应的文本颜色
  const getRarityTextColor = (rarity: string) => {
    return rarity === 'common' ? 'text-gray-800' : 'text-white';
  };

  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
      onClick={() => navigate(`/encyclopedia/${pet.id}`)}
    >
      {/* 宠兽图片 */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img 
          src={pet.imageUrl} 
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* 收藏标记 */}
      {pet.isCollected && (
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
          <i class="fa-solid fa-star text-yellow-400"></i>
        </div>
      )}
      
      {/* 稀有度标记 */}
      <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${getRarityColor(pet.rarity)} ${getRarityTextColor(pet.rarity)}`}>
        {pet.rarity === 'common' && '普通'}
        {pet.rarity === 'uncommon' && '高级'}
        {pet.rarity === 'rare' && '稀有'}
       {pet.rarity === 'epic' && '史诗'}
       {pet.rarity === 'legendary' && '传说'}
       {pet.rarity === 'special' && '特殊'}
      </div>
      
      {/* 宠兽信息 */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{pet.name}</h3>
        
        {/* 类型标签 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pet.type.map((type, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
        
          {/* 属性简要展示 */}
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="flex items-center gap-1">
            <i className={`fa-solid ${getAttributeIcon('strength')} text-amber-500`}></i>
           <span className="font-medium">
              {finalAttributes.strength}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <i className={`fa-solid ${getAttributeIcon('agility')} text-green-500`}></i>
           <span className="font-medium">
              {finalAttributes.agility}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <i className={`fa-solid ${getAttributeIcon('defense')} text-blue-500`}></i>
           <span className="font-medium">
              {finalAttributes.defense}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}