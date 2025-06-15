
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

      <div className="flex">
        {/* Sidebar (desktop only, fixed, below navbar) */}
        {!isMobile && (
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-40">
            <SidebarComponent />
          </div>
        )}

        {/* Main content */}
        <main
          className={
            `flex-1 ` +
            // margin left so main content does not overlap sidebar (desktop)
            `${!isMobile ? 'ml-64' : ''} ` +
            // padding top for navbar
            `pt-16 ` +
            // content padding
            `p-4 md:p-6 ` +
            // only main content scrolls on desktop
            `${!isMobile ? 'h-[calc(100vh-4rem)] overflow-y-auto' : ''}`
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

