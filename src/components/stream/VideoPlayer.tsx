
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
          className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs"
        >
          LIVE
        </Badge>
        
        {/* Semi-transparent overlay with player controls */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Center play/pause button - reduce size by 15% */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-16 w-16 text-white opacity-80 hover:opacity-100" // Reduced from h-20 w-20
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(true);
                }}
              >
                <Play size={54} /> {/* Reduced from 64 */}
              </Button>
            </div>
          )}
          
          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2"> {/* Reduced padding */}
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <span className="text-white text-xs">00:00</span> {/* Reduced text size */}
              <Slider
                defaultValue={[12]}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-white text-xs">LIVE</span> {/* Reduced text size */}
            </div>
            
            {/* Control buttons - reduce size by 15% */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white" // Reduced from h-8 w-8
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} />} {/* Reduced from 18 */}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white" // Reduced from h-8 w-8
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                >
                  {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />} {/* Reduced from 18 */}
                </Button>
                
                <div className="w-20 hidden sm:block"> {/* Reduced from w-24 */}
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
                  className="h-7 w-7 text-white" // Reduced from h-8 w-8
                  onClick={(e) => e.stopPropagation()}
                >
                  <SkipForward size={15} /> {/* Reduced from 18 */}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white" // Reduced from h-8 w-8
                  onClick={(e) => e.stopPropagation()}
                >
                  <Settings size={15} /> {/* Reduced from 18 */}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white" // Reduced from h-8 w-8
                  onClick={(e) => e.stopPropagation()}
                >
                  <Maximize size={15} /> {/* Reduced from 18 */}
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
