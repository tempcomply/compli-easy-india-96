
import React from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  ClipboardCheck, 
  Settings,
  Building,
  ArrowLeft,
  User,
  Shield,
  Receipt,
  Briefcase,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Top navigation items (main features)
const topNavItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: ClipboardCheck, label: 'Compliances', path: '/company-compliances' },
  { icon: Receipt, label: 'Taxes', path: '/taxes' },
  { icon: Briefcase, label: 'Services', path: '/services' },
];

// Middle navigation items (secondary features)
const middleNavItems = [
  { icon: Shield, label: 'Assets', path: '/assets' },
  { icon: FileText, label: 'Documents', path: '/documents' },
];

// Bottom navigation items (settings and admin)
const bottomNavItems = [
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

const ClientSidebar = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  
  // Check if this is being viewed by a professional using new route structure
  const isProfessionalView = location.pathname.startsWith('/professional/') && params.clientId;
  const clientId = params.clientId;
  const clientName = clientId ? dummyClients[clientId] || `Client ${clientId}` : '';
  
  // Adjust paths based on context
  const getNavPath = (basePath: string) => {
    if (isProfessionalView && clientId) {
      return `/professional/${clientId}${basePath}`;
    }
    return `/client${basePath}`;
  };
  
  const handleBackToProfessional = () => {
    navigate('/professional/home');
  };
  
  return (
    <aside className="w-64 border-r bg-slate-800 dark:bg-slate-900 h-full flex flex-col overflow-hidden">
      {isProfessionalView && (
        <div className="mb-4 mx-3 mt-3 p-3 bg-blue-900/30 rounded-lg border border-blue-700">
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
        {/* Top section - Main features */}
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
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
        
        {/* Small separator */}
        <div className="border-t my-4 border-slate-600"></div>
        
        {/* Middle section - Secondary features */}
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
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
        
        {/* Spacer to push bottom section down */}
        <div className="flex-1"></div>
        
        {/* Large separator before bottom section */}
        <div className="border-t my-4 border-slate-600"></div>
        
        {/* Bottom section - Settings and admin */}
        <div className="space-y-1 pb-4">
          {bottomNavItems.map((item, index) => (
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
      </nav>
    </aside>
  );
};

export default ClientSidebar;
