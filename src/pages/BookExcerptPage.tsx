import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { PageHeader } from '@components/shared/PageHeader';
import { Loading } from '@components/shared/Loading';
import { ErrorState } from '@components/shared/EmptyState';
import { useBook } from '@hooks/useBooks';
import { useAuthorsByBook } from '@hooks/useAuthors';

function BookExcerptPage() {
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
            : 'Failed to load book excerpt'
        }
        retryAction={refetchBook}
      />
    );
  }

  // Get author names for display
  const authorNames = authors?.map(author => `${author.firstName} ${author.lastName}`).join(', ') || 'Unknown Author';

  return (
    <div>
      <div className="mb-6">
        <Link
          to={`/books/${bookId}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Book Details
        </Link>
      </div>

      <PageHeader
        title={`Excerpt from "${book.title}"`}
        description={`By ${authorNames}`}
      />

      <div className="mt-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h2>
            <p className="text-gray-600">By {authorNames}</p>
            <div className="mt-4 flex justify-center">
              <BookOpen className="h-12 w-12 text-primary-500" />
            </div>
          </div>
          
          <div className="prose max-w-none">
            <div className="mb-8">
              <p className="text-lg text-gray-500 italic border-l-4 pl-4 border-primary-300">
                The following is an excerpt from "{book.title}". This excerpt provides a glimpse into the book's content and style.
              </p>
            </div>
            
            <div className="text-lg leading-relaxed text-gray-800 space-y-6">
              <p className="text-2xl font-serif">"{book.excerpt || 'No excerpt available'}"</p>
              
              {/* Generate some additional paragraphs based on the excerpt */}
              {book.excerpt ? (
                <>
                  <p>
                    {book.excerpt.split(' ').slice(0, 20).join(' ')}... 
                    The narrative continues, drawing the reader deeper into the world created within these pages.
                  </p>
                  
                  <p>
                    Throughout the book, readers will discover more about the themes introduced in this excerpt,
                    exploring the depth and complexity of the story across {book.pageCount || 'many'} carefully crafted pages.
                  </p>
                </>
              ) : (
                <p className="text-gray-500 italic">
                  No excerpt is available for this book. The complete content can be found in the full publication.
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <Link
              to={`/books/${bookId}`}
              className="btn btn-primary"
            >
              Return to Book Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookExcerptPage;
