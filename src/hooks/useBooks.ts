import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '@api/books';
import { Book } from '@/types';
import { toast } from 'sonner';
import { useAuthor } from '@hooks/useAuthors';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });
}

export function useBook(id: number | undefined) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: Omit<Book, 'id'>) => createBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create book: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Book> }) => updateBook(id, data),
    onSuccess: (updatedBook) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.setQueryData(['book', updatedBook.id], updatedBook);
      toast.success('Book updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update book: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBook(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.removeQueries({ queryKey: ['book', id] });
      toast.success('Book deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete book: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });
}

// Hook to get books related to an author through their bookId
export function useBooksByAuthor(authorId: number | undefined) {
  const { data: author } = useAuthor(authorId);
  const { data: books } = useBooks();
  
  const filteredBooks = books?.filter(book => author?.bookId === book.id) || [];
  console.log('Filtered Books by bookId:', filteredBooks);

  return {
    data: filteredBooks,
    isLoading: false,
    isError: false,
  };
}