import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@components/shared/PageHeader';
import { Loading } from '@components/shared/Loading';
import { ErrorState } from '@components/shared/EmptyState';
import { useBook } from '@hooks/useBooks';
import { useAuthorsByBook } from '@hooks/useAuthors';
import { formatDate } from '@utils/formatters';
import { BookDetailPanel } from '@components/books/BookDetailPanel';
import { AuthorDetailPanel } from '@components/books/AuthorDetailPanel';

function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);

  // Fetch book details
  const {
    data: book,
    isLoading: isLoadingBook,
    isError: isBookError,
    error: bookError,
    refetch: refetchBook,
  } = useBook(bookId);

  // Fetch associated authors
  const { data: authors } = useAuthorsByBook(bookId);

  // Handle loading state
  if (isLoadingBook) {
    return <Loading />;
  }

  // Handle error state
  if (isBookError || !book) {
    return (
      <ErrorState
        message={
          bookError instanceof Error
            ? bookError.message
            : 'Failed to load book details'
        }
        retryAction={refetchBook}
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/books"
          className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Libros
        </Link>
      </div>

      <PageHeader
        title={book.title}
        description={`${book.pageCount} páginas • Publicado ${formatDate(
          book.publishDate
        )}`}
      />

      <div className="mt-6 grid grid-cols-1 gap-6">
        {/* Main book details */}
        <BookDetailPanel book={book} />

        {/* Author information panel */}
        <AuthorDetailPanel authors={authors || []} bookId={bookId} />
      </div>
    </div>
  );
}

export default BookDetailsPage;
