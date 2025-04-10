
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Channel {
  id: string;
  username: string;
  avatarUrl?: string;
  game: string;
  isLive: boolean;
  viewers?: number;
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const recommendedChannels: Channel[] = [
  { id: '1', username: 'Yasheela', game: 'VALORANT', isLive: true, viewers: 5700 },
  { id: '2', username: 'Caedrel', game: 'League of Legends', isLive: true, viewers: 34700 },
  { id: '3', username: 'VALORANT_EMEA', game: 'VALORANT', isLive: true, viewers: 11800 },
  { id: '4', username: 'Sliggyy', game: 'VALORANT', isLive: true, viewers: 3800 },
  { id: '5', username: 'Subroza', game: 'VALORANT', isLive: true, viewers: 1800 },
  { id: '6', username: 'ESL_DOTA2', game: 'Dota 2', isLive: true, viewers: 1500 },
  { id: '7', username: 'Gorgec', game: 'Dota 2', isLive: true, viewers: 7600 },
  { id: '8', username: 'Tectone', game: 'Just Chatting', isLive: true, viewers: 5800 },
];

const followedChannels: Channel[] = [
  { id: '1', username: 'Yasheela', game: 'VALORANT', isLive: true, viewers: 5700 },
  { id: '2', username: 'Caedrel', game: 'League of Legends', isLive: true, viewers: 34700 },
  { id: '3', username: 'VALORANT_EMEA', game: 'VALORANT', isLive: false },
  { id: '4', username: 'Sliggyy', game: 'VALORANT', isLive: false },
  { id: '5', username: 'Subroza', game: 'VALORANT', isLive: false },
];

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  return (
    <aside 
      className={`fixed top-16 left-0 bottom-0 bg-sidebar border-r border-border flex flex-col z-40 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="flex flex-col p-3 flex-1 overflow-y-auto scrollbar-none">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold text-white ${collapsed ? 'sr-only' : ''}`}>
            FOLLOWED CHANNELS
          </h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-sidebar-foreground" 
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
        
        <div className="space-y-1">
          {followedChannels.map((channel) => (
            <TooltipProvider key={channel.id} delayDuration={collapsed ? 0 : 1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to={`/stream/${channel.username}`} 
                    className="flex items-center p-2 rounded-md hover:bg-secondary transition-colors group"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={channel.avatarUrl} alt={channel.username} />
                        <AvatarFallback className="bg-accent text-white">
                          {channel.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {channel.isLive && (
                        <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 ring-1 ring-background"></span>
                      )}
                    </div>
                    
                    {!collapsed && (
                      <div className="ml-3 flex-1 truncate">
                        <p className="text-sm font-medium truncate text-white group-hover:text-accent">
                          {channel.username}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{channel.game}</p>
                      </div>
                    )}
                    
                    {!collapsed && channel.isLive && (
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                        <span className="text-xs text-muted-foreground">{channel.viewers ? (channel.viewers / 1000).toFixed(1) + 'K' : 'Live'}</span>
                      </div>
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <div>
                      <p className="font-medium">{channel.username}</p>
                      <p className="text-xs text-muted-foreground">{channel.game}</p>
                      {channel.isLive && (
                        <Badge variant="destructive" className="mt-1">LIVE</Badge>
                      )}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        
        <div className={`mt-6 ${collapsed ? 'sr-only' : ''}`}>
          <h3 className="font-semibold text-white mb-4">RECOMMENDED CHANNELS</h3>
          <div className="space-y-1">
            {recommendedChannels.slice(0, 5).map((channel) => (
              <Link 
                key={channel.id} 
                to={`/stream/${channel.username}`} 
                className="flex items-center p-2 rounded-md hover:bg-secondary transition-colors group"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={channel.avatarUrl} alt={channel.username} />
                    <AvatarFallback className="bg-accent text-white">
                      {channel.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {channel.isLive && (
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 ring-1 ring-background"></span>
                  )}
                </div>
                
                <div className="ml-3 flex-1 truncate">
                  <p className="text-sm font-medium truncate text-white group-hover:text-accent">
                    {channel.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{channel.game}</p>
                </div>
                
                {channel.isLive && (
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                    <span className="text-xs text-muted-foreground">{channel.viewers ? (channel.viewers / 1000).toFixed(1) + 'K' : 'Live'}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
