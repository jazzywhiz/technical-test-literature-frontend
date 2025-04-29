import { useState, Suspense } from 'react';
import { BookPlus, Grid, List } from 'lucide-react';
import { BookGrid } from '@/components/books/BookGrid';
import { BookList } from '@/components/books/BookList';
import { BookFormModal } from '@/components/books/BookFormModal';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { PageHeader } from '@/components/shared/PageHeader';
import { Loading } from '@/components/shared/Loading';
import { ErrorState } from '@/components/shared/EmptyState';
import { useBooks, useDeleteBook } from '@/hooks/useBooks';
import { Book } from '@/types';
import { toast } from 'sonner';

function BooksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: books, isLoading, isError, error, refetch } = useBooks();
  const deleteBook = useDeleteBook();

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (id: number) => {
    setBookToDelete(id);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;

    try {
      await deleteBook.mutateAsync(bookToDelete);
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : 'Failed to load books'
        }
        retryAction={refetch}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Colección de Libros"
        description="Explora y gestiona todos los libros de la biblioteca."
        actions={
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 rounded-lg p-1 flex items-center mr-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                aria-label="Vista de cuadrícula"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                aria-label="Vista de lista"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <button onClick={handleAddBook} className="btn btn-primary">
              <BookPlus className="h-4 w-4 mr-2" />
              Añadir Libro
            </button>
          </div>
        }
      />

      <Suspense fallback={<Loading />}>
        <div className="mt-6">
          {viewMode === 'grid' ? (
            <BookGrid
              books={books || []}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          ) : (
            <BookList
              books={books || []}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          )}
        </div>
      </Suspense>

      <BookFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        book={selectedBook}
      />

      <ConfirmDialog
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onConfirm={confirmDelete}
        title="Eliminar Libro"
        message="¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer."
      />
    </div>
  );
}

export default BooksPage;
