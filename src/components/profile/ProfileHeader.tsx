
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Heart, Calendar, Quote } from 'lucide-react';

interface ProfileHeaderProps {
  username: string;
  followers: number;
  following: number;
  avatarUrl?: string;
  isLive?: boolean;
  joinDate?: string;
  bio?: string;
}

const ProfileHeader = ({
  username,
  followers,
  following,
  avatarUrl,
  isLive = false,
  joinDate,
  bio
}: ProfileHeaderProps) => {
  const formattedFollowers = followers > 999 ? `${(followers / 1000).toFixed(1)}K` : followers;
  const formattedFollowing = following > 999 ? `${(following / 1000).toFixed(1)}K` : following;
  const streamerQuote = ""When you don't give up, you cannot fail." — Ninja";
  
  return (
    <Card className="border-0 overflow-hidden">
      <div className="relative">
        {/* Banner with quote instead of image */}
        <div className="h-40 md:h-60 bg-gradient-to-r from-accent/40 to-accent/20 flex items-center justify-center p-6">
          <div className="flex items-center gap-3 text-center max-w-xl">
            <Quote size={28} className="text-accent opacity-70" />
            <p className="text-lg md:text-xl italic font-medium opacity-80">{streamerQuote}</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
        
        {/* Avatar and basic info - fixed positioning */}
        <div className="absolute left-6 -bottom-14 md:-bottom-16 flex items-end">
          <div className="relative">
            <Avatar className="h-20 w-20 md:h-28 md:w-28 ring-4 ring-background">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback className="bg-accent text-white text-2xl">
                {username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isLive && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 bg-red-600 text-white font-bold"
              >
                LIVE
              </Badge>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="absolute right-6 bottom-4 flex gap-3">
          <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
            <Bell className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
          <Button className="bg-accent hover:bg-accent/80">
            <Heart className="mr-2 h-4 w-4" />
            Follow
          </Button>
        </div>
      </div>
      
      <CardContent className="pt-20 p-6"> {/* Increased top padding to make room for avatar */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-primary">
              {username}
            </h1>
            {joinDate && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {joinDate}
              </div>
            )}
          </div>
          
          <div className="flex gap-6">
            <div>
              <p className="font-semibold">{formattedFollowers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="font-semibold">{formattedFollowing}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
          
          {bio && (
            <p className="text-muted-foreground">{bio}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
