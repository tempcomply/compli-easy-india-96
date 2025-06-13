
import React from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Building,
  FileText,
  ClipboardCheck,
  Settings,
  ArrowLeft,
  User,
  Shield,
  Receipt,
  Briefcase,
  Users
} from 'lucide-react';
import Logo from '../Logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const professionalNavItems = [
  { icon: Home, label: 'Home', path: '/professional/home' },
  { icon: Building, label: 'Companies', path: '/professional/companies' },
  { icon: Settings, label: 'Settings', path: '/professional/settings' },
];

// Top navigation items
const topNavItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: ClipboardCheck, label: 'Compliances', path: '/company-compliances' },
  { icon: Receipt, label: 'Taxes', path: '/taxes' },
  { icon: Briefcase, label: 'Services', path: '/services' },
];

// Middle navigation items
const middleNavItems = [
  { icon: Shield, label: 'Assets', path: '/assets' },
  { icon: FileText, label: 'Documents', path: '/documents' },
];

// Bottom navigation items
const clientBottomNavItems = [
  { icon: Users, label: 'Team', path: '/team' },
  { icon: Building, label: 'Organization Details', path: '/organization' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

// Dummy client data for display
const dummyClients: { [key: string]: string } = {
  '1': 'Tech Solutions Inc.',
  '2': 'Green Energy Corp.',
  '3': 'Marketing Pros LLC',
};

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, onOpenChange }) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  
  const isClientRoute = location.pathname.startsWith('/client');
  const isProfessionalView = location.pathname.startsWith('/professional/') && params.clientId;
  const clientId = params.clientId;
  const clientName = clientId ? dummyClients[clientId] || `Client ${clientId}` : '';
  
  const getNavPath = (basePath: string) => {
    if (isProfessionalView && clientId) {
      return `/professional/${clientId}${basePath}`;
    } else if (isClientRoute || isProfessionalView) {
      return `/client${basePath}`;
    }
    return basePath;
  };
  
  const handleBackToProfessional = () => {
    navigate('/professional/home');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 w-[280px] bg-slate-800 dark:bg-slate-900 border-slate-700">
        <SheetHeader className="p-4 border-b border-slate-700">
          <SheetTitle className="flex items-center justify-start">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        
        <div className="overflow-y-auto py-2 flex flex-col h-full">
          {isProfessionalView && (
            <div className="mx-3 my-3 p-3 bg-blue-900/30 rounded-lg border border-blue-700">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Viewing Client</span>
              </div>
              <div className="text-sm font-semibold text-blue-200 mb-2">
                {clientName}
              </div>
              <Button 
                onClick={handleBackToProfessional}
                variant="outline" 
                size="sm" 
                className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Home
              </Button>
            </div>
          )}
          
          <nav className="flex-1 px-3 flex flex-col">
            {(isClientRoute || isProfessionalView) ? (
              <>
                {/* Top section */}
                <div className="space-y-1">
                  {topNavItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={getNavPath(item.path)}
                      className={({ isActive }) => 
                        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`
                      }
                      onClick={() => onOpenChange(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
                
                {/* Small separator */}
                <div className="border-t my-4 border-slate-600"></div>
                
                {/* Middle section */}
                <div className="space-y-1">
                  {middleNavItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={getNavPath(item.path)}
                      className={({ isActive }) => 
                        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`
                      }
                      onClick={() => onOpenChange(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
                
                {/* Spacer */}
                <div className="flex-1"></div>
                
                {/* Large separator */}
                <div className="border-t my-4 border-slate-600"></div>
                
                {/* Bottom section */}
                <div className="space-y-1 pb-4">
                  {clientBottomNavItems.map((item, index) => (
                    <React.Fragment key={item.path}>
                      <NavLink
                        to={getNavPath(item.path)}
                        className={({ isActive }) => 
                          `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive 
                              ? 'bg-primary text-white shadow-md' 
                              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`
                        }
                        onClick={() => onOpenChange(false)}
                      >
                        <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                      {/* Small separator after Team */}
                      {index === 0 && (
                        <div className="border-t my-2 border-slate-600"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : (
              // Professional menu items
              <>
                <div className="space-y-1">
                  {professionalNavItems.slice(0, -1).map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`
                      }
                      onClick={() => onOpenChange(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
                
                {/* Spacer */}
                <div className="flex-1"></div>
                
                {/* Large separator */}
                <div className="border-t my-4 border-slate-600"></div>
                
                {/* Settings at bottom */}
                <div className="pb-4">
                  <NavLink
                    to={professionalNavItems[professionalNavItems.length - 1].path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`
                    }
                    onClick={() => onOpenChange(false)}
                  >
                    <professionalNavItems[professionalNavItems.length - 1].icon className="h-5 w-5 mr-3" />
                    <span>{professionalNavItems[professionalNavItems.length - 1].label}</span>
                  </NavLink>
                </div>
              </>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
