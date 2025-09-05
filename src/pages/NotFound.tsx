import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-exclamation-triangle text-red-500 text-4xl"></i>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">页面未找到</h1>
        <p className="text-gray-600 mb-8">
          抱歉，您访问的页面不存在或已被移动。请检查URL或返回首页。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform",
              "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
            )}
          >
            <i className="fa-solid fa-home mr-2"></i> 返回首页
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform",
              "bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-95"
            )}
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> 返回上一页
          </button>
        </div>
      </div>
    </div>
  );
}