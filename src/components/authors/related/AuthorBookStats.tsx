import React from 'react';
import { useAuthorsByBook } from '@hooks/useAuthors';
import { useBooks } from '@hooks/useBooks';
import { Book as BookIcon, Users } from 'lucide-react';

interface AuthorBookStatsProps {
  authorId: number;
}

export const AuthorBookStats: React.FC<AuthorBookStatsProps> = ({ authorId }) => {
  // Get all books
  const { data: books } = useBooks();
  
  // For each book, get its authors to find co-authors
  const bookAuthorsMap = books?.map(book => ({
    bookId: book.id,
    authors: useAuthorsByBook(book.id)?.data || []
  })) || [];
  
  // Find books that the current author has co-authored with others
  const coAuthoredBooks = bookAuthorsMap
    .filter(item => item.authors.some(author => author.id === authorId))
    .filter(item => item.authors.length > 1);
  
  // Get all unique co-authors
  const uniqueCoAuthors = new Set<number>();
  coAuthoredBooks.forEach(item => {
    item.authors
      .filter(author => author.id !== authorId)
      .forEach(author => uniqueCoAuthors.add(author.id));
  });
  
  // Count total co-authored books
  const totalCoAuthoredBooks = coAuthoredBooks.length;
  
  // Count total unique co-authors
  const totalUniqueCoAuthors = uniqueCoAuthors.size;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Estadísticas de Colaboración</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <BookIcon className="h-8 w-8 text-primary-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Libros Co-escritos</p>
              <p className="text-2xl font-bold text-gray-900">{totalCoAuthoredBooks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Co-autores</p>
              <p className="text-2xl font-bold text-gray-900">{totalUniqueCoAuthors}</p>
            </div>
          </div>
        </div>
      </div>
      
      {totalCoAuthoredBooks > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-md font-medium mb-2">Títulos de Libros Co-escritos</h4>
          <ul className="space-y-1">
            {coAuthoredBooks.map(item => {
              const book = books?.find(b => b.id === item.bookId);
              return book ? (
                <li key={book.id} className="text-sm text-gray-700">
                  • {book.title}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
