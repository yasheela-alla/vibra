
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  fullWidth?: boolean;
}

const MainLayout = ({ children, showSidebar = true, fullWidth = false }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <div className="flex flex-1 pt-16">
        {showSidebar && !isMobile && (
          <Sidebar 
            collapsed={sidebarCollapsed} 
            setCollapsed={setSidebarCollapsed} 
          />
        )}
        <main 
          className={`flex-1 mx-auto p-4 transition-all duration-300`}
          style={{ 
            maxWidth: fullWidth ? '100%' : '1400px',
            marginLeft: showSidebar && !isMobile && !sidebarCollapsed ? '16rem' : '4rem',
          }}
        >
          {children}
        </main>
      </div>
      {isMobile && <MobileNav />}
      <Footer />
    </div>
  );
};

export default MainLayout;
