
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StreamCard from '@/components/ui/StreamCard';
import StreamCardSkeleton from '@/components/ui/StreamCardSkeleton';
import { Search } from 'lucide-react';

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

// Mock categories
const categories = [
  { name: 'VALORANT', viewers: 125000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg' },
  { name: 'League of Legends', viewers: 180000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg' },
  { name: 'Just Chatting', viewers: 350000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg' },
  { name: 'Dota 2', viewers: 95000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg' },
  { name: 'Counter-Strike 2', viewers: 210000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/1064793997_IGDB-285x380.jpg' },
  { name: 'Fortnite', viewers: 145000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg' },
  { name: 'Apex Legends', viewers: 85000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg' },
  { name: 'Minecraft', viewers: 60000, thumbnailUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg' },
];

const ExplorePage = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStreams, setFilteredStreams] = useState(mockStreams);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStreams(mockStreams);
      setFilteredCategories(categories);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    setFilteredStreams(
      mockStreams.filter(
        stream => 
          stream.title.toLowerCase().includes(query) || 
          stream.streamer.toLowerCase().includes(query) || 
          stream.game.toLowerCase().includes(query)
      )
    );
    
    setFilteredCategories(
      categories.filter(
        category => category.name.toLowerCase().includes(query)
      )
    );
  }, [searchQuery]);
  
  return (
    <MainLayout>
      <div className="pt-2 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Explore</h1>
          
          <div className="relative max-w-xl">
            <Input
              type="text"
              placeholder="Search for streamers, games, or streams"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
        </div>
        
        <Tabs defaultValue="categories">
          <TabsList className="mb-4">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="live">Live Channels</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="aspect-[3/4] relative">
                      <StreamCardSkeleton className="h-full w-full" />
                    </div>
                  </div>
                ))
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
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
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg font-medium">No categories found</p>
                  <p className="text-muted-foreground mt-2">
                    Try another search query
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="live">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <StreamCardSkeleton key={index} />
                ))
              ) : filteredStreams.length > 0 ? (
                filteredStreams.map((stream) => (
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
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg font-medium">No streams found</p>
                  <p className="text-muted-foreground mt-2">
                    Try another search query
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ExplorePage;
