import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useAuthor } from '@hooks/useAuthors';
import { useBook } from '@hooks/useBooks';
import { useAuthorsByBook } from '@hooks/useAuthors';
import { formatDate } from '@utils/formatters';
import { Loading } from '@components/shared/Loading';
import { ErrorState } from '@components/shared/EmptyState';

interface RelatedAuthorBooksProps {
  authorId: number;
}

export const RelatedAuthorBooks: React.FC<RelatedAuthorBooksProps> = ({ authorId }) => {
  // Fetch the author data
  const { data: author, isLoading: isLoadingAuthor, isError: isAuthorError } = useAuthor(authorId);
  
  // Use the associated book ID to fetch the book
  const { data: book, isLoading: isLoadingBook, isError: isBookError } = useBook(author?.bookId);
  
  // Get all other authors of the same book to show "co-authors"
  const { data: coAuthors } = useAuthorsByBook(author?.bookId);
  
  // Calculate co-author count (excluding the current author)
  const coAuthorCount = coAuthors?.filter(a => a.id !== authorId).length || 0;

  if (isLoadingAuthor || isLoadingBook) {
    return <Loading />;
  }

  if (isAuthorError || isBookError || !author) {
    return (
      <ErrorState
        message="Error al cargar la información de libros relacionados"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Libros de {author.firstName} {author.lastName}</h3>
      
      {book ? (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{book.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                Publicado: {formatDate(book.publishDate)}
              </p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                {book.description}
              </p>
            </div>
            <Link
              to={`/books/${book.id}`}
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              <span className="mr-1">Detalles</span>
              <BookOpen className="h-4 w-4" />
            </Link>
          </div>
          
          {coAuthorCount > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Co-escrito con {coAuthorCount} {coAuthorCount === 1 ? 'otro autor' : 'otros autores'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No hay libros asociados con este autor</p>
      )}

      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{book ? 1 : 0}</span> libro(s) de este autor
          </p>
          <Link
            to="/books"
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            Ver todos los libros
          </Link>
        </div>
      </div>
    </div>
  );
};
