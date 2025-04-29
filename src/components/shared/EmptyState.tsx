import { ReactNode } from 'react';
import { SearchX, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ 
  title, 
  description, 
  icon = <SearchX className="h-12 w-12 text-gray-400" />,
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

export function NoResultsFound({ 
  searchTerm,
  resetAction,
}: { 
  searchTerm: string;
  resetAction: () => void;
}) {
  return (
    <EmptyState
      title="No results found"
      description={`We couldn't find any results for "${searchTerm}". Try adjusting your search or filter criteria.`}
      icon={<SearchX className="h-12 w-12 text-gray-400" />}
      action={
        <button
          onClick={resetAction}
          className="btn btn-outline"
        >
          Clear filters
        </button>
      }
    />
  );
}

export function ErrorState({ 
  message = "We're having trouble loading this content. Please try again later.",
  retryAction,
}: { 
  message?: string;
  retryAction?: () => void;
}) {
  return (
    <EmptyState
      title="An error occurred"
      description={message}
      icon={<AlertCircle className="h-12 w-12 text-error-500" />}
      action={
        retryAction && (
          <button
            onClick={retryAction}
            className="btn btn-primary"
          >
            Try again
          </button>
        )
      }
    />
  );
}