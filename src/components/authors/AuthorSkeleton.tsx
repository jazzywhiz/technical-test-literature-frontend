export function AuthorSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="flex flex-col sm:flex-row">
        {/* Author photo skeleton */}
        <div className="sm:w-32 sm:h-32 h-40 bg-gray-200"></div>
        
        {/* Author details skeleton */}
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start">
            {/* Name skeleton */}
            <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
            
            {/* Book count skeleton */}
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          
          {/* Metadata skeleton */}
          <div className="flex space-x-3 mb-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          
          {/* Bio skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          
          {/* Button skeleton */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-36"></div>
          </div>
        </div>
      </div>
    </div>
  );
}