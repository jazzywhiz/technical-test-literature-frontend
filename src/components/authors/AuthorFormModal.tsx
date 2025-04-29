import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Author } from '@/types';
import { useCreateAuthor, useUpdateAuthor } from '@/hooks/useAuthors';
import { useBooks } from '@/hooks/useBooks';

interface AuthorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  author?: Author | null;
}

export function AuthorFormModal({
  isOpen,
  onClose,
  author,
}: AuthorFormModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idBook: 0,
  });

  const { data: books } = useBooks();
  const createAuthor = useCreateAuthor();
  const updateAuthor = useUpdateAuthor();

  useEffect(() => {
    if (author) {
      setFormData({
        firstName: author.firstName,
        lastName: author.lastName,
        idBook: author.idBook,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        idBook: 0,
      });
    }
  }, [author]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (author) {
        await updateAuthor.mutateAsync({
          id: author.id,
          data: formData,
        });
      } else {
        await createAuthor.mutateAsync(formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save author:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {author ? 'Edit Author' : 'Add New Author'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="mt-1 input"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="mt-1 input"
              required
            />
          </div>

          <div>
            <label
              htmlFor="idBook"
              className="block text-sm font-medium text-gray-700"
            >
              Associated Book
            </label>
            <select
              id="idBook"
              value={formData.idBook}
              onChange={(e) =>
                setFormData({ ...formData, idBook: Number(e.target.value) })
              }
              className="mt-1 input"
              required
            >
              <option value="">Select a book</option>
              {books?.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createAuthor.isPending || updateAuthor.isPending}
            >
              {createAuthor.isPending || updateAuthor.isPending
                ? 'Saving...'
                : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
