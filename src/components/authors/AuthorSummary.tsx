import React from 'react';
import { Link } from 'react-router-dom';
import { Book, User } from 'lucide-react';
import { useAuthorsWithBookCount } from '@hooks/useAuthors';
import { Loading } from '@components/shared/Loading';
import { ErrorState } from '@components/shared/EmptyState';

export const AuthorSummary: React.FC = () => {
  // Use the hook that provides authors with book counts
  const { data: authorsWithCount, isLoading, isError } = useAuthorsWithBookCount();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !authorsWithCount) {
    return (
      <ErrorState
        message="Failed to load author summary"
      />
    );
  }

  // Calculate some statistics
  const totalAuthors = authorsWithCount.length;
  const totalBooks = [...new Set(authorsWithCount.map(author => author.idBook))].length;
  const authorsWithMultipleBooks = authorsWithCount.filter(author => author.bookCount > 1).length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Author Summary</h3>
        <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
          {totalAuthors} Total Authors
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Authors</p>
              <p className="text-2xl font-bold text-gray-900">{totalAuthors}</p>
            </div>
            <User className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Books</p>
              <p className="text-2xl font-bold text-gray-900">{totalBooks}</p>
            </div>
            <Book className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Books per Author</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalAuthors > 0 ? (totalBooks / totalAuthors).toFixed(1) : '0'}
              </p>
            </div>
            <div className="h-8 w-8 flex items-center justify-center bg-primary-100 rounded-full text-primary-700 font-bold">
              Avg
            </div>
          </div>
        </div>
      </div>

      <h4 className="font-medium text-gray-900 mb-3">Top Authors by Book Count</h4>
      <div className="space-y-3 mb-4">
        {authorsWithCount
          .sort((a, b) => b.bookCount - a.bookCount)
          .slice(0, 5)
          .map(author => (
            <div key={author.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {author.firstName} {author.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}
                  </p>
                </div>
              </div>
              <Link
                to={`/authors/${author.id}`}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                View
              </Link>
            </div>
          ))}
      </div>

      <div className="flex justify-end">
        <Link
          to="/authors"
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          View all authors
        </Link>
      </div>
    </div>
  );
};
