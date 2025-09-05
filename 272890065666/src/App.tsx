import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";
import Home from "@/pages/Home";
import Encyclopedia from "@/pages/Encyclopedia";
import Gacha from "@/pages/Gacha";
import PetDetail from "@/pages/PetDetail";
import Store from "@/pages/Store";
import Favorability from "@/pages/Favorability";
import Battle from "@/pages/Battle";
import BattleModeSelection from "@/pages/BattleModeSelection";
import { useState, useEffect } from "react";
import NotFound from "@/pages/NotFound";
import { AuthContext } from '@/contexts/authContext';
import { cn } from '@/lib/utils';

// 网站导航布局组件
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 导航项
  const navItems = [
    { path: '/', icon: 'fa-home', label: '首页' },
    { path: '/battle', icon: 'fa-shield', label: '战斗' },
    { path: '/gacha', icon: 'fa-gift', label: '抽卡' },
    { path: '/encyclopedia', icon: 'fa-book-open', label: '图鉴' },
    { path: '/store', icon: 'fa-store', label: '商店' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">宠兽收集</span>
            </div>
            
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                    location.pathname === item.path 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <i className={`fa-solid ${item.icon} mr-2`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>宠兽收集网站 &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [coins, setCoins] = useState(100);
  
  // 从本地存储加载金币数量
  useEffect(() => {
    const savedCoins = localStorage.getItem('storeCoins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, coins, setCoins }}
    >
       <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/encyclopedia/:id" element={<PetDetail />} />
          <Route path="/gacha" element={<Gacha />} />
          <Route path="/store" element={<Store />} />
           <Route path="/favorability" element={<Favorability />} />
            <Route path="/battle" element={<BattleModeSelection />} />
           <Route path="/battle/practice" element={<Battle />} />
           <Route path="/battle/tower" element={<Battle towerMode={true} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
}
