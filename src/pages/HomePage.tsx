
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import StreamCard from '@/components/ui/StreamCard';
import StreamCardSkeleton from '@/components/ui/StreamCardSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock stream data
const mockStreams = [
  {
    id: '1',
    title: 'VALORANT Ranked Grind to Radiant',
    streamer: 'shanks_ttv',
    game: 'VALORANT',
    viewers: 5700,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shanks_ttv-440x248.jpg'
  },
  {
    id: '2',
    title: 'LEC Summer Split Analysis',
    streamer: 'Caedrel',
    game: 'League of Legends',
    viewers: 34700,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_caedrel-440x248.jpg'
  },
  {
    id: '3',
    title: 'EMEA Challengers Finals Day 2',
    streamer: 'VALORANT_EMEA',
    game: 'VALORANT',
    viewers: 11800,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_valorant-440x248.jpg'
  },
  {
    id: '4',
    title: 'Pro Strats & Tips',
    streamer: 'Sliggyy',
    game: 'VALORANT',
    viewers: 3800,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_sliggyy-440x248.jpg'
  },
  {
    id: '5',
    title: 'TSM Practice Stream',
    streamer: 'Subroza',
    game: 'VALORANT',
    viewers: 1800,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_subroza-440x248.jpg'
  },
  {
    id: '6',
    title: 'ESL One Stockholm 2022',
    streamer: 'ESL_DOTA2',
    game: 'Dota 2',
    viewers: 1500,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_dota2-440x248.jpg'
  },
  {
    id: '7',
    title: 'Immortal Rank Games w/ Team',
    streamer: 'Gorgec',
    game: 'Dota 2',
    viewers: 7600,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_gorgc-440x248.jpg'
  },
  {
    id: '8',
    title: 'Just Chatting with Viewers',
    streamer: 'Tectone',
    game: 'Just Chatting',
    viewers: 5800,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_tectone-440x248.jpg'
  },
];

const recommendedCategories = [
  { name: 'VALORANT', viewers: 125000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg' },
  { name: 'League of Legends', viewers: 180000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg' },
  { name: 'Just Chatting', viewers: 350000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg' },
  { name: 'Dota 2', viewers: 95000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg' },
];

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [streams, setStreams] = useState(mockStreams);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <MainLayout>
      <div className="pt-2 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Live Now</h1>
          <p className="text-muted-foreground">Top streams that might interest you</p>
        </div>
        
        <Tabs defaultValue="recommended">
          <TabsList className="mb-4">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <StreamCardSkeleton key={index} />
                ))
              ) : (
                streams.map((stream) => (
                  <StreamCard
                    key={stream.id}
                    id={stream.id}
                    title={stream.title}
                    streamer={stream.streamer}
                    game={stream.game}
                    viewers={stream.viewers}
                    thumbnailUrl={stream.thumbnailUrl}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="following">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <StreamCardSkeleton key={index} />
                ))
              ) : (
                streams.slice(0, 4).map((stream) => (
                  <StreamCard
                    key={stream.id}
                    id={stream.id}
                    title={stream.title}
                    streamer={stream.streamer}
                    game={stream.game}
                    viewers={stream.viewers}
                    thumbnailUrl={stream.thumbnailUrl}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {recommendedCategories.map((category, index) => (
                <div key={index} className="stream-card">
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={category.thumbnailUrl}
                      alt={category.name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium text-sm line-clamp-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {(category.viewers / 1000).toFixed(1)}K viewers
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default HomePage;
