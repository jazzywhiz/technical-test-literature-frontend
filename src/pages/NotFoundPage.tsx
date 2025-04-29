import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="flex justify-center mb-4">
          <SearchX className="h-16 w-16 text-gray-400" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex justify-center space-x-4">
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
          <Link to="/" className="btn btn-outline">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
