import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { Pencil, Trash2, BookOpen, Users } from 'lucide-react';
import { useAuthorsByBook } from '@/hooks/useAuthors';

interface BookListItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export function BookListItem({ book, onEdit, onDelete }: BookListItemProps) {
  // Use the useAuthorsByBook hook to get authors for this book
  const { data: authors } = useAuthorsByBook(book.id);
  const authorCount = authors?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{book.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {book.pageCount} páginas
              </span>
            </div>
            
            {authorCount > 0 && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{authorCount} {authorCount === 1 ? 'autor' : 'autores'}</span>
              </div>
            )}
          </div>
          
          {authors && authors.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Autores:</p>
              <div className="flex flex-wrap gap-2">
                {authors.map(author => (
                  <Link 
                    key={author.id}
                    to={`/authors/${author.id}`}
                    className="text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded-full transition-colors"
                  >
                    {author.firstName} {author.lastName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex lg:flex-col gap-2 self-end lg:self-start">
          <button
            onClick={() => onEdit(book)}
            className="btn btn-outline btn-sm"
            aria-label="Editar libro"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Editar
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="btn btn-outline btn-error btn-sm"
            aria-label="Eliminar libro"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Eliminar
          </button>
          <Link
            to={`/books/${book.id}`}
            className="btn btn-primary btn-sm"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
