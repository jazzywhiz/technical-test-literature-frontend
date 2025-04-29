import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { Pencil, Trash2, BookOpen, Users } from 'lucide-react';
import { useAuthorsByBook } from '@/hooks/useAuthors';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  // Use the useAuthorsByBook hook to get authors for this book
  const { data: authors } = useAuthorsByBook(book.id);
  const authorCount = authors?.length || 0;
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(book)}
            className="text-gray-500 hover:text-primary-600 transition-colors"
            aria-label="Edit book"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="text-gray-500 hover:text-error-500 transition-colors"
            aria-label="Delete book"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{book.description}</p>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-500">{book.pageCount} páginas</div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{authorCount} {authorCount === 1 ? 'autor' : 'autores'}</span>
          </div>
        </div>

        {authorCount > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Autores:</p>
            <div className="text-sm text-gray-700">
              {authors?.slice(0, 2).map((author, index) => (
                <span key={author.id}>
                  {author.firstName} {author.lastName}
                  {index < Math.min(authorCount - 1, 1) && ', '}
                </span>
              ))}
              {authorCount > 2 && (
                <span className="text-gray-500"> +{authorCount - 2} más</span>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Link
          to={`/books/${book.id}`}
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
          <BookOpen className="h-4 w-4 mr-1" />
          Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
