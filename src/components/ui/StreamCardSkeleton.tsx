
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface StreamCardSkeletonProps {
  className?: string;
}

const StreamCardSkeleton = ({ className }: StreamCardSkeletonProps) => {
  return (
    <Card className={cn("border-0 bg-transparent", className)}>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamCardSkeleton;
