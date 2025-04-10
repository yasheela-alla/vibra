
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StreamCard from '../ui/StreamCard';
import StreamCardSkeleton from '../ui/StreamCardSkeleton';

interface Stream {
  id: string;
  title: string;
  streamer: string;
  game: string;
  viewers: number;
  thumbnailUrl: string;
  date: string;
}

interface PastStreamsProps {
  streams: Stream[];
  loading?: boolean;
}

const PastStreams = ({ streams, loading = false }: PastStreamsProps) => {
  return (
    <div className="mt-6">
      <Tabs defaultValue="videos">
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="clips">Clips</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <StreamCardSkeleton key={index} />
              ))
            ) : streams.length > 0 ? (
              streams.map((stream) => (
                <StreamCard
                  key={stream.id}
                  id={stream.id}
                  title={stream.title}
                  streamer={stream.streamer}
                  game={stream.game}
                  viewers={stream.viewers}
                  thumbnailUrl={stream.thumbnailUrl}
                  isLive={false}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg font-medium">No videos found</p>
                <p className="text-muted-foreground mt-2">
                  This channel hasn't uploaded any videos yet.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="clips">
          <div className="py-12 text-center">
            <p className="text-lg font-medium">No clips found</p>
            <p className="text-muted-foreground mt-2">
              This channel hasn't created any clips yet.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="py-12 text-center">
            <p className="text-lg font-medium">No categories found</p>
            <p className="text-muted-foreground mt-2">
              This channel hasn't streamed any categories yet.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PastStreams;
