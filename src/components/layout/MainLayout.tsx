
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ClientSidebar from './ClientSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const NAVBAR_HEIGHT = 64; // px

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const params = useParams();

  // Determine which sidebar to show based on route path
  const isClientRoute = location.pathname.startsWith('/client');
  const isProfessionalViewingClient = location.pathname.startsWith('/professional/') && params.clientId;

  const SidebarComponent = (isClientRoute || isProfessionalViewingClient) ? ClientSidebar : Sidebar;

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed navbar */}
      <Navbar />

      {/* Sidebar (desktop only, fixed, below navbar) */}
      {!isMobile && <SidebarComponent />}

      {/* Main content */}
      <main
        className={
          `relative ` +
          `${!isMobile ? 'ml-64' : ''} ` +      // account for sidebar width on desktop
          `pt-16 ` +                            // account for navbar height
          `p-4 md:p-6 ` +
          `${!isMobile ? 'h-[calc(100vh-4rem)] overflow-y-auto' : ''}` // only main content scrolls on desktop
        }
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

