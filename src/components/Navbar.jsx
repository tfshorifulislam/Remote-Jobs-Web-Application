'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useSession } from '@/lib/auth-client';
import LoadingSpinner from './Spinner';
import IsMobileMenuOpen from './IsMobileMenuOpen';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { data: session, isPending } = useSession();
  const user = session?.user;
  // console.log('user in navbar:', user);

  if (isPending) {
    return <LoadingSpinner />
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="font-bold text-2xl text-blue-600">
              Remote
            </Link>
          </div>

          {/* Desktop Sign In Button */}
          <div className="hidden md:block">
            <Link href="/authentication/signin"
              className="flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              <FaSignInAlt className="text-sm" />
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <IsMobileMenuOpen />
        )}
      </div>
    </nav>
  );
};

export default Navbar;