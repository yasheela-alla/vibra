
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VibraLogo from '@/components/ui/VibraLogo';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <VibraLogo className="h-16 w-16 mb-4" />
      
      <h1 className="text-4xl md:text-6xl font-bold">404</h1>
      <p className="text-xl md:text-2xl mt-2 mb-6">Stream Not Found</p>
      
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The stream you're looking for doesn't exist or has been moved to another channel.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-vibra-600 hover:bg-vibra-700">
          <Link to="/">Go to Homepage</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/explore">Browse Streams</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
