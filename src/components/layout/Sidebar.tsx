
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
    <aside className="w-64 border-r bg-slate-50 dark:bg-slate-900 h-full flex flex-col">
      <nav className="space-y-2 mt-4 px-3">
        {professionalNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary/15 text-primary' 
                  : 'text-foreground hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
