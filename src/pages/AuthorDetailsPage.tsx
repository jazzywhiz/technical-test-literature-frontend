import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@components/shared/PageHeader';
import { Loading } from '@components/shared/Loading';
import { ErrorState } from '@components/shared/EmptyState';
import { useAuthor } from '@hooks/useAuthors';
import { RelatedAuthorBooks } from '@components/authors/related/RelatedAuthorBooks';
import { AuthorBookStats } from '@components/authors/related/AuthorBookStats';

function AuthorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const authorId = Number(id);

  // Fetch author details
  const {
    data: author,
    isLoading: isLoadingAuthor,
    isError: isAuthorError,
    error: authorError,
    refetch: refetchAuthor,
  } = useAuthor(authorId);

  // Handle loading state
  if (isLoadingAuthor) {
    return <Loading />;
  }

  // Handle error state
  if (isAuthorError || !author) {
    return (
      <ErrorState
        message={
          authorError instanceof Error
            ? authorError.message
            : 'Failed to load author details'
        }
        retryAction={refetchAuthor}
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/authors"
          className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Autores
        </Link>
      </div>

      <PageHeader
        title={`${author.firstName} ${author.lastName}`}
      />

      <div className="mt-6 grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div>
            <h3 className="text-lg font-semibold mb-4">Información del Autor</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500">Nombre</dt>
                <dd className="text-gray-900 mt-1">{author.firstName}</dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Apellido</dt>
                <dd className="text-gray-900 mt-1">{author.lastName}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        {/* Add the Related Author Books component */}
        <RelatedAuthorBooks authorId={authorId} />
        
        {/* Add Author Book Stats */}
        <AuthorBookStats authorId={authorId} />
      </div>
    </div>
  );
}

export default AuthorDetailsPage;
