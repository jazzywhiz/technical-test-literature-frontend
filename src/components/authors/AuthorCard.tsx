import { Link } from 'react-router-dom';
import { Author } from '@/types';
import { Pencil, Trash2, User, Book } from 'lucide-react';
import { useBooks } from '@/hooks/useBooks';

interface AuthorCardProps {
  author: Author;
  onEdit: (author: Author) => void;
  onDelete: (id: number) => void;
}

export function AuthorCard({ author, onEdit, onDelete }: AuthorCardProps) {
  // Get books data to check if this author has published books
  const { data: books } = useBooks();
  
  // Calculate the number of books for this author
  const publishedBooks = books?.filter(book => book.id === author.bookId).length || 0;
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {author.firstName} {author.lastName}
          </h3>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(author)}
            className="text-gray-500 hover:text-primary-600 transition-colors"
            aria-label="Edit author"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(author.id)}
            className="text-gray-500 hover:text-error-500 transition-colors"
            aria-label="Delete author"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-gray-500">
            <Book className="h-4 w-4 mr-1" />
            <span>{publishedBooks} {publishedBooks === 1 ? 'libro' : 'libros'} publicado{publishedBooks !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">ID del Libro: {author.bookId}</div>

          <Link
            to={`/authors/${author.id}`}
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <User className="h-4 w-4 mr-1" />
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
