import { ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Utility to handle API requests with proper error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'plain/text',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: {} as T,
        status: response.status,
        message: errorData.message || 'An error occurred',
      };
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
      message: 'Success',
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      data: {} as T,
      status: 500,
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}