
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ClientSidebar from './ClientSidebar';
import FloatingCommunication from '../communication/FloatingCommunication';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const NAVBAR_HEIGHT = 64; // px

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const params = useParams();

  const isClientRoute = location.pathname.startsWith('/client');
  const isProfessionalViewingClient = location.pathname.startsWith('/professional/') && params.clientId;
  const SidebarComponent = (isClientRoute || isProfessionalViewingClient) ? ClientSidebar : Sidebar;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar fixed at top */}
      <Navbar />
      {/* Main container, shifted down by navbar height */}
      <div
        className="flex-1 flex relative pt-16"
        style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      >
        {/* Sidebar fixed and outside normal flow, only on desktop */}
        {!isMobile && <SidebarComponent />}
        {/* Main content: margin left for sidebar (only on desktop), full height, and Z lower than navbar */}
        <main
          className={
            `flex-1 max-w-[1400px] mx-auto w-full relative z-0 ` +
            (!isMobile ? 'ml-64' : '') +
            ' p-4 md:p-6'
          }
          style={{
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          {children}
        </main>
      </div>
      
      {/* Floating Communication - appears on all pages */}
      <FloatingCommunication />
    </div>
  );
};

export default MainLayout;
