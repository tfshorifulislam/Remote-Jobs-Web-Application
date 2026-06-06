'use client';

import Link from 'next/link';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">

      <div className="text-center max-w-md">

        {/* Big 404 */}
        <h1 className="text-[90px] sm:text-[120px] font-extrabold text-zinc-800 leading-none tracking-tighter">
          404
        </h1>

        {/* Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#E5E2E3] mt-2">
          Page Not Found
        </h2>

        <p className="text-sm text-zinc-500 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[#E5E2E3] border border-zinc-700 font-medium transition cursor-pointer"
          >
            <FiHome />
            Back Home
          </Link>

          <Link
            href="/jobs"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition cursor-pointer"
          >
            <FiSearch />
            Browse Jobs
          </Link>

        </div>

        {/* Small hint */}
        <p className="text-xs text-zinc-600 mt-6">
          Tip: check the URL or go back to homepage
        </p>

      </div>

    </div>
  );
};

export default NotFoundPage;