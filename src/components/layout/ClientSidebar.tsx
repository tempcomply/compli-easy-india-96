
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Receipt, 
  Briefcase, 
  FolderOpen,
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
  { name: 'Company', href: '/client/company', icon: Building2 },
  { name: 'Compliances', href: '/client/compliances', icon: Shield },
  { name: 'Taxes', href: '/client/taxes', icon: Receipt },
  { name: 'Services', href: '/client/services', icon: Briefcase },
  { name: 'Documents', href: '/client/documents', icon: FolderOpen },
  { name: 'Reports', href: '/client/reports', icon: BarChart3 },
  { name: 'Settings', href: '/client/settings', icon: Settings },
];

const ClientSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <h2 className="text-lg font-semibold">Client Portal</h2>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.href !== '/client/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default ClientSidebar;
