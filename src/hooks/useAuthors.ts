import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '@api/authors';
import { Author } from '@/types';
import { toast } from 'sonner';
import { useBooks } from '@hooks/useBooks';

// Hook for fetching authors list
export function useAuthors() {
  return useQuery({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  });
}

// Hook for fetching a single author
export function useAuthor(id: number | undefined) {
  return useQuery({
    queryKey: ['author', id],
    queryFn: () => getAuthorById(id),
    enabled: !!id,
  });
}

// Hook for fetching authors by book
export function useAuthorsByBook(bookId: number | undefined) {
  const { data: authors } = useAuthors();

  const filteredAuthors = authors?.filter(author => author.bookId === bookId);
  console.log('Filtered Authors by bookId:', filteredAuthors);

  return {
    data: filteredAuthors,
    isLoading: false,
    isError: false,
  };
}

// Hook for creating an author
export function useCreateAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (author: Omit<Author, 'id'>) => createAuthor(author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      toast.success('Author created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create author: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });
}

// Hook for updating an author
export function useUpdateAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Author> }) => updateAuthor(id, data),
    onSuccess: (updatedAuthor) => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      queryClient.setQueryData(['author', updatedAuthor.id], updatedAuthor);
      toast.success('Author updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update author: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });
}

// Hook for deleting an author
export function useDeleteAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAuthor(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      queryClient.removeQueries({ queryKey: ['author', id] });
      toast.success('Author deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete author: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });
}

// Hook for getting author details with their book count
export function useAuthorsWithBookCount() {
  const { data: authors, isLoading, isError } = useAuthors();
  const { data: books } = useBooks();

  const authorsWithCount = authors?.map(author => {
    // Count how many books are associated with this author
    const bookCount = books?.filter(book => book.id === author.bookId).length || 0;
    return { ...author, bookCount };
  });

  return {
    data: authorsWithCount,
    isLoading,
    isError
  };
}