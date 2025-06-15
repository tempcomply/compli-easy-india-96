
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
    // Fix: Add top-16 and correct height so sidebar is below navbar and does not overlap it
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r bg-card p-4 flex flex-col z-40">
      <nav className="space-y-1 mt-2">
        {professionalNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-foreground hover:bg-muted'
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
