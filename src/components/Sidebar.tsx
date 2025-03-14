
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-sidebar border-r">
      <div className="px-6 py-4 border-b">
        <h2 className="text-2xl font-bold text-crm-blue">Битрикс CRM</h2>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavLink to="/" className={({ isActive }) => 
          `crm-sidebar-item ${isActive ? 'active' : ''}`
        } end>
          <LayoutDashboard className="w-5 h-5" />
          <span>Панель управления</span>
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => 
          `crm-sidebar-item ${isActive ? 'active' : ''}`
        }>
          <FileText className="w-5 h-5" />
          <span>Заказы</span>
        </NavLink>
        <NavLink to="/clients" className={({ isActive }) => 
          `crm-sidebar-item ${isActive ? 'active' : ''}`
        }>
          <User className="w-5 h-5" />
          <span>Клиенты</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => 
          `crm-sidebar-item ${isActive ? 'active' : ''}`
        }>
          <Settings className="w-5 h-5" />
          <span>Настройки</span>
        </NavLink>
      </nav>
      <div className="px-6 py-4 border-t">
        <p className="text-xs text-gray-500">
          © 2023 Битрикс CRM
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
