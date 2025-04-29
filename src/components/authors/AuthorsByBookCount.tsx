import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, User, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useAuthorsWithBookCount } from '@hooks/useAuthors';
import { Loading } from '@components/shared/Loading';
import { ErrorState } from '@components/shared/EmptyState';

export const AuthorsByBookCount: React.FC = () => {
  const { data: authorsWithCount, isLoading, isError } = useAuthorsWithBookCount();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [minBookCount, setMinBookCount] = useState(0);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !authorsWithCount) {
    return (
      <ErrorState
        message="Failed to load authors"
      />
    );
  }

  // Sort authors based on book count and current sort direction
  const sortedAuthors = [...authorsWithCount]
    .filter(author => author.bookCount >= minBookCount)
    .sort((a, b) => {
      return sortDirection === 'desc' 
        ? b.bookCount - a.bookCount 
        : a.bookCount - b.bookCount;
    });

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
  };

  // Find the maximum book count to set the range filter max value
  const maxBookCount = Math.max(...authorsWithCount.map(author => author.bookCount), 1);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Authors by Book Count</h3>
        <button 
          onClick={toggleSortDirection}
          className="flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          Sort {sortDirection === 'desc' ? 'Descending' : 'Ascending'}
          {sortDirection === 'desc' ? (
            <ChevronDown className="h-4 w-4 ml-1" />
          ) : (
            <ChevronUp className="h-4 w-4 ml-1" />
          )}
        </button>
      </div>

      <div className="mb-4 border-b pb-4">
        <label className="flex items-center text-sm text-gray-600 mb-2">
          <Filter className="h-4 w-4 mr-1" />
          Minimum book count: {minBookCount}
        </label>
        <input 
          type="range"
          min="0"
          max={maxBookCount}
          value={minBookCount}
          onChange={(e) => setMinBookCount(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-3">
        {sortedAuthors.length > 0 ? (
          sortedAuthors.map(author => (
            <div key={author.id} className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">
                    {author.firstName} {author.lastName}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Book className="h-3 w-3 mr-1" />
                    <span>{author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}</span>
                  </div>
                </div>
              </div>
              <Link
                to={`/authors/${author.id}`}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                View
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            No authors with {minBookCount} or more books found
          </p>
        )}
      </div>
    </div>
  );
};
