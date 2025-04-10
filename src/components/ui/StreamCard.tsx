
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StreamCardProps {
  id: string;
  title: string;
  streamer: string;
  game: string;
  viewers: number;
  thumbnailUrl: string;
  avatarUrl?: string;
  isLive?: boolean;
  className?: string;
}

const StreamCard = ({
  id,
  title,
  streamer,
  game,
  viewers,
  thumbnailUrl,
  avatarUrl,
  isLive = true,
  className,
}: StreamCardProps) => {
  const viewerCount = viewers > 999 ? `${(viewers / 1000).toFixed(1)}K` : viewers;
  
  return (
    <Link to={`/stream/${streamer}`}>
      <Card className={cn("border-0 bg-transparent hover-stream-card group", className)}>
        <div className="stream-card">
          <div className="relative aspect-video">
            <img 
              src={thumbnailUrl}
              alt={title}
              className="object-cover w-full h-full"
            />
            {isLive && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2 bg-red-600 text-white font-bold"
              >
                LIVE
              </Badge>
            )}
            <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-0.5 rounded text-sm">
              {viewerCount} viewers
            </div>
          </div>
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-9 w-9 mt-1">
                <AvatarImage src={avatarUrl} alt={streamer} />
                <AvatarFallback className="bg-accent text-white">
                  {streamer.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1 min-w-0">
                <h3 className="font-semibold line-clamp-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{streamer}</p>
                <p className="text-sm text-muted-foreground">{game}</p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default StreamCard;
