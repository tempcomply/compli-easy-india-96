
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
  Users,
  FolderArchive
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <aside className="w-64 border-r bg-slate-50 dark:bg-slate-900 h-full flex flex-col overflow-y-auto">
      {isProfessionalView && (
        <div className="mb-4 mx-3 mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Viewing Client</span>
          </div>
          <div className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
            {clientName}
          </div>
          <Button 
            onClick={handleBackToProfessional}
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Home
          </Button>
        </div>
      )}
      
      <nav className="flex-1 px-3">
        {/* Top section */}
        <div className="mb-4 space-y-2">
          {topNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={getNavPath(item.path)}
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
        </div>
        
        {/* Separator */}
        <div className="border-t my-3 border-slate-200 dark:border-slate-700"></div>
        
        {/* Middle section */}
        <div className="mb-4 space-y-2">
          {middleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={getNavPath(item.path)}
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
        </div>
        
        {/* Double separator */}
        <div className="border-t my-3 border-slate-200 dark:border-slate-700"></div>
        <div className="border-t my-1 border-slate-200 dark:border-slate-700"></div>
        
        {/* Bottom section */}
        <div className="space-y-2 mb-4">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={getNavPath(item.path)}
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
        </div>
      </nav>
    </aside>
  );
};

export default ClientSidebar;
