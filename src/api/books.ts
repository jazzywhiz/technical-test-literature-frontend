import { Book } from '@/types';
import { apiRequest } from './client';

/**
 * Fetch all books
 */
export async function getBooks() {
  const endpoint = '/books';
  const response = await apiRequest<Book[]>(endpoint);
  return response.data;
}

/**
 * Fetch a single book by ID
 */
export async function getBookById(id: number | undefined) {
  if (!id) return Promise.reject('Book ID is required');
  const endpoint = `/books/${id}`;
  const response = await apiRequest<Book>(endpoint);
  return response.data;
}

/**
 * Create a new book
 */
export async function createBook(book: Omit<Book, 'id'>) {
  const endpoint = '/books';
  const response = await apiRequest<Book>(endpoint, {
    method: 'POST',
    body: JSON.stringify(book)
  });
  return response.data;
}

/**
 * Update an existing book
 */
export async function updateBook(id: number, book: Partial<Book>) {
  const endpoint = `/books/${id}`;
  const response = await apiRequest<Book>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(book)
  });
  return response.data;
}

/**
 * Delete a book
 */
export async function deleteBook(id: number) {
  const endpoint = `/books/${id}`;
  await apiRequest(endpoint, {
    method: 'DELETE'
  });
}