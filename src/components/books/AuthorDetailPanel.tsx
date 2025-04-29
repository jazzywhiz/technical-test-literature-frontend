import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, User, BookOpen } from 'lucide-react';
import { Author } from '@/types';
import { useBook } from '@/hooks/useBooks';
import { useAuthorsByBook } from '@/hooks/useAuthors';

interface AuthorDetailPanelProps {
  authors: Author[];
  bookId: number;
}

export const AuthorDetailPanel: React.FC<AuthorDetailPanelProps> = ({ authors, bookId }) => {
  // Get book info
  const { data: book } = useBook(bookId);
  
  // Calculate if there are multiple authors
  const isMultipleAuthors = authors.length > 1;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Autores del Libro</h3>
        <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
          {authors.length} {authors.length === 1 ? 'Autor' : 'Autores'}
        </span>
      </div>

      {authors.length > 0 ? (
        <div className="space-y-4">
          {authors.map((author) => (
            <div key={author.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {author.firstName} {author.lastName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {isMultipleAuthors ? 'Co-autor' : 'Autor'}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/authors/${author.id}`}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-primary-600 text-sm px-3 py-1 rounded-full inline-flex items-center"
                >
                  <User className="h-3 w-3 mr-1" />
                  Perfil
                </Link>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex text-sm">
                  <div className="flex-1">
                    <div className="flex items-center text-gray-500">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>Contribución al Libro</span>
                    </div>
                    <p className="mt-1 text-gray-900">
                      {book?.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <UserPlus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No hay autores asociados con este libro</p>
          <p className="text-sm text-gray-400 mt-1">La información de autores no está disponible</p>
        </div>
      )}

      {isMultipleAuthors && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Información de Co-autoría</h4>
          <p className="text-sm text-gray-600">
            Este libro fue escrito en colaboración entre {authors.length} autores. 
            Cada autor contribuyó al contenido de "{book?.title}".
          </p>
        </div>
      )}
    </div>
  );
};
