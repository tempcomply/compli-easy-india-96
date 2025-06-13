
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Building,
  Settings,
} from 'lucide-react';

const professionalNavItems = [
  { icon: Home, label: 'Home', path: '/professional/home' },
  { icon: Building, label: 'Companies', path: '/professional/companies' },
  { icon: Settings, label: 'Settings', path: '/professional/settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-slate-800 dark:bg-slate-900 h-screen sticky top-0 flex flex-col overflow-hidden">
      <nav className="flex-1 px-3 flex flex-col">
        {/* Main navigation items */}
        <div className="space-y-1 mt-4">
          {professionalNavItems.slice(0, -1).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? 'bg-primary text-white shadow-md' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
        
        {/* Spacer to push settings to bottom */}
        <div className="flex-1"></div>
        
        {/* Large separator before settings */}
        <div className="border-t my-4 border-slate-600"></div>
        
        {/* Settings at bottom */}
        <div className="pb-4">
          <NavLink
            to={professionalNavItems[professionalNavItems.length - 1].path}
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? 'bg-primary text-white shadow-md' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`
            }
          >
            <professionalNavItems[professionalNavItems.length - 1].icon className="h-5 w-5 mr-3" />
            <span>{professionalNavItems[professionalNavItems.length - 1].label}</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
