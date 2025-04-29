import { FallbackProps } from 'react-error-boundary';
import { AlertCircle } from 'lucide-react';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-red-200">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-900">
          Something went wrong
        </h2>
        
        <div className="mb-6 p-3 text-sm bg-red-50 text-red-700 rounded-md border border-red-100 overflow-auto">
          <p className="font-mono">{error.message}</p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={resetErrorBoundary}
            className="btn btn-primary"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}