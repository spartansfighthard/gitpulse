import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md space-y-8 p-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 