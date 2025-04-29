import React from 'react';
import { Book as BookIcon, Calendar, FileText, Hash, Clock, Users } from 'lucide-react';
import { Book } from '@/types';
import { formatDate } from '@/utils/formatters';
import { useAuthorsByBook } from '@/hooks/useAuthors';

interface BookDetailPanelProps {
  book: Book;
}

export const BookDetailPanel: React.FC<BookDetailPanelProps> = ({ book }) => {
  const { data: authors } = useAuthorsByBook(book.id);
  const authorCount = authors?.length || 0;

  // Extract publication year
  let publicationYear = 'Desconocido';
  if (book.publishDate) {
    const pubDate = new Date(book.publishDate);
    if (!isNaN(pubDate.getTime())) {
      publicationYear = pubDate.getFullYear().toString();
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Resumen del Libro</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <Calendar className="h-6 w-6 text-primary-500 mb-2" />
            <span className="text-sm text-gray-500">Publicado</span>
            <span className="font-medium">{publicationYear}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <BookIcon className="h-6 w-6 text-primary-500 mb-2" />
            <span className="text-sm text-gray-500">Páginas</span>
            <span className="font-medium">{book.pageCount}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Descripción</h3>
        <div className="prose max-w-none text-gray-700">
          <p>{book.description}</p>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Extracto</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 italic text-gray-700">
          "{book.excerpt}"
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Detalles de Publicación</h4>
          <dl className="space-y-2">
            <div className="flex">
              <dt className="w-32 flex-shrink-0 text-sm text-gray-500">Fecha de Publicación:</dt>
              <dd className="text-sm text-gray-900">{book.publishDate ? formatDate(book.publishDate) : 'Desconocida'}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 flex-shrink-0 text-sm text-gray-500">ID del Libro:</dt>
              <dd className="text-sm text-gray-900">{book.id}</dd>
            </div>
          </dl>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Características Físicas</h4>
          <dl className="space-y-2">
            <div className="flex">
              <dt className="w-32 flex-shrink-0 text-sm text-gray-500">Número de Páginas:</dt>
              <dd className="text-sm text-gray-900">{book.pageCount} páginas</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
