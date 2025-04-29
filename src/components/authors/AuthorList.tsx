import { Author } from '@/types';
import { AuthorCard } from './AuthorCard';

interface AuthorListProps {
  authors: Author[];
  onEdit: (author: Author) => void;
  onDelete: (id: number) => void;
}

export function AuthorList({ authors, onEdit, onDelete }: AuthorListProps) {
  if (authors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No authors found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {authors.map((author) => (
        <AuthorCard
          key={author.id}
          author={author}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
