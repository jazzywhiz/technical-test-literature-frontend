import { useState, Suspense } from 'react';
import { UserPlus } from 'lucide-react';
import { AuthorList } from '@/components/authors/AuthorList';
import { AuthorFormModal } from '@/components/authors/AuthorFormModal';
import { PageHeader } from '@/components/shared/PageHeader';
import { Loading } from '@/components/shared/Loading';
import { ErrorState } from '@/components/shared/EmptyState';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useAuthors, useDeleteAuthor } from '@/hooks/useAuthors';
import { Author } from '@/types';
import { toast } from 'sonner';

function AuthorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [authorToDelete, setAuthorToDelete] = useState<number | null>(null);

  const { data: authors, isLoading, isError, error, refetch } = useAuthors();
  const deleteAuthor = useDeleteAuthor();

  const handleAddAuthor = () => {
    setSelectedAuthor(null);
    setIsModalOpen(true);
  };

  const handleEditAuthor = (author: Author) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  const handleDeleteAuthor = async (id: number) => {
    setAuthorToDelete(id);
  };

  const confirmDelete = async () => {
    if (!authorToDelete) return;

    try {
      await deleteAuthor.mutateAsync(authorToDelete);
    } catch (error) {
      toast.error('Failed to delete author');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : 'Failed to load authors'
        }
        retryAction={refetch}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Autores"
        description="Explora y gestiona todos los autores de la biblioteca."
        actions={
          <button onClick={handleAddAuthor} className="btn btn-primary">
            <UserPlus className="h-4 w-4 mr-2" />
            Añadir Autor
          </button>
        }
      />

      <Suspense fallback={<Loading />}>
        <div className="mt-6">
          <AuthorList
            authors={authors || []}
            onEdit={handleEditAuthor}
            onDelete={handleDeleteAuthor}
          />
        </div>
      </Suspense>

      <AuthorFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        author={selectedAuthor}
      />

      <ConfirmDialog
        isOpen={!!authorToDelete}
        onClose={() => setAuthorToDelete(null)}
        onConfirm={confirmDelete}
        title="Eliminar Autor"
        message="¿Estás seguro de que deseas eliminar este autor? Esta acción no se puede deshacer."
      />
    </div>
  );
}

export default AuthorsPage;
