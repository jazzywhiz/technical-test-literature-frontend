import { Book } from '@/types';
import { BookListItem } from './BookListItem';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export function BookList({ books, onEdit, onDelete }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No books found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <BookListItem
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
