import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { useAuthorsByBook } from '@hooks/useAuthors';
import { Book as BookType } from '@/types';
import { Loading } from '@components/shared/Loading';
import { ErrorState } from '@components/shared/EmptyState';

interface RelatedAuthorBooksProps {
  bookId: number;
}

export const RelatedAuthorBooks: React.FC<RelatedAuthorBooksProps> = ({ bookId }) => {
  // Use the useAuthorsByBook hook to get authors associated with this book
  const { data: authors, isLoading, isError } = useAuthorsByBook(bookId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !authors) {
    return (
      <ErrorState
        message="Failed to load related authors"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Authors of this Book</h3>
      
      {authors.length > 0 ? (
        <div className="space-y-4">
          {authors.map((author) => (
            <div key={author.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {author.firstName} {author.lastName}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Author ID: {author.id}
                  </p>
                </div>
                <Link
                  to={`/authors/${author.id}`}
                  className="text-primary-600 hover:text-primary-700 flex items-center"
                >
                  <span className="mr-1">Details</span>
                  <Book className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No authors associated with this book</p>
      )}

      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{authors.length}</span> author(s) for this book
          </p>
          <Link
            to="/authors"
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            View all authors
          </Link>
        </div>
      </div>
    </div>
  );
};
