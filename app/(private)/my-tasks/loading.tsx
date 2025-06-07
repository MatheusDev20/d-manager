import { Skeleton } from "@/app/lib/shadcdn/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="animate-pulse border rounded-lg p-4 space-y-4">
      {/* Accordion Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="w-1/2 h-5 rounded" />
        <Skeleton className="w-5 h-5 rounded" />
      </div>
      {/* Accordion Content */}
      <div className="space-y-2 mt-2">
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-3/4 h-4 rounded" />
        <Skeleton className="w-2/3 h-4 rounded" />
      </div>
    </div>
  );
}
