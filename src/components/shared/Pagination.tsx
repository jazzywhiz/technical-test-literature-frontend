import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    // Maximum number of pages to show
    const maxPagesToShow = 5;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate start and end of the middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust when current page is near the beginning
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      // Adjust when current page is near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis to distinguish from the first one
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={cn('flex justify-center items-center mt-6', className)}>
      <ul className="inline-flex -space-x-px">
        {/* Previous page button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              'flex items-center justify-center h-9 px-3 ml-0 rounded-l-md border border-gray-300',
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-primary-600'
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          // Check if it's an ellipsis
          if (page < 0) {
            return (
              <li key={`ellipsis-${page}`}>
                <span className="flex items-center justify-center h-9 px-3 border border-gray-300 bg-white text-gray-600">
                  &hellip;
                </span>
              </li>
            );
          }

          return (
            <li key={`page-${page}`}>
              <button
                onClick={() => onPageChange(page)}
                className={cn(
                  'flex items-center justify-center h-9 px-3 border border-gray-300',
                  page === currentPage
                    ? 'bg-primary-50 text-primary-600 border-primary-300'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                )}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next page button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              'flex items-center justify-center h-9 px-3 rounded-r-md border border-gray-300',
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-primary-600'
            )}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
