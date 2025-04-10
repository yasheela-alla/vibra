
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  fullWidth?: boolean;
}

const MainLayout = ({ children, showSidebar = true, fullWidth = false }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
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
        {showSidebar && !isMobile && <Sidebar />}
        <main className={`flex-1 ${fullWidth ? 'max-w-full' : 'max-w-7xl'} mx-auto p-4`}>
          {children}
        </main>
      </div>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default MainLayout;
