
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Heart } from 'lucide-react';

interface StreamInfoProps {
  title: string;
  streamer: string;
  game: string;
  viewers: number;
  followers: number;
  avatarUrl?: string;
  description?: string;
}

const StreamInfo = ({
  title,
  streamer,
  game,
  viewers,
  followers,
  avatarUrl,
  description
}: StreamInfoProps) => {
  const formattedViewers = viewers > 999 ? `${(viewers / 1000).toFixed(1)}K` : viewers;
  const formattedFollowers = followers > 999 ? `${(followers / 1000).toFixed(1)}K` : followers;
  
  return (
    <Card className="border-0">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <Avatar className="h-16 w-16 md:h-20 md:w-20">
              <AvatarImage src={avatarUrl} alt={streamer} />
              <AvatarFallback className="bg-vibra-700 text-white text-xl">
                {streamer.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg font-semibold">{streamer}</p>
                <Badge className="bg-vibra-600">{game}</Badge>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">{formattedViewers}</span> viewers
              </div>
              <div>
                <span className="font-medium text-foreground">{formattedFollowers}</span> followers
              </div>
            </div>
            
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            
            <div className="flex gap-3 pt-2">
              <Button className="bg-vibra-600 hover:bg-vibra-700">
                <Heart className="mr-2 h-4 w-4" />
                Follow
              </Button>
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamInfo;
