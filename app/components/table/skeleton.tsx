import { Skeleton } from "@/app/lib/shadcdn/components/ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Table Header Skeleton */}
      <div className="flex mb-4 border-b pb-2"></div>
      {/* Table Rows Skeleton */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 border-b last:border-b-0"
        >
          <div className="flex items-center gap-4 flex-1">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="w-1/2 h-4 rounded" />
              <Skeleton className="w-1/3 h-4 rounded" />
            </div>
          </div>
          <Skeleton className="w-20 h-4 rounded" />
        </div>
      ))}
    </div>
  );
};
