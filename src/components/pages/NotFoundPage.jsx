import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;