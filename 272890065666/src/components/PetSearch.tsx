import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PetSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PetSearch({
  value,
  onChange,
  placeholder = "搜索宠兽..."
}: PetSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const [showClearButton, setShowClearButton] = useState(!!value);
  const debounceTimeout = useRef<number | null>(null);
  
  // 处理输入变化，添加防抖
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    setShowClearButton(!!newValue);
    
    // 清除之前的超时
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    // 设置新的超时
    debounceTimeout.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };
  
  // 清除搜索
  const clearSearch = () => {
    setLocalValue('');
    setShowClearButton(false);
    onChange('');
  };
  
  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // ESC键清除搜索
    if (e.key === 'Escape' && localValue) {
      clearSearch();
    }
  };
  
  // 当外部value变化时更新本地状态
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
      setShowClearButton(!!value);
    }
  }, [value]);
  
  // 组件卸载时清除超时
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className="fa-solid fa-search text-gray-400"></i>
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
      
      {showClearButton && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 transition-colors"
        >
          <i className="fa-solid fa-times-circle"></i>
        </button>
      )}
    </div>
  );
}