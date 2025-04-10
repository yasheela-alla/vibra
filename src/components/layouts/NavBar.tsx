
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, Bell, Sun, Moon, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import VibraLogo from '../ui/VibraLogo';

interface NavBarProps {
  toggleTheme: () => void;
  theme: 'dark' | 'light';
}

const NavBar = ({ toggleTheme, theme }: NavBarProps) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-sidebar z-50 border-b border-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center">
          <VibraLogo className="h-8 mr-2" />
          {!isMobile && <span className="text-xl font-bold text-white">Vibra</span>}
        </Link>
        
        {!isMobile && (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-sidebar-foreground hover:text-white transition-colors">Home</Link>
            <Link to="/explore" className="text-sidebar-foreground hover:text-white transition-colors">Explore</Link>
          </div>
        )}
      </div>
      
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            className="w-full bg-secondary text-primary pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-sidebar-foreground">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        {!isMobile && (
          <Button variant="ghost" size="icon" className="text-sidebar-foreground">
            <Bell className="h-5 w-5" />
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-vibra-700 text-white">VB</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">VibraUser</p>
                <p className="text-xs leading-none text-muted-foreground">user@vibra.tv</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile" className="flex items-center w-full">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/login" className="flex items-center w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;
