import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '@/components/shared/Layout';
import { ErrorFallback } from '@/components/shared/ErrorFallback';
import { Loading } from '@/components/shared/Loading';

// Lazy load pages
const BooksPage = lazy(() => import('@/pages/BooksPage'));
const AuthorsPage = lazy(() => import('@/pages/AuthorsPage'));
const BookDetailsPage = lazy(() => import('@/pages/BookDetailsPage'));
const AuthorDetailsPage = lazy(() => import('@/pages/AuthorDetailsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/books" replace />} />
          <Route
            path="books"
            element={
              <Suspense fallback={<Loading />}>
                <BooksPage />
              </Suspense>
            }
          />
          <Route
            path="books/:id"
            element={
              <Suspense fallback={<Loading />}>
                <BookDetailsPage />
              </Suspense>
            }
          />
          <Route
            path="authors"
            element={
              <Suspense fallback={<Loading />}>
                <AuthorsPage />
              </Suspense>
            }
          />
          <Route
            path="authors/:id"
            element={
              <Suspense fallback={<Loading />}>
                <AuthorDetailsPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
