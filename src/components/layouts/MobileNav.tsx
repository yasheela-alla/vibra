
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Play, MessageSquare, User } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/stream', icon: Play, label: 'Live' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-border flex items-center justify-around h-14 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
                       (item.path !== '/' && location.pathname.startsWith(item.path));
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full text-xs ${
              isActive ? 'text-vibra-400' : 'text-sidebar-foreground'
            }`}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNav;
