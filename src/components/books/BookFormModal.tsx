import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Book } from '@/types';
import { useCreateBook, useUpdateBook } from '@/hooks/useBooks';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book | null;
}

export function BookFormModal({ isOpen, onClose, book }: BookFormModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pageCount: 0,
    excerpt: '',
    publishDate: '',
  });

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        description: book.description,
        pageCount: book.pageCount,
        excerpt: book.excerpt,
        publishDate: book.publishDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        pageCount: 0,
        excerpt: '',
        publishDate: '',
      });
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (book) {
        await updateBook.mutateAsync({
          id: book.id,
          data: formData,
        });
      } else {
        await createBook.mutateAsync(formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save book:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {book ? 'Edit Book' : 'Add New Book'}
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
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 input"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 input"
              rows={3}
              required
            />
          </div>

          <div>
            <label
              htmlFor="pageCount"
              className="block text-sm font-medium text-gray-700"
            >
              Page Count
            </label>
            <input
              type="number"
              id="pageCount"
              value={formData.pageCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pageCount: parseInt(e.target.value),
                })
              }
              className="mt-1 input"
              min="1"
              required
            />
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700"
            >
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="mt-1 input"
              rows={4}
              required
            />
          </div>

          <div>
            <label
              htmlFor="publishDate"
              className="block text-sm font-medium text-gray-700"
            >
              Publish Date
            </label>
            <input
              type="date"
              id="publishDate"
              value={formData.publishDate}
              onChange={(e) =>
                setFormData({ ...formData, publishDate: e.target.value })
              }
              className="mt-1 input"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createBook.isPending || updateBook.isPending}
            >
              {createBook.isPending || updateBook.isPending
                ? 'Saving...'
                : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
