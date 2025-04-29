import { Author } from '@/types';
import { apiRequest } from './client';

/**
 * Fetch all authors
 */
export async function getAuthors() {
  const endpoint = '/authors';
  const response = await apiRequest<Author[]>(endpoint);
  return response.data;
}

/**
 * Fetch a single author by ID
 */
export async function getAuthorById(id: number | undefined) {
  if (!id) return Promise.reject('Author ID is required');
  const endpoint = `/authors/${id}`;
  const response = await apiRequest<Author>(endpoint);
  return response.data;
}

/**
 * Create a new author
 */
export async function createAuthor(author: Omit<Author, 'id'>) {
  const endpoint = '/authors';
  const response = await apiRequest<Author>(endpoint, {
    method: 'POST',
    body: JSON.stringify(author)
  });
  return response.data;
}

/**
 * Update an existing author
 */
export async function updateAuthor(id: number, author: Partial<Author>) {
  const endpoint = `/authors/${id}`;
  const response = await apiRequest<Author>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(author)
  });
  return response.data;
}

/**
 * Delete an author
 */
export async function deleteAuthor(id: number) {
  const endpoint = `/authors/${id}`;
  await apiRequest(endpoint, {
    method: 'DELETE'
  });
}