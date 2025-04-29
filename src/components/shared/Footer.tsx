import { Library } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-gray-900">
            <Library className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-semibold">
              Literature (Technical test)
            </span>
          </div>

          <p className="text-sm text-gray-500">
            &copy; {currentYear} Literature (Technical test). All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
