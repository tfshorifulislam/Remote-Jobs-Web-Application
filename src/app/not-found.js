'use client';

import Link from 'next/link';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">

      <div className="text-center max-w-md">

        {/* Big 404 */}
        <h1 className="text-[90px] sm:text-[120px] font-extrabold text-[#0A65CC] leading-none">
          404
        </h1>

        {/* Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
          Page Not Found
        </h2>

        <p className="text-sm text-gray-500 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">

          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A65CC] text-white font-medium hover:bg-[#0957b0] transition shadow-md"
          >
            <FiHome />
            Back Home
          </Link>

          <Link
            href="/jobs"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            <FiSearch />
            Browse Jobs
          </Link>

        </div>

        {/* Small hint */}
        <p className="text-xs text-gray-400 mt-6">
          Tip: check the URL or go back to homepage
        </p>

      </div>

    </div>
  );
};

export default NotFoundPage;