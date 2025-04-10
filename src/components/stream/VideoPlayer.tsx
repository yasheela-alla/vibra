
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  SkipForward
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface VideoPlayerProps {
  thumbnailUrl: string;
  streamer: string;
}

const VideoPlayer = ({ thumbnailUrl, streamer }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [showControls, setShowControls] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);
  
  return (
    <Card className="border-0 bg-black rounded-lg overflow-hidden relative group">
      <div 
        className="aspect-video relative" 
        onMouseMove={() => setShowControls(true)}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <img 
          src={thumbnailUrl}
          alt={`${streamer}'s stream`}
          className="w-full h-full object-cover"
        />
        
        <Badge 
          variant="destructive" 
          className="absolute top-4 left-4 bg-red-600 text-white font-bold"
        >
          LIVE
        </Badge>
        
        {/* Semi-transparent overlay with player controls */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Center play/pause button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-20 w-20 text-white opacity-80 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(true);
                }}
              >
                <Play size={64} />
              </Button>
            </div>
          )}
          
          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <span className="text-white text-sm">00:00</span>
              <Slider
                defaultValue={[12]}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-white text-sm">LIVE</span>
            </div>
            
            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
                
                <div className="w-24 hidden sm:block">
                  <Slider
                    defaultValue={[volume]}
                    max={100}
                    step={1}
                    onValueChange={(vals) => {
                      setVolume(vals[0]);
                      setIsMuted(vals[0] === 0);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SkipForward size={18} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Settings size={18} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Maximize size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPlayer;
