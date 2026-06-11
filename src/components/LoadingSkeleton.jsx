// Skeleton loader — shows a "ghost" of the card while data is loading
// This is a professional UI pattern employers love to see

function SkeletonBox({ className }) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse ${className}`}
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="mt-6 space-y-4">
      {/* City name skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <SkeletonBox className="h-8 w-40" />
            <SkeletonBox className="h-4 w-24" />
          </div>
          <SkeletonBox className="h-16 w-16 rounded-full" />
        </div>

        {/* Big temperature */}
        <SkeletonBox className="h-16 w-32 mt-4" />
        <SkeletonBox className="h-4 w-48 mt-2" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4"
          >
            <SkeletonBox className="h-4 w-16 mb-3" />
            <SkeletonBox className="h-7 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
