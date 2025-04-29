export interface Book {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  excerpt: string;
  publishDate: string;
}

export interface Author {
  id: number;
  bookId: number;
  firstName: string;
  lastName: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}