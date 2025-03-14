
import React from 'react';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const getTitle = () => {
    const path = location.pathname;
    
    if (path === "/") return "Панель управления";
    if (path === "/orders") return "Заказы";
    if (path.startsWith("/orders/")) return "Детали заказа";
    
    return "CRM система";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="border-b bg-card shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
