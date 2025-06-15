
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ClientSidebar from './ClientSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const NAVBAR_HEIGHT = 64; // px, matches h-16 from Tailwind (16*4=64)

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const params = useParams();

  // Determine which sidebar to show based on route path
  const isClientRoute = location.pathname.startsWith('/client');
  const isProfessionalViewingClient = location.pathname.startsWith('/professional/') && params.clientId;

  // Use ClientSidebar for client routes or when professional is viewing a client
  const SidebarComponent = (isClientRoute || isProfessionalViewingClient) ? ClientSidebar : Sidebar;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed navbar at the top */}
      <Navbar />
      <div className="flex-1 flex relative">
        {/* Fixed sidebar (desktop only) */}
        {!isMobile && <SidebarComponent />}
        {/* Main content container with margin and top padding to clear navbar */}
        <main
          className={
            `flex-1 max-w-[1400px] mx-auto w-full overflow-y-auto relative ` +
            `${!isMobile ? 'ml-64' : ''} ` +
            `pt-16 p-4 md:p-6`
          }
          style={{
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, // Fill space under navbar
            marginTop: 0, // Already handled by pt-16 (padding-top)
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
