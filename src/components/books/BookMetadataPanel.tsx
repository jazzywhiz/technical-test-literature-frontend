import React from 'react';
import { Book } from '@/types';
import { Hash, Clock, Calendar, BookOpen } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface BookMetadataPanelProps {
  book: Book;
}

export const BookMetadataPanel: React.FC<BookMetadataPanelProps> = ({ book }) => {
  // Format publish date
  const publishDate = book.publishDate ? formatDate(book.publishDate) : 'Unknown';
  
  // Calculate months since publication
  let monthsSincePublication = 0;
  if (book.publishDate) {
    const publicationDate = new Date(book.publishDate);
    if (!isNaN(publicationDate.getTime())) { // Check if date is valid
      const currentDate = new Date();
      monthsSincePublication = 
        (currentDate.getFullYear() - publicationDate.getFullYear()) * 12 + 
        currentDate.getMonth() - publicationDate.getMonth();
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Technical Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Hash className="h-4 w-4 mr-2 text-primary-500" />
            Identifiers
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Book ID:</span>
              <span className="font-medium">{book.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">ISBN:</span>
              <span className="font-medium">978-{book.id || '0'}-{String(book.pageCount || 0).padStart(4, '0')}-{Math.floor(Math.random() * 10)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">SKU:</span>
              <span className="font-medium">LIT-{book.id ? book.id.toString().padStart(5, '0') : '00000'}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Calendar className="h-4 w-4 mr-2 text-primary-500" />
            Publication Information
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Publish Date:</span>
              <span className="font-medium">{publishDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Time Since Publication:</span>
              <span className="font-medium">{monthsSincePublication} months</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Edition:</span>
              <span className="font-medium">First Edition</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <BookOpen className="h-4 w-4 mr-2 text-primary-500" />
            Physical Characteristics
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Page Count:</span>
              <span className="font-medium">{book.pageCount} pages</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Format:</span>
              <span className="font-medium">Paperback</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dimensions:</span>
              <span className="font-medium">6 × 9 inches</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Clock className="h-4 w-4 mr-2 text-primary-500" />
            Reading Metrics
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Est. Word Count:</span>
              <span className="font-medium">{book.pageCount * 250} words</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Est. Reading Time:</span>
              <span className="font-medium">{Math.ceil(book.pageCount / 30)} hours</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Complexity:</span>
              <span className="font-medium">{book.pageCount > 400 ? 'Advanced' : book.pageCount > 200 ? 'Intermediate' : 'Beginner'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
