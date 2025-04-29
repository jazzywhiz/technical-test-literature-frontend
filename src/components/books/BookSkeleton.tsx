export function BookSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="bg-gray-200 w-full h-48"></div>
      
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        
        {/* Metadata skeleton */}
        <div className="flex space-x-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        
        {/* Footer skeleton */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}