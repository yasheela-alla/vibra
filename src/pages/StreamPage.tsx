
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import VideoPlayer from '@/components/stream/VideoPlayer';
import StreamChat from '@/components/stream/StreamChat';
import StreamInfo from '@/components/stream/StreamInfo';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for the stream
const mockStreamData = {
  title: 'VALORANT Ranked Grind to Radiant',
  streamer: 'shanks_ttv',
  game: 'VALORANT',
  viewers: 5700,
  followers: 350000,
  description: 'Former pro player grinding ranked in VALORANT. !socials !setup in chat',
  thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shanks_ttv-440x248.jpg'
};

const StreamPage = () => {
  const { username } = useParams<{ username: string }>();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [streamData, setStreamData] = useState(mockStreamData);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Update the stream data based on the username parameter
      if (username) {
        setStreamData(prev => ({
          ...prev,
          streamer: username
        }));
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [username]);
  
  return (
    <MainLayout fullWidth={true}>
      <div className="max-w-[1600px] mx-auto pb-20">
        <div className={`flex flex-col ${!isMobile ? 'md:flex-row' : ''} gap-4`}>
          <div className="flex-1">
            <VideoPlayer 
              thumbnailUrl={streamData.thumbnailUrl}
              streamer={streamData.streamer}
            />
            
            <div className="mt-4">
              <StreamInfo 
                title={streamData.title}
                streamer={streamData.streamer}
                game={streamData.game}
                viewers={streamData.viewers}
                followers={streamData.followers}
                description={streamData.description}
              />
            </div>
          </div>
          
          {!isMobile && (
            <div className="w-80 lg:w-96">
              <StreamChat />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default StreamPage;
